"use client";

import { useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { BRAND_JOIN_HREF } from "../ui";

type Read = {
  ok: boolean;
  website?: string;
  brand_name?: string;
  description?: string | null;
  category?: string | null;
  country?: string | null;
};

/**
 * The okara.ai opener: one input, "enter your website", and it actually reads
 * the site. This calls the same /api/brand-lookup the sign-up form uses, shows
 * what came back, then hands the visitor to /brands/join with the site filled in.
 *
 * Doing the read here rather than on the form is the whole point of the page:
 * the first thing you do is type one line and get something back.
 */
export default function WebsiteStart({ size = "lg" }: { size?: "lg" | "sm" }) {
  const [site, setSite] = useState("");
  const [state, setState] = useState<"idle" | "reading" | "done" | "error">("idle");
  const [read, setRead] = useState<Read | null>(null);

  const go = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = site.trim();
    if (!url) return;
    setState("reading");
    setRead(null);
    try {
      const r: Read | null = await fetch(`/api/brand-lookup?url=${encodeURIComponent(url)}`)
        .then((x) => (x.ok ? x.json() : null))
        .catch(() => null);
      if (r?.ok) {
        setRead(r);
        setState("done");
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  // Carry the read along, so the form doesn't fetch the same site a second time.
  const joinHref = (() => {
    const q = new URLSearchParams({ website: read?.website ?? site.trim() });
    if (read?.brand_name) q.set("brand_name", read.brand_name);
    if (read?.category) q.set("category", read.category);
    if (read?.country) q.set("country", read.country);
    return `${BRAND_JOIN_HREF}?${q.toString()}`;
  })();
  const big = size === "lg";

  return (
    <div className={big ? "mx-auto w-full max-w-[440px]" : "mx-auto w-full max-w-[420px]"}>
      <form
        onSubmit={go}
        className="flex items-center gap-2 rounded-xl border border-ok-line bg-ok-card p-1.5 focus-within:border-ok-faint"
      >
        <input
          value={site}
          onChange={(e) => setSite(e.target.value)}
          inputMode="url"
          autoComplete="url"
          aria-label="Your website or app store link"
          placeholder="yourapp.com"
          className="min-w-0 flex-1 bg-transparent px-3 py-2 text-[15px] text-ok-text outline-none placeholder:text-ok-faint"
        />
        <button
          type="submit"
          disabled={state === "reading"}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-[9px] bg-ok-text px-3.5 py-2 text-[14px] font-medium text-ok-bg transition-opacity hover:opacity-90 disabled:opacity-70"
        >
          {state === "reading" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : null}
          Start free
          {state === "reading" ? null : <ArrowRight className="h-3.5 w-3.5" />}
        </button>
      </form>

      <p className="mt-3 text-center text-[13px] text-ok-faint">
        Free to start · no card · app store links work too
      </p>

      {state === "reading" ? (
        <p className="ok-label mt-4 text-center text-ok-faint">Reading your site…</p>
      ) : null}

      {state === "error" ? (
        <p className="mt-4 text-center text-[13px] text-ok-muted">
          Couldn&rsquo;t open that one.{" "}
          <a href={BRAND_JOIN_HREF} className="text-ok-green underline underline-offset-4">
            Start the sign-up instead
          </a>
          .
        </p>
      ) : null}

      {state === "done" && read ? (
        <div className="pop mt-4 rounded-xl border border-ok-line bg-ok-raise p-4 text-left">
          <p className="ok-label text-ok-faint">What HitRate read</p>
          <p className="mt-2 text-[15px] font-medium text-ok-text">{read.brand_name}</p>
          {read.description ? (
            <p className="mt-1 line-clamp-2 text-[13.5px] leading-relaxed text-ok-muted">{read.description}</p>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {[read.category, read.country].filter(Boolean).map((t) => (
              <span key={t as string} className="rounded-md border border-ok-line px-2 py-0.5 text-[11.5px] text-ok-muted">
                {t}
              </span>
            ))}
          </div>
          <a
            href={joinHref}
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-[9px] bg-ok-text px-4 py-2.5 text-[14px] font-medium text-ok-bg transition-opacity hover:opacity-90"
          >
            Now find what&rsquo;s winning for it
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
          <p className="mt-2.5 text-center text-[12px] text-ok-faint">
            Next: a few questions, then your competitors&rsquo; winning videos.
          </p>
        </div>
      ) : null}
    </div>
  );
}
