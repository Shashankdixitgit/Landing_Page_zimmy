import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const STEPS = [
  {
    n: "01",
    title: "Discover",
    time: "Day 1–3",
    body: "Share your site and socials and set your thesis, ICP, and budget. Zimmy surfaces best-fit creators by audience, fit, and historical signal, vetted shortlists in 24 hours, not weeks. You approve.",
    bg: "bg-yellow",
  },
  {
    n: "02",
    title: "Run",
    time: "Week 1–4",
    body: "Outreach, negotiation, scripts, and UTM links run in parallel across the funnel, building awareness, locking go-live dates, and surfacing the creators worth investing in further.",
    bg: "bg-mint",
  },
  {
    n: "03",
    title: "Optimize",
    time: "Ongoing",
    body: "Track every UTM link to real revenue in BigQuery and keep refining the creator mix, micro, macro, and nano, compounding against ROAS with a renewing content pipeline.",
    bg: "bg-pink",
  },
];

export default function Flow() {
  return (
    <section id="how" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionLabel n="③">How it works</SectionLabel>
          <div className="mt-6 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-end">
            <h2 className="max-w-2xl text-[34px] font-bold leading-[1.05] tracking-[-0.025em] text-ink sm:text-[48px]">
              Discover. Run. <span className="mark">Optimize.</span>
            </h2>
            <a
              href="#cta"
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border-2 border-ink bg-cream px-5 py-2.5 text-[14.5px] font-semibold text-ink shadow-hard-sm transition-transform hover:-translate-y-0.5"
            >
              Build your engine <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>

        <Reveal stagger={0.12} className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((s) => (
            <article
              key={s.n}
              className="flex flex-col rounded-[var(--radius-card)] border-2 border-ink bg-cream p-7 shadow-hard"
            >
              <div className="flex items-center justify-between">
                <span className="text-[15px] font-bold text-ink">{s.n}</span>
                <span
                  className={`rounded-full border-2 border-ink ${s.bg} px-3 py-1 text-[12px] font-bold uppercase tracking-wide text-ink`}
                >
                  {s.time}
                </span>
              </div>
              <h3 className="mt-6 text-[26px] font-bold tracking-tight text-ink">
                {s.title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
