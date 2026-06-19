import Reveal from "../Reveal";

const PARAS = [
  "Dear founders and marketers,",
  "When we started Zimmy, the goal was simple: let one person run a full influencer program, without an agency, a spreadsheet army, or a team of ten.",
  "We'd spent years inside growth and product at Bentolabs and Emergent, and earlier at Entrepreneur First, automating yearly campaign funnels worth up to $30M. The same problem kept showing up: influencer marketing was powerful, but the execution was brutal. Sourcing, outreach, negotiation, scripts, links, attribution, all by hand.",
  "So we built the operating system we always wished we had. Zimmy finds the creators, runs the outreach and negotiation, writes the scripts, and ties every dollar back to real revenue, while you stay in control with a single click.",
  "We're just getting started.",
];

export default function FounderNote() {
  return (
    <section className="px-5 pb-24 sm:pb-32">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <h2 className="text-[36px] font-bold tracking-[-0.03em] text-ink sm:text-[52px]">
            How Zimmy <span className="mark">started.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="relative overflow-hidden rounded-[28px] border-2 border-ink bg-cream p-8 shadow-hard sm:p-12">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[22px] font-bold tracking-tight text-ink">
                  Our journey
                </h3>
                <p className="mt-1 text-[14.5px] text-muted">A note from the founder</p>
              </div>
              <span
                className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border-2 border-ink text-[18px] font-bold text-ink"
                style={{
                  backgroundImage: "linear-gradient(135deg, #ffd66b, #ffb8d1)",
                }}
                aria-hidden
              >
                SD
              </span>
            </div>

            <div className="mt-8 max-w-2xl space-y-5">
              {PARAS.map((p, i) => (
                <p
                  key={i}
                  className="text-[16px] leading-relaxed text-ink/80 sm:text-[17px]"
                >
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-9">
              <a
                href="https://www.linkedin.com/in/shashankdixitt/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[17px] font-bold text-ink underline-offset-4 hover:underline"
              >
                Shashank Dixit
              </a>
              <p className="text-[14px] text-muted">Founder &amp; CEO, Zimmy</p>
            </div>

            {/* decorative corner */}
            <div
              className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full opacity-60 blur-2xl"
              style={{ background: "radial-gradient(circle, #9be7c4, transparent 70%)" }}
              aria-hidden
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
