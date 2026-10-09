import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { Chip, SplitHead } from "./ui";

const RUNGS = [
  {
    n: "01",
    title: "AI videos find the winner.",
    body: "Zimmy turns the top tests into short AI videos with your real product footage. Camera angle, light, hands and sound are chosen on purpose, so the video feels real.",
    move: "Move up when: people watch past the hook and understand the product.",
    status: "Coming soon",
    box: "bg-sky",
    h: "lg:min-h-[340px]",
  },
  {
    n: "02",
    title: "Real creators make it trusted.",
    body: "The ideas that worked get remade by real creators whose audience looks like your customer. Zimmy finds them, handles outreach and the deal within your limits, and writes the brief.",
    move: "Move up when: the creator version gets clicks and sign-ups, not just views.",
    status: "Live",
    box: "bg-mint",
    h: "lg:min-h-[380px]",
  },
  {
    n: "03",
    title: "Ads scale what's proven.",
    body: "Only the creator videos that keep working get budget as paid ads. You spend on proof, not on hope.",
    move: "Keep going while: the cost per result holds as spend grows.",
    status: "Done by our team",
    box: "bg-night text-white",
    h: "lg:min-h-[420px]",
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
                Test with AI.
                <br />
                Scale with creators.
              </>
            }
            sub="Most teams pay creators before they know an idea works. Zimmy finds the winner cheaply first, then moves it up one step at a time."
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
                <h3 className={`display mt-auto pt-10 text-[26px] ${dark ? "text-white" : "text-ink"}`}>{r.title}</h3>
                <p className={`mt-3 text-[14.5px] leading-relaxed ${dark ? "text-white/70" : "text-ink/70"}`}>{r.body}</p>
                <p className={`mt-5 border-t pt-4 text-[13px] font-medium ${dark ? "border-white/15 text-accent-bright" : "border-ink/10 text-ink"}`}>
                  {r.move}
                </p>
                {i < RUNGS.length - 1 ? (
                  <span className="absolute -right-3 top-1/2 z-10 hidden h-7 w-7 -translate-y-1/2 place-items-center rounded-full border border-line bg-surface text-ink lg:grid">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                ) : null}
              </article>
            );
          })}
        </Reveal>

        <Reveal delay={0.2} className="mt-5">
          <div className="flex flex-col gap-2 rounded-[18px] border border-line bg-surface px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[14.5px] font-medium text-ink">Cost per test goes up at each step. So does trust.</p>
            <p className="text-[13px] text-muted">
              You approve every creator, every script and every euro, rupee or dollar of spend.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
