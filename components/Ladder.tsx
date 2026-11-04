import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { Chip, SplitHead } from "./ui";

const RUNGS = [
  {
    n: "01",
    title: "Find what’s winning.",
    body: "Paste your app link. See your competitors’ winning videos and ads, a summary of your store reviews, scripts and a content calendar.",
    status: "Live",
    box: "bg-sky",
    h: "lg:min-h-[220px]",
  },
  {
    n: "02",
    title: "Test it with AI UGC.",
    body: "HitRate makes your versions as AI UGC videos and posts them on your accounts or warmed-up ones, to see which format brings users.",
    status: "Early access",
    box: "bg-mint",
    h: "lg:min-h-[260px]",
  },
  {
    n: "03",
    title: "Scale the winner.",
    body: "Once a format proves it brings users, take it to UGC, real creators and paid ads.",
    status: "Coming soon",
    box: "bg-night text-white",
    h: "lg:min-h-[300px]",
  },
];

export default function Ladder() {
  return (
    <section id="ladder" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                Find. Test.
                <br />
                Then scale.
              </>
            }
            sub="Most ad spend goes on formats nobody knew would work. HitRate tests them cheaply first. You approve everything before it goes out."
          />
        </Reveal>

        <Reveal stagger={0.12} className="mt-12 grid items-end gap-4 lg:grid-cols-3">
          {RUNGS.map((r, i) => {
            const dark = r.box.includes("night");
            return (
              <article key={r.n} className={`relative flex flex-col rounded-[22px] p-7 ${r.box} ${r.h}`}>
                <div className="flex items-center justify-between">
                  <span className={`text-[13px] font-medium ${dark ? "text-white/60" : "text-faint"}`}>Step {r.n}</span>
                  {dark ? (
                    <span className="rounded-md bg-white/15 px-2 py-0.5 text-[11.5px] font-medium text-white">{r.status}</span>
                  ) : (
                    <Chip tone={r.status === "Live" ? "mint" : "soft"}>{r.status}</Chip>
                  )}
                </div>
                <h3 className={`display mt-auto pt-12 text-[28px] ${dark ? "text-white" : "text-ink"}`}>{r.title}</h3>
                <p className={`mt-3 text-[14px] leading-relaxed ${dark ? "text-white/70" : "text-ink/70"}`}>{r.body}</p>
                {i < RUNGS.length - 1 ? (
                  <span className="absolute -right-3 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface text-ink lg:grid">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                ) : null}
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
