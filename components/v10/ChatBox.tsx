"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { ArrowUp, Check, Paperclip, Sparkles } from "lucide-react";
import { LogoMark } from "../Logo";

/**
 * The one chat box the /v10 page is built around.
 *
 * It types a prompt, shows the work happening, then shows a small result card —
 * then moves to the next prompt in the same thread. Four scenes, looping, so a
 * visitor sees a whole marketing week run from one input without clicking.
 *
 * Nothing here is a live product call: it is a scripted mock, labelled as an
 * example on the page.
 */

type Reply =
  | { kind: "winners" }
  | { kind: "calendar" }
  | { kind: "video" }
  | { kind: "results" };

type Scene = {
  prompt: string;
  steps: string[];
  reply: Reply;
  /** Status of this part of the product today, shown on the reply card. */
  status: "Live" | "Early access" | "Coming soon";
};

const SCENES: Scene[] = [
  {
    prompt: "What video is winning for my habit app in the US?",
    steps: [
      "Reading your app store page and reviews",
      "Finding the apps your users also watch",
      "Pulling their videos and ads from the last 30 days",
    ],
    reply: { kind: "winners" },
    status: "Live",
  },
  {
    prompt: "Plan next week from those winners.",
    steps: ["Picking the three formats that repeat", "Writing scripts from them", "Laying out the week"],
    reply: { kind: "calendar" },
    status: "Live",
  },
  {
    prompt: "Make Tuesday’s as an AI UGC video and post it.",
    steps: ["Casting an AI creator", "Cutting the 15-second version", "Waiting for your approval"],
    reply: { kind: "video" },
    status: "Early access",
  },
  {
    prompt: "Which test actually brought users?",
    steps: ["Reading installs per format", "Comparing cost per install"],
    reply: { kind: "results" },
    status: "Coming soon",
  },
];

const CHIPS = ["Find what’s winning", "Plan my week", "Make a test video", "What brought users?"];

/* ── reply cards ─────────────────────────────────────────── */

function Row({ children }: { children: React.ReactNode }) {
  return <div className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.06] px-3.5 py-2.5">{children}</div>;
}

function WinnersCard() {
  const rows: [string, string, string][] = [
    ["Before / after streak", "4 of 8 apps", "2.1M views"],
    ["Green screen reaction", "3 of 8 apps", "840K views"],
    ["Day-in-my-life", "2 of 8 apps", "610K views"],
  ];
  return (
    <div className="space-y-1.5">
      <p className="px-1 text-[12px] text-white/50">Formats repeating across your competitors</p>
      {rows.map(([f, n, v]) => (
        <Row key={f}>
          <span className="truncate text-[13px] font-medium text-white">{f}</span>
          <span className="shrink-0 text-[12px] text-white/50">
            {n} · {v}
          </span>
        </Row>
      ))}
    </div>
  );
}

function CalendarCard() {
  const days: [string, string][] = [
    ["Mon", "Green screen · the 3am streak"],
    ["Tue", "Before / after · 30 days in"],
    ["Thu", "Day-in-my-life · morning routine"],
    ["Sat", "Before / after · second hook"],
  ];
  return (
    <div className="space-y-1.5">
      <p className="px-1 text-[12px] text-white/50">Next week, with the script attached to each</p>
      {days.map(([d, t]) => (
        <Row key={d}>
          <span className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-5 w-8 shrink-0 place-items-center rounded-md bg-white/10 text-[10.5px] font-semibold text-white/70">
              {d}
            </span>
            <span className="truncate text-[13px] text-white">{t}</span>
          </span>
          <Check className="h-3.5 w-3.5 shrink-0 text-accent-bright" />
        </Row>
      ))}
    </div>
  );
}

function VideoCard() {
  const beats: [string, string][] = [
    ["0:00", "“I tried to wake up at 6 for 30 days.”"],
    ["0:04", "Phone on screen, streak at 30"],
    ["0:11", "“The app did the boring part.”"],
  ];
  return (
    <div className="flex gap-3">
      <div className="relative grid aspect-[9/16] w-[74px] shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-b from-white/20 to-white/5">
        <Sparkles className="h-5 w-5 text-white/70" />
        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 rounded-full bg-black/45 px-1.5 py-0.5 text-[9.5px] text-white/85">
          0:15
        </span>
      </div>
      <div className="min-w-0 flex-1 space-y-1.5">
        {beats.map(([t, l]) => (
          <div key={t} className="rounded-xl bg-white/[0.06] px-3 py-2">
            <p className="text-[10.5px] text-white/45">{t}</p>
            <p className="truncate text-[12.5px] text-white">{l}</p>
          </div>
        ))}
        <div className="flex gap-1.5 pt-0.5">
          <span className="rounded-full bg-accent-bright px-2.5 py-1 text-[11.5px] font-medium text-[#0b3b29]">Approve</span>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[11.5px] font-medium text-white/70">Redo the hook</span>
        </div>
      </div>
    </div>
  );
}

function ResultsCard() {
  const rows: [string, string, string, string][] = [
    ["Before / after", "212 installs", "$1.40 each", "Scale it"],
    ["Green screen", "38 installs", "$6.10 each", "Keep testing"],
    ["Day-in-my-life", "4 installs", "—", "Drop"],
  ];
  return (
    <div className="space-y-1.5">
      <p className="px-1 text-[12px] text-white/50">Three weeks of tests, read on installs</p>
      {rows.map(([f, i, c, v]) => (
        <Row key={f}>
          <span className="min-w-0">
            <span className="block truncate text-[13px] font-medium text-white">{f}</span>
            <span className="text-[11.5px] text-white/45">
              {i} · {c}
            </span>
          </span>
          <span
            className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium ${
              v === "Scale it" ? "bg-accent-bright text-[#0b3b29]" : "bg-white/10 text-white/60"
            }`}
          >
            {v}
          </span>
        </Row>
      ))}
    </div>
  );
}

function ReplyBody({ reply }: { reply: Reply }) {
  if (reply.kind === "winners") return <WinnersCard />;
  if (reply.kind === "calendar") return <CalendarCard />;
  if (reply.kind === "video") return <VideoCard />;
  return <ResultsCard />;
}

/* ── the box ─────────────────────────────────────────────── */

/** Reduced motion, read as a subscription so nothing is set from inside an effect. */
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false, // the server cannot know; assume motion is fine and correct on hydration
  );
}

export default function ChatBox({ compact = false }: { compact?: boolean }) {
  const [si, setSi] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<"type" | "think" | "reply">("type");
  const [shown, setShown] = useState(0);
  const still = usePrefersReducedMotion();

  // Reduced motion freezes on the first scene, fully rendered, so the mock is
  // still readable without anything moving.
  const scene = still ? SCENES[0] : SCENES[si];
  const text = still ? SCENES[0].prompt : typed;
  const steps = still ? scene.steps.length : shown;
  const at = still ? "reply" : phase;

  // One effect per phase, each scheduling the next.
  useEffect(() => {
    if (still || compact) return;
    const { prompt, steps } = SCENES[si];

    if (phase === "type") {
      let n = 0;
      const id = setInterval(() => {
        n += 1;
        setTyped(prompt.slice(0, n));
        if (n >= prompt.length) {
          clearInterval(id);
          setTimeout(() => setPhase("think"), 420);
        }
      }, 26);
      return () => clearInterval(id);
    }

    if (phase === "think") {
      let n = 0;
      const id = setInterval(() => {
        n += 1;
        setShown(n);
        if (n >= steps.length) {
          clearInterval(id);
          setTimeout(() => setPhase("reply"), 520);
        }
      }, 620);
      return () => clearInterval(id);
    }

    const id = setTimeout(() => {
      setSi((v) => (v + 1) % SCENES.length);
      setTyped("");
      setShown(0);
      setPhase("type");
    }, 4200);
    return () => clearTimeout(id);
  }, [phase, si, still, compact]);

  if (compact) {
    return (
      <div className="rounded-[20px] border border-white/15 bg-white/[0.07] p-2.5 backdrop-blur-sm">
        <div className="flex items-center gap-3 px-2.5 py-1.5">
          <Paperclip className="h-4 w-4 shrink-0 text-white/40" />
          <span className="flex-1 truncate text-left text-[14.5px] text-white/50">
            Ask for anything your marketing team would do…
          </span>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-ink">
            <ArrowUp className="h-4 w-4" />
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[26px] border border-white/12 bg-white/[0.05] p-2.5 backdrop-blur-md sm:p-3">
      {/* thread */}
      <div
        className="flex min-h-[292px] flex-col gap-3 rounded-[18px] bg-[#141616]/60 p-3.5 sm:min-h-[316px] sm:p-4"
      >
        {/* the ask */}
        <div className="flex justify-end">
          <p className="max-w-[86%] rounded-2xl rounded-br-md bg-white px-3.5 py-2.5 text-left text-[14px] font-medium text-ink">
            {text}
            {at === "type" ? <span className="mk-caret ml-px text-ink/60">|</span> : null}
          </p>
        </div>

        {/* the work */}
        {steps > 0 ? (
          <div className="flex gap-2.5">
            <LogoMark className="mt-0.5 h-5 w-5 shrink-0" light />
            <div className="min-w-0 flex-1 space-y-1.5">
              {scene.steps.slice(0, steps).map((s, i) => (
                <p key={s} className="pop flex items-center gap-2 text-[12.5px] text-white/55" style={{ animationDelay: `${i * 0.04}s` }}>
                  {at === "reply" || i < steps - 1 ? (
                    <Check className="h-3.5 w-3.5 shrink-0 text-accent-bright" />
                  ) : (
                    <span className="live-dot h-1.5 w-1.5 shrink-0 rounded-full bg-accent-bright" />
                  )}
                  {s}
                </p>
              ))}
            </div>
          </div>
        ) : null}

        {/* the answer */}
        {at === "reply" ? (
          <div className="pop mt-auto rounded-[16px] border border-white/10 bg-white/[0.04] p-3">
            <div className="mb-2.5 flex items-center justify-between gap-3 px-1">
              <span className="text-[11.5px] font-medium text-white/70">HitRate</span>
              <span
                className={`rounded-md px-2 py-0.5 text-[10.5px] font-medium ${
                  scene.status === "Live" ? "bg-accent-bright/20 text-accent-bright" : "bg-white/10 text-white/55"
                }`}
              >
                {scene.status}
              </span>
            </div>
            <ReplyBody reply={scene.reply} />
          </div>
        ) : null}
      </div>

      {/* input */}
      <div className="mt-2.5 flex items-center gap-3 px-2.5 py-1.5">
        <Paperclip className="h-4 w-4 shrink-0 text-white/40" />
        <span className="flex-1 truncate text-left text-[14.5px] text-white/45">Ask the next thing…</span>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-ink">
          <ArrowUp className="h-4 w-4" />
        </span>
      </div>

      {/* chips */}
      <div className="mt-1 flex flex-wrap gap-1.5 px-1.5 pb-1">
        {CHIPS.map((c, i) => (
          <span
            key={c}
            className={`rounded-full border px-2.5 py-1 text-[11.5px] transition-colors duration-500 ${
              i === si && !still ? "border-white/35 bg-white/10 text-white" : "border-white/12 text-white/45"
            }`}
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
