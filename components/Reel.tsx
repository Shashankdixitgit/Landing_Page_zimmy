import CreatorCard, { CREATORS } from "./CreatorCard";
import Reveal from "./Reveal";

export default function Reel() {
  const row = [...CREATORS, ...CREATORS];
  return (
    <section className="relative overflow-hidden py-20 sm:py-28" aria-label="Creator campaigns in progress">
      <Reveal className="mx-auto max-w-3xl px-5 text-center">
        <p className="font-display text-[30px] font-bold leading-[1.08] tracking-[-0.03em] text-snow sm:text-[42px]">
          Every niche. Every platform.{" "}
          <span className="serif text-accent-soft">Every post tracked.</span>
        </p>
        <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-muted">
          Food, tech, beauty, fitness, finance: Zimmy matches you with creators whose
          audience already looks like your customer.
        </p>
      </Reveal>

      <div className="mt-14 pb-10 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]" aria-hidden>
        <div className="marquee-track gap-5">
          {row.map((c, i) => (
            <div key={i} className={i % 2 ? "translate-y-8" : ""}>
              <CreatorCard c={c} className="w-[190px] sm:w-[220px]" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
