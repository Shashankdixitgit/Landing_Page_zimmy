import { Search, CalendarDays, BadgeDollarSign } from "lucide-react";
import Reveal from "./Reveal";
import { Chip, SplitHead } from "./ui";

const STEPS = [
  { n: "01", icon: Search, title: "Tell us your niche", status: "Live" },
  { n: "02", icon: CalendarDays, title: "Get a weekly plan of what’s working", status: "Coming soon" },
  { n: "03", icon: BadgeDollarSign, title: "Get matched with brands that fit", status: "Live" },
];

export default function CreatorSteps() {
  return (
    <section className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                Three steps.
                <br />
                No guessing.
              </>
            }
          />
        </Reveal>
        <Reveal stagger={0.1} className="mt-12 grid gap-4 md:grid-cols-3">
          {STEPS.map((s) => {
            const Icon = s.icon;
            return (
              <article key={s.n} className="flex min-h-[200px] flex-col rounded-[22px] border border-line bg-surface p-7">
                <div className="flex items-center justify-between">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-mint text-accent">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <Chip tone={s.status === "Live" ? "mint" : "soft"}>{s.status}</Chip>
                </div>
                <p className="mt-auto pt-10 text-[13px] font-medium text-faint">Step {s.n}</p>
                <h3 className="display mt-1 text-[24px] text-ink">{s.title}</h3>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
