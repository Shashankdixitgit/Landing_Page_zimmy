import Reveal from "./Reveal";
import { SplitHead } from "./ui";

const ROWS = [
  ["Where ideas come from", "Scrolling feeds and gut feel", "Competitors' proven winners, with the numbers"],
  ["Cost to test one idea", "A creator video at $150–300 or more", "An AI video, at a fraction of that"],
  ["Time to first result", "Weeks of finding, briefing and revising", "Days"],
  ["Ideas tested per month", "A handful", "Dozens"],
  ["How success is judged", "Views and likes", "Downloads, trials and revenue per video"],
  ["Where the big budget goes", "Behind hope", "Only behind proven formats"],
];

export default function BeforeAfter() {
  return (
    <section id="compare" className="px-4 py-20 sm:px-5 sm:py-24">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                Your month,
                <br />
                before and after.
              </>
            }
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12 overflow-hidden rounded-[22px] border border-line bg-surface">
          <div className="grid grid-cols-2 border-b border-line text-[13.5px] font-medium md:grid-cols-[1.1fr_1fr_1fr]">
            <div className="hidden px-6 py-4 text-muted md:block" />
            <div className="px-4 py-4 text-ink md:px-6">Today</div>
            <div className="bg-mint px-4 py-4 text-accent md:px-6">With Zimmy</div>
          </div>
          {ROWS.map(([label, before, after], i) => (
            <div
              key={label}
              className={`grid grid-cols-2 md:grid-cols-[1.1fr_1fr_1fr] ${i < ROWS.length - 1 ? "border-b border-line" : ""}`}
            >
              <div className="col-span-2 px-4 pt-4 text-[12.5px] font-medium text-faint md:col-span-1 md:px-6 md:py-4 md:text-[14px] md:text-ink">
                {label}
              </div>
              <div className="px-4 pb-4 pt-1.5 text-[14px] text-muted md:px-6 md:py-4">{before}</div>
              <div className="bg-mint/50 px-4 pb-4 pt-1.5 text-[14px] font-medium text-ink md:px-6 md:py-4">{after}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
