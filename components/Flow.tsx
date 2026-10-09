import { Check } from "lucide-react";
import Reveal from "./Reveal";
import { OutlineButton, PrimaryButton, SplitHead, DEMO_HREF } from "./ui";

const STEPS = [
  { n: "01", title: "Brief", time: "Day 1", body: "Share your site, socials, audience and budget. Zimmy learns your brand voice." },
  { n: "02", title: "Shortlist", time: "Within 24 hours", body: "A vetted list of best-fit creators. Approve, remove or add anyone." },
  { n: "03", title: "Launch", time: "Weeks 1–4", body: "Outreach, deals, scripts and links run in parallel. Creators go live on agreed dates." },
  { n: "04", title: "Scale", time: "Ongoing", body: "Every link tied to revenue. Zimmy re-books what sells and refines the mix." },
];

const YOU = ["Set the brief and budget", "Approve every creator", "Sign off on each script", "See revenue per creator"];
const ZIMMY = ["Find and rank creators", "Pitch and negotiate", "Write briefs, hooks and links", "Track sales in BigQuery"];

export default function Flow() {
  return (
    <section id="how" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                A short brief.
                <br />
                A full campaign.
              </>
            }
            sub="You make the decisions. Zimmy does the legwork in between, from first shortlist to the sales report."
          />
        </Reveal>

        <Reveal stagger={0.08} className="mt-12 grid gap-px overflow-hidden rounded-[22px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-surface p-6">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-medium text-faint">{s.n}</span>
                <span className="rounded-md bg-sky px-2 py-0.5 text-[11.5px] font-medium text-[#235a80]">{s.time}</span>
              </div>
              <h3 className="display mt-8 text-[24px] text-ink">{s.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-muted">{s.body}</p>
            </div>
          ))}
        </Reveal>

        <Reveal stagger={0.1} className="mt-5 grid gap-5 md:grid-cols-2">
          <div className="flex flex-col rounded-[22px] border border-[#cfe2ef] bg-[#eef6fb] p-7 sm:p-8">
            <p className="text-[12.5px] text-muted">Your part</p>
            <h3 className="display mt-3 text-[30px] text-ink">Decide. Approve.</h3>
            <p className="mt-2 text-[14.5px] text-muted">A few minutes at each checkpoint.</p>
            <ul className="mt-6 space-y-3">
              {YOU.map((t) => (
                <li key={t} className="flex items-center gap-3 text-[14px] text-ink/85">
                  <Check className="h-4 w-4 text-[#2e6f9e]" strokeWidth={2} /> {t}
                </li>
              ))}
            </ul>
            <OutlineButton href="#faq" wide className="mt-8">
              Read the FAQ
            </OutlineButton>
          </div>
          <div className="flex flex-col rounded-[22px] border border-[#d5ecd0] bg-[#f5fbf3] p-7 sm:p-8">
            <p className="text-[12.5px] text-accent">Zimmy&rsquo;s part</p>
            <h3 className="display mt-3 text-[30px] text-ink">Everything in between.</h3>
            <p className="mt-2 text-[14.5px] text-muted">The work of a ten-person influencer team.</p>
            <ul className="mt-6 space-y-3">
              {ZIMMY.map((t) => (
                <li key={t} className="flex items-center gap-3 text-[14px] text-ink/85">
                  <Check className="h-4 w-4 text-accent" strokeWidth={2} /> {t}
                </li>
              ))}
            </ul>
            <PrimaryButton href={DEMO_HREF} wide className="mt-8" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
