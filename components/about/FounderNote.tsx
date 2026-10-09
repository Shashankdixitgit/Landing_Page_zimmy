import Image from "next/image";
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
    <section className="px-5 pb-24 sm:pb-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="display text-[38px] text-ink sm:text-[52px]">How Zimmy started.</h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="rounded-[26px] border border-line bg-surface p-8 lift sm:p-12">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[19px] font-medium text-ink">Our journey</h3>
                <p className="mt-1 text-[14px] text-muted">A note from the founder</p>
              </div>
              <Image src="/founder-avatar.jpg" alt="" width={48} height={48} className="h-12 w-12 shrink-0 rounded-2xl object-cover" />
            </div>

            <div className="mt-8 space-y-5">
              {PARAS.map((p, i) => (
                <p key={i} className="text-[15.5px] leading-[1.75] text-ink/80">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-9 border-t border-line pt-6">
              <a
                href="https://www.linkedin.com/in/shashankdixitt/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[16px] font-medium text-accent underline-offset-4 hover:underline"
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
