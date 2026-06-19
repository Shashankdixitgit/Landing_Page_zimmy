import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

const CREDS = ["ex-Bentolabs", "ex-Emergent", "ex-Entrepreneur First"];

export default function Founders() {
  return (
    <section id="founders" className="py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-8 rounded-[28px] border-2 border-ink bg-cream p-8 shadow-hard sm:p-12 lg:grid-cols-[1.15fr_0.85fr]">
          {/* left */}
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-paper px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-[0.14em] text-ink/70">
              Built by operators
            </span>
            <h2 className="mt-6 max-w-xl text-[30px] font-bold leading-[1.08] tracking-[-0.025em] text-ink sm:text-[40px]">
              Built by the engineers and marketers behind{" "}
              <span className="mark">Bentolabs &amp; Emergent.</span>
            </h2>
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted sm:text-[17px]">
              Our founding team shipped product and growth at Bentolabs and Emergent,
              and built earlier at Entrepreneur First. Founder{" "}
              <a
                href="https://www.linkedin.com/in/shashankdixitt/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-ink underline underline-offset-2 hover:text-accent"
              >
                Shashank Dixit
              </a>{" "}
              has automated yearly campaign funnels worth up to{" "}
              <span className="font-semibold text-ink">$30M</span>. That operating
              system is now Zimmy.
            </p>

            <div className="mt-7 flex flex-wrap gap-2.5">
              {CREDS.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-paper px-4 py-2 text-[13.5px] font-bold text-ink shadow-hard-sm"
                >
                  {c}
                </span>
              ))}
            </div>
          </Reveal>

          {/* right, hero stat card */}
          <Reveal delay={0.1}>
            <div className="relative rounded-[20px] border-2 border-ink bg-yellow p-7 shadow-hard-lg sm:p-8">
              <span className="tape" aria-hidden />
              <p className="flex items-center gap-1 text-[12px] font-bold uppercase tracking-wide text-ink/70">
                <ArrowUpRight className="h-3.5 w-3.5" /> Founder track record
              </p>
              <p className="mt-4 text-[58px] font-bold leading-none tracking-[-0.03em] text-ink sm:text-[68px]">
                $30M+
              </p>
              <p className="mt-3 text-[15.5px] font-semibold text-ink/80">
                in yearly campaign funnel automated end-to-end, before Zimmy.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
