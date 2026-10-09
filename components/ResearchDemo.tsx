"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Search, Sparkle } from "lucide-react";
import Reveal from "./Reveal";
import OutlierCard, { type Outlier } from "./OutlierCard";
import { SplitHead } from "./ui";

type Market = {
  id: string;
  flag: string;
  label: string;
  language: string;
  board: Outlier[];
};

// Illustrative boards per market. Handles, multiples and reasons are made up.
const MARKETS: Market[] = [
  {
    id: "in",
    flag: "🇮🇳",
    label: "India",
    language: "English and Hindi",
    board: [
      {
        handle: "@dailyrituals.in",
        multiple: "8.4× usual",
        why: "Shows the streak screen in the first second. The payoff is visible before anyone reads a word.",
        chips: ["Hook: before/after", "Hindi + English"],
        scene: ["#ffb703", "#fb5607"],
      },
      {
        handle: "@studywithriya",
        multiple: "5.1× usual",
        why: "Opens on a question students already ask. The app answers it on screen.",
        chips: ["Hook: question", "Talking head"],
        scene: ["#ff99c8", "#a05195"],
      },
      {
        handle: "@the30dayguy",
        multiple: "3.7× usual",
        why: "Day-by-day sequence keeps people watching to see day 30.",
        chips: ["Format: diary", "Series"],
        scene: ["#90e0a8", "#2d6a4f"],
      },
    ],
  },
  {
    id: "eu",
    flag: "🇪🇺",
    label: "Europe",
    language: "German, French and English",
    board: [
      {
        handle: "@morgenroutine.lena",
        multiple: "7.2× usual",
        why: "Quiet, unhurried morning shot. The habit check-in appears as part of the routine, not as an ad.",
        chips: ["Format: routine", "German"],
        scene: ["#a9d3ff", "#3a0ca3"],
      },
      {
        handle: "@petitpas.camille",
        multiple: "4.6× usual",
        why: "Starts with a small failure everyone recognises, then shows one tiny fix.",
        chips: ["Hook: relatable fail", "French"],
        scene: ["#ff7a59", "#7b2cbf"],
      },
      {
        handle: "@buildhabits.eu",
        multiple: "3.2× usual",
        why: "Three-second screen recording with big captions. Works with the sound off.",
        chips: ["Format: screen demo", "Captions"],
        scene: ["#c8f560", "#3a7d44"],
      },
    ],
  },
  {
    id: "us",
    flag: "🇺🇸",
    label: "US & UK",
    language: "English",
    board: [
      {
        handle: "@jordanresets",
        multiple: "9.1× usual",
        why: "Says the uncomfortable number out loud, then shows how the app made it smaller.",
        chips: ["Hook: confession", "Talking head"],
        scene: ["#4cc9f0", "#3a0ca3"],
      },
      {
        handle: "@tinywins.uk",
        multiple: "5.6× usual",
        why: "Green-screen over the app's progress chart. The proof is the background.",
        chips: ["Format: green screen", "UK"],
        scene: ["#ffb703", "#7b2cbf"],
      },
      {
        handle: "@habitlab.sam",
        multiple: "3.9× usual",
        why: "Ranks five habit apps fast. Ends on the one he still uses.",
        chips: ["Format: ranking", "Comparison"],
        scene: ["#ff99c8", "#fb5607"],
      },
    ],
  },
];

export default function ResearchDemo() {
  const [marketId, setMarketId] = useState("in");
  const [found, setFound] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const market = MARKETS.find((m) => m.id === marketId) ?? MARKETS[0];

  // Fill the board on its own once the demo scrolls into view, so it never sits empty.
  useEffect(() => {
    const el = panel.current;
    if (!el) return;
    let t: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          t = setTimeout(() => setFound(true), 900);
          io.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <section id="research" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                Research first.
                <br />
                Then make videos.
              </>
            }
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div ref={panel} className="rounded-[28px] bg-sky p-4 sm:p-10">
            {/* market picker */}
            <div className="mb-5 flex flex-wrap items-center justify-center gap-2" role="tablist" aria-label="Pick a market">
              {MARKETS.map((m) => (
                <button
                  key={m.id}
                  role="tab"
                  aria-selected={m.id === marketId}
                  onClick={() => setMarketId(m.id)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors ${
                    m.id === marketId ? "bg-ink text-white" : "bg-surface text-ink hover:bg-white/70"
                  }`}
                >
                  <span aria-hidden>{m.flag}</span> {m.label}
                </button>
              ))}
            </div>

            <div className="grid gap-4 md:grid-cols-[1fr_1.15fr]">
              {/* brief */}
              <div className="flex flex-col rounded-[20px] border border-white bg-surface lift">
                <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                  <span className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#d4dfe6]" />
                    <span className="h-2 w-2 rounded-full bg-[#d4dfe6]" />
                    <span className="h-2 w-2 rounded-full bg-[#d4dfe6]" />
                  </span>
                  <span className="text-[12px] text-muted">Brief</span>
                  <span className="w-8" />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="text-[12.5px] text-muted">Habit-tracking app, launching in {market.label}</p>
                  <h3 className="display mt-3 text-[26px] text-ink sm:text-[30px]">
                    Find what&rsquo;s working
                    <br />
                    for people building habits.
                  </h3>
                  <p className="mt-5 text-[14.5px] leading-[1.8] text-ink/80">
                    <mark className="rounded bg-highlight px-1 text-ink">Show me outliers from the last 30 days.</mark>
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                    <span />
                    <button
                      onClick={() => setFound(true)}
                      className="inline-flex shrink-0 items-center gap-2.5 rounded-full bg-accent px-5 py-3 text-[13.5px] font-medium text-white transition-colors hover:bg-accent-hover"
                    >
                      {found ? "Board ready" : "Find outliers"}
                      {found ? <Check className="h-4 w-4" /> : <Search className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* board */}
              <div className="flex flex-col rounded-[20px] border border-white bg-surface/80 p-4 sm:p-5">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[13.5px] font-medium text-ink">
                    <span className="grid h-6 w-6 place-items-center rounded-md bg-zimmy text-white">
                      <Sparkle className="h-3 w-3" fill="currentColor" />
                    </span>
                    Outlier board · {market.flag} {market.label}
                  </span>
                  <span className="text-[12px] text-muted">{found ? market.board.length : 0} videos</span>
                </div>
                <p className="mt-1.5 text-[12px] text-muted">
                  Outlier: a video doing far better than that account usually does.
                </p>

                {found ? (
                  <ul key={market.id} className="mt-4 space-y-2.5">
                    {market.board.map((o, i) => (
                      <OutlierCard key={o.handle} o={o} delay={i * 0.09} />
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sky text-[#2e6f9e] lift">
                      <Search className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <p className="display mt-5 text-[24px] text-[#2a4d5c]">
                      Winning videos
                      <br />
                      will appear here.
                    </p>
                    <p className="mt-2 text-[13px] text-muted">Press &ldquo;Find outliers&rdquo; to try it.</p>
                  </div>
                )}
              </div>
            </div>
            <p className="mt-5 text-center text-[12.5px] text-[#4b6878]">
              Illustrative example
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
