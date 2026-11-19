import Reveal from "./Reveal";

/**
 * Find, test, scale, each with what is true of it today: finding is live,
 * testing is in early access, scaling is coming. Same facts as the home page's
 * "What's live today?" answer.
 */
export type HowStep = { n: number; title: string; body: string; tag: string; live: boolean };

const STEPS: HowStep[] = [
  {
    n: 1,
    title: "Find what's already winning",
    body: "Paste your app link. See the videos and ads winning for your competitors, or for any app or category your users watch, what your store reviews say, and scripts built from the winners in a content calendar.",
    tag: "Live today",
    live: true,
  },
  {
    n: 2,
    title: "Test your version cheaply",
    body: "HitRate makes your versions as AI UGC videos (short, creator-style videos made with AI) and posts them on your accounts, to see which style brings users. You approve every video first.",
    tag: "Early access",
    live: false,
  },
  {
    n: 3,
    title: "Scale the one that works",
    body: "Once a style proves it brings users, remake it with real creators and run it as paid ads. Then test the next one.",
    tag: "Coming soon",
    live: false,
  },
];

export default function HowItWorks({
  steps = STEPS,
  title = "Start from what works, not from a guess",
}: {
  steps?: HowStep[];
  title?: string;
}) {
  return (
    <section className="bg-[#fafafa] px-5 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-[680px]">
        <div className="text-center">
          <p className="text-[12.5px] font-medium uppercase tracking-[0.12em] text-[var(--bd-faint)]">How it works</p>
          <h2 className="serif mt-3 text-balance text-[34px] leading-tight text-[var(--bd-ink)] sm:text-[44px]">
            {title}
          </h2>
        </div>

        <ol className="bd-card mt-10 divide-y divide-[var(--bd-line)] overflow-hidden rounded-[22px]">
          {steps.map((s) => (
            <li key={s.n} className="flex gap-4 px-5 py-6 sm:gap-5 sm:px-7 sm:py-7">
              <span className="serif grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#111] text-[17px] text-white">{s.n}</span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="text-[17px] font-semibold text-[var(--bd-ink)]">{s.title}</h3>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11.5px] font-medium ${
                      s.live ? "bg-[#e3f5ea] text-[#17784b]" : "bg-[var(--bd-soft)] text-[var(--bd-muted)]"
                    }`}
                  >
                    {s.tag}
                  </span>
                </div>
                <p className="mt-2 text-[14.5px] leading-relaxed text-[var(--bd-muted)]">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
