import { ArrowRight, Check, X } from "lucide-react";
import Reveal from "../Reveal";
import { SplitHead } from "../ui";

/**
 * The okara-style comparison, but with no invented prices or customer counts:
 * it compares the work, not a monthly figure we cannot stand behind.
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
    <section id="instead" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                The same work.
                <br />
                Without the stack.
              </>
            }
            sub="Six people, four tools and a spreadsheet, or one thread you can read top to bottom."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12 overflow-hidden rounded-[26px] border border-line bg-surface">
          {/* header */}
          <div className="hidden grid-cols-[1fr_1.15fr_1.15fr] border-b border-line bg-soft/60 md:grid">
            <p className="px-6 py-3.5 text-[12.5px] font-medium text-faint">The job</p>
            <p className="px-6 py-3.5 text-[12.5px] font-medium text-faint">How it goes today</p>
            <p className="px-6 py-3.5 text-[12.5px] font-medium text-accent">In the box</p>
          </div>

          {ROWS.map(([job, before, after]) => (
            <div key={job} className="grid gap-y-2 border-b border-line px-6 py-5 last:border-0 md:grid-cols-[1fr_1.15fr_1.15fr] md:gap-y-0 md:px-0 md:py-0">
              <p className="text-[15px] font-medium text-ink md:px-6 md:py-5">{job}</p>
              <p className="flex items-start gap-2.5 text-[14px] leading-relaxed text-muted md:px-6 md:py-5">
                <X className="mt-1 h-3.5 w-3.5 shrink-0 text-faint" strokeWidth={2.5} />
                {before}
              </p>
              <p className="flex items-start gap-2.5 text-[14px] leading-relaxed text-ink/85 md:bg-[#f7fbf6] md:px-6 md:py-5">
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" strokeWidth={2.5} />
                {after}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal delay={0.15} className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-muted">
          <span className="inline-flex items-center gap-2">
            <ArrowRight className="h-3.5 w-3.5 text-accent" /> Everything in one thread you can scroll back through
          </span>
          <span className="inline-flex items-center gap-2">
            <ArrowRight className="h-3.5 w-3.5 text-accent" /> No new tool for your team to learn
          </span>
        </Reveal>
      </div>
    </section>
  );
}
