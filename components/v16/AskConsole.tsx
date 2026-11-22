"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import {
  BarChart3,
  CalendarDays,
  Check,
  Clapperboard,
  Globe2,
  PenLine,
  Search,
  Send,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { LogoMark } from "../Logo";
import { InstagramIcon, MetaIcon, PlatformRow, ShortsIcon, TikTokIcon } from "../v15/Brands";
import { NISHANT, REELS, ReelCard } from "./reels";
import Reveal from "../v15/Reveal";
import { StatusChip } from "./ExampleThread";

/**
 * "Ask it the way you'd ask your team", played: one question at a time is typed
 * into the box and opens into the small dashboard that answers it. It moves
 * through all nine on its own while on screen, pauses while you point at it, and
 * any question can be picked. The app asking is made up (Pathly, a career app),
 * and the panel says so; the videos and the creator are real (@unscripted.nishant,
 * part of HitRate). Each answer carries the status of that part of HitRate today.
 */

type Status = "Live" | "Early access" | "Coming soon";
type Ask = { Icon: LucideIcon; ask: string; back: string; status: Status; View: () => ReactNode; real?: boolean };

const delay = (i: number, step = 0.08): CSSProperties => ({ animationDelay: `${0.25 + i * step}s` });

function Bar({ pct, i, dark = false }: { pct: number; i: number; dark?: boolean }) {
  return (
    <span className="relative block h-2 flex-1 overflow-hidden rounded-full bg-[var(--bd-soft)]">
      <span
        className={`bd-grow absolute inset-y-0 left-0 rounded-full ${dark ? "bg-[#111]" : "bg-[#c9ccd0]"}`}
        style={{ width: `${pct}%`, ...delay(i) }}
      />
    </span>
  );
}

/* ── the nine answers ─────────────────────────────────────── */
/* The app asking is made up (Pathly, a career app). The videos are real:
   @unscripted.nishant's reels, which is the kind of creator a career app's
   users watch. */

/**
 * Real career apps with their real icons. No overlap numbers: those would be
 * made up about real companies, so each row says what the app is instead.
 */
const RIVALS: { name: string; icon: string; what: string }[] = [
  { name: "LinkedIn", icon: "/v16/apps/linkedin.png", what: "Jobs and your network" },
  { name: "Naukri", icon: "/v16/apps/naukri.png", what: "Job search in India" },
  { name: "Indeed", icon: "/v16/apps/indeed.png", what: "Job search, worldwide" },
  { name: "Unstop", icon: "/v16/apps/unstop.png", what: "Internships and challenges" },
  { name: "Coursera", icon: "/v16/apps/coursera.png", what: "Courses and certificates" },
];

function Competitors() {
  return (
    <div>
      <p className="text-[12px] text-[var(--bd-muted)]">Apps your users also use</p>
      <ul className="mt-3 space-y-2">
        {RIVALS.map((r, i) => (
          <li key={r.name} className="bd-rise flex items-center gap-3 rounded-[12px] border border-[var(--bd-line)] bg-white px-3 py-2" style={delay(i)}>
            <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-[9px] bg-white shadow-[0_0_0_1px_rgb(17_17_17/0.07)]">
              <Image src={r.icon} alt="" fill sizes="32px" className="object-contain p-0.5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13.5px] font-medium text-[var(--bd-ink)]">{r.name}</span>
              <span className="block truncate text-[11.5px] text-[var(--bd-muted)]">{r.what}</span>
            </span>
            <PlatformRow className="h-3.5 w-3.5" />
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[12px] text-[var(--bd-muted)]">Next: their videos from the last 60 days, read on TikTok, Reels and Shorts</p>
    </div>
  );
}

function Winners() {
  const top = [REELS.jobs, REELS.certs, REELS.metro];
  return (
    <div>
      <p className="flex flex-wrap items-center gap-1.5 text-[12px] text-[var(--bd-muted)]">
        <InstagramIcon className="h-3.5 w-3.5" />
        <a href={NISHANT.url} target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--bd-ink)] hover:underline">
          {NISHANT.handle}
        </a>
        &rsquo;s reels from 45 days, against his usual of {NISHANT.usual} views
      </p>
      <div className="mt-3 grid grid-cols-3 gap-2.5">
        {top.map((r, i) => (
          <div key={r.code} className="bd-rise" style={delay(i, 0.12)}>
            <ReelCard reel={r} className="w-full" stats sizes="(min-width: 1024px) 170px, 30vw" />
            <p className="mt-1.5 truncate text-[12px] font-medium text-[var(--bd-ink)]">
              {r.kind}: {r.title.replace(/^Ranking /, "")}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-[12.5px] text-[var(--bd-text)]">
        <Check className="h-3.5 w-3.5 shrink-0 text-[var(--bd-green)]" strokeWidth={3} aria-hidden />
        The pattern: a ranked tier list, 2 of his top 3
      </p>
    </div>
  );
}

function Markets() {
  const rows: [string, number, boolean][] = [
    ["India", 81, true],
    ["United States", 58, false],
    ["UAE & Gulf", 46, false],
    ["United Kingdom", 31, false],
  ];
  return (
    <div>
      <p className="text-[12px] text-[var(--bd-muted)]">Where the tier-list hook already lands</p>
      <ul className="mt-3 space-y-3">
        {rows.map(([c, p, top], i) => (
          <li key={c} className="bd-rise flex items-center gap-3" style={delay(i)}>
            <Globe2 className="h-4 w-4 shrink-0 text-[var(--bd-muted)]" aria-hidden />
            <span className="w-[112px] shrink-0 truncate text-[13.5px] text-[var(--bd-ink)]">{c}</span>
            <Bar pct={p} i={i} dark={top} />
            {top ? (
              <span className="shrink-0 rounded-full bg-[#111] px-2 py-0.5 text-[10.5px] font-semibold text-white">Start here</span>
            ) : (
              <span className="w-[66px] shrink-0" />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Script() {
  const beats: [string, string, string][] = [
    ["0:00", "Hook", "“Ranking job apps from worst to best.”"],
    ["0:04", "List", "Tier list on screen, five apps, one by one"],
    ["0:12", "Turn", "“Number one is the one that actually got me interviews.”"],
    ["0:18", "Ask", "Comment “jobs” and I’ll send the link"],
  ];
  return (
    <div className="flex gap-4">
      <div className="hidden shrink-0 sm:block">
        <ReelCard reel={REELS.jobs} className="w-[84px]" />
        <p className="mt-1.5 w-[84px] text-[10.5px] leading-tight text-[var(--bd-muted)]">Built from this winner</p>
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[12px] text-[var(--bd-muted)]">Script 1 · the tier list, in Pathly&rsquo;s words</p>
          <span className="text-[11.5px] tabular-nums text-[var(--bd-muted)]">20 sec</span>
        </div>
        <ol className="mt-3 space-y-2">
          {beats.map(([t, k, l], i) => (
            <li key={t} className="bd-rise flex gap-3 rounded-[12px] border border-[var(--bd-line)] bg-white px-3 py-2.5" style={delay(i, 0.18)}>
              <span className="w-9 shrink-0 text-[11.5px] tabular-nums text-[var(--bd-muted)]">{t}</span>
              <span className="w-11 shrink-0 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-[var(--bd-ink)]">{k}</span>
              <span className="min-w-0 text-[13px] text-[var(--bd-text)]">{l}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function Week() {
  const days: [string, string | null, "ig" | "yt" | "tt" | null][] = [
    ["Mon", "Tier list", "ig"],
    ["Tue", "Salary story", "yt"],
    ["Wed", null, null],
    ["Thu", "Day in the life", "tt"],
    ["Fri", null, null],
    ["Sat", "Tier list", "ig"],
    ["Sun", null, null],
  ];
  const Mark = ({ p }: { p: "ig" | "yt" | "tt" }) =>
    p === "ig" ? <InstagramIcon className="h-4 w-4" /> : p === "yt" ? <ShortsIcon className="h-4 w-4" /> : <TikTokIcon className="h-4 w-4" />;
  return (
    <div>
      <p className="text-[12px] text-[var(--bd-muted)]">Next week, with a script on every slot</p>
      <div className="mt-3 grid grid-cols-7 gap-1.5">
        {days.map(([d, f, p], i) => (
          <div key={d} className="bd-rise flex flex-col gap-1.5" style={delay(i, 0.06)}>
            <span className="text-center text-[11px] font-semibold text-[var(--bd-muted)]">{d}</span>
            <div
              className={`flex h-[104px] flex-col justify-between rounded-[12px] p-1.5 ${
                f ? "border border-[var(--bd-line)] bg-white" : "border border-dashed border-[var(--bd-line)]"
              }`}
            >
              {f && p ? (
                <>
                  <span className="text-[10.5px] font-medium leading-tight text-[var(--bd-ink)]">{f}</span>
                  <Mark p={p} />
                </>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-2 text-[11.5px] text-[var(--bd-muted)]">
        <InstagramIcon className="h-3.5 w-3.5" /> Reels <ShortsIcon className="ml-1 h-3.5 w-3.5" /> Shorts <TikTokIcon className="ml-1 h-3.5 w-3.5" /> TikTok
      </p>
    </div>
  );
}

function Render() {
  return (
    <div className="flex gap-4">
      <div className="bd-rise shrink-0" style={delay(0)}>
        <ReelCard reel={REELS.salary} className="w-[108px]" />
        <p className="mt-1.5 w-[108px] text-[10.5px] leading-tight text-[var(--bd-muted)]">The style it starts from: a salary story</p>
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[12px] text-[var(--bd-muted)]">Your version, made with an AI creator</p>
        <ul className="mt-3 space-y-2 text-[13px] text-[var(--bd-text)]">
          {["15 seconds, 9:16, captions on", "Same hook and pace as the winner", "Pathly on screen by the third second"].map((t, i) => (
            <li key={t} className="bd-rise flex items-center gap-2" style={delay(i + 1)}>
              <Check className="h-3.5 w-3.5 shrink-0 text-[var(--bd-green)]" strokeWidth={3} aria-hidden />
              {t}
            </li>
          ))}
        </ul>
        <div className="bd-rise mt-3" style={delay(4)}>
          <div className="flex items-center justify-between text-[11px] text-[var(--bd-muted)]">
            <span>Making it</span>
            <span>15 sec</span>
          </div>
          <span className="relative mt-1 block h-1.5 overflow-hidden rounded-full bg-[var(--bd-soft)]">
            <span className="bd-grow absolute inset-y-0 left-0 w-full rounded-full bg-[#111]" style={{ animationDuration: "2.4s", ...delay(4) }} />
          </span>
        </div>
        <div className="bd-rise mt-4 flex flex-wrap gap-1.5" style={delay(6)}>
          <span className="whitespace-nowrap rounded-full bg-[#111] px-3 py-1.5 text-[12px] font-medium text-white">Approve</span>
          <span className="whitespace-nowrap rounded-full border border-[var(--bd-line)] bg-white px-3 py-1.5 text-[12px] font-medium text-[var(--bd-muted)]">Redo the hook</span>
        </div>
      </div>
    </div>
  );
}

function Posting() {
  const rows: [ReactNode, string, string, string, boolean][] = [
    [<InstagramIcon key="ig" className="h-5 w-5" />, "Instagram Reels", "Tue · 6:00 pm", "Waiting for your OK", false],
    [<TikTokIcon key="tt" className="h-5 w-5" />, "TikTok", "Tue · 7:30 pm", "Waiting for your OK", false],
    [<ShortsIcon key="yt" className="h-5 w-5" />, "YouTube Shorts", "Mon · 6:00 pm", "Posted · 18K views so far", true],
  ];
  return (
    <div>
      <p className="text-[12px] text-[var(--bd-muted)]">The queue on your accounts, and what&rsquo;s already out</p>
      <ul className="mt-3 space-y-2">
        {rows.map(([icon, a, w, st, done], i) => (
          <li key={a} className="bd-rise flex items-center gap-3 rounded-[12px] border border-[var(--bd-line)] bg-white px-3 py-2.5" style={delay(i, 0.12)}>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] bg-[var(--bd-soft)]">{icon}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13.5px] font-medium text-[var(--bd-ink)]">{a}</span>
              <span className="text-[11.5px] text-[var(--bd-muted)]">{w}</span>
            </span>
            <span
              className={`shrink-0 whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ${
                done ? "bg-[#e3f5ea] text-[#17784b]" : "bg-[var(--bd-soft)] text-[var(--bd-muted)]"
              }`}
            >
              {st}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Creators() {
  return (
    <div>
      <p className="text-[12px] text-[var(--bd-muted)]">The tier-list style, briefed to a real creator</p>
      <div className="bd-rise mt-3 flex flex-col gap-4 rounded-[16px] border border-[var(--bd-line)] bg-white p-4 sm:flex-row sm:items-center" style={delay(0)}>
        <div className="flex items-center gap-3">
          <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full ring-2 ring-white shadow-[0_2px_8px_rgb(17_17_17/0.15)]">
            <Image src={NISHANT.face} alt={`${NISHANT.name}, ${NISHANT.handle}`} fill sizes="56px" className="object-cover" />
          </span>
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-[14px] font-semibold text-[var(--bd-ink)]">
              {NISHANT.name}
              <InstagramIcon className="h-3.5 w-3.5" />
            </p>
            <a href={NISHANT.url} target="_blank" rel="noopener noreferrer" className="text-[12px] text-[var(--bd-muted)] hover:underline">
              {NISHANT.handle}
            </a>
            <p className="mt-0.5 text-[11.5px] text-[var(--bd-muted)]">
              {NISHANT.followers} followers · {NISHANT.niche.toLowerCase()}
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-between gap-3 sm:justify-end">
          <div className="flex gap-1.5">
            <ReelCard reel={REELS.jobs} className="w-[46px]" play={false} badge={false} />
            <ReelCard reel={REELS.certs} className="w-[46px]" play={false} badge={false} />
            <ReelCard reel={REELS.salary} className="w-[46px]" play={false} badge={false} />
          </div>
          <span className="shrink-0 rounded-full bg-[#e3f5ea] px-2.5 py-1 text-[11px] font-semibold text-[#17784b]">Brief accepted</span>
        </div>
      </div>
      <p className="bd-rise mt-3 text-[12px] text-[var(--bd-muted)]" style={delay(2)}>
        His usual reel gets {NISHANT.usual} views. More creators join as the creator side opens.
      </p>
    </div>
  );
}

function Results() {
  const rows: [string, number, string, string][] = [
    ["Tier list", 100, "212 installs · $1.40 each", "Scale it"],
    ["Salary story", 18, "38 installs · $6.10 each", "Keep testing"],
    ["Day in the life", 3, "4 installs", "Drop"],
  ];
  return (
    <div>
      <p className="flex items-center gap-1.5 text-[12px] text-[var(--bd-muted)]">
        Three weeks of tests, read on installs, with <MetaIcon className="h-3.5 w-3.5" /> Meta ads for the winner
      </p>
      <ul className="mt-3 space-y-3">
        {rows.map(([f, p, n, v], i) => (
          <li key={f} className="bd-rise" style={delay(i, 0.12)}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-[13.5px] font-medium text-[var(--bd-ink)]">{f}</span>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10.5px] font-semibold ${
                  v === "Scale it" ? "bg-[#111] text-white" : "bg-[var(--bd-soft)] text-[var(--bd-muted)]"
                }`}
              >
                {v}
              </span>
            </div>
            <div className="mt-1.5 flex items-center gap-3">
              <Bar pct={Math.max(p, 3)} i={i} dark={i === 0} />
            </div>
            <p className="mt-1 text-[11.5px] text-[var(--bd-muted)]">{n}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

const ASKS: Ask[] = [
  { Icon: Search, ask: "Who am I really competing with?", back: "Your app, read from its store page and reviews, then the apps your users also use.", status: "Live", View: Competitors },
  {
    Icon: Video,
    ask: "What video is winning for them?",
    back: "Each account's videos from the last 60 days, ranked against its own usual, and the formats that repeat. Here, a real read of a creator your users watch.",
    status: "Live",
    View: Winners,
    real: true,
  },
  { Icon: Globe2, ask: "Which market should I start in?", back: "The same read, country by country, so you start where the hook already lands.", status: "Live", View: Markets },
  { Icon: PenLine, ask: "Write me the scripts.", back: "Scripts built from the winners, beat by beat, in your product's words.", status: "Live", View: Script },
  { Icon: CalendarDays, ask: "Lay out my week.", back: "A calendar with a script on every slot, for Reels, Shorts and TikTok.", status: "Live", View: Week },
  { Icon: Clapperboard, ask: "Make it as an AI creator video.", back: "Your version, made with AI as a short creator-style video, before you pay anyone.", status: "Early access", View: Render },
  { Icon: Send, ask: "Post it and watch it.", back: "Out from your accounts, once you approve it.", status: "Early access", View: Posting },
  { Icon: Users, ask: "Get real creators on the winner.", back: "The style that proved itself, briefed to real creators who join HitRate.", status: "Coming soon", View: Creators },
  { Icon: BarChart3, ask: "What actually brought users?", back: "Installs and cost per install by format, and Meta ads behind the one that won.", status: "Coming soon", View: Results },
];

const STAY_MS = 6500;

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

export default function AskConsole() {
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState(0);
  const [inView, setInView] = useState(false);
  const [hold, setHold] = useState(false);
  const still = useStill();
  const box = useRef<HTMLDivElement>(null);

  // Picking the question already on screen leaves it as it is: resetting the
  // typing without changing the question would leave the answer blank.
  const activeRef = useRef(0);
  /** Time spent on the current question, in ms; drives the progress bar (see below). */
  const elapsed = useRef(0);
  const pick = useCallback((i: number) => {
    if (i === activeRef.current) return;
    activeRef.current = i;
    elapsed.current = 0; // reset before the new question renders, so its bar starts empty
    setActive(i);
    setTyped(0);
  }, []);

  // Runs only while at least a third of it is on screen.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.33 });
    if (box.current) io.observe(box.current);
    return () => io.disconnect();
  }, []);

  // Type the question in, a letter at a time.
  useEffect(() => {
    if (still) return;
    const full = ASKS[active].ask.length;
    const id = setInterval(() => {
      setTyped((n) => {
        if (n >= full) {
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, 24);
    return () => clearInterval(id);
  }, [active, still]);

  // Then the next one, unless they are pointing at it, reading it, or asked for less motion.
  // One clock drives both the move to the next question and the progress bar under the
  // active one, so the bar always shows the real time left. Pausing (hover, focus, scrolled
  // away) stops the clock where it is; it carries on from there, never from the start.
  const playing = inView && !hold && !still;
  const fill = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!playing) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      elapsed.current += now - last;
      last = now;
      const p = Math.min(1, elapsed.current / STAY_MS);
      // Written straight to the element, so the bar moves smoothly without re-rendering the console.
      if (fill.current) fill.current.style.transform = `scaleX(${p})`;
      if (p >= 1) {
        pick((activeRef.current + 1) % ASKS.length);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, playing, pick]);

  const a = ASKS[active];
  const text = still ? a.ask : a.ask.slice(0, typed);
  const ready = still || typed >= a.ask.length;

  return (
    <section className="bg-[#fafafa] px-5 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-[1040px]">
        <div className="text-center">
          <p className="text-[12.5px] font-medium uppercase tracking-[0.12em] text-[var(--bd-faint)]">One box, nine jobs</p>
          <h2 className="serif mt-3 text-balance text-[34px] leading-tight text-[var(--bd-ink)] sm:text-[44px]">Ask it the way you&rsquo;d ask your team</h2>
          <p className="mx-auto mt-4 max-w-[500px] text-balance text-[15px] text-[var(--bd-muted)]">
            Every answer starts from what&rsquo;s already working in your category. Each one says whether it&rsquo;s live today.
          </p>
        </div>

        <div
          ref={box}
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => setHold(false)}
          onFocus={() => setHold(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHold(false);
          }}
          className="bd-card mt-12 grid grid-cols-[minmax(0,1fr)] overflow-hidden rounded-[28px] lg:grid-cols-[300px_minmax(0,1fr)]"
        >
          {/* the questions */}
          <div className="min-w-0 border-b border-[var(--bd-line)] p-3 lg:border-b-0 lg:border-r">
            <p className="hidden px-3 pb-2 pt-2 text-[12px] font-medium text-[var(--bd-muted)] lg:block">Ask HitRate</p>
            <ul className="flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] lg:flex-col lg:gap-0.5 lg:overflow-visible lg:pb-0" role="tablist" aria-label="Questions to ask">
              {ASKS.map((q, i) => {
                const on = i === active;
                return (
                  <li key={q.ask} className="shrink-0 lg:shrink">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={on}
                      aria-controls="ask-panel"
                      onClick={() => pick(i)}
                      className={`relative flex w-full items-center gap-2.5 overflow-hidden whitespace-nowrap rounded-[12px] px-3 py-2.5 text-left text-[13.5px] transition-colors lg:whitespace-normal ${
                        on ? "bg-white text-[var(--bd-ink)] shadow-[0_1px_2px_rgb(17_17_17/0.06),0_0_0_1px_rgb(17_17_17/0.07)]" : "text-[var(--bd-muted)] hover:bg-white/70 hover:text-[var(--bd-ink)]"
                      }`}
                    >
                      <q.Icon className="h-4 w-4 shrink-0" aria-hidden />
                      <span className="min-w-0 flex-1">{q.ask}</span>
                      <span
                        className={`h-1.5 w-1.5 shrink-0 rounded-full ${q.status === "Live" ? "bg-[var(--bd-green)]" : "bg-[#c4c7cb]"}`}
                        aria-hidden
                      />
                      {on && !still ? (
                        // The progress bar: a light track that fills while this question is on screen.
                        <span className="absolute inset-x-3 bottom-1 h-[3px] overflow-hidden rounded-full bg-[#111]/10" aria-hidden>
                          <span
                            key={active}
                            ref={fill}
                            className="block h-full w-full origin-left rounded-full bg-[#111]"
                            style={{ transform: `scaleX(${elapsed.current / STAY_MS})` }}
                          />
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* the answer */}
          <div id="ask-panel" role="tabpanel" aria-label={a.ask} className="flex min-h-[460px] min-w-0 flex-col bg-[#f7f8f9] p-4 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <span className="text-[11.5px] font-medium uppercase tracking-[0.1em] text-[var(--bd-faint)]">{a.real ? "A real read by HitRate" : "Illustrative · Pathly, a made-up career app"}</span>
              <StatusChip status={a.status} />
            </div>

            <div className="mt-4 flex justify-end">
              <p className="max-w-[88%] rounded-[18px] rounded-br-md bg-[#111] px-4 py-2.5 text-[14px] font-medium text-white">
                {text}
                {!ready ? <span className="bd-caret ml-px text-white/60">|</span> : null}
              </p>
            </div>

            {ready ? (
              <div key={active} className="mt-4 flex flex-1 flex-col">
                <div className="bd-rise flex gap-2.5">
                  <LogoMark className="mt-0.5 h-5 w-5 shrink-0" />
                  <p className="text-[14px] leading-relaxed text-[var(--bd-text)]">{a.back}</p>
                </div>
                <div className="bd-rise mt-4 flex-1 rounded-[20px] border border-[var(--bd-line)] bg-[#fbfbfc] p-4 sm:p-5" style={delay(0)}>
                  <a.View />
                </div>
              </div>
            ) : (
              <div className="flex-1" />
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
