import CreatorCard, { CREATORS } from "./CreatorCard";
import Reveal from "./Reveal";
import { SplitHead } from "./ui";
import PlatformScorecard from "./PlatformScorecard";


export default function Reel() {
  const row = [...CREATORS, ...CREATORS];
  return (
    <section id="platforms" className="overflow-hidden py-24 sm:py-32" aria-label="Example creator videos">
      <Reveal className="mx-auto max-w-[1100px] px-5">
        <SplitHead
          title={
            <>
              Every platform,
              <br />
              read on its own.
            </>
          }
          sub="A weak TikTok doesn't cancel a strong Reel. Zimmy reads each platform separately and asks the same four questions."
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

      <div className="mx-auto mt-8 max-w-[1100px] px-5">
        <Reveal>
          <PlatformScorecard />
        </Reveal>
        <p className="mt-5 text-center text-[13px] text-muted">
          Views per platform and clicks per creator link are tracked today. Sales tracking is coming soon.
        </p>
      </div>
    </section>
  );
}
