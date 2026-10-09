import Image from "next/image";
import Reveal from "../Reveal";

const PARAS = [
  "Dear founders and marketers,",
  "Most teams still guess what to post. They brief creators, pay for videos and hope something lands.",
  "After an IIT Madras BS degree, I spent years in growth and product at Emergent, and before that at Entrepreneur First, automating yearly campaign funnels worth $30M+. The pattern was always the same: the winners were already out there, in other accounts, in other markets. Nobody had time to study them.",
  "So I built Zimmy. It finds the videos already beating their usual views in your niche, works out why, and turns that into tests you can run, first with AI UGC, then with real creators and ads.",
  "We’re just getting started.",
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
