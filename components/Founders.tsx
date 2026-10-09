import { ArrowUpRight, Check } from "lucide-react";
import Reveal from "./Reveal";
import { SplitHead } from "./ui";

const CREDS = ["ex-Bentolabs", "ex-Emergent", "ex-Entrepreneur First"];

export default function Founders() {
  return (
    <section id="founder" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                Built by an operator.
                <br />
                Not just a tool-maker.
              </>
            }
            sub="Zimmy comes from years of running growth and campaign funnels at Emergent, Bentolabs and Entrepreneur First, where guessing was expensive."
          />
        </Reveal>

        <Reveal stagger={0.1} className="mt-12 grid items-stretch gap-5 md:grid-cols-2">
          <a
            href="https://www.linkedin.com/in/shashankdixitt/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-[26px] border border-line bg-surface p-7 transition-colors hover:border-ink/20 sm:p-8"
          >
            <div className="flex items-start justify-between">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sky text-[18px] font-medium text-[#235a80]">
                SD
              </span>
              <ArrowUpRight className="h-5 w-5 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </div>
            <h3 className="display mt-8 text-[30px] text-ink">Shashank Dixit</h3>
            <p className="mt-1 text-[14.5px] text-muted">Founder &amp; CEO</p>
            <ul className="mt-6 space-y-3 border-t border-line pt-6">
              {CREDS.map((c) => (
                <li key={c} className="flex items-center gap-3 text-[14px] text-ink/85">
                  <Check className="h-4 w-4 text-accent" strokeWidth={2} /> {c}
                </li>
              ))}
            </ul>
          </a>

          <div className="flex flex-col justify-between rounded-[26px] border border-[#2c4a3c] bg-night p-7 text-white sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-[14px] text-white/70">Founder track record</p>
              <span className="rounded-full bg-accent-bright px-3 py-1 text-[12px] font-medium text-[#05130d]">
                Before Zimmy
              </span>
            </div>
            <div className="mt-12">
              <p className="text-[64px] font-semibold leading-none tracking-[-0.04em] sm:text-[80px]">$30M+</p>
              <p className="mt-4 max-w-xs border-t border-white/10 pt-4 text-[14.5px] text-white/70">
                in yearly campaign funnels automated end-to-end.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
