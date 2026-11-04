"use client";

import { useEffect, useRef, useState } from "react";
import { PHASES, PLAN_DAYS, FREE_DAYS, WRITTEN_DAYS, KIND_BY_DAY, PRO_PRICE_USD, phaseOf } from "@/lib/planPhases";

type State = "free" | "pro" | "later";

const stateOf = (d: number): State => (d <= FREE_DAYS ? "free" : d <= WRITTEN_DAYS ? "pro" : "later");

const TICK_MS = 3500;
const HOLD_MS = 60_000;

const STATE_LABEL: Record<State, string> = {
  free: "Free, written now",
  pro: `With Pro, $${PRO_PRICE_USD}/month`,
  later: "Later",
};

const DAY_CLS: Record<State, string> = {
  free: "bg-accent text-white border border-accent",
  pro: "bg-sky text-[#235a80] border border-[#bcd8ec]",
  later: "bg-transparent text-faint border border-dashed border-line",
};

const SWATCH: Record<State, string> = {
  free: "bg-accent-bright",
  pro: "bg-sky",
  later: "border border-dashed border-white/50",
};

const CHIP: Record<State, string> = {
  free: "bg-mint text-accent",
  pro: "bg-sky text-[#235a80]",
  later: "bg-soft text-muted",
};

/**
 * The 60-day plan as a clickable calendar, ported from the HitRate creator app.
 * Every word in the day card comes from the plan's own constants or from the
 * sample report's real drafts: no post text is invented for any day.
 *
 * Until someone picks a day it plays days 1-7 on a loop, once the calendar is on
 * screen. A pick holds for a minute, then the loop picks up again.
 */
export default function PlanCalendar({ drafts, handle }: { drafts: string[]; handle: string }) {
  const [day, setDay] = useState(1);
  const cells = useRef<(HTMLButtonElement | null)[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const heldUntil = useRef(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let seen = false;
    const io = new IntersectionObserver(([e]) => {
      seen = e.isIntersecting;
    }, { threshold: 0.3 });
    if (root.current) io.observe(root.current);
    const t = setInterval(() => {
      if (!seen || Date.now() < heldUntil.current) return;
      setDay((d) => (d >= FREE_DAYS ? 1 : d + 1));
    }, TICK_MS);
    return () => {
      clearInterval(t);
      io.disconnect();
    };
  }, []);

  function pick(d: number) {
    heldUntil.current = Date.now() + HOLD_MS;
    setDay(d);
  }

  function go(d: number) {
    const next = Math.min(PLAN_DAYS, Math.max(1, d));
    pick(next);
    cells.current[next - 1]?.focus();
  }

  function onKey(e: React.KeyboardEvent, d: number) {
    const step: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1, ArrowDown: 5, ArrowUp: -5 };
    if (e.key in step) {
      e.preventDefault();
      go(d + step[e.key]);
    } else if (e.key === "Home") {
      e.preventDefault();
      go(1);
    } else if (e.key === "End") {
      e.preventDefault();
      go(PLAN_DAYS);
    }
  }

  const phase = phaseOf(day);
  const state = stateOf(day);
  const kind = day <= WRITTEN_DAYS ? KIND_BY_DAY[day - 1] : null;
  // The plan seeds the report's drafts onto the first proven days, so the sample shows them on the same days.
  const provenDays = KIND_BY_DAY.map((k, i) => (k === "proven" ? i + 1 : 0)).filter(Boolean);
  const slot = provenDays.indexOf(day);
  const draft = slot >= 0 && slot < drafts.length ? drafts[slot] : null;

  return (
    <div className="mt-10 text-left" ref={root}>
      <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2.5 text-[14px] font-medium text-white" aria-label="Legend">
        {(["free", "pro", "later"] as State[]).map((s) => (
          <li key={s} className="inline-flex items-center gap-2.5">
            <i className={`h-4 w-4 rounded-[5px] ${SWATCH[s]}`} aria-hidden />
            {STATE_LABEL[s]}
          </li>
        ))}
      </ul>

      <p className="mt-3 text-center text-[13.5px] text-white/60" aria-hidden>
        Tap any day to see what it holds
      </p>
      <p id="pc-hint" className="sr-only">
        Pick a day to see what it holds. Arrow keys move between days.
      </p>

      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
        {PHASES.map((p) => (
          <div key={p.key} role="group" aria-label={`${p.name}, days ${p.from} to ${p.to}`} className="rounded-[22px] bg-surface p-4 sm:p-5">
            <div className="mb-3.5 flex items-baseline justify-between gap-2">
              <span className="display text-[22px] text-ink">{p.name}</span>
              <span className="whitespace-nowrap text-[12.5px] font-medium text-muted">
                Days {p.from}–{p.to}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {Array.from({ length: p.to - p.from + 1 }, (_, k) => {
                const d = p.from + k;
                const s = stateOf(d);
                const on = d === day;
                return (
                  <button
                    key={d}
                    ref={(el) => {
                      cells.current[d - 1] = el;
                    }}
                    type="button"
                    className={`grid h-11 place-items-center rounded-xl text-[13.5px] font-semibold tabular-nums transition-all duration-200 sm:h-auto sm:aspect-square ${DAY_CLS[s]} ${
                      on ? "ring-2 ring-ink ring-offset-2 ring-offset-surface" : "hover:-translate-y-0.5"
                    }`}
                    aria-pressed={on}
                    aria-label={`Day ${d}, ${p.name}, ${STATE_LABEL[s]}`}
                    aria-describedby="pc-hint"
                    tabIndex={on ? 0 : -1}
                    onClick={() => pick(d)}
                    onKeyDown={(e) => onKey(e, d)}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div key={day} className="day-in mx-auto mt-4 max-w-[760px] rounded-[22px] bg-surface p-5 text-ink sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="display mr-1.5 text-[34px] sm:text-[40px]">Day {day}</span>
          <span className="rounded-full bg-soft px-3 py-1 text-[12.5px] font-medium text-ink">
            Window {PHASES.indexOf(phase) + 1} · {phase.name}
          </span>
          {kind ? (
            <span className="rounded-full bg-soft px-3 py-1 text-[12.5px] font-medium text-ink">{kind === "proven" ? "Proven" : "Experiment"}</span>
          ) : null}
          <span className={`rounded-full px-3 py-1 text-[12.5px] font-medium ${CHIP[state]}`}>{STATE_LABEL[state]}</span>
        </div>
        {draft ? (
          <>
            <p className="mt-4 text-[12px] font-medium uppercase tracking-[0.06em] text-muted">Sample draft from @{handle}&apos;s report</p>
            <div
              className="mt-2 whitespace-pre-wrap rounded-r-2xl rounded-l-md border-l-[3px] border-accent bg-paper px-4 py-3 text-[15px] leading-relaxed"
              tabIndex={0}
              aria-label={`Sample draft for day ${day}`}
            >
              {draft}
            </div>
          </>
        ) : kind ? (
          <p className="mt-3.5 text-[17px] font-medium">{kind === "proven" ? "A post built on what works" : "A one-change experiment"}</p>
        ) : (
          <p className="mt-3.5 text-[17px] font-medium">{phase.line}</p>
        )}
      </div>
    </div>
  );
}
