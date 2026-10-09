"use client";

import { useRef } from "react";
import { Radar, ScanSearch, PenLine, Handshake, Clapperboard, Activity, ChevronLeft, ChevronRight, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";

type Item = {
  icon: typeof Radar;
  label: string;
  head: string;
  body: string;
  status: "Live" | "Coming soon";
  view: React.ReactNode;
};

/* Small illustrative vignettes, one per capability. */
const Bars = () => (
  <div className="flex h-16 items-end gap-1.5">
    {[22, 30, 26, 34, 28, 92, 31].map((h, i) => (
      <div key={i} className={`flex-1 rounded-t-[4px] ${i === 5 ? "bg-accent-bright" : "bg-white/15"}`} style={{ height: `${h}%` }} />
    ))}
  </div>
);

const ITEMS: Item[] = [
  {
    icon: Radar,
    label: "Research",
    head: "Outliers, not raw views.",
    body: "Finds videos beating their account's usual views in your niche and market.",
    status: "Live",
    view: (
      <div>
        <Bars />
        <p className="mt-2 text-[11px] text-white/50">One video vs the account&rsquo;s usual · 6.2×</p>
      </div>
    ),
  },
  {
    icon: ScanSearch,
    label: "Breakdown",
    head: "Why it worked, checked.",
    body: "Breaks down hook, question, sequence and payoff. A strategist confirms it.",
    status: "Live",
    view: (
      <div className="space-y-1 text-[11.5px]">
        {["Hook", "Question", "Sequence", "Payoff"].map((k, i) => (
          <div key={k} className="flex items-center justify-between rounded-md bg-white/[0.06] px-2.5 py-[3px]">
            <span className="text-white/70">{k}</span>
            <span className={i < 3 ? "text-accent-bright" : "text-white/40"}>{i < 3 ? "✓" : "…"}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: PenLine,
    label: "Briefs",
    head: "Ready to shoot.",
    body: "Hook options, script, timings and product placement for your brand.",
    status: "Live",
    view: (
      <div className="space-y-1.5 font-mono text-[11px] text-white/70">
        <p><span className="text-white/40">0:00</span> Hook: the streak screen</p>
        <p><span className="text-white/40">0:03</span> Setup: day one</p>
        <p><span className="text-white/40">0:08</span> Payoff: day thirty</p>
        <p><span className="text-white/40">0:13</span> Call to action</p>
      </div>
    ),
  },
  {
    icon: Handshake,
    label: "Creators",
    head: "Found and signed.",
    body: "Finds creators by audience fit, contacts them and agrees terms within your limits.",
    status: "Live",
    view: (
      <div className="space-y-1.5 text-[11.5px]">
        <p className="max-w-[85%] rounded-xl rounded-bl-sm bg-white/[0.08] px-2.5 py-1.5 text-white/80">My rate is $1,400.</p>
        <p className="ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-accent-bright px-2.5 py-1.5 text-[#05130d]">$1,100 with 30 days of usage?</p>
        <p className="max-w-[85%] rounded-xl rounded-bl-sm bg-white/[0.08] px-2.5 py-1.5 text-white/80">Deal.</p>
      </div>
    ),
  },
  {
    icon: Clapperboard,
    label: "AI video",
    head: "Cheap first tests.",
    body: "Short AI videos built on your real product footage.",
    status: "Coming soon",
    view: (
      <div className="flex gap-2">
        {["#4cc9f0,#3a0ca3", "#ffb703,#fb5607", "#90e0a8,#2d6a4f"].map((g) => (
          <div key={g} className="aspect-[9/16] flex-1 rounded-md" style={{ background: `linear-gradient(160deg,${g})` }} />
        ))}
      </div>
    ),
  },
  {
    icon: Activity,
    label: "Tracking",
    head: "Every link counted.",
    body: "A tracking link per creator, and views per platform. Sales tracking next.",
    status: "Live",
    view: (
      <div className="space-y-1.5 text-[11.5px]">
        {[["zimmy.link/noor", "412 clicks"], ["zimmy.link/jay", "268 clicks"], ["zimmy.link/mira", "190 clicks"]].map(([l, c]) => (
          <div key={l} className="flex justify-between rounded-md bg-white/[0.06] px-2.5 py-1.5">
            <span className="text-white/70">{l}</span>
            <span className="text-white">{c}</span>
          </div>
        ))}
      </div>
    ),
  },
];

export default function Technology() {
  const track = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => track.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

  return (
    <section id="tech" className="px-2 py-10 sm:px-3">
      <div className="overflow-hidden rounded-[28px] bg-[#13201c] py-16 text-white sm:rounded-[36px] sm:py-24">
        <Reveal className="mx-auto max-w-[1100px] px-5">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
            <h2 className="display max-w-2xl text-[38px] sm:text-[52px]">
              AI does the work.
              <br />
              People check the calls.
            </h2>
            <div className="max-w-[23rem] lg:pb-2">
              <p className="text-[15.5px] leading-relaxed text-white/65">
                Zimmy is software and a service. Agents handle the repetitive work. A strategist
                reviews every judgement call, and you approve what goes out.
              </p>
              <div className="mt-5 flex gap-2">
                <button onClick={() => scroll(-1)} aria-label="Previous" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 hover:bg-white/10">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={() => scroll(1)} aria-label="Next" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 hover:bg-white/10">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </Reveal>

        <div
          ref={track}
          className="mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-5 px-5 pb-2 [scrollbar-width:none] lg:scroll-px-[calc((100vw-1100px)/2)] lg:px-[calc((100vw-1100px)/2)]"
        >
          {ITEMS.map((it) => {
            const Icon = it.icon;
            return (
              <article key={it.label} className="flex w-[280px] shrink-0 snap-start flex-col rounded-[20px] border border-white/10 bg-white/[0.04] p-5 sm:w-[300px]">
                <div className="h-[118px] rounded-[14px] bg-black/25 p-3.5">{it.view}</div>
                <div className="mt-5 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.12em] text-white/50">
                    <Icon className="h-3.5 w-3.5 text-accent-bright" /> {it.label}
                  </span>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[11px] font-medium ${
                      it.status === "Live" ? "bg-accent-bright text-[#05130d]" : "bg-white/15 text-white/80"
                    }`}
                  >
                    {it.status}
                  </span>
                </div>
                <h3 className="mt-3 text-[19px] font-medium tracking-[-0.015em]">{it.head}</h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-white/60">{it.body}</p>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-10 flex max-w-[1100px] flex-col gap-2 px-5 text-[13px] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-[14px] text-white/85">
            <ShieldCheck className="h-4 w-4 text-accent-bright" /> Nothing goes out in your name without your sign-off.
          </p>
          <p>Illustrative examples</p>
        </div>
      </div>
    </section>
  );
}
