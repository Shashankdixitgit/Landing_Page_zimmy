"use client";

import { useEffect, useRef, useState } from "react";
import { Clapperboard, Globe, PenLine } from "lucide-react";
import { RunRing, StepList, StepRow, type StepState } from "./RunParts";
import Reveal from "./Reveal";
import { InstagramIcon, MetaIcon, ShortsIcon, TikTokIcon } from "./Brands";

/**
 * What a full run looks like, played on a loop for a made-up habit app called
 * Dawn. Labelled as an example on the page. It runs only while on screen, and
 * people who ask for less motion get the finished state, still.
 */
const BEATS: { at: number; states: [StepState, StepState, StepState]; notes: [string, string, string]; badge: [number | null, number | null, number | null] }[] = [
  { at: 0, states: ["active", "waiting", "waiting"], notes: ["Reading dawnhabits.app", "Starts once we've read your app", "Written from the winners"], badge: [1, null, null] },
  { at: 3, states: ["active", "waiting", "waiting"], notes: ["Reading App Store reviews", "Starts once we've read your app", "Written from the winners"], badge: [2, null, null] },
  { at: 6, states: ["done", "active", "waiting"], notes: ["A habit tracker · India", "Watching TikTok, Reels and Shorts in habit apps", "Written from the winners"], badge: [null, 1, null] },
  { at: 10, states: ["done", "active", "waiting"], notes: ["A habit tracker · India", "Spotting videos that did far better than usual", "Written from the winners"], badge: [null, 2, null] },
  { at: 14, states: ["done", "done", "active"], notes: ["A habit tracker · India", "Winning styles for apps like Dawn", "Drafting the first scripts"], badge: [null, null, 1] },
  { at: 18, states: ["done", "done", "done"], notes: ["A habit tracker · India", "Winning styles for apps like Dawn", "Scripts, laid out in a calendar"], badge: [null, null, null] },
];
const LOOP = 23;

const PAGES: { label: string; Icon?: (p: { className?: string }) => React.ReactNode }[] = [
  { label: "dawnhabits.app" },
  { label: "App Store reviews" },
  { label: "Google Play reviews" },
  { label: "TikTok", Icon: TikTokIcon },
  { label: "Instagram Reels", Icon: InstagramIcon },
  { label: "YouTube Shorts", Icon: ShortsIcon },
  { label: "Competitors' Meta ads", Icon: MetaIcon },
];

export default function ExampleRun() {
  const [t, setT] = useState(0);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timer: ReturnType<typeof setInterval> | null = null;
    const io = new IntersectionObserver(
      ([e]) => {
        // Less motion asked for: the finished run, still.
        if (still) {
          if (e.isIntersecting) setT(BEATS[BEATS.length - 1].at);
          return;
        }
        if (e.isIntersecting && !timer) timer = setInterval(() => setT((x) => (x + 0.5) % LOOP), 500);
        if (!e.isIntersecting && timer) {
          clearInterval(timer);
          timer = null;
        }
      },
      { threshold: 0.25 },
    );
    if (box.current) io.observe(box.current);
    return () => {
      io.disconnect();
      if (timer) clearInterval(timer);
    };
  }, []);

  const beat = [...BEATS].reverse().find((b) => t >= b.at) ?? BEATS[0];
  const last = BEATS[BEATS.length - 1].at;
  const done = t >= last;

  return (
    <section className="px-5 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-[640px] text-center">
        <p className="text-[12.5px] font-medium uppercase tracking-[0.12em] text-[var(--bd-faint)]">Illustrative example</p>
        <h2 className="serif mt-3 text-balance text-[34px] leading-tight text-[var(--bd-ink)] sm:text-[44px]">What a full run covers</h2>

        <div ref={box} className="mx-auto mt-10 max-w-[560px]">
          <RunRing
            label="Dw"
            progress={done ? 1 : Math.min(0.97, t / last)}
            busy={!done}
            timer={done ? "Done" : "Example"}
          />
          <p className="mt-6 text-[19px] font-semibold text-[var(--bd-ink)]">Dawn</p>
          <p className="mx-auto mt-1.5 max-w-[420px] text-pretty text-[14.5px] leading-relaxed text-[var(--bd-muted)]">
            Dawn is a made-up habit app, and every step below is made up too. Your own run starts after the sign-up, with the founders.
          </p>

          <div className="mt-8">
            <StepList>
              <StepRow icon={<Globe className="h-[18px] w-[18px]" />} title="Reading your app" note={beat.notes[0]} state={beat.states[0]} badge={beat.badge[0]} />
              <StepRow icon={<Clapperboard className="h-[18px] w-[18px]" />} title="Finding what's winning" note={beat.notes[1]} state={beat.states[1]} badge={beat.badge[1]} />
              <StepRow icon={<PenLine className="h-[18px] w-[18px]" />} title="Your first scripts" note={beat.notes[2]} state={beat.states[2]} badge={beat.badge[2]} />
            </StepList>
          </div>

          <div className="mt-8 text-left">
            <p className="text-center text-[13px] text-[var(--bd-muted)]">What HitRate reads in a full run</p>
            <ul className="mt-3 flex flex-wrap justify-center gap-1.5">
              {PAGES.map(({ label, Icon }) => (
                <li key={label} className="inline-flex items-center gap-1.5 rounded-full border border-[var(--bd-line)] bg-white px-3 py-1 text-[12.5px] text-[var(--bd-text)]">
                  {Icon ? <Icon className="h-3.5 w-3.5" /> : null}
                  {label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
