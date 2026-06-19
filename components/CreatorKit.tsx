import { Search, MessagesSquare, PenLine, LineChart } from "lucide-react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const SERVICES = [
  {
    n: "01",
    icon: Search,
    title: "Creator Discovery",
    body: "AI plus your brief surface the creators most likely to perform, by audience, fit, and budget, using the Modash database. Vetted shortlists you approve in hours.",
    bg: "bg-yellow",
  },
  {
    n: "02",
    icon: MessagesSquare,
    title: "Outreach & Negotiation",
    body: "Done-for-you outreach over email and DM. Rates, usage rights, and go-live dates, sourced, negotiated, and locked end-to-end.",
    bg: "bg-mint",
  },
  {
    n: "03",
    icon: PenLine,
    title: "Scripts & Hooks",
    body: "Scripts and hooks written in each creator's voice, shared and approved, plus a unique UTM link generated for every creator.",
    bg: "bg-pink",
  },
  {
    n: "04",
    icon: LineChart,
    title: "Clean Attribution",
    body: "Connect BigQuery and Zimmy tracks every UTM link to real, attributed revenue. Full-funnel, no vanity metrics.",
    bg: "bg-sky",
  },
];

export default function CreatorKit() {
  return (
    <section id="what" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionLabel n="①">What we do</SectionLabel>
          <h2 className="mt-6 max-w-2xl text-[34px] font-bold leading-[1.05] tracking-[-0.025em] text-ink sm:text-[48px]">
            Your creator engine,{" "}
            <span className="mark">run end-to-end.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[16.5px] leading-relaxed text-muted sm:text-[17.5px]">
            One AI operator, with a squad of specialised agents, getting you better
            outcomes, faster.
          </p>
        </Reveal>

        <Reveal stagger={0.1} className="mt-12 grid gap-5 sm:grid-cols-2">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.n}
                className="rounded-[var(--radius-card)] border-2 border-ink bg-cream p-7 shadow-hard transition-transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-xl border-2 border-ink ${s.bg} text-ink`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <span className="text-[28px] font-bold tracking-tight text-ink/20">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-5 text-[22px] font-bold tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">
                  {s.body}
                </p>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
