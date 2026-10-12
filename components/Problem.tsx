import Reveal from "./Reveal";
import { SplitHead } from "./ui";

const STATS = [
  {
    big: "5%",
    title: "Most videos fail, and nobody can predict which.",
    body: "A study of $1.29 billion in Meta ad spend found only about 5% of ads became winners, and those few took about 55% of all spend.",
    source: "Motion, Net Influencer",
  },
  {
    big: "$150–300",
    title: "Every test is slow and expensive.",
    body: "A creator video typically costs $150–300, plus another 30–50% for the right to run it as an ad. At a 1-in-20 hit rate, one winner can mean paying for about 20 videos.",
    source: "Influee",
  },
  {
    big: "3×",
    title: "Platforms want more videos than teams can make.",
    body: "Meta's ad system now uses the video itself to find the right audience, and variety of creative has become the main lever. Top advertisers launch about three times more new ads each week than the average.",
    source: "Jon Loomer, Net Influencer",
  },
  {
    big: "79%",
    title: "Success is judged on views, not customers.",
    body: "79% of marketers struggle to measure the return on creator marketing, and 48% say tracking which video led to a sale is their biggest gap.",
    source: "Linqia",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="px-4 py-20 sm:px-5 sm:py-24">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                The problem every
                <br />
                growth team knows.
              </>
            }
            sub="You scroll TikTok for ideas, brief a handful of creators and wait weeks. Most videos flop, one does okay, and nobody can say if it brought a single download. Next month, you do it again with a bigger budget."
          />
        </Reveal>

        <p className="mt-10 text-[15px] font-medium text-ink">It isn&rsquo;t a talent problem. The numbers are stacked against every team.</p>

        <Reveal stagger={0.08} className="mt-6 grid gap-4 sm:grid-cols-2">
          {STATS.map((s) => (
            <article key={s.title} className="flex flex-col rounded-[22px] border border-line bg-surface p-6 sm:p-7">
              <p className="text-[44px] font-semibold leading-none tracking-[-0.04em] text-accent sm:text-[52px]">{s.big}</p>
              <h3 className="mt-5 text-[18px] font-medium tracking-[-0.01em] text-ink">{s.title}</h3>
              <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.body}</p>
              <p className="mt-auto pt-5 text-[12.5px] text-faint">Source: {s.source}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
