import Reveal from "./Reveal";
import { SectionHead } from "./ui";

const STEPS = [
  {
    n: "01",
    title: "Brief",
    time: "Day 1",
    body: "Share your site, socials, audience and budget. Zimmy learns your brand voice and what a great creator looks like for you.",
  },
  {
    n: "02",
    title: "Shortlist",
    time: "Within 24 hours",
    body: "You get a vetted list of best-fit creators with audience data and expected reach. Approve, remove or add anyone you like.",
  },
  {
    n: "03",
    title: "Launch",
    time: "Week 1–4",
    body: "Outreach, negotiation, scripts and tracking links run in parallel. Creators go live on dates you agreed, with content you approved.",
  },
  {
    n: "04",
    title: "Scale what works",
    time: "Ongoing",
    body: "Every link is tied to revenue. Zimmy re-books the creators who sell and refines the mix of nano, micro and macro creators over time.",
  },
];

export default function Flow() {
  return (
    <section id="how" className="py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHead
            eyebrow="How it works"
            title={
              <>
                From brief to revenue{" "}
                <span className="serif text-accent-soft">in four steps.</span>
              </>
            }
            sub="You make the decisions. Zimmy does the legwork in between."
          />
        </Reveal>

        <Reveal stagger={0.1} className="relative mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <article key={s.n} className="card relative flex flex-col p-7">
              <div className="flex items-center justify-between">
                <span className="font-display text-[44px] font-bold leading-none tracking-tight text-white/10">
                  {s.n}
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-[11.5px] font-semibold ${
                    i === STEPS.length - 1 ? "bg-lime text-night" : "bg-white/[0.06] text-snow/80"
                  }`}
                >
                  {s.time}
                </span>
              </div>
              <h3 className="mt-8 font-display text-[24px] font-bold tracking-tight text-snow">{s.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
            </article>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
