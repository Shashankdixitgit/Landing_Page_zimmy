import Reveal from "../Reveal";

const PARAS = [
  "Dear founders and marketers,",
  "When I started Zimmy, the goal was simple: let one person run a full influencer program, without an agency, a spreadsheet army or a team of ten.",
  "I'd spent years inside growth and product at Bentolabs and Emergent, and before that at Entrepreneur First, automating yearly campaign funnels worth up to $30M. The same problem kept showing up: influencer marketing worked, but the execution was brutal. Sourcing, outreach, negotiation, scripts, links and attribution, all by hand.",
  "So I built the operating system I always wished I had. Zimmy finds the creators, runs the outreach and negotiation, writes the scripts and ties every dollar back to real revenue, while you stay in control.",
  "We're just getting started.",
];

export default function FounderNote() {
  return (
    <section className="px-5 pb-24 sm:pb-36">
      <div className="mx-auto max-w-4xl">
        <Reveal className="text-center">
          <h2 className="font-display text-[38px] font-bold tracking-[-0.04em] text-snow sm:text-[56px]">
            How Zimmy <span className="serif text-accent-soft">started.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="card-glow relative overflow-hidden p-8 sm:p-12">
            <div
              className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full opacity-40 blur-[90px]"
              style={{ background: "#9b8cff" }}
              aria-hidden
            />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-[22px] font-bold tracking-tight text-snow">Our journey</h3>
                <p className="mt-1 text-[14.5px] text-muted">A note from the founder</p>
              </div>
              <span
                className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent to-violet font-display text-[18px] font-bold text-white"
                aria-hidden
              >
                SD
              </span>
            </div>

            <div className="relative mt-8 max-w-2xl space-y-5">
              {PARAS.map((p, i) => (
                <p key={i} className="text-[16px] leading-relaxed text-snow/80 sm:text-[17px]">
                  {p}
                </p>
              ))}
            </div>

            <div className="relative mt-9">
              <a
                href="https://www.linkedin.com/in/shashankdixitt/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-[18px] font-bold text-snow underline-offset-4 hover:underline"
              >
                Shashank Dixit
              </a>
              <p className="text-[14px] text-muted">Founder &amp; CEO, Zimmy</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
