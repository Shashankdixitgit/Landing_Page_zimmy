"use client";

import { useEffect, useState } from "react";
import { Check, RotateCcw, Target, Search, ScanSearch, Send, BarChart3 } from "lucide-react";
import Reveal from "./Reveal";
import { OutlineButton, PrimaryButton, SplitHead, DEMO_HREF } from "./ui";

const STAGES = [
  {
    n: "01",
    title: "Define",
    time: "Day 1",
    body: "Your product, your audience, and the moment someone watching “gets it”. Then the niche and market to study.",
    icon: Target,
  },
  {
    n: "02",
    title: "Research",
    time: "Days 1–3",
    body: "Zimmy finds outlier videos in that niche, market by market.",
    icon: Search,
  },
  {
    n: "03",
    title: "Decode and plan",
    time: "Days 2–4",
    body: "Why each video worked, checked by a strategist. Then a ranked board of what to test.",
    icon: ScanSearch,
  },
  {
    n: "04",
    title: "Test",
    time: "Week 2",
    body: "AI videos and creator videos go out on TikTok, Reels and Shorts.",
    icon: Send,
  },
  {
    n: "05",
    title: "Read and decide",
    time: "Every week",
    body: "Results per platform. Double down, remake with real creators, or drop it, within your budget.",
    icon: BarChart3,
  },
];

/** A small product view for each stage. Illustrative. */
function StageView({ i }: { i: number }) {
  if (i === 0)
    return (
      <div className="space-y-2.5 text-[13px]">
        {[
          ["Product", "Habit-tracking app"],
          ["Audience", "Students and young professionals"],
          ["Aha moment", "Seeing a 30-day streak fill up"],
          ["Market", "🇮🇳 India · English and Hindi"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 rounded-xl bg-surface px-4 py-3">
            <span className="text-muted">{k}</span>
            <span className="text-right font-medium text-ink">{v}</span>
          </div>
        ))}
      </div>
    );
  if (i === 1)
    return (
      <div className="space-y-2">
        {[
          ["🇮🇳 India", 18, "92%"],
          ["🇪🇺 Europe", 11, "64%"],
          ["🇺🇸 US & UK", 14, "78%"],
        ].map(([m, n, w]) => (
          <div key={m as string} className="rounded-xl bg-surface px-4 py-3">
            <div className="flex justify-between text-[13px]">
              <span className="font-medium text-ink">{m}</span>
              <span className="text-muted">{n} outliers found</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-soft">
              <div className="h-full rounded-full bg-accent" style={{ width: w as string }} />
            </div>
          </div>
        ))}
      </div>
    );
  if (i === 2)
    return (
      <div className="rounded-xl bg-surface p-4 text-[13px]">
        <p className="text-[12px] text-muted">Test board</p>
        <ol className="mt-3 space-y-2">
          {["New hook, same video", "Same hook, outdoor setting", "Shorter cut, 12 seconds"].map((t, k) => (
            <li key={t} className="flex items-center gap-3">
              <span className="grid h-5 w-5 place-items-center rounded-full bg-sky text-[11px] font-semibold text-[#235a80]">{k + 1}</span>
              <span className="text-ink">{t}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 flex items-center gap-2 border-t border-line pt-3 text-[12px] text-accent">
          <Check className="h-3.5 w-3.5" /> Reasoning checked by a strategist
        </p>
      </div>
    );
  if (i === 3)
    return (
      <div className="grid grid-cols-3 gap-2 text-center text-[12px]">
        {["TikTok", "Reels", "Shorts"].map((p, k) => (
          <div key={p} className="rounded-xl bg-surface px-2 py-4">
            <div
              className="mx-auto aspect-[9/16] w-12 rounded-md"
              style={{ background: ["linear-gradient(160deg,#4cc9f0,#3a0ca3)", "linear-gradient(160deg,#ffb703,#fb5607)", "linear-gradient(160deg,#ff99c8,#a05195)"][k] }}
            />
            <p className="mt-2 font-medium text-ink">{p}</p>
            <p className="text-muted">Scheduled</p>
          </div>
        ))}
      </div>
    );
  return (
    <div className="space-y-2 text-[13px]">
      {[
        ["TikTok", "Weak opening", "Drop", "bg-soft text-muted"],
        ["Reels", "Strong watch-through", "Remake with a creator", "bg-mint text-accent"],
        ["Shorts", "Too early to tell", "Keep testing", "bg-sky text-[#235a80]"],
      ].map(([p, r, d, c]) => (
        <div key={p} className="flex items-center justify-between gap-3 rounded-xl bg-surface px-4 py-3">
          <div>
            <p className="font-medium text-ink">{p}</p>
            <p className="text-[12px] text-muted">{r}</p>
          </div>
          <span className={`shrink-0 rounded-md px-2 py-0.5 text-[11.5px] font-medium ${c}`}>{d}</span>
        </div>
      ))}
    </div>
  );
}

const YOU = ["Set the product, market and budget", "Pick which tests to run", "Approve every creator and script", "Decide what gets ad spend"];
const ZIMMY = ["Find and decode outlier videos", "Rank the tests and write the briefs", "Find, contact and agree terms with creators", "Track clicks for every creator link"];

export default function Flow() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance through the stages until the visitor picks one.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setActive((a) => (a + 1) % STAGES.length), 5000);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section id="how" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                A loop,
                <br />
                not a lucky guess.
              </>
            }
            sub="Every round teaches the next one. You make the calls at each checkpoint. Zimmy does the work in between."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="grid gap-4 rounded-[28px] border border-line bg-surface p-3 sm:p-4 lg:grid-cols-[1fr_1.05fr]">
            {/* accordion */}
            <ol className="divide-y divide-line">
              {STAGES.map((s, i) => {
                const open = i === active;
                const Icon = s.icon;
                return (
                  <li key={s.n}>
                    <button
                      onClick={() => {
                        setActive(i);
                        setPaused(true);
                      }}
                      aria-expanded={open}
                      className="flex w-full items-center gap-4 px-3 py-4 text-left sm:px-4"
                    >
                      <span className={`text-[13px] font-medium ${open ? "text-accent" : "text-faint"}`}>{s.n}</span>
                      <span className={`flex-1 text-[19px] font-medium tracking-[-0.015em] ${open ? "text-ink" : "text-ink/55"}`}>
                        {s.title}
                      </span>
                      <span className="rounded-md bg-sky px-2 py-0.5 text-[11.5px] font-medium text-[#235a80]">{s.time}</span>
                    </button>
                    <div
                      className={`grid transition-all duration-500 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                    >
                      <div className="overflow-hidden">
                        <div className="px-3 pb-5 sm:px-4 sm:pl-[3.1rem]">
                          <p className="flex items-start gap-2 text-[14.5px] leading-relaxed text-muted">
                            <Icon className="mt-1 h-4 w-4 shrink-0 text-accent" strokeWidth={1.8} />
                            {s.body}
                          </p>
                          {i === STAGES.length - 1 ? (
                            <p className="mt-3 inline-flex items-center gap-1.5 rounded-md bg-mint px-2 py-1 text-[12px] font-medium text-accent">
                              <RotateCcw className="h-3.5 w-3.5" /> Back to 03 with what you learned
                            </p>
                          ) : null}
                          {/* progress bar while auto-advancing */}
                          {!paused ? (
                            <div className="mt-4 h-[3px] overflow-hidden rounded-full bg-soft">
                              <div key={active} className="story-bar h-full rounded-full bg-accent [animation-duration:5s]" />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            {/* stage view */}
            <div className="flex flex-col justify-center rounded-[22px] bg-sky p-5 sm:p-8">
              <div key={active} className="pop">
                <p className="mb-4 text-[12.5px] text-[#4b6878]">
                  Stage {STAGES[active].n} · {STAGES[active].title}
                </p>
                <StageView i={active} />
              </div>
              <p className="mt-6 text-[12px] text-[#4b6878]">Illustrative example</p>
            </div>
          </div>
          <p className="mt-3 text-center text-[12.5px] text-muted">
            Timings are typical for a first round and depend on your niche.
          </p>
        </Reveal>

        <Reveal stagger={0.1} className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="flex flex-col rounded-[22px] border border-[#cfe2ef] bg-[#eef6fb] p-7 sm:p-8">
            <p className="text-[12.5px] text-muted">Your part</p>
            <h3 className="display mt-3 text-[30px] text-ink">Decide. Approve.</h3>
            <p className="mt-2 text-[14.5px] text-muted">A few minutes at each checkpoint.</p>
            <ul className="mt-6 space-y-3">
              {YOU.map((t) => (
                <li key={t} className="flex items-center gap-3 text-[14px] text-ink/85">
                  <Check className="h-4 w-4 text-[#2e6f9e]" strokeWidth={2} /> {t}
                </li>
              ))}
            </ul>
            <OutlineButton href="#faq" wide className="mt-8">
              Read the FAQ
            </OutlineButton>
          </div>
          <div className="flex flex-col rounded-[22px] border border-[#d5ecd0] bg-[#f5fbf3] p-7 sm:p-8">
            <p className="text-[12.5px] text-accent">Zimmy&rsquo;s part</p>
            <h3 className="display mt-3 text-[30px] text-ink">Everything in between.</h3>
            <p className="mt-2 text-[14.5px] text-muted">Research, briefs, creators and tracking.</p>
            <ul className="mt-6 space-y-3">
              {ZIMMY.map((t) => (
                <li key={t} className="flex items-center gap-3 text-[14px] text-ink/85">
                  <Check className="h-4 w-4 text-accent" strokeWidth={2} /> {t}
                </li>
              ))}
            </ul>
            <PrimaryButton href={DEMO_HREF} wide className="mt-8" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
