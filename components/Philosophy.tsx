import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { SplitHead } from "./ui";

const STEPS = [
  {
    n: "1",
    name: "Find",
    what: "Competitors' best formats",
    cost: "Free, in minutes",
    body: "See the formats already winning for your competitors, with proof.",
    box: "bg-sky",
    h: "lg:min-h-[250px]",
    bar: "w-[14%]",
  },
  {
    n: "2",
    name: "Test",
    what: "Your own AI versions",
    cost: "Small budget, results in days",
    body: "Make your own versions as AI videos and post them on unpaid accounts. Many ideas, small budget.",
    box: "bg-mint",
    h: "lg:min-h-[290px]",
    bar: "w-[40%]",
  },
  {
    n: "3",
    name: "Scale",
    what: "Real creators + paid ads",
    cost: "Big budget, proven formats only",
    body: "Take only the proven formats to real creators and paid ads. This is where the big budget goes.",
    box: "bg-night text-white",
    h: "lg:min-h-[330px]",
    bar: "w-full",
  },
];

export default function Philosophy() {
  return (
    <section id="philosophy" className="px-4 py-20 sm:px-5 sm:py-24">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                Test small.
                <br />
                Scale what&rsquo;s proven.
              </>
            }
            sub="AI video isn't the final product. It's the cheapest, fastest way to answer one question: which video format works for my app? Once that's clear, you put real money behind it."
          />
        </Reveal>

        <Reveal stagger={0.12} className="mt-12 grid items-end gap-4 lg:grid-cols-3">
          {STEPS.map((s, i) => {
            const dark = s.box.includes("night");
            return (
              <article key={s.n} className={`relative flex flex-col rounded-[22px] p-6 sm:p-7 ${s.box} ${s.h}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className={`text-[13px] font-medium ${dark ? "text-white/60" : "text-faint"}`}>
                    {s.n} · {s.what}
                  </span>
                </div>
                <h3 className={`display mt-8 text-[34px] lg:mt-auto lg:pt-10 ${dark ? "text-white" : "text-ink"}`}>{s.name}</h3>
                <p className={`mt-2 text-[14.5px] leading-relaxed ${dark ? "text-white/75" : "text-muted"}`}>{s.body}</p>
                <div className={`mt-5 border-t pt-4 ${dark ? "border-white/10" : "border-ink/10"}`}>
                  <p className={`text-[12px] ${dark ? "text-white/60" : "text-faint"}`}>Budget per idea</p>
                  <div className={`mt-2 h-1.5 rounded-full ${dark ? "bg-white/10" : "bg-ink/10"}`}>
                    <div className={`h-full rounded-full ${dark ? "bg-accent-bright" : "bg-accent"} ${s.bar}`} />
                  </div>
                  <p className={`mt-2 text-[13px] font-medium ${dark ? "text-white" : "text-ink"}`}>{s.cost}</p>
                </div>
                {i < STEPS.length - 1 ? (
                  <span className="absolute -right-3 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface text-ink lg:grid">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                ) : null}
              </article>
            );
          })}
        </Reveal>

        <p className="mt-6 text-center text-[14.5px] text-muted">
          Budget grows only as proof grows. Less money on videos that flop, more behind videos proven to bring customers.
        </p>
      </div>
    </section>
  );
}
