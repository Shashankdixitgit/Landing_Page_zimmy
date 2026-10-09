import { Sparkle, Search, PenLine, LineChart } from "lucide-react";
import Reveal from "../Reveal";
import CreatorCard, { CREATORS } from "../CreatorCard";

const STEPS = [
  { i: Search, t: "Discovering creators" },
  { i: PenLine, t: "Writing scripts & links" },
  { i: LineChart, t: "Tracking revenue" },
];

export default function AboutHero() {
  return (
    <section className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="sky-frame relative overflow-hidden rounded-[28px] px-5 pb-16 pt-36 text-center sm:rounded-[36px] sm:pt-44">
        <Reveal>
          <p className="text-[13px] font-medium text-white/85">About Zimmy</p>
          <h1 className="display mx-auto mt-5 max-w-3xl text-[44px] text-white [text-shadow:0_2px_30px_rgb(20_60_100/0.25)] sm:text-[64px] md:text-[72px]">
            Influencer marketing,
            <br />
            run end-to-end by AI.
          </h1>
        </Reveal>

        <Reveal delay={0.1} className="relative mx-auto mt-14 flex max-w-4xl items-center justify-center gap-6">
          <div className="hidden -rotate-6 sm:block" aria-hidden>
            <CreatorCard c={CREATORS[3]} className="w-[160px]" compact />
          </div>
          <div className="w-[290px] rounded-[20px] bg-surface p-5 text-left lift sm:w-[320px]">
            <p className="flex items-center gap-2 text-[13px] font-medium text-ink">
              <span className="grid h-6 w-6 place-items-center rounded-md bg-zimmy text-white">
                <Sparkle className="h-3 w-3" fill="currentColor" />
              </span>
              Campaign engine
              <span className="live-dot ml-auto h-2 w-2 rounded-full bg-accent" />
            </p>
            <div className="mt-4 space-y-2">
              {STEPS.map((r) => {
                const Icon = r.i;
                return (
                  <div key={r.t} className="flex items-center gap-3 rounded-xl bg-soft px-3 py-2.5">
                    <Icon className="h-4 w-4 text-accent" strokeWidth={1.9} />
                    <span className="text-[13.5px] text-ink">{r.t}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="hidden rotate-6 sm:block" aria-hidden>
            <CreatorCard c={CREATORS[4]} className="w-[160px]" compact />
          </div>
        </Reveal>
        <div className="clouds pointer-events-none absolute inset-x-0 bottom-0 h-32" aria-hidden />
      </div>
    </section>
  );
}
