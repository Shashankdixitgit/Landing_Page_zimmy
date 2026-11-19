"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Check, FileDown, FileText, HandCoins, KeyRound, Presentation, Sheet, type LucideIcon } from "lucide-react";
import { StatusChip } from "./ExampleThread";
import { MetaIcon, PlatformRow } from "../v15/Brands";

/**
 * "The whole week, without the busywork": a marketing week, Monday to
 * Saturday. Each day's job is done the old way first (an agency deck, a brief,
 * a spreadsheet...), which gets crossed out as the row comes into view, and is
 * replaced by the one line you'd type into the box and what comes back. Each
 * answer carries the status of that part of HitRate today.
 */
type Day = {
  day: string;
  job: string;
  OldIcon: LucideIcon;
  old: string;
  ask: string;
  back: string;
  status: "Live" | "Early access" | "Coming soon";
};

const WEEK: Day[] = [
  {
    day: "Mon",
    job: "Work out what to make",
    OldIcon: Presentation,
    old: "Scroll, guess, or wait on an agency deck",
    ask: "What's winning in my category?",
    back: "The formats already winning, in one answer",
    status: "Live",
  },
  {
    day: "Tue",
    job: "Write it",
    OldIcon: FileText,
    old: "Brief a writer, wait, rewrite the brief",
    ask: "Write scripts from the top three.",
    back: "Scripts built from those winners",
    status: "Live",
  },
  {
    day: "Wed",
    job: "Plan it",
    OldIcon: Sheet,
    old: "A spreadsheet nobody updates past week two",
    ask: "Lay out next week.",
    back: "A calendar with a script on every slot",
    status: "Live",
  },
  {
    day: "Thu",
    job: "Make it",
    OldIcon: HandCoins,
    old: "Pay creators before anyone knows what works",
    ask: "Make Tuesday's as a test video.",
    back: "An AI-made version first, so the test is cheap",
    status: "Early access",
  },
  {
    day: "Fri",
    job: "Post it",
    OldIcon: KeyRound,
    old: "Four apps, four logins, someone chasing it",
    ask: "Post it once I approve.",
    back: "Out from your accounts when you say yes",
    status: "Early access",
  },
  {
    day: "Sat",
    job: "Read it",
    OldIcon: FileDown,
    old: "Export, argue, start over",
    ask: "What brought users?",
    back: "Installs and cost per install, by format, with Meta ads",
    status: "Coming soon",
  },
];

export default function BusyWeek() {
  const card = useRef<HTMLDivElement>(null);

  // Rows play once, each as it comes into view.
  useEffect(() => {
    const rows = card.current?.querySelectorAll<HTMLElement>("[data-row]");
    if (!rows?.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.setAttribute("data-shown", "");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.6 },
    );
    rows.forEach((r) => io.observe(r));
    return () => io.disconnect();
  }, []);

  return (
    <section className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[960px]">
        <div className="text-center">
          <p className="text-[12.5px] font-medium uppercase tracking-[0.12em] text-[var(--bd-faint)]">Your week, before and after</p>
          <h2 className="serif mt-3 text-balance text-[34px] leading-tight text-[var(--bd-ink)] sm:text-[44px]">The whole week, without the busywork</h2>
          <p className="mx-auto mt-4 max-w-[500px] text-balance text-[15px] text-[var(--bd-muted)]">
            It won&rsquo;t beat a team at taste. It beats one at the part that is just work.
          </p>
        </div>

        <div ref={card} className="bd-card mt-12 overflow-hidden rounded-[28px]">
          <div className="hidden grid-cols-[180px_1fr_1.25fr] gap-6 border-b border-[var(--bd-line)] bg-[#fafafa] px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.08em] text-[var(--bd-faint)] md:grid">
            <span>The job</span>
            <span>Today</span>
            <span>From the chat box</span>
          </div>
          <ol className="divide-y divide-[var(--bd-line)]">
            {WEEK.map((d, i) => (
              <li
                key={d.day}
                data-row
                className="bd-week-row grid gap-4 px-5 py-6 sm:px-7 md:grid-cols-[220px_1fr_1.2fr] md:items-center md:gap-6"
                style={{ "--i": i } as CSSProperties}
              >
                <div className="flex items-center gap-3 md:block">
                  <span className="inline-grid h-7 min-w-[44px] place-items-center rounded-full bg-[#111] px-2.5 text-[12px] font-semibold text-white">{d.day}</span>
                  <p className="serif text-balance text-[21px] leading-snug text-[var(--bd-ink)] md:mt-2.5">{d.job}</p>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-[9px] bg-[var(--bd-soft)] text-[var(--bd-muted)]" aria-hidden>
                    <d.OldIcon className="h-3.5 w-3.5" />
                  </span>
                  <p className="text-[14px] leading-relaxed text-[var(--bd-muted)]">
                    <span className="sr-only">Today: </span>
                    <span className="bd-strike">{d.old}</span>
                  </p>
                </div>

                <div className="bd-week-new">
                  <span className="sr-only">From the chat box: </span>
                  <p className="inline-block rounded-[16px] rounded-bl-md bg-[#111] px-3.5 py-2 text-[13.5px] font-medium text-white">{d.ask}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-2.5 gap-y-1.5">
                    <span className="flex items-center gap-1.5 text-[13.5px] text-[var(--bd-text)]">
                      <Check className="h-3.5 w-3.5 shrink-0 text-[var(--bd-green)]" strokeWidth={3} aria-hidden />
                      {d.back}
                    </span>
                    {d.day === "Fri" || d.day === "Mon" ? <PlatformRow className="h-4 w-4" /> : null}
                    {d.day === "Sat" ? <MetaIcon className="h-4 w-4" /> : null}
                    <StatusChip status={d.status} />
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div className="flex flex-col items-center justify-between gap-2 border-t border-[var(--bd-line)] bg-[#fafafa] px-7 py-4 text-center sm:flex-row sm:text-left">
            <p className="serif text-[19px] text-[var(--bd-ink)]">Six jobs, one place to ask.</p>
            <p className="text-[13px] text-[var(--bd-muted)]">Nothing goes out without your OK.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
