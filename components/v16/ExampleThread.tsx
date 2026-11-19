"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUp, Check, Paperclip } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { InstagramIcon, MetaIcon, ShortsIcon, TikTokIcon } from "../v15/Brands";
import { NISHANT, REELS, ReelCard, reelCover, type Reel } from "./reels";
import { LogoMark } from "../Logo";

/**
 * The chat box at work: it types an ask, shows the steps, then the answer, and
 * moves to the next ask in the same thread. Four asks, looping, so a visitor sees
 * a marketing week run from one box without clicking anything.
 *
 * A scripted example, labelled as one on the page. Each answer carries the
 * status of that part of HitRate today (the same scenes and statuses as /v10).
 */

type Reply = "winners" | "calendar" | "video" | "results";
type Status = "Live" | "Early access" | "Coming soon";
type Scene = { prompt: string; steps: string[]; reply: Reply; status: Status };

const SCENES: Scene[] = [
  {
    prompt: "What video is winning for my career app in India?",
    steps: ["Reading your app store page and reviews", "Finding the apps your users also use", "Pulling their videos and ads from the last 60 days"],
    reply: "winners",
    status: "Live",
  },
  {
    prompt: "Plan next week from those winners.",
    steps: ["Picking the three formats that repeat", "Writing scripts from them", "Laying out the week"],
    reply: "calendar",
    status: "Live",
  },
  {
    prompt: "Make Tuesday's as an AI creator video and post it.",
    steps: ["Casting an AI creator", "Cutting the 15-second version", "Waiting for your approval"],
    reply: "video",
    status: "Early access",
  },
  {
    prompt: "Which test actually brought users?",
    steps: ["Reading installs per format", "Comparing cost per install"],
    reply: "results",
    status: "Coming soon",
  },
];

const CHIPS = ["Find what's winning", "Plan my week", "Make a test video", "What brought users?"];

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start gap-0.5 rounded-[12px] border border-[var(--bd-line)] bg-white px-3.5 py-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <p className="px-1 text-[12px] text-[var(--bd-muted)]">{children}</p>;
}

function Answer({ reply }: { reply: Reply }) {
  if (reply === "winners") {
    const rows: [Reel, string][] = [
      [REELS.jobs, "Tier list"],
      [REELS.salary, "Salary story"],
      [REELS.vlog, "Day in the life"],
    ];
    return (
      <div className="space-y-1.5">
        <Label>Formats winning for the creators your users watch, with a real example of each</Label>
        {rows.map(([r, f]) => (
          <Row key={f}>
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="relative h-10 w-[23px] shrink-0 overflow-hidden rounded-[6px] bg-[#dfe3e7]">
                <Image src={reelCover(r)} alt="" fill sizes="24px" className="object-cover" />
              </span>
              <span className="min-w-0">
                <span className="block text-[13.5px] font-medium text-[var(--bd-ink)] sm:truncate">{f}</span>
                <span className="flex items-center gap-1 text-[11.5px] text-[var(--bd-muted)]">
                  <InstagramIcon className="h-3 w-3" /> {NISHANT.handle}
                </span>
              </span>
            </span>
            <span className="shrink-0 text-[12px] text-[var(--bd-muted)]">
              {r.views} views · {r.times} usual
            </span>
          </Row>
        ))}
      </div>
    );
  }
  if (reply === "calendar") {
    const days: [string, string, ReactNode][] = [
      ["Mon", "Tier list · job apps, worst to best", <InstagramIcon key="ig" className="h-4 w-4" />],
      ["Tue", "Salary story · the offer that changed", <ShortsIcon key="yt" className="h-4 w-4" />],
      ["Thu", "Day in the life · a recruiter's morning", <TikTokIcon key="tt" className="h-4 w-4" />],
      ["Sat", "Tier list · free certificates that count", <InstagramIcon key="ig2" className="h-4 w-4" />],
    ];
    return (
      <div className="space-y-1.5">
        <Label>Next week, with the script attached to each</Label>
        {days.map(([d, t, icon]) => (
          <Row key={d}>
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="grid h-5 w-9 shrink-0 place-items-center rounded-md bg-[var(--bd-soft)] text-[10.5px] font-semibold text-[var(--bd-muted)]">{d}</span>
              <span className="line-clamp-2 text-[13.5px] text-[var(--bd-ink)]">{t}</span>
            </span>
            <span className="shrink-0">{icon}</span>
          </Row>
        ))}
      </div>
    );
  }
  if (reply === "video") {
    const beats: [string, string][] = [
      ["0:00", "\u201cI almost took the first offer I got.\u201d"],
      ["0:04", "Pathly on screen, the salary compare"],
      ["0:11", "\u201cThe second offer was 40% more.\u201d"],
    ];
    return (
      <div className="flex gap-3">
        <div className="shrink-0">
          <ReelCard reel={REELS.salary} className="w-[74px]" />
          <p className="mt-1 w-[74px] text-[10px] leading-tight text-[var(--bd-muted)]">Starts from this winner</p>
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          {beats.map(([t, l]) => (
            <div key={t} className="rounded-[12px] border border-[var(--bd-line)] bg-white px-3 py-2">
              <p className="text-[10.5px] text-[var(--bd-faint)]">{t}</p>
              <p className="line-clamp-2 text-[12.5px] text-[var(--bd-ink)]">{l}</p>
            </div>
          ))}
          <div className="flex gap-1.5 pt-0.5">
            <span className="whitespace-nowrap rounded-full bg-[#111] px-3 py-1 text-[11.5px] font-medium text-white">Approve</span>
            <span className="whitespace-nowrap rounded-full border border-[var(--bd-line)] bg-white px-3 py-1 text-[11.5px] font-medium text-[var(--bd-muted)]">Redo the hook</span>
          </div>
        </div>
      </div>
    );
  }
  const rows: [string, string, string, string][] = [
    ["Tier list", "212 installs", "$1.40 each", "Scale it"],
    ["Salary story", "38 installs", "$6.10 each", "Keep testing"],
    ["Day in the life", "4 installs", "\u2014", "Drop"],
  ];
  return (
    <div className="space-y-1.5">
      <Label>Three weeks of tests, read on installs</Label>
      {rows.map(([f, i, c, v]) => (
        <Row key={f}>
          <span className="min-w-0">
            <span className="block truncate text-[13.5px] font-medium text-[var(--bd-ink)]">{f}</span>
            <span className="text-[11.5px] text-[var(--bd-muted)]">
              {i} · {c}
            </span>
          </span>
          <span
            className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium ${
              v === "Scale it" ? "bg-[#111] text-white" : "bg-[var(--bd-soft)] text-[var(--bd-muted)]"
            }`}
          >
            {v === "Scale it" ? <MetaIcon className="h-3 w-3" /> : null}
            {v}
          </span>
        </Row>
      ))}
    </div>
  );
}

export function StatusChip({ status }: { status: Status | string }) {
  const live = status.startsWith("Live");
  return (
    <span
      className={`shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ${
        live ? "bg-[#e3f5ea] text-[#17784b]" : "bg-[var(--bd-soft)] text-[var(--bd-muted)]"
      }`}
    >
      {status}
    </span>
  );
}

/** Reduced motion, read as a subscription so nothing is set from inside an effect. */
function useStill() {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

export default function ExampleThread() {
  const [si, setSi] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"type" | "think" | "reply">("type");
  const [shown, setShown] = useState(0);
  const still = useStill();
  const [visible, setVisible] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  // Plays only while on screen.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.25 });
    if (root.current) io.observe(root.current);
    return () => io.disconnect();
  }, []);

  // Less motion asked for: the first ask, fully answered, still.
  const scene = still ? SCENES[0] : SCENES[si];
  const text = still ? SCENES[0].prompt : typed;
  const steps = still ? scene.steps.length : shown;
  const at = still ? "reply" : phase;

  useEffect(() => {
    if (still || !visible) return;
    const { prompt, steps: list } = SCENES[si];
    let hand: ReturnType<typeof setTimeout> | undefined;
    if (phase === "type") {
      let n = 0;
      const id = setInterval(() => {
        n += 1;
        setTyped(prompt.slice(0, n));
        if (n >= prompt.length) {
          clearInterval(id);
          hand = setTimeout(() => setPhase("think"), 420);
        }
      }, 26);
      return () => {
        clearInterval(id);
        clearTimeout(hand);
      };
    }
    if (phase === "think") {
      let n = 0;
      const id = setInterval(() => {
        n += 1;
        setShown(n);
        if (n >= list.length) {
          clearInterval(id);
          hand = setTimeout(() => setPhase("reply"), 520);
        }
      }, 620);
      return () => {
        clearInterval(id);
        clearTimeout(hand);
      };
    }
    const id = setTimeout(() => {
      setSi((v) => (v + 1) % SCENES.length);
      setTyped("");
      setShown(0);
      setPhase("type");
    }, 4200);
    return () => clearTimeout(id);
  }, [phase, si, still, visible]);

  return (
    <div ref={root} className="bd-card rounded-[28px] p-2 text-left sm:p-2.5">
      <div className="flex min-h-[520px] flex-col gap-3 rounded-[22px] bg-[#f7f8f9] p-4 sm:min-h-[470px] sm:p-5" aria-hidden>
        <div className="flex justify-end">
          <p className="max-w-[86%] rounded-[18px] rounded-br-md bg-[#111] px-4 py-2.5 text-[14px] font-medium text-white">
            {text}
            {at === "type" ? <span className="bd-caret ml-px text-white/60">|</span> : null}
          </p>
        </div>

        {steps > 0 ? (
          <div className="flex gap-2.5">
            <LogoMark className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="min-w-0 flex-1 space-y-1.5">
              {scene.steps.slice(0, steps).map((s, i) => (
                <p key={s} className="bd-rise flex items-center gap-2 text-[13px] text-[var(--bd-muted)]">
                  {at === "reply" || i < steps - 1 ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-[var(--bd-green)]" strokeWidth={3} />
                  ) : (
                    <span className="bd-dot h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--bd-green)]" />
                  )}
                  {s}
                </p>
              ))}
            </div>
          </div>
        ) : null}

        {at === "reply" ? (
          <div className="bd-rise mt-auto rounded-[18px] sm:border sm:border-[var(--bd-line)] sm:bg-[#fbfbfc] sm:p-3">
            <div className="mb-2.5 flex items-center justify-between gap-3 px-1">
              <span className="text-[12px] font-semibold text-[var(--bd-ink)]">HitRate</span>
              <StatusChip status={scene.status} />
            </div>
            <Answer reply={scene.reply} />
          </div>
        ) : null}
      </div>

      <div className="mt-2 flex items-center gap-3 px-3 py-1.5" aria-hidden>
        <Paperclip className="h-4 w-4 shrink-0 text-[var(--bd-faint)]" />
        <span className="flex-1 truncate text-[14.5px] text-[var(--bd-faint)]">Ask the next thing…</span>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#111] text-white">
          <ArrowUp className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-1 flex flex-wrap gap-1.5 px-2 pb-1.5" aria-hidden>
        {CHIPS.map((c, i) => (
          <span
            key={c}
            className={`rounded-full border px-3 py-1 text-[12px] transition-colors duration-500 ${
              i === si && !still ? "border-black/20 bg-white text-[var(--bd-ink)]" : "border-[var(--bd-line)] text-[var(--bd-faint)]"
            }`}
          >
            {c}
          </span>
        ))}
      </div>

      {/* What a screen reader gets instead of the animation */}
      <p className="sr-only">
        An example thread for a made-up career app: ask what video is winning, get the formats that repeat, with real reels
        by @unscripted.nishant; ask for next week&rsquo;s plan, get a calendar for Reels, Shorts and TikTok; ask for an AI
        creator video, get a cut to approve; ask which test brought users, get installs by format.
      </p>
    </div>
  );
}
