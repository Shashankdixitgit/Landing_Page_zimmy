import Image from "next/image";
import Reveal from "../Reveal";

const PARAS = [
  "Dear founders and marketers,",
  "Most teams still guess what to post. They brief creators, pay for videos and hope something lands.",
  "We met at Emergent. Abhisha led global GTM and ran creator marketing at about $2M a month across about 1,000 creators. Shashank automated that creator pipeline and built the analytics across $90M+ a year in marketing spend. The pattern was always the same: money went to videos and creators nobody could predict, and only custom analytics showed which creator actually brought customers.",
  "Big companies can afford a team for that. Most businesses can't. So we built HitRate. It shows you what’s winning in your category, gets creators to make it, and tells you which creator made you money.",
  "We’re just getting started.",
];

export default function FounderNote() {
  return (
    <section className="px-5 pb-24 sm:pb-32">
      <div className="mx-auto max-w-3xl">
        <Reveal>
          <h2 className="display text-[38px] text-ink sm:text-[52px]">How HitRate started.</h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="rounded-[26px] border border-line bg-surface p-8 lift sm:p-12">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-[19px] font-medium text-ink">Our journey</h3>
                <p className="mt-1 text-[14px] text-muted">A note from the founders</p>
              </div>
              <div className="flex shrink-0 -space-x-3">
                <Image src="/abhisha.jpg" alt="" width={48} height={48} className="h-12 w-12 rounded-2xl border-2 border-surface object-cover" />
                <Image src="/founder-avatar.jpg" alt="" width={48} height={48} className="h-12 w-12 rounded-2xl border-2 border-surface object-cover" />
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {PARAS.map((p, i) => (
                <p key={i} className="text-[15.5px] leading-[1.75] text-ink/80">
                  {p}
                </p>
              ))}
            </div>

            <div className="mt-9 flex flex-wrap gap-x-12 gap-y-4 border-t border-line pt-6">
              {[
                ["Abhisha Shrivastava", "https://www.linkedin.com/in/abhisha-shrivastava-2b210132/"],
                ["Shashank Dixit", "https://www.linkedin.com/in/shashankdixitt/"],
              ].map(([name, href]) => (
                <div key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[16px] font-medium text-accent underline-offset-4 hover:underline"
                  >
                    {name}
                  </a>
                  <p className="text-[14px] text-muted">Co-founder, HitRate</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
