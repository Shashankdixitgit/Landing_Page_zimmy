"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Check } from "lucide-react";
import Image from "next/image";
import { InstagramIcon, MetaIcon } from "../v15/Brands";
import { NISHANT, REELS, ReelCard, reelCover, type Reel } from "./reels";
import { LogoMark } from "../Logo";

/**
 * One Meta ads chat, played the way the real workspace works: you type one ask
 * at the start, and from then on HitRate does the work and asks you one
 * question at a time, in the dock under the chat, with buttons to answer. You
 * never type commands like "write the script": every action is a button, and
 * anything that spends waits for an explicit confirm.
 *
 * Four beats, looping: the research, then "which winner?", the script, "happy
 * with it?", the AI test video, "set up the ad?", and last the ad itself, built
 * paused and waiting for the confirm (the loop stops there, it never "clicks"
 * the confirm).
 *
 * A scripted example, labelled as one on the page. Each answer carries the
 * status of that part of HitRate today. The numbering follows the app: six
 * shared questions (link, main account, competitors, app details, pick a
 * winner, approve the script), then the Meta ads question.
 */

type Reply = "winners" | "script" | "video" | "launch";
type Status = "Live" | "Early access" | "Coming soon";
type Question = { n: string; title: string; yes: string; other: string };
/** `press`: the example clicks the main button before moving on. Never on a step that spends. */
type Scene = { steps: string[]; reply: Reply; status: Status; q: Question; press: boolean };

/** The one thing typed in the whole chat. */
const ASK = "Find the Meta ads working for career apps like ours and make one for us.";

const SCENES: Scene[] = [
  {
    steps: ["Reading Pathly's store page", "Finding the apps you really compete with", "Ranking their videos and ads from the last 60 days"],
    reply: "winners",
    status: "Live",
    q: { n: "Question 5 of 7", title: "Which winning video should I remake for you?", yes: "The tier list", other: "See all 10" },
    press: true,
  },
  {
    steps: ["Picking the format that repeats", "Writing it in Pathly's words"],
    reply: "script",
    status: "Live",
    q: { n: "Question 6 of 7", title: "Happy with this script?", yes: "Approve", other: "Ask for a change" },
    press: true,
  },
  {
    steps: ["Casting an AI creator", "Making a 15-second version"],
    reply: "video",
    status: "Early access",
    q: { n: "Question 7 of 7", title: "Ready to set up your Meta ad?", yes: "Set it up, paused", other: "Not now" },
    press: true,
  },
  {
    // The in-chat launcher builds the ad paused; it spends only after the confirm.
    steps: ["Building it on your own ad account", "Leaving it paused"],
    reply: "launch",
    status: "Early access",
    q: { n: "Last step", title: "Start the ad? Nothing spends until you confirm.", yes: "Confirm and start", other: "Change the budget" },
    press: false,
  },
];

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
        <Label>The formats that keep winning, each with a real example by a creator your users watch</Label>
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
  if (reply === "script") {
    const beats: [string, string, string][] = [
      ["0:00", "Hook", "“Ranking job apps from worst to best.”"],
      ["0:04", "List", "Tier list on screen, five apps, one by one"],
      ["0:12", "Turn", "“Number one is the one that got me interviews.”"],
      ["0:18", "Ask", "“Comment ‘jobs’ and I’ll send the link.”"],
    ];
    return (
      <div className="space-y-1.5">
        <Label>Script 1 · the tier list, in Pathly&rsquo;s words</Label>
        {beats.map(([t, k, l]) => (
          <Row key={t}>
            <span className="flex min-w-0 items-center gap-2.5">
              <span className="w-8 shrink-0 text-[11px] tabular-nums text-[var(--bd-muted)]">{t}</span>
              <span className="w-10 shrink-0 text-[10.5px] font-semibold uppercase tracking-[0.06em] text-[var(--bd-ink)]">{k}</span>
              <span className="line-clamp-2 text-[13px] text-[var(--bd-ink)]">{l}</span>
            </span>
          </Row>
        ))}
      </div>
    );
  }
  if (reply === "video") {
    // The video maker never shows the app's own screens, so no beat here does either.
    const beats: [string, string][] = [
      ["0:00", "“I almost took the first offer I got.”"],
      ["0:04", "To camera, two offer letters side by side"],
      ["0:11", "“The second offer was 40% more.”"],
    ];
    return (
      <div className="flex gap-3">
        <div className="shrink-0">
          <ReelCard reel={REELS.salary} className="w-[74px]" />
          <p className="mt-1 w-[74px] text-[10px] leading-tight text-[var(--bd-muted)]">Starts from this winner</p>
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          <Label>Your 15-second AI test video, ready to watch</Label>
          {beats.map(([t, l]) => (
            <div key={t} className="rounded-[12px] border border-[var(--bd-line)] bg-white px-3 py-2">
              <p className="text-[10.5px] text-[var(--bd-faint)]">{t}</p>
              <p className="line-clamp-2 text-[12.5px] text-[var(--bd-ink)]">{l}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  // "launch": the ad already sits paused on the brand's own ad account; the dock
  // under it holds the confirm, the last word before anything spends.
  const rows: [string, string][] = [
    ["Video", "Salary story, the test video you approved"],
    ["Where", "Instagram and Facebook, in India"],
    ["Budget", "$20 a day for 7 days, up to $140"],
  ];
  return (
    <div className="space-y-1.5">
      <Label>Your Meta ad, built and paused</Label>
      <div className="rounded-[12px] border border-[var(--bd-line)] bg-white px-3.5 py-2.5">
        <p className="flex items-center gap-1.5 text-[13.5px] font-medium text-[var(--bd-ink)]">
          <MetaIcon className="h-3.5 w-3.5" />
          <span className="min-w-0 truncate">Pathly · salary story test</span>
          <span className="ml-auto shrink-0 rounded-full bg-[var(--bd-soft)] px-2 py-0.5 text-[10.5px] font-medium text-[var(--bd-muted)]">Paused</span>
        </p>
        <dl className="mt-2 space-y-1">
          {rows.map(([k, v]) => (
            <div key={k} className="flex gap-3 text-[12.5px]">
              <dt className="w-14 shrink-0 text-[var(--bd-muted)]">{k}</dt>
              <dd className="min-w-0 text-[var(--bd-ink)]">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
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

type Phase = "type" | "think" | "reply" | "press";

export default function ExampleThread() {
  const [si, setSi] = useState(0);
  const [typed, setTyped] = useState("");
  const [phase, setPhase] = useState<Phase>("type");
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

  // Less motion asked for: the first beat, fully answered, with its question, still.
  const scene = still ? SCENES[0] : SCENES[si];
  const asked = still ? ASK : si === 0 ? typed : ASK;
  const steps = still ? scene.steps.length : shown;
  const at: Phase = still ? "reply" : phase;
  const answered = at === "reply" || at === "press";

  useEffect(() => {
    if (still || !visible) return;
    const { steps: list, press } = SCENES[si];
    let hand: ReturnType<typeof setTimeout> | undefined;
    // Typing happens once, at the start: after that, HitRate asks and you click.
    if (phase === "type") {
      let n = 0;
      const id = setInterval(() => {
        n += 1;
        setTyped(ASK.slice(0, n));
        if (n >= ASK.length) {
          clearInterval(id);
          hand = setTimeout(() => setPhase("think"), 420);
        }
      }, 24);
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
    const next = () => {
      const to = (si + 1) % SCENES.length;
      setSi(to);
      setShown(0);
      if (to === 0) setTyped("");
      setPhase(to === 0 ? "type" : "think");
    };
    if (phase === "reply") {
      // Time to read the answer and the question, then the click (or, on the last
      // beat, a longer pause on the confirm, and the loop starts over).
      const id = setTimeout(() => (press ? setPhase("press") : next()), press ? 3400 : 5600);
      return () => clearTimeout(id);
    }
    const id = setTimeout(next, 900);
    return () => clearTimeout(id);
  }, [phase, si, still, visible]);

  return (
    <div ref={root} className="bd-card rounded-[28px] p-2 text-left sm:p-2.5">
      <div className="flex min-h-[500px] flex-col gap-3 rounded-[22px] bg-[#f7f8f9] p-4 sm:min-h-[450px] sm:p-5" aria-hidden>
        <div className="flex justify-end">
          <p className="max-w-[86%] rounded-[18px] rounded-br-md bg-[#111] px-4 py-2.5 text-[14px] font-medium text-white">
            {asked}
            {at === "type" ? <span className="bd-caret ml-px text-white/60">|</span> : null}
          </p>
        </div>

        {steps > 0 ? (
          <div key={`steps-${si}`} className="flex gap-2.5">
            <LogoMark className="mt-0.5 h-5 w-5 shrink-0" />
            <div className="min-w-0 flex-1 space-y-1.5">
              {scene.steps.slice(0, steps).map((s, i) => (
                <p key={s} className="bd-rise flex items-center gap-2 text-[13px] text-[var(--bd-muted)]">
                  {answered || i < steps - 1 ? (
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

        {answered ? (
          <div key={`reply-${si}`} className="bd-rise mt-auto rounded-[18px] sm:border sm:border-[var(--bd-line)] sm:bg-[#fbfbfc] sm:p-3">
            <div className="mb-2.5 flex items-center justify-between gap-3 px-1">
              <span className="text-[12px] font-semibold text-[var(--bd-ink)]">HitRate</span>
              <StatusChip status={scene.status} />
            </div>
            <Answer reply={scene.reply} />
          </div>
        ) : null}
      </div>

      {/* The dock: where the message box would be, HitRate's one question at a time. */}
      <div className="mt-2 min-h-[92px] rounded-[20px] border border-[var(--bd-line)] bg-white px-4 py-3" aria-hidden>
        {answered ? (
          <div key={`q-${si}`} className="bd-rise">
            <p className="text-[11.5px] font-medium text-[var(--bd-muted)]">{scene.q.n}</p>
            <p className="mt-0.5 text-[14px] font-medium text-[var(--bd-ink)]">{scene.q.title}</p>
            <div className="mt-2.5 flex flex-wrap gap-1.5">
              <span
                className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-1 text-[12px] font-medium text-white transition-all duration-200 ${
                  at === "press" ? "scale-95 bg-[#3a3c40]" : "bg-[#111]"
                }`}
              >
                {at === "press" ? <Check className="h-3 w-3" strokeWidth={3} /> : null}
                {scene.q.yes}
              </span>
              <span className="whitespace-nowrap rounded-full border border-[var(--bd-line)] bg-white px-3 py-1 text-[12px] font-medium text-[var(--bd-muted)]">
                {scene.q.other}
              </span>
            </div>
          </div>
        ) : (
          <p className="flex items-center gap-2 pt-1 text-[13px] text-[var(--bd-muted)]">
            {/* Green only while work is live; grey while it waits for the ask. */}
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${at === "type" ? "bg-[#c4c7cb]" : "bd-dot bg-[var(--bd-green)]"}`} />
            {at === "type" ? "Say what you want once. HitRate asks the rest." : "Working on it. The next question comes when it’s ready."}
          </p>
        )}
      </div>

      {/* What a screen reader gets instead of the animation */}
      <p className="sr-only">
        An example Meta ads chat for a made-up career app. You type one ask, once. HitRate reads the app, finds its
        closest competitors and ranks their winning videos and ads, with real reels by @unscripted.nishant (live), then
        asks one question at a time, each answered with a button: which winning video to remake; whether the script is
        right (live); after a 15-second AI test video, whether to set up the Meta ad (early access); and last, whether
        to start the ad, built paused on your own ad account, at up to $140 over 7 days. Nothing spends until you
        confirm (early access).
      </p>
    </div>
  );
}
