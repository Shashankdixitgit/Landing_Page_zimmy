import { Sparkle, Search, PenLine, LineChart } from "lucide-react";
import Reveal from "../Reveal";
import CreatorCard, { CREATORS } from "../CreatorCard";
import { Eyebrow } from "../ui";

const STEPS = [
  { i: Search, t: "Discovering creators" },
  { i: PenLine, t: "Writing scripts & links" },
  { i: LineChart, t: "Tracking revenue" },
];

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden px-5 pt-36 sm:pt-44">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-5xl text-center">
        <Reveal>
          <Eyebrow>About Zimmy</Eyebrow>
          <h1 className="mx-auto mt-8 max-w-4xl font-display text-[44px] font-bold leading-[1.0] tracking-[-0.045em] text-snow sm:text-[64px] md:text-[76px]">
            Influencer marketing,{" "}
            <span className="serif glow-text">run end-to-end by AI.</span>
          </h1>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="relative mx-auto mt-14 max-w-6xl">
        <div className="card-glow relative h-[380px] overflow-hidden sm:h-[460px]">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
            style={{ background: "radial-gradient(closest-side, #ff4d3d, rgb(155 140 255 / 0.45), transparent)" }}
            aria-hidden
          />

          <div className="absolute left-[8%] top-1/2 hidden -translate-y-1/2 -rotate-6 sm:block" aria-hidden>
            <CreatorCard c={CREATORS[3]} className="w-[170px]" compact />
          </div>
          <div className="absolute right-[8%] top-1/2 hidden -translate-y-1/2 rotate-6 sm:block" aria-hidden>
            <CreatorCard c={CREATORS[4]} className="w-[170px]" compact />
          </div>

          <div className="absolute left-1/2 top-1/2 w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-line-strong bg-coal/90 p-5 text-left shadow-2xl backdrop-blur-xl sm:w-[320px]">
            <p className="flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">
              <span className="grid h-5 w-5 place-items-center rounded-md bg-accent text-white">
                <Sparkle className="h-3 w-3" fill="currentColor" />
              </span>
              Campaign engine
              <span className="live-dot ml-auto h-2 w-2 rounded-full bg-lime" />
            </p>
            <div className="mt-4 space-y-2">
              {STEPS.map((r) => {
                const Icon = r.i;
                return (
                  <div key={r.t} className="flex items-center gap-3 rounded-xl border border-line bg-slate px-3 py-2.5">
                    <Icon className="h-4 w-4 text-accent-soft" strokeWidth={2.2} />
                    <span className="text-[13.5px] font-medium text-snow">{r.t}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
