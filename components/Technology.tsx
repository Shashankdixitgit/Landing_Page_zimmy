import { Radar, Handshake, Activity } from "lucide-react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const AGENTS = [
  {
    n: "01",
    icon: Radar,
    title: "Discovery agent",
    head: "Vetted shortlists in 24 hours.",
    body: "Matches you with the best creators by audience, fit, and historical signal, weeks of sourcing, done overnight.",
    dot: "bg-yellow",
  },
  {
    n: "02",
    icon: Handshake,
    title: "Outreach agent",
    head: "Zero manual outreach.",
    body: "Reaches out, negotiates rate and usage rights, signs, and locks each creator's go-live date, automatically.",
    dot: "bg-mint",
  },
  {
    n: "03",
    icon: Activity,
    title: "Attribution agent",
    head: "Tracks every dollar.",
    body: "Ties each UTM link to revenue in BigQuery, then nudges your best performers and refines the mix toward ROAS.",
    dot: "bg-pink",
  },
];

export default function Technology() {
  return (
    <section id="tech" className="px-5 py-10">
      <div className="mx-auto max-w-6xl rounded-[28px] border-2 border-ink bg-ink px-6 py-16 text-cream shadow-hard-lg sm:px-12 sm:py-20">
        <Reveal>
          <SectionLabel n="④" dark>
            Our technology
          </SectionLabel>
          <h2 className="mt-6 max-w-3xl text-[32px] font-bold leading-[1.05] tracking-[-0.025em] text-cream sm:text-[46px]">
            A done-for-you service,{" "}
            <span className="text-accent">built on agentic AI.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed text-cream/65 sm:text-[17.5px]">
            AI agents do the heavy lifting, discovery, outreach, scripts, attribution.
            You set the brief and approve every creator. The work of ten people, with
            you in control.
          </p>
        </Reveal>

        <Reveal stagger={0.12} className="mt-12 grid gap-5 md:grid-cols-3">
          {AGENTS.map((a) => {
            const Icon = a.icon;
            return (
              <article
                key={a.n}
                className="rounded-[var(--radius-card)] border-2 border-cream/20 bg-cream/[0.04] p-7"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border-2 border-cream/25 text-cream">
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <span className={`h-3 w-3 rounded-full ${a.dot}`} />
                </div>
                <p className="mt-5 text-[12px] font-bold uppercase tracking-wide text-cream/45">
                  {a.title}
                </p>
                <h3 className="mt-1.5 text-[19px] font-bold tracking-tight text-cream">
                  {a.head}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-cream/60">
                  {a.body}
                </p>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
