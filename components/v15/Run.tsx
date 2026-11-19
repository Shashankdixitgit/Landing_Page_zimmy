"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ChevronRight, Globe, X } from "lucide-react";
import { BRAND_JOIN_HREF } from "../ui";
import { clock, initials, RunRing, shortName, unescapeHtml } from "./RunParts";

/**
 * The live part of the page: read the visitor's homepage with the same
 * /api/brand-lookup the sign-up form uses, then show what was read. Shared by the
 * /v15 and /v16 heroes.
 *
 * What happens here is only that read. Everything after it (the research, the
 * scripts) starts after the sign-up, which is an application a founder answers
 * by email, so the run view says exactly that and nothing more.
 */

export type Read = {
  website?: string;
  brand_name?: string | null;
  description?: string | null;
  category?: string | null;
  country?: string | null;
  socials?: Record<string, string | null | undefined>;
  /** An App Store or Google Play link: noted, not read (the lookup reads homepages). */
  store?: boolean;
};

export type Phase = "idle" | "reading" | "done" | "error";

/** A closing-section input starts the run in the hero, so there is one run on the page. */
export const START_EVENT = "bd:start";

/** Scroll the hero back into view, without a long smooth scroll for people who asked for less motion. */
export function scrollToTop(el: HTMLElement | null) {
  const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  el?.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "start" });
}

const STORE_HOST = /^(apps|itunes)\.apple\.com$|^play\.google\.com$/i;

export const hostOf = (u: string) =>
  u
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split(/[/?#]/)[0]
    .toLowerCase();

/** A name from a store link: /app/calm-sleep-meditation/id57... → "Calm Sleep Meditation"; ?id=com.calm.android → "Calm". */
function storeName(raw: string): string | null {
  try {
    const u = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
    const slug = u.pathname.match(/\/app\/([^/]+)\/id\d+/i)?.[1];
    const pkg = u.searchParams.get("id")?.split(".").filter((p) => !/^(com|app|android|ios|co|io|in|org|net)$/i.test(p))[0];
    const words = (slug ?? pkg ?? "").split(/[-_]+/).filter(Boolean);
    return words.length ? words.map((w) => w[0].toUpperCase() + w.slice(1)).join(" ") : null;
  } catch {
    return null;
  }
}

/** Looks like a link rather than a sentence: a dot in a word and no spaces, or a scheme. */
export const looksLikeLink = (s: string) => /^https?:\/\//i.test(s.trim()) || /^[^\s]+\.[a-z]{2,}([/?#][^\s]*)?$/i.test(s.trim());

/** A pasted link often brings the sentence's full stop or a bracket with it. */
export const trimLink = (s: string) => s.trim().replace(/[.,!?;:)\]]+$/, "");

export function useSiteRead() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [read, setRead] = useState<Read | null>(null);
  const [asked, setAsked] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const started = useRef(0);
  const run = useRef(0);

  const start = useCallback(async (raw: string) => {
    const url = raw.trim();
    if (!url) return;
    const id = ++run.current;
    setAsked(url);
    setRead(null);
    started.current = Date.now();
    setElapsed(0);

    if (STORE_HOST.test(hostOf(url))) {
      // The lookup would read the store's own homepage and call the app "App Store".
      setRead({ website: url, brand_name: storeName(url), store: true });
      setPhase("done");
      return;
    }

    setPhase("reading");
    try {
      const res = await fetch(`/api/brand-lookup?url=${encodeURIComponent(url)}`);
      const r = res.ok ? ((await res.json()) as Read & { ok?: boolean }) : null;
      // A newer run (or "Start over") replaced this one while it was reading.
      if (id !== run.current) return;
      setElapsed((Date.now() - started.current) / 1000);
      if (r?.ok) {
        setRead({
          ...r,
          brand_name: r.brand_name ? shortName(unescapeHtml(r.brand_name)) : null,
          description: r.description ? unescapeHtml(r.description) : null,
        });
        setPhase("done");
      } else {
        setPhase("error");
      }
    } catch {
      if (id === run.current) setPhase("error");
    }
  }, []);

  const reset = useCallback(() => {
    run.current++;
    setPhase("idle");
    setRead(null);
  }, []);

  // The clock under the ring runs only while reading.
  useEffect(() => {
    if (phase !== "reading") return;
    const t = setInterval(() => setElapsed((Date.now() - started.current) / 1000), 250);
    return () => clearInterval(t);
  }, [phase]);

  return { phase, read, asked, elapsed, start, reset };
}

/** The sign-up link, carrying what was read so the form starts filled in. */
export function joinHref(read: Read | null, asked: string, question?: string): string {
  // What the visitor pasted, not the bare host: a deep link or store link stays whole.
  const q = new URLSearchParams({ website: asked });
  if (read?.brand_name) q.set("brand_name", read.brand_name);
  if (!read?.store && read?.category) q.set("category", read.category);
  if (!read?.store && read?.country) q.set("country", read.country);
  // A question asked in the /v16 box goes to the founders with the sign-up.
  if (question?.trim()) q.set("notes", question.trim().slice(0, 300));
  return `${BRAND_JOIN_HREF}?${q.toString()}`;
}

const SOCIAL: Record<string, (h: string) => string> = {
  instagram: (h) => `Instagram @${h.replace(/^@/, "")}`,
  tiktok: (h) => `TikTok @${h.replace(/^@/, "")}`,
  youtube: (h) => `YouTube @${h.replace(/^@/, "")}`,
  x: (h) => `X @${h.replace(/^@/, "")}`,
  twitter: (h) => `X @${h.replace(/^@/, "")}`,
  linkedin: (h) => `LinkedIn ${h}`,
  facebook: (h) => `Facebook ${h}`,
};

/** "Read more": everything the read found, in a native dialog (focus, Escape and the backdrop handled by the browser). */
function ReadDialog({ open, onClose, name, read, where }: { open: boolean; onClose: () => void; name: string; read: Read; where: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const downOnBackdrop = useRef(false);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.documentElement.style.overflow = "hidden";
    }
    if (!open && d.open) d.close();
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const links = Object.entries(read.socials ?? {})
    .filter(([, v]) => typeof v === "string" && v)
    .map(([k, v]) => (SOCIAL[k] ? SOCIAL[k](v as string) : `${k} ${v}`));

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onMouseDown={(e) => {
        downOnBackdrop.current = e.target === e.currentTarget;
      }}
      onClick={(e) => {
        // Only a press that starts and ends on the backdrop closes it, so selecting text never does.
        if (downOnBackdrop.current && e.target === e.currentTarget) onClose();
      }}
      aria-label={`What HitRate read about ${name}`}
      data-lenis-prevent
      className="bd-dialog m-auto w-[calc(100%-2rem)] max-w-[520px] overflow-y-auto overscroll-contain rounded-[26px] bg-white p-0 text-left shadow-[0_30px_80px_-20px_rgb(0_0_0/0.35)]"
    >
      <div className="flex items-start gap-3.5 border-b border-[var(--bd-line)] px-6 py-5">
        <span className="serif grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#161616] text-[18px] text-white" aria-hidden>
          {initials(name)}
        </span>
        <div className="min-w-0 flex-1">
          <p className="serif text-[24px] leading-tight text-[var(--bd-ink)]">{name}</p>
          <p className="mt-0.5 text-[13px] text-[var(--bd-muted)]">What HitRate read on your homepage</p>
        </div>
        <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-1.5 text-[var(--bd-muted)] hover:bg-[var(--bd-soft)]" autoFocus>
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="px-6 py-5">
        <p className="text-[15.5px] leading-[1.75] text-[var(--bd-text)]">{read.description}</p>
        <p className="mt-5 text-[13px] text-[var(--bd-muted)]">Read</p>
        <ul className="mt-2 flex flex-wrap gap-1.5">
          <li className="inline-flex items-center gap-1.5 rounded-full border border-[var(--bd-line)] px-2.5 py-1 text-[12.5px] text-[var(--bd-text)]">
            <Globe className="h-3.5 w-3.5 text-[var(--bd-muted)]" aria-hidden />
            {where}
          </li>
        </ul>
        {links.length ? (
          <>
            <p className="mt-4 text-[13px] text-[var(--bd-muted)]">Linked from your homepage</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {links.map((l) => (
                <li key={l} className="rounded-full border border-[var(--bd-line)] px-2.5 py-1 text-[12.5px] text-[var(--bd-text)]">
                  {l}
                </li>
              ))}
            </ul>
          </>
        ) : null}
      </div>
    </dialog>
  );
}

/**
 * The run, as the product shows it: initials in a ring, what was read, then the
 * steps. `steps` renders the card (each page words its own), and gets the
 * sign-up link for its Continue button.
 */
export function RunView({
  phase,
  read,
  asked,
  elapsed,
  onReset,
  steps,
  headingRef,
  question,
}: {
  phase: Exclude<Phase, "idle">;
  read: Read | null;
  asked: string;
  elapsed: number;
  onReset: () => void;
  steps: (href: string) => ReactNode;
  headingRef?: React.Ref<HTMLHeadingElement>;
  /** A question asked before the link, carried into the sign-up. */
  question?: string;
}) {
  const [more, setMore] = useState(false);
  const moreBtn = useRef<HTMLButtonElement>(null);
  const where = hostOf(read?.website ?? asked);
  const bareHost = where.replace(/\.(co\.)?[a-z]{2,}$/i, "");
  const bare = bareHost ? bareHost[0].toUpperCase() + bareHost.slice(1) : "";
  const name = read?.brand_name || (read?.store ? "Your app" : bare) || "Your app";
  const href = joinHref(read, asked, question);

  return (
    <div className="relative mx-auto max-w-[560px] text-center">
      <h1
        ref={headingRef}
        tabIndex={-1}
        className="serif bd-rise -mx-10 text-balance text-[32px] leading-tight text-[var(--bd-ink)] outline-none sm:-mx-24 sm:text-[38px]"
      >
        {phase === "reading" ? "Reading your app" : phase === "done" ? "Here’s what we read" : "We couldn’t open that link"}
      </h1>

      <div className="mt-7">
        <RunRing
          label={initials(name)}
          progress={null}
          busy={phase === "reading"}
          failed={phase === "error"}
          timer={
            phase === "reading"
              ? `${clock(elapsed)} · usually a few seconds`
              : phase === "done"
                ? read?.store
                  ? "Store link"
                  : `Read in ${Math.max(1, Math.round(elapsed))} sec`
                : "Stopped"
          }
        />
      </div>

      <p className="bd-rise mt-6 text-[19px] font-semibold text-[var(--bd-ink)]">{name}</p>
      {phase === "done" && read?.description ? (
        <>
          <p className="bd-rise mx-auto mt-2 line-clamp-2 max-w-[440px] text-[14.5px] leading-relaxed text-[var(--bd-muted)]">{read.description}</p>
          <button
            ref={moreBtn}
            type="button"
            onClick={() => setMore(true)}
            className="mt-2 inline-flex items-center gap-0.5 text-[13px] font-medium text-[var(--bd-text)] hover:underline"
          >
            Read more <ChevronRight className="h-3.5 w-3.5" aria-hidden />
          </button>
        </>
      ) : phase === "done" && read?.store ? (
        <p className="mx-auto mt-2 max-w-[420px] text-balance text-[14.5px] text-[var(--bd-muted)]">
          Store pages can&rsquo;t be read here yet. Continue, and the sign-up takes the link as it is.
        </p>
      ) : phase === "done" ? (
        <p className="mx-auto mt-2 max-w-[420px] text-balance text-[14.5px] text-[var(--bd-muted)]">
          Read {where}. We couldn&rsquo;t find a description there, so you&rsquo;ll confirm the details in the sign-up.
        </p>
      ) : null}

      <div className="mt-8">{steps(href)}</div>

      {phase === "done" ? (
        <>
          <a
            href={href}
            className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-full bg-[#111] py-3.5 text-[15px] font-medium text-white sm:hidden"
          >
            Continue <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
          <p className="mx-auto mt-4 max-w-[440px] text-balance text-[12.5px] text-[var(--bd-muted)]">
            Next: a short sign-up, eight quick steps. A founder replies by email within 48 hours with what&rsquo;s already winning in
            your category.
          </p>
        </>
      ) : null}
      {phase === "error" ? (
        <p className="mt-4 text-[13px] text-[var(--bd-muted)]">
          Check the link, or{" "}
          <a href={BRAND_JOIN_HREF} className="text-[var(--bd-ink)] underline underline-offset-4">
            start the sign-up without it
          </a>
          .
        </p>
      ) : null}
      <button type="button" onClick={onReset} className="mt-3 text-[13px] text-[var(--bd-muted)] underline-offset-4 hover:underline">
        {phase === "error" ? "Try another link" : "Start over"}
      </button>

      {read && phase === "done" && read.description ? (
        <ReadDialog
          open={more}
          onClose={() => {
            setMore(false);
            moreBtn.current?.focus();
          }}
          name={name}
          read={read}
          where={where}
        />
      ) : null}
    </div>
  );
}

/** One sentence for screen readers per phase, in a region that is always on the page. */
export function RunAnnouncer({ phase, read, asked }: { phase: Phase; read: Read | null; asked: string }) {
  const where = hostOf(read?.website ?? asked);
  const text =
    phase === "reading"
      ? `Reading ${where}`
      : phase === "done"
        ? `Read ${read?.brand_name || where}. Continue to the sign-up when you're ready.`
        : phase === "error"
          ? "Couldn't open that link."
          : "";
  return (
    <p role="status" className="sr-only">
      {text}
    </p>
  );
}
