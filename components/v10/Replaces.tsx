import { Check, X } from "lucide-react";
import Reveal from "../Reveal";

/**
 * Okara's "$13,000/mo job from $129/mo" table, with the money taken out: we
 * can't stand behind a market rate or a brand price yet, so this compares the
 * work instead. Same shape, nothing invented.
 */
const ROWS: [string, string, string][] = [
  ["Work out what to make", "Scroll, guess, or wait on an agency deck", "Ask. You get the formats already winning in your category."],
  ["Write it", "Brief a writer, wait, rewrite the brief", "Scripts come back built from those winners."],
  ["Plan it", "A spreadsheet nobody updates past week two", "A calendar in the thread, with a script on every slot."],
  ["Make it", "Pay creators before anyone knows what works", "AI UGC versions first, so the test is cheap."],
  ["Post it", "Four apps, four logins, someone chasing it", "Posted from your accounts after you approve."],
  ["Read it", "Export, argue, start over", "Installs and cost per install, by format."],
];

export default function Replaces() {
  return (
    <section id="instead" className="border-b border-ok-hair px-5 py-24 sm:py-28">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <p className="ok-label text-ok-faint">Instead of</p>
          <h2 className="ok-h mt-4 max-w-2xl text-[36px] text-white sm:text-[48px]">
            The same work. Without the stack.
          </h2>
          <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-ok-muted">
            Six people, four tools and a spreadsheet — or one thread you can read top to bottom.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 overflow-hidden rounded-xl border border-ok-line">
          <div className="hidden grid-cols-[1fr_1.15fr_1.15fr] border-b border-ok-hair bg-ok-card md:grid">
            <p className="ok-label px-6 py-3.5 text-ok-faint">The job</p>
            <p className="ok-label px-6 py-3.5 text-ok-faint">How it goes today</p>
            <p className="ok-label px-6 py-3.5 text-ok-green">In the box</p>
          </div>

          {ROWS.map(([job, before, after]) => (
            <div
              key={job}
              className="grid gap-y-2 border-b border-ok-hair px-6 py-5 last:border-0 md:grid-cols-[1fr_1.15fr_1.15fr] md:gap-y-0 md:px-0 md:py-0"
            >
              <p className="text-[15px] font-medium text-ok-text md:px-6 md:py-5">{job}</p>
              <p className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ok-faint md:px-6 md:py-5">
                <X className="mt-1 h-3.5 w-3.5 shrink-0" strokeWidth={2.5} />
                {before}
              </p>
              <p className="flex items-start gap-2.5 bg-ok-card/40 text-[14px] leading-relaxed text-ok-text md:px-6 md:py-5">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ok-green" strokeWidth={2.5} />
                {after}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
