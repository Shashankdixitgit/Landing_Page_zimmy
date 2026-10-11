import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { Chip, SplitHead } from "./ui";

const RUNGS = [
  { n: "01", title: "AI UGC finds the winner.", status: "Coming soon", box: "bg-sky", h: "lg:min-h-[220px]" },
  { n: "02", title: "Real creators make it trusted.", status: "Live", box: "bg-mint", h: "lg:min-h-[260px]" },
  { n: "03", title: "Ads scale what’s proven.", status: "Done by our team", box: "bg-night text-white", h: "lg:min-h-[300px]" },
];

export default function Ladder() {
  return (
    <section id="ladder" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                Test with AI UGC.
                <br />
                Scale with creators.
              </>
            }
            sub="Find the winner cheaply first. Then scale it."
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
