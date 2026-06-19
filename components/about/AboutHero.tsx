import { ArrowUpRight, Sparkles, Search, LineChart } from "lucide-react";
import Reveal from "../Reveal";

export default function AboutHero() {
  return (
    <section className="px-5 pt-32 sm:pt-40">
      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-4 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-ink/70 shadow-hard-sm">
            About Zimmy
          </span>
          <h1 className="mx-auto mt-7 max-w-4xl text-[40px] font-bold leading-[1.02] tracking-[-0.03em] text-ink sm:text-[58px] md:text-[66px]">
            Running influencer marketing{" "}
            <span className="mark">end-to-end, with AI.</span>
          </h1>
        </Reveal>
      </div>

      {/* hero visual banner */}
      <Reveal delay={0.1} className="mx-auto mt-12 max-w-6xl">
        <div className="relative h-[340px] overflow-hidden rounded-[28px] border-2 border-ink shadow-hard-lg sm:h-[460px]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(135deg, #a9d3ff 0%, #fff9e8 46%, #9be7c4 100%)",
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 opacity-[0.5]"
            style={{
              backgroundImage:
                "radial-gradient(circle at center, rgba(21,18,11,0.10) 1px, transparent 1.4px)",
              backgroundSize: "24px 24px",
            }}
            aria-hidden
          />

          {/* center mock panel */}
          <div className="absolute left-1/2 top-1/2 w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-[18px] border-2 border-ink bg-cream p-5 shadow-hard sm:w-[340px]">
            <p className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-ink/60">
              <span className="live-dot h-2 w-2 rounded-full bg-accent" /> Campaign engine
            </p>
            <div className="mt-3 space-y-2">
              {[
                { i: Search, t: "Discovering creators", c: "bg-yellow" },
                { i: Sparkles, t: "Writing scripts & UTMs", c: "bg-pink" },
                { i: LineChart, t: "Tracking revenue", c: "bg-mint" },
              ].map((r, k) => {
                const Icon = r.i;
                return (
                  <div key={k} className="flex items-center gap-2.5 rounded-lg border-2 border-ink/10 bg-paper px-3 py-2">
                    <span className={`grid h-7 w-7 place-items-center rounded-md border-2 border-ink ${r.c} text-ink`}>
                      <Icon className="h-3.5 w-3.5" strokeWidth={2.3} />
                    </span>
                    <span className="text-[13px] font-semibold text-ink">{r.t}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* floating stat cards */}
          <div className="absolute left-4 top-5 hidden rotate-[-5deg] rounded-2xl border-2 border-ink bg-yellow px-4 py-3 shadow-hard sm:left-10 sm:block">
            <p className="text-[26px] font-bold leading-none text-ink">12×</p>
            <p className="mt-1 text-[12px] font-semibold text-ink/70">faster to launch</p>
          </div>
          <div className="absolute bottom-6 right-5 hidden rotate-[4deg] rounded-2xl border-2 border-ink bg-pink px-4 py-3 shadow-hard sm:right-12 sm:block">
            <p className="text-[26px] font-bold leading-none text-ink">+128%</p>
            <p className="mt-1 text-[12px] font-semibold text-ink/70">attributed revenue</p>
          </div>
          <div className="absolute right-8 top-8 hidden rotate-[6deg] rounded-xl border-2 border-ink bg-cream px-3 py-2 shadow-hard-sm lg:block">
            <p className="flex items-center gap-1.5 text-[12px] font-bold text-ink">
              <ArrowUpRight className="h-3.5 w-3.5 text-accent" /> $30M+ automated
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
