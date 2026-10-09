import CreatorCard, { CREATORS } from "./CreatorCard";
import Reveal from "./Reveal";
import { SplitHead } from "./ui";

export default function Reel() {
  const row = [...CREATORS, ...CREATORS];
  return (
    <section className="overflow-hidden py-24 sm:py-32" aria-label="Creator campaigns in progress">
      <Reveal className="mx-auto max-w-[1100px] px-5">
        <SplitHead
          title={
            <>
              Every niche.
              <br />
              Every post tracked.
            </>
          }
          sub="Food, tech, beauty, fitness, finance. Zimmy matches you with creators whose audience already looks like your customer."
        />
      </Reveal>

      <div className="mt-14 pb-10 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]" aria-hidden>
        <div className="marquee-track gap-5">
          {row.map((c, i) => (
            <div key={i} className={i % 2 ? "translate-y-8" : ""}>
              <CreatorCard c={c} className="w-[180px] sm:w-[210px]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
