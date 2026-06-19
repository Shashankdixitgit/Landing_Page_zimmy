import { Crosshair, BarChart3, Rocket, ArrowUpRight } from "lucide-react";
import Reveal from "../Reveal";

const VALUES = [
  {
    icon: Crosshair,
    bg: "bg-yellow",
    head: "Control over chaos",
    body: "Every creator, script, and dollar is approved by you and tracked to real revenue, never a black box.",
  },
  {
    icon: BarChart3,
    bg: "bg-mint",
    head: "Data-driven decisions",
    body: "The best creator mix comes from real signal and clean attribution, not guesswork or vanity metrics.",
  },
  {
    icon: Rocket,
    bg: "bg-pink",
    head: "Done-for-you, not DIY",
    body: "We carry the operational heavy lifting, sourcing, outreach, scripts, so you focus on strategy.",
  },
];

export default function MissionValues() {
  return (
    <section className="px-5 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-20">
        {/* mission */}
        <Reveal>
          <h2 className="text-[30px] font-bold tracking-[-0.025em] text-ink sm:text-[38px]">
            Our mission
          </h2>
          <p className="mt-6 max-w-md text-[16.5px] leading-relaxed text-muted sm:text-[18px]">
            To make influencer marketing something one person can run end-to-end. We
            believe brands should reach the right creators with clear data, real
            negotiation, and clean attribution, without an agency or a spreadsheet
            army.
          </p>
          <a
            href="/#what"
            className="mt-8 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-ink px-6 py-3.5 text-[15px] font-semibold text-cream shadow-hard transition-transform hover:-translate-y-0.5"
          >
            Explore the platform <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>

        {/* values */}
        <Reveal delay={0.1}>
          <h2 className="text-[30px] font-bold tracking-[-0.025em] text-ink sm:text-[38px]">
            Our values
          </h2>
          <div className="mt-7 flex flex-col gap-6">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.head} className="flex gap-4">
                  <span
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border-2 border-ink ${v.bg} text-ink`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <p className="text-[16px] leading-relaxed text-muted">
                    <span className="font-bold text-ink">{v.head}:</span> {v.body}
                  </p>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
