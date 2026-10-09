import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import { SectionHead } from "./ui";

const CREDS = ["ex-Bentolabs", "ex-Emergent", "ex-Entrepreneur First"];

export default function Founders() {
  return (
    <section id="founder" className="py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHead
            eyebrow="Who's building it"
            title={
              <>
                Built by an operator,{" "}
                <span className="serif text-accent-soft">not just a tool-maker.</span>
              </>
            }
            sub="Zimmy comes from years of running growth and product at Emergent, Bentolabs and Entrepreneur First, and automating the campaign funnels behind them."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <a
              href="https://www.linkedin.com/in/shashankdixitt/"
              target="_blank"
              rel="noopener noreferrer"
              className="card group flex h-full flex-col justify-between p-8 transition-colors hover:border-line-strong"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-accent to-violet font-display text-[22px] font-bold text-white">
                    SD
                  </span>
                  <div>
                    <h3 className="font-display text-[26px] font-bold tracking-tight text-snow">Shashank Dixit</h3>
                    <p className="text-[14.5px] text-muted">Founder &amp; CEO</p>
                  </div>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line-strong text-snow transition-transform group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
              <div className="mt-10 flex flex-wrap gap-2">
                {CREDS.map((c) => (
                  <span key={c} className="rounded-full border border-line-strong bg-white/[0.03] px-3.5 py-1.5 text-[13px] font-medium text-snow/85">
                    {c}
                  </span>
                ))}
              </div>
            </a>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="card-glow relative flex h-full flex-col justify-between overflow-hidden p-8">
              <div
                className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full opacity-50 blur-[90px]"
                style={{ background: "#ff4d3d" }}
                aria-hidden
              />
              <p className="relative text-[12px] font-semibold uppercase tracking-[0.14em] text-faint">
                Founder track record
              </p>
              <div className="relative mt-10">
                <p className="font-display text-[72px] font-bold leading-none tracking-[-0.04em] text-snow sm:text-[88px]">
                  $30M+
                </p>
                <p className="mt-3 max-w-sm text-[15.5px] leading-relaxed text-muted">
                  in yearly campaign funnels automated end-to-end, before Zimmy.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
