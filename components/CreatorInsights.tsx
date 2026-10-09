"use client";

import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import CardVideo from "./CardVideo";
import { SplitHead } from "./ui";

/* ---------- 1. Your best posts, against your own median ---------- */

const STATS = [
  { v: "51", l: "posts read" },
  { v: "943", l: "median views" },
  { v: "13", l: "top quarter", tone: "text-accent" },
  { v: "13", l: "bottom quarter", tone: "text-[#b4452f]" },
];

const POSTS = [
  {
    clip: "ben",
    caption: "the real cost of living in a big city",
    views: "819K",
    multiple: "868×",
    why: [
      ["A shared grievance", "A topic people in that city already argue about, so they stop to agree or push back."],
      ["Proof they can check", "A screenshot with a real number made the claim concrete in one glance."],
      ["A status nerve", "No ask, but everyone compared it to their own life, so replies piled up."],
    ],
  },
  {
    clip: "jay",
    caption: "3 apps I actually use every day",
    views: "41K",
    multiple: "43×",
    why: [
      ["A list people save", "Short, useful and easy to come back to, so saves did the work."],
      ["Shown, not told", "Each app appears on screen within the first two seconds."],
      ["One clear payoff", "Ends on the app he'd keep, which gave people a reason to comment."],
    ],
  },
  {
    clip: "mira",
    caption: "day 14 and I'm genuinely shocked",
    views: "18K",
    multiple: "19×",
    why: [
      ["An open loop", "“Shocked” makes people stay to see what changed."],
      ["Before and after", "The proof is visual, so it works with the sound off."],
      ["Part of a series", "Day 14 tells new viewers there is more to catch up on."],
    ],
  },
];

function BestPosts() {
  const [pick, setPick] = useState(0);
  const p = POSTS[pick];
  return (
    <section className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                Know why your
                <br />
                best posts hit.
              </>
            }
            sub="Every post judged against your own median, not someone else's. Then the reason, in plain words."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="rounded-[28px] border border-line bg-surface p-3 sm:p-5">
            {/* stat strip */}
            <div className="grid grid-cols-2 overflow-hidden rounded-[18px] border border-line sm:grid-cols-4">
              {STATS.map((s, i) => (
                <div key={s.l} className={`px-5 py-4 ${i % 2 ? "border-l" : ""} ${i > 1 ? "border-t sm:border-t-0" : ""} border-line sm:border-l sm:first:border-l-0`}>
                  <p className={`text-[30px] font-semibold tracking-[-0.03em] ${s.tone ?? "text-ink"}`}>{s.v}</p>
                  <p className="text-[12.5px] text-muted">{s.l}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 grid gap-3 lg:grid-cols-[0.9fr_1.1fr]">
              {/* post picker */}
              <div className="flex min-w-0 flex-col gap-2.5">
                <p className="px-1 pt-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-faint">Your best posts</p>
                {POSTS.map((x, i) => (
                  <button
                    key={x.caption}
                    onClick={() => setPick(i)}
                    className={`flex items-center gap-3 rounded-[16px] border p-2.5 text-left transition-colors ${
                      i === pick ? "border-accent/40 bg-mint" : "border-line bg-surface hover:border-ink/20"
                    }`}
                  >
                    <span className="relative aspect-[9/16] w-12 shrink-0 overflow-hidden rounded-lg bg-soft">
                      <CardVideo name={x.clip} />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[14px] font-medium text-ink">{x.caption}</span>
                      <span className="text-[12.5px] text-muted">{x.views} views</span>
                    </span>
                    <span className="shrink-0 rounded-md bg-accent px-2 py-0.5 text-[11.5px] font-semibold text-white">
                      {x.multiple}<span className="hidden sm:inline"> median</span>
                    </span>
                  </button>
                ))}
              </div>

              {/* why it hit */}
              <div key={pick} className="pop min-w-0 rounded-[18px] bg-sky p-5 sm:p-6">
                <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#235a80]">
                  <Sparkles className="h-3.5 w-3.5" /> Why it hit
                </p>
                <h3 className="display mt-3 text-[22px] text-ink">&ldquo;{p.caption}&rdquo;</h3>
                <ol className="mt-5 space-y-3">
                  {p.why.map(([t, d], i) => (
                    <li key={t} className="flex gap-3 rounded-[14px] bg-surface p-3.5">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-mint text-[12px] font-semibold text-accent">
                        {i + 1}
                      </span>
                      <span className="text-[13.5px] leading-snug">
                        <span className="font-medium text-ink">{t}.</span> <span className="text-muted">{d}</span>
                      </span>
                    </li>
                  ))}
                </ol>
                <p className="mt-4 text-[12px] text-[#4b6878]">One huge post isn&rsquo;t a strategy. We cap outliers when measuring what works.</p>
              </div>
            </div>
          </div>
          <p className="mt-3 text-center text-[12.5px] text-muted">Illustrative example</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- 2. Brand deal scorecard ---------- */

const DIMS = [
  { k: "Hook & opening", v: 9, note: "A high-stakes, relatable line in the first second." },
  { k: "Product integration", v: 9, note: "The product is the hero of the story, not an add-on." },
  { k: "Use-case clarity", v: 6, note: "The use case is clear, but the result is described, not shown." },
  { k: "Trust & proof", v: 9, note: "Creator's own experience plus a live demo on screen." },
  { k: "Conversion design", v: 8, note: "“Comment ‘app’ and I'll DM you the link” gives a clear next step." },
  { k: "Production", v: 9, note: "Talking head, real story, tight edit." },
];

function DealScore() {
  return (
    <section className="px-5 pb-24 sm:pb-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                Did the brand deal
                <br />
                actually work?
              </>
            }
            sub="A post can beat your median and still fail the brand. Every deal gets scored, so your next one lands."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="rounded-[28px] border border-line bg-surface p-3 sm:p-5">
            <div className="flex flex-col gap-4 rounded-[20px] bg-mint p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-[15px] font-medium text-ink">App-builder brand deal</p>
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11.5px] font-semibold text-white">Worked for them</span>
                </div>
                <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-ink/75">
                  Viewers left thinking of the product as a fast way to build something useful, which is exactly the brief.
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-[48px] font-semibold leading-none tracking-[-0.04em] text-ink">
                  8.4<span className="text-[18px] font-medium text-muted">/10</span>
                </p>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-accent">Strong</p>
              </div>
            </div>

            <Reveal stagger={0.06} className="mt-3 grid gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {DIMS.map((d) => (
                <div key={d.k} className="bg-surface p-5">
                  <div className="flex items-baseline justify-between">
                    <p className="text-[14px] font-medium text-ink">{d.k}</p>
                    <p className={`text-[24px] font-semibold tracking-[-0.03em] ${d.v >= 8 ? "text-accent" : "text-[#c48a0c]"}`}>{d.v}</p>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-soft">
                    <div className="h-full rounded-full" style={{ width: `${d.v * 10}%`, background: d.v >= 8 ? "#0f7a52" : "#c48a0c" }} />
                  </div>
                  <p className="mt-3 text-[12.5px] leading-snug text-muted">{d.note}</p>
                </div>
              ))}
            </Reveal>

            <div className="mt-3 flex gap-3 rounded-[20px] border border-[#cfe2ef] bg-[#eef6fb] p-5">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2e6f9e]" strokeWidth={2.5} />
              <p className="text-[14px] leading-relaxed text-ink/85">
                <span className="font-semibold text-ink">Do this again:</span> same formula, new everyday problem your audience
                worries about. This time, show the finished result on screen.
              </p>
            </div>
          </div>
          <p className="mt-3 text-center text-[12.5px] text-muted">Illustrative example</p>
        </Reveal>
      </div>
    </section>
  );
}

export default function CreatorInsights() {
  return (
    <>
      <BestPosts />
      <DealScore />
    </>
  );
}
