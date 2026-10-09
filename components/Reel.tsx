import CreatorCard, { CREATORS } from "./CreatorCard";
import Reveal from "./Reveal";
import { SplitHead } from "./ui";

const QUESTIONS = [
  "Did the opening earn attention?",
  "Did people understand the product?",
  "Did it lead to action?",
  "Is it repeatable enough to fund?",
];

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
        <Reveal stagger={0.08} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QUESTIONS.map((q, i) => (
            <div key={q} className="rounded-[18px] border border-line bg-surface p-5">
              <span className="text-[13px] font-medium text-faint">0{i + 1}</span>
              <p className="mt-6 text-[17px] font-medium leading-snug tracking-[-0.015em] text-ink">{q}</p>
            </div>
          ))}
        </Reveal>
        <p className="mt-5 text-center text-[13px] text-muted">
          Views per platform and clicks per creator link are tracked today. Sales tracking is coming soon.
        </p>
      </div>
    </section>
  );
}
