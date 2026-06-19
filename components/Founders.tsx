import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

type Founder = {
  name: string;
  linkedin: string;
  creds: string[];
  note?: string;
};

const FOUNDERS: Founder[] = [
  {
    name: "Shashank Dixit",
    linkedin: "https://www.linkedin.com/in/shashankdixitt/",
    creds: ["ex-Bentolabs", "ex-Emergent", "ex-Entrepreneur First"],
  },
  {
    name: "Ranveer Kochhar",
    linkedin: "https://www.linkedin.com/in/ranveerkochhar/",
    creds: ["ex-Titan Capital", "ex-Emergent"],
  },
];

export default function Founders() {
  return (
    <section id="founders" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="rounded-[28px] border-2 border-ink bg-cream p-8 shadow-hard sm:p-12">
          {/* header */}
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-ink/70">
              Built by operators
            </span>
            <h2 className="mt-6 max-w-2xl text-[30px] font-bold leading-[1.08] tracking-[-0.025em] text-ink sm:text-[40px]">
              Two founders, building Zimmy from{" "}
              <span className="mark">Titan Capital, Emergent &amp; Bentolabs.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-muted sm:text-[17px]">
              Zimmy is built by operators who shipped product, growth, and capital
              across Titan Capital, Emergent, Bentolabs, and Entrepreneur First.
              That operating system is now Zimmy.
            </p>
          </Reveal>

          {/* founder cards */}
          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            {FOUNDERS.map((f, i) => (
              <Reveal key={f.name} delay={0.08 * (i + 1)}>
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-[20px] border-2 border-ink bg-paper p-7 shadow-hard transition-transform hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-[22px] font-bold tracking-tight text-ink sm:text-[24px]">
                      {f.name}
                    </h3>
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-ink bg-yellow shadow-hard-sm transition-transform group-hover:rotate-12">
                      <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {f.creds.map((c) => (
                      <span
                        key={c}
                        className="inline-flex items-center rounded-full border-2 border-ink bg-cream px-3.5 py-1.5 text-[13px] font-bold text-ink shadow-hard-sm"
                      >
                        {c}
                      </span>
                    ))}
                  </div>

                  {f.note ? (
                    <p className="mt-5 text-[15px] leading-relaxed text-muted">
                      {f.note}
                    </p>
                  ) : null}
                </a>
              </Reveal>
            ))}
          </div>

          {/* track-record stat */}
          <Reveal delay={0.24}>
            <div className="relative mt-5 flex flex-col items-start gap-1 rounded-[20px] border-2 border-ink bg-yellow p-7 shadow-hard-lg sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <span className="tape" aria-hidden />
              <div>
                <p className="flex items-center gap-1 text-[12px] font-bold uppercase tracking-wide text-ink/70">
                  <ArrowUpRight className="h-3.5 w-3.5" /> Founder track record
                </p>
                <p className="mt-3 text-[15.5px] font-semibold text-ink/80">
                  in yearly campaign funnel automated end-to-end, before Zimmy.
                </p>
              </div>
              <p className="text-[58px] font-bold leading-none tracking-[-0.03em] text-ink sm:text-[68px]">
                $30M+
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
