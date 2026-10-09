import { Crosshair, BarChart3, Rocket } from "lucide-react";
import Reveal from "../Reveal";
import { OutlineButton } from "../ui";

const VALUES = [
  {
    icon: Crosshair,
    head: "Control over chaos",
    body: "Every creator, script and dollar is approved by you and tracked to real revenue. Never a black box.",
  },
  {
    icon: BarChart3,
    head: "Data over guesswork",
    body: "The best creator mix comes from real audience data and clean attribution, not follower counts.",
  },
  {
    icon: Rocket,
    head: "Done for you, not DIY",
    body: "We carry the operational heavy lifting, so you can spend your time on strategy and the brand.",
  },
];

export default function MissionValues() {
  return (
    <section className="px-5 py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1100px] gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="text-[13px] font-medium text-accent">Our mission</p>
          <h2 className="display mt-4 text-[36px] text-ink sm:text-[46px]">
            Make influencer marketing something one person can run.
          </h2>
          <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-muted">
            Brands should be able to reach the right creators with clear data, fair
            negotiation and honest attribution, without an agency retainer or a
            spreadsheet army.
          </p>
          <OutlineButton href="/#what" className="mt-8">
            Explore the product
          </OutlineButton>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-[13px] font-medium text-accent">What we believe</p>
          <div className="mt-4 divide-y divide-line border-y border-line">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.head} className="flex gap-4 py-6">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-[#2e6f9e]" strokeWidth={1.7} />
                  <div>
                    <h3 className="text-[17px] font-medium tracking-[-0.015em] text-ink">{v.head}</h3>
                    <p className="mt-1.5 text-[14.5px] leading-relaxed text-muted">{v.body}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
