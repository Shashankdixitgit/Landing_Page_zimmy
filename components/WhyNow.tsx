import Reveal from "./Reveal";

const POINTS = [
  {
    title: "AI video is now believable.",
    body: "Today's top video models can make natural-looking, creator-style videos, as Jake Castillo's workflow shows.",
  },
  {
    title: "Platforms reward variety.",
    body: "Ad systems now lean on the video itself to find buyers, so teams need far more videos to test.",
  },
  {
    title: "Winners are rare by nature.",
    body: "Motion's study found top advertisers win by testing more, not by guessing better. The team that tests the most, at the lowest cost, finds more winners.",
  },
];

export default function WhyNow() {
  return (
    <section id="why-now" className="px-2 py-8 sm:px-3">
      <Reveal className="rounded-[28px] bg-night px-4 py-16 text-white sm:rounded-[36px] sm:px-10 sm:py-24">
        <div className="mx-auto max-w-[1100px]">
          <p className="text-[13px] font-medium text-accent-bright">Why now</p>
          <h2 className="display mt-4 max-w-2xl text-[38px] text-white sm:text-[52px]">
            The team that tests the most finds the most winners.
          </h2>
          <ol className="mt-12 grid gap-4 md:grid-cols-3">
            {POINTS.map((p, i) => (
              <li key={p.title} className="rounded-[22px] border border-white/10 bg-white/[0.04] p-6 sm:p-7">
                <span className="text-[13px] font-medium text-white/50">0{i + 1}</span>
                <h3 className="mt-4 text-[19px] font-medium tracking-[-0.01em] text-white">{p.title}</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-white/70">{p.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Reveal>
    </section>
  );
}
