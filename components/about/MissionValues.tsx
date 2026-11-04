import { Crosshair, BarChart3, Rocket } from "lucide-react";
import Reveal from "../Reveal";
import { OutlineButton } from "../ui";

const VALUES = [
  {
    icon: Crosshair,
    head: "You approve everything",
    body: "Every script, video and post. Nothing goes out in your name without your sign-off.",
  },
  {
    icon: BarChart3,
    head: "Start from what’s winning",
    body: "Begin with the videos and ads already beating their usual views for your competitors, not with hunches.",
  },
  {
    icon: Rocket,
    head: "Test before you spend",
    body: "Try a format cheaply with AI UGC first. Pay creators and ads only once it brings users.",
  },
];

export default function MissionValues() {
  return (
    <section className="px-5 py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1100px] gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="text-[13px] font-medium text-accent">Our mission</p>
          <h2 className="display mt-4 text-[36px] text-ink sm:text-[46px]">
            Stop paying for formats nobody tested.
          </h2>
          <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-muted">
            Most app marketing spend goes on formats nobody knew would work until the money was
            already gone. HitRate helps consumer app teams find what&rsquo;s winning, test their own
            version cheaply with AI UGC, and only then scale it with UGC, real creators and paid ads.
          </p>
          <OutlineButton href="/#research" className="mt-8">
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
