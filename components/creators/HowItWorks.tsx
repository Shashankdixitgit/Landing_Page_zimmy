import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";
import sample from "@/lib/creatorsSample.json";
import { POSTS_READ, POSTS_READ_X } from "@/lib/planPhases";

/** Illustrative only: the shape of a read, not anyone's numbers. */
const BARS = [34, 52, 28, 46, 88, 40, 31, 62, 24, 44, 70, 38];

const x = (n: number) => `${n.toFixed(2)}×`;

const NUM_BG = ["bg-mint text-accent", "bg-highlight text-accent", "bg-sky text-[#235a80]", "bg-night text-white"];

function Card({ children, tilt }: { children: React.ReactNode; tilt: "l" | "r" }) {
  return (
    <div
      className={`rounded-[22px] border border-line bg-surface lift transition-transform duration-500 ${
        tilt === "l" ? "-rotate-1 hover:rotate-0" : "rotate-1 hover:rotate-0"
      }`}
    >
      {children}
    </div>
  );
}

function PasteLink() {
  return (
    <div role="img" aria-label="A profile link, x.com/idleshubh, pasted into the box, tagged X" className="p-4">
      <div className="flex items-center gap-2.5 rounded-full border border-line bg-paper py-2 pl-5 pr-2">
        <span className="min-w-0 flex-1 truncate text-[15px] font-medium text-ink">
          x.com/idleshubh
          <i className="mk-caret ml-0.5 inline-block h-[1.1em] w-[2px] translate-y-[3px] bg-ink" />
        </span>
        <span className="rounded-md bg-sky px-2 py-0.5 text-[12px] font-medium text-[#235a80]">X</span>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-accent text-white">
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}

function Bars() {
  return (
    <div className="px-5 pb-3 pt-5">
      <div role="img" aria-label="Illustration: a bar for each post, with a line marking the account's median" className="relative flex h-[150px] items-end gap-1.5 sm:h-[170px] sm:gap-2">
        {BARS.map((h, i) => (
          <i key={i} className={`mk-bar flex-1 rounded-t-md rounded-b-sm ${h > 50 ? "bg-accent" : "bg-[#dfe6e4]"}`} style={{ height: `${h}%` }} />
        ))}
        <b className="absolute inset-x-0 bottom-1/2 border-t-2 border-dashed border-ink/50">
          <span className="absolute -top-3 right-0 rounded-full bg-highlight px-2.5 py-0.5 text-[11.5px] font-medium text-accent">your median</span>
        </b>
      </div>
      <p className="mt-2 text-right text-[11.5px] text-faint">Illustrative</p>
    </div>
  );
}

function Report() {
  const row = (b: { name: string; lift: number; n: number }, up: boolean) => (
    <li key={b.name} className="flex items-center justify-between gap-3 border-t border-line py-2 first:border-t-0">
      <span className="flex min-w-0 items-start gap-2.5">
        <i className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-[3px] ${up ? "bg-accent" : "bg-logo"}`} />
        <span className="min-w-0">
          <span className="block text-[14.5px] font-medium leading-snug text-ink">{b.name}</span>
          <small className="text-[12.5px] text-muted">{b.n} posts</small>
        </span>
      </span>
      <b className={`text-[16px] font-semibold tabular-nums ${up ? "text-accent" : "text-[#b4382c]"}`}>{x(b.lift)}</b>
    </li>
  );
  return (
    <figure className="m-0 px-5 pb-3 pt-4">
      <figcaption className="pb-1.5 text-[11.5px] font-medium uppercase tracking-[0.06em] text-muted">Sample report · @{sample.handle}</figcaption>
      <ul aria-label="Ran above this account's median">{sample.works.map((b) => row(b, true))}</ul>
      <ul aria-label="Ran below it" className="mt-1.5 border-t-2 border-dashed border-line pt-1.5">
        {sample.doesnt.map((b) => row(b, false))}
      </ul>
    </figure>
  );
}

function Week() {
  return (
    <div role="img" aria-label="Days 1 to 7, each with a written post" className="grid grid-cols-7 gap-1 p-3 sm:gap-1.5 sm:p-4">
      {Array.from({ length: 7 }, (_, i) => (
        <span key={i} className="flex flex-col items-center gap-0.5 rounded-xl bg-mint px-0.5 pb-2.5 pt-2 text-accent">
          <small className="text-[9px] font-medium uppercase tracking-[0.04em] text-muted sm:text-[10.5px]">Day</small>
          <span className="display text-[20px] sm:text-[26px]">{i + 1}</span>
          <i className="mt-1 block h-1 w-3/5 rounded bg-accent" />
        </span>
      ))}
    </div>
  );
}

const STEPS = [
  { title: "Paste your link", body: "Any public profile. We spot the platform for you.", vis: <PasteLink /> },
  { title: "We read your posts", body: `Your latest ${POSTS_READ} posts (${POSTS_READ_X} on X), each scored against your own median.`, vis: <Bars /> },
  { title: "See what works", body: "Subjects above and below your median, with post counts.", vis: <Report /> },
  // The app sets Day 1 when the plan is first opened (its components/Plan.tsx firstDay), not tomorrow.
  { title: "Get your first week", body: "Seven posts in your voice, dated from the day you first open them.", vis: <Week /> },
];

export default function HowItWorks() {
  return (
    <section id="how" aria-labelledby="how-h" className="px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-[1100px]">
        <Reveal className="text-center">
          <span className="inline-flex rounded-full bg-mint px-3.5 py-1.5 text-[12.5px] font-medium text-accent">How it works</span>
          <h2 id="how-h" className="display mt-5 text-[38px] text-ink sm:text-[52px]">
            Four steps. <span className="text-accent">One link.</span>
          </h2>
        </Reveal>

        <ol className="wt relative mx-auto mt-14 grid max-w-[1000px] gap-12 sm:mt-16 md:gap-14">
          {/* the rail: dashed, with a solid line drawing over it */}
          <span aria-hidden className="absolute bottom-7 left-7 top-7 border-l-2 border-dashed border-line md:left-1/2 md:-translate-x-1/2" />
          <span aria-hidden className="wt-rail-fill absolute bottom-7 left-7 top-7 w-0.5 -translate-x-[1px] bg-accent md:left-1/2" />

          {STEPS.map((s, i) => {
            const even = i % 2 === 1;
            return (
              <li key={s.title} className="relative grid grid-cols-[56px_minmax(0,1fr)] gap-x-4 gap-y-4 md:grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] md:items-center md:gap-x-10">
                <span
                  aria-hidden
                  className={`display relative z-10 col-start-1 row-start-1 row-span-2 grid h-14 w-14 place-items-center rounded-full border-4 border-paper text-[26px] md:col-start-2 md:row-span-1 md:row-start-1 md:h-[72px] md:w-[72px] md:text-[32px] ${NUM_BG[i]}`}
                >
                  {i + 1}
                </span>
                <Reveal className={`col-start-2 row-start-1 pt-1.5 md:pt-0 ${even ? "md:col-start-3 md:text-left" : "md:col-start-1 md:text-right"}`}>
                  <h3 className="display text-[26px] text-ink sm:text-[30px]">{s.title}</h3>
                  <p className={`mt-2 max-w-[300px] text-[16px] leading-relaxed text-muted ${even ? "" : "md:ml-auto"}`}>{s.body}</p>
                </Reveal>
                <Reveal delay={0.08} className={`col-start-2 row-start-2 md:row-start-1 ${even ? "md:col-start-1" : "md:col-start-3"}`}>
                  <Card tilt={even ? "r" : "l"}>{s.vis}</Card>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
