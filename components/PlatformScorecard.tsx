"use client";

import { useState } from "react";
import { Eye, Lightbulb, MousePointerClick, Repeat, ArrowRight } from "lucide-react";

type Verdict = "strong" | "mixed" | "weak";

type Platform = {
  id: string;
  label: string;
  dot: string;
  hold: number[]; // % of viewers still watching, second by second
  holdNote: string;
  comment: string;
  commentGood: boolean;
  clicks: number; // 0-100 bar
  clickNote: string;
  runs: Verdict[];
  verdicts: [Verdict, Verdict, Verdict, Verdict];
  decision: string;
  decisionTone: Verdict;
};

// Illustrative results for one video across three platforms.
const PLATFORMS: Platform[] = [
  {
    id: "tiktok",
    label: "TikTok",
    dot: "#19292d",
    hold: [100, 58, 41, 33, 28, 24, 21],
    holdNote: "Lost most viewers by second 2",
    comment: "“wait what app is this??”",
    commentGood: false,
    clicks: 18,
    clickNote: "Few link clicks",
    runs: ["weak", "mixed", "weak"],
    verdicts: ["weak", "weak", "weak", "weak"],
    decision: "Drop this cut on TikTok. Try a new hook before spending more.",
    decisionTone: "weak",
  },
  {
    id: "reels",
    label: "Reels",
    dot: "#e1306c",
    hold: [100, 88, 79, 72, 66, 61, 57],
    holdNote: "Most viewers stayed past the hook",
    comment: "“just downloaded it, the streak thing is so satisfying”",
    commentGood: true,
    clicks: 74,
    clickNote: "Strong link clicks",
    runs: ["strong", "strong", "strong"],
    verdicts: ["strong", "strong", "strong", "strong"],
    decision: "Remake this one with a real creator, then test it as an ad.",
    decisionTone: "strong",
  },
  {
    id: "shorts",
    label: "Shorts",
    dot: "#ff0033",
    hold: [100, 80, 66, 55, 47, 42, 39],
    holdNote: "Good start, faded mid-video",
    comment: "“does it work offline?”",
    commentGood: true,
    clicks: 41,
    clickNote: "Some link clicks",
    runs: ["mixed", "strong", "mixed"],
    verdicts: ["strong", "strong", "mixed", "mixed"],
    decision: "Promising. Run one more variation before deciding.",
    decisionTone: "mixed",
  },
];

const V: Record<Verdict, { label: string; pill: string; tint: string; stroke: string }> = {
  strong: { label: "Yes", pill: "bg-accent text-white", tint: "bg-mint", stroke: "#0f7a52" },
  mixed: { label: "Not yet", pill: "bg-[#f6c453] text-[#4a3606]", tint: "bg-[#fbf3dc]", stroke: "#c48a0c" },
  weak: { label: "No", pill: "bg-[#e9ecec] text-muted", tint: "bg-soft", stroke: "#8b9496" },
};

const QUESTIONS = [
  { icon: Eye, tag: "Hook", q: "Did the opening earn attention?" },
  { icon: Lightbulb, tag: "Clarity", q: "Did people understand the product?" },
  { icon: MousePointerClick, tag: "Action", q: "Did it lead to action?" },
  { icon: Repeat, tag: "Repeatable", q: "Is it repeatable enough to fund?" },
];

function HoldCurve({ data, color }: { data: number[]; color: string }) {
  const w = 220;
  const h = 64;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - (v / 100) * (h - 6) - 3]);
  const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-16 w-full" preserveAspectRatio="none" aria-hidden>
      <path d={`${line} L${w},${h} L0,${h} Z`} fill={color} opacity="0.12" />
      <path d={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export default function PlatformScorecard() {
  const [id, setId] = useState("reels");
  const p = PLATFORMS.find((x) => x.id === id) ?? PLATFORMS[1];

  return (
    <div className="rounded-[28px] border border-line bg-surface p-3 sm:p-5">
      {/* platform tabs */}
      <div className="flex flex-col items-start justify-between gap-3 px-2 pb-4 pt-1 sm:flex-row sm:items-center">
        <p className="text-[14px] font-medium text-ink">
          One video, three platforms. <span className="text-muted">Pick one:</span>
        </p>
        <div className="flex rounded-full bg-soft p-1" role="tablist" aria-label="Platform">
          {PLATFORMS.map((x) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={x.id === id}
              onClick={() => setId(x.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[13.5px] font-medium transition-all ${
                x.id === id ? "bg-surface text-ink shadow-sm" : "text-muted hover:text-ink"
              }`}
            >
              <span className="h-2 w-2 rounded-full" style={{ background: x.dot }} />
              {x.label}
            </button>
          ))}
        </div>
      </div>

      {/* question cards */}
      <div key={p.id} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {QUESTIONS.map((q, i) => {
          const v = V[p.verdicts[i]];
          const Icon = q.icon;
          return (
            <article
              key={q.tag}
              className={`pop flex flex-col rounded-[20px] ${v.tint} p-5 transition-colors`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-ink/60">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-surface text-ink">
                    <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  {q.tag}
                </span>
                <span className={`rounded-full px-2.5 py-0.5 text-[12px] font-semibold ${v.pill}`}>{v.label}</span>
              </div>

              <h3 className="mt-4 text-[17.5px] font-medium leading-snug tracking-[-0.015em] text-ink">{q.q}</h3>

              {/* evidence */}
              <div className="mt-auto pt-5">
                <div className="rounded-[14px] bg-surface p-3">
                  {i === 0 ? (
                    <>
                      <HoldCurve data={p.hold} color={v.stroke} />
                      <p className="mt-1 text-[12px] text-muted">{p.holdNote}</p>
                    </>
                  ) : i === 1 ? (
                    <>
                      <p className="rounded-xl rounded-bl-sm bg-soft px-3 py-2 text-[13px] leading-snug text-ink">{p.comment}</p>
                      <p className="mt-2 text-[12px] text-muted">
                        {p.commentGood ? "Comments are about the product" : "Viewers couldn’t tell what it was"}
                      </p>
                    </>
                  ) : i === 2 ? (
                    <>
                      <div className="flex h-16 items-end">
                        <div className="h-3 w-full overflow-hidden rounded-full bg-soft">
                          <div className="h-full rounded-full transition-all duration-700" style={{ width: `${p.clicks}%`, background: v.stroke }} />
                        </div>
                      </div>
                      <p className="mt-1 text-[12px] text-muted">{p.clickNote}</p>
                    </>
                  ) : (
                    <>
                      <div className="flex h-16 items-center justify-center gap-3">
                        {p.runs.map((r, k) => (
                          <span key={k} className="flex flex-col items-center gap-1">
                            <span className="h-8 w-8 rounded-full" style={{ background: V[r].stroke, opacity: r === "weak" ? 0.35 : 1 }} />
                            <span className="text-[10.5px] text-faint">Run {k + 1}</span>
                          </span>
                        ))}
                      </div>
                      <p className="mt-1 text-[12px] text-muted">Same result across repeat posts?</p>
                    </>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* decision */}
      <div
        key={`d-${p.id}`}
        className={`pop mt-3 flex flex-col gap-3 rounded-[20px] px-5 py-4 sm:flex-row sm:items-center sm:justify-between ${
          p.decisionTone === "strong" ? "bg-night text-white" : "bg-soft text-ink"
        }`}
      >
        <p className="flex items-center gap-3 text-[15px] font-medium">
          <ArrowRight className={`h-4 w-4 shrink-0 ${p.decisionTone === "strong" ? "text-accent-bright" : "text-accent"}`} />
          <span>
            <span className={p.decisionTone === "strong" ? "text-white/60" : "text-muted"}>Zimmy&rsquo;s call on {p.label}: </span>
            {p.decision}
          </span>
        </p>
        <span className={`shrink-0 text-[12px] ${p.decisionTone === "strong" ? "text-white/50" : "text-faint"}`}>
          Illustrative example
        </span>
      </div>
    </div>
  );
}
