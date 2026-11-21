"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { CalendarDays, Clapperboard, MessagesSquare, PenLine, Send, Sparkles, Star, Store, Video } from "lucide-react";
import { StatusChip } from "./ExampleThread";
import { InstagramIcon, PlatformRow } from "../v15/Brands";
import { REELS, ReelCard } from "./reels";

/**
 * "One read, then every job from it", drawn: what the read takes in, the jobs
 * that branch off it, and the approval that every post waits on. A line runs
 * through the three as the section comes into view. Same steps and statuses as
 * /v10's "How it works".
 */

const SOURCES = [
  { Icon: Store, label: "Your store page" },
  { Icon: Star, label: "Your reviews" },
  { Icon: MessagesSquare, label: "Apps your users also watch" },
  { Icon: Video, label: "Their winning videos" },
];

const JOBS = [
  { Icon: PenLine, label: "Scripts" },
  { Icon: CalendarDays, label: "Calendar" },
  { Icon: Clapperboard, label: "Test videos" },
  { Icon: Send, label: "Posting" },
];

function Pill() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#111] px-3.5 py-2 text-[13px] font-medium text-white shadow-[0_8px_20px_-8px_rgb(17_17_17/0.45)]">
      <Sparkles className="h-3.5 w-3.5" aria-hidden />
      One read of your category
    </span>
  );
}

function ReadArt() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      {SOURCES.map(({ Icon, label }, i) => (
        <span
          key={label}
          className="bd-step-in flex w-full max-w-[250px] items-center gap-2 whitespace-nowrap rounded-full border border-[var(--bd-line)] bg-white px-3 py-1.5 text-left text-[12.5px] text-[var(--bd-text)]"
          style={{ "--k": i } as CSSProperties}
        >
          <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--bd-muted)]" aria-hidden />
          <span className="flex-1">{label}</span>
          {i === 3 ? <PlatformRow className="h-3.5 w-3.5" /> : null}
        </span>
      ))}
      <svg viewBox="0 0 20 22" className="h-5 w-4 text-[#b5b8bc]" aria-hidden>
        <path d="M10 1v18M4 13l6 6 6-6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="bd-step-in" style={{ "--k": 4 } as CSSProperties}>
        <Pill />
      </span>
    </div>
  );
}

function JobsArt() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Pill />
      <svg viewBox="0 0 240 64" className="h-[64px] w-full max-w-[240px]" aria-hidden>
        {[30, 90, 150, 210].map((x, i) => (
          <path
            key={x}
            className="bd-branch"
            style={{ "--k": i } as CSSProperties}
            d={`M120 2 C120 34, ${x} 26, ${x} 60`}
            fill="none"
            stroke="#c4c7cb"
            strokeWidth="1.6"
            strokeLinecap="round"
            pathLength={1}
          />
        ))}
      </svg>
      <div className="grid w-full max-w-[280px] grid-cols-4 gap-1">
        {JOBS.map(({ Icon, label }, i) => (
          <span key={label} className="bd-step-in flex flex-col items-center gap-1.5" style={{ "--k": i + 2 } as CSSProperties}>
            <span className="grid h-10 w-10 place-items-center rounded-[12px] bg-white text-[var(--bd-ink)] shadow-[0_1px_2px_rgb(17_17_17/0.06),0_0_0_1px_rgb(17_17_17/0.07)]">
              <Icon className="h-[18px] w-[18px]" aria-hidden />
            </span>
            <span className="whitespace-nowrap text-[11px] text-[var(--bd-muted)]">{label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function YesArt() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="bd-step-in w-full max-w-[284px] rounded-[18px] border border-[var(--bd-line)] bg-white p-3.5 text-left shadow-[0_12px_28px_-18px_rgb(17_17_17/0.3)]" style={{ "--k": 1 } as CSSProperties}>
        <div className="flex gap-3">
          <ReelCard reel={REELS.jobs} className="w-[54px]" play={false} badge={false} />
          <div className="min-w-0">
            <p className="flex items-center gap-1 text-[11px] text-[var(--bd-muted)]">
              <InstagramIcon className="h-3 w-3" /> Reels · Tuesday 6:00 pm
            </p>
            <p className="mt-0.5 text-[13px] font-semibold leading-snug text-[var(--bd-ink)]">Tier list: job apps, worst to best</p>
            <p className="mt-1 text-[11px] text-[var(--bd-muted)]">Waiting for your OK</p>
          </div>
        </div>
        {/* One row: three choices, never wrapping */}
        <div className="mt-3 grid grid-cols-[1fr_1.35fr_0.8fr] gap-1.5">
          <span className="bd-yes whitespace-nowrap rounded-full bg-[#111] py-1.5 text-center text-[11.5px] font-medium text-white">Approve</span>
          <span className="whitespace-nowrap rounded-full border border-[var(--bd-line)] py-1.5 text-center text-[11.5px] font-medium text-[var(--bd-muted)]">
            Another hook
          </span>
          <span className="whitespace-nowrap rounded-full border border-[var(--bd-line)] py-1.5 text-center text-[11.5px] font-medium text-[var(--bd-muted)]">Skip</span>
        </div>
      </div>
    </div>
  );
}

const STEPS = [
  {
    Art: ReadArt,
    title: "It reads your category before it writes a word",
    body: "Your app, your store reviews, the apps your users also watch, and the videos and ads winning for them, country by country.",
    status: "Live today",
  },
  {
    Art: JobsArt,
    title: "Every job runs from that same read",
    body: "Scripts, a calendar, AI-made test videos of the ones you like, posting to the accounts you choose. Each piece is built on what already works.",
    status: "Scripts live · the rest in early access",
  },
  {
    Art: YesArt,
    title: "Nothing goes out without your yes",
    body: "Every script, video and post waits for you. Approve it, ask for another hook, or skip it. Nothing goes out from your accounts until you say yes.",
    status: "Early access",
  },
];

export default function OneRead() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = root.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          node.setAttribute("data-shown", "");
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <section className="bg-[#fafafa] px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[1080px]">
        <div className="text-center">
          <p className="text-[12.5px] font-medium uppercase tracking-[0.12em] text-[var(--bd-faint)]">How it works</p>
          <h2 className="serif mt-3 text-balance text-[34px] leading-tight text-[var(--bd-ink)] sm:text-[44px]">One read, then every job from it</h2>
        </div>

        <div ref={root} className="bd-steps relative mt-14">
          {/* the line through the three steps */}
          <span className="bd-steps-line absolute left-[16.66%] right-[16.66%] top-[15px] hidden h-px bg-[#c4c7cb] lg:block" aria-hidden />
          <ol className="relative grid gap-14 lg:grid-cols-3 lg:gap-6">
            {STEPS.map(({ Art, title, body, status }, i) => (
              <li key={title} className="bd-step mx-auto flex w-full max-w-[440px] flex-col items-center text-center lg:max-w-none" style={{ "--s": i } as CSSProperties}>
                <span className="serif relative z-10 grid h-8 w-8 place-items-center rounded-full bg-[#111] text-[15px] text-white ring-4 ring-[#fafafa]">{i + 1}</span>
                <div className="bd-card mt-6 h-[268px] w-full rounded-[24px] p-5">
                  <Art />
                </div>
                <h3 className="serif mt-6 max-w-[300px] text-balance text-[22px] leading-snug text-[var(--bd-ink)]">{title}</h3>
                <p className="mt-2.5 max-w-[320px] text-[14px] leading-relaxed text-[var(--bd-muted)]">{body}</p>
                <span className="mt-3">
                  <StatusChip status={status} />
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
