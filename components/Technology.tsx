import { Radar, Handshake, Activity, ShieldCheck } from "lucide-react";
import Reveal from "./Reveal";
import { SectionHead } from "./ui";

const AGENTS = [
  {
    icon: Radar,
    title: "Discovery agent",
    head: "Vetted shortlists in 24 hours.",
    body: "Scores creators on audience match, engagement quality and past performance. Weeks of sourcing, done overnight.",
  },
  {
    icon: Handshake,
    title: "Outreach agent",
    head: "Zero manual outreach.",
    body: "Writes the pitch, negotiates rate and usage rights, and locks each go-live date, following the limits you set.",
  },
  {
    icon: Activity,
    title: "Attribution agent",
    head: "Every dollar, traced.",
    body: "Ties each creator's link to revenue in BigQuery, flags your best performers and suggests who to re-book.",
  },
];

export default function Technology() {
  return (
    <section id="tech" className="px-5 py-10">
      <div className="card-glow relative mx-auto max-w-6xl overflow-hidden px-6 py-16 sm:px-12 sm:py-20">
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full opacity-40 blur-[120px]"
          style={{ background: "radial-gradient(closest-side, #9b8cff, transparent)" }}
          aria-hidden
        />
        <Reveal className="relative">
          <SectionHead
            eyebrow="Under the hood"
            title={
              <>
                A done-for-you service,{" "}
                <span className="serif glow-text">built on AI agents.</span>
              </>
            }
            sub="Specialised agents handle the repetitive work. You set the brief, the budget and the guardrails, and you approve every creator and script. The output of a ten-person team, with you in control."
          />
        </Reveal>

        <Reveal stagger={0.12} className="relative mt-12 grid gap-5 md:grid-cols-3">
          {AGENTS.map((a) => {
            const Icon = a.icon;
            return (
              <article key={a.title} className="rounded-[20px] border border-line bg-white/[0.02] p-7">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-line-strong text-snow">
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <span className="flex items-center gap-1.5 text-[11.5px] font-semibold text-lime">
                    <span className="live-dot h-1.5 w-1.5 rounded-full bg-lime" /> Running
                  </span>
                </div>
                <p className="mt-6 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-faint">{a.title}</p>
                <h3 className="mt-2 font-display text-[21px] font-bold tracking-tight text-snow">{a.head}</h3>
                <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{a.body}</p>
              </article>
            );
          })}
        </Reveal>

        <Reveal delay={0.2} className="relative mt-5">
          <div className="flex items-start gap-3 rounded-[20px] border border-line bg-white/[0.02] px-6 py-5 sm:items-center">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-lime sm:mt-0" />
            <p className="text-[15px] leading-relaxed text-snow/85">
              <span className="font-semibold text-snow">Nothing goes out without your sign-off.</span>{" "}
              <span className="text-muted">Every creator, message and script waits for your approval before it reaches anyone.</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
