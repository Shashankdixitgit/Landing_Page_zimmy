import { Crosshair, BarChart3, Rocket } from "lucide-react";
import Reveal from "../Reveal";
import { GhostButton } from "../ui";

const VALUES = [
  {
    icon: Crosshair,
    head: "Control over chaos",
    body: "Every creator, script and dollar is approved by you and tracked to real revenue. Never a black box.",
  },
  {
    icon: BarChart3,
    head: "Data over guesswork",
    body: "The best creator mix comes from real audience data and clean attribution, not follower counts and vanity metrics.",
  },
  {
    icon: Rocket,
    head: "Done for you, not DIY",
    body: "We carry the operational heavy lifting, so you can spend your time on strategy and the brand.",
  },
];

export default function MissionValues() {
  return (
    <section className="px-5 py-24 sm:py-36">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-faint">Our mission</p>
          <h2 className="mt-5 font-display text-[34px] font-bold leading-[1.05] tracking-[-0.035em] text-snow sm:text-[44px]">
            Make influencer marketing something{" "}
            <span className="serif text-accent-soft">one person can run.</span>
          </h2>
          <p className="mt-6 max-w-md text-[16.5px] leading-relaxed text-muted sm:text-[18px]">
            Brands should be able to reach the right creators with clear data, fair
            negotiation and honest attribution, without an agency retainer or a
            spreadsheet army.
          </p>
          <GhostButton href="/#what" className="mt-8">
            Explore the product
          </GhostButton>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-faint">What we believe</p>
          <div className="mt-6 flex flex-col gap-4">
            {VALUES.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.head} className="card flex gap-4 p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <div>
                    <h3 className="font-display text-[19px] font-bold tracking-tight text-snow">{v.head}</h3>
                    <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{v.body}</p>
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
