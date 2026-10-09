import { Radar, Handshake, Activity, Check } from "lucide-react";
import Reveal from "./Reveal";
import { SplitHead } from "./ui";

const AGENTS = [
  {
    icon: Radar,
    title: "Discovery agent",
    head: "Vetted shortlists in 24 hours.",
    body: "Scores creators on audience match, engagement quality and past performance.",
  },
  {
    icon: Handshake,
    title: "Outreach agent",
    head: "Zero manual outreach.",
    body: "Pitches, negotiates rate and usage rights, and locks go-live dates within your limits.",
  },
  {
    icon: Activity,
    title: "Attribution agent",
    head: "Every dollar, traced.",
    body: "Ties each link to revenue in BigQuery and suggests who to re-book.",
  },
];

export default function Technology() {
  return (
    <section id="tech" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                A done-for-you service.
                <br />
                Built on AI agents.
              </>
            }
            sub="Specialised agents handle the repetitive work. You set the brief, the budget and the guardrails."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="rounded-[26px] border border-[#2c4a3c] bg-night p-6 text-white shadow-[0_30px_60px_-30px_rgb(15_122_82/0.45)] sm:p-10">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-[22px] font-medium tracking-[-0.02em]">Zimmy&rsquo;s agents</p>
              <span className="inline-flex items-center gap-2 rounded-full bg-accent-bright px-3 py-1 text-[12px] font-medium text-[#05130d]">
                <span className="live-dot h-1.5 w-1.5 rounded-full bg-[#05130d]" /> Running for you
              </span>
            </div>
            <div className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {AGENTS.map((a) => {
                const Icon = a.icon;
                return (
                  <div key={a.title} className="grid gap-3 py-6 sm:grid-cols-[220px_1fr] sm:items-center">
                    <p className="flex items-center gap-3 text-[13.5px] text-white/70">
                      <Icon className="h-4 w-4 text-accent-bright" strokeWidth={1.8} /> {a.title}
                    </p>
                    <div className="sm:text-right">
                      <p className="text-[17px] font-medium">{a.head}</p>
                      <p className="mt-1 text-[13.5px] text-white/60">{a.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="mt-6 flex items-center gap-3 text-[14px] text-white/85">
              <Check className="h-4 w-4 text-accent-bright" /> Nothing goes out without your sign-off.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
