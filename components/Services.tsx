import { Search, MessagesSquare, PenLine, LineChart, Link2, ShieldCheck, Layers } from "lucide-react";
import Reveal from "./Reveal";
import { Chip, SplitHead, TextLink, DEMO_HREF } from "./ui";

const BARS = [36, 50, 42, 66, 58, 84, 96];

const FEATURES = [
  {
    icon: Link2,
    title: "Every link tells a story.",
    body: "Each creator gets a unique tracking link, so clicks and sales always lead back to the person who drove them.",
  },
  {
    icon: Layers,
    title: "The right mix, over time.",
    body: "Zimmy keeps re-booking creators who sell and balances nano, micro and macro creators toward your return on spend.",
  },
  {
    icon: ShieldCheck,
    title: "Your brand, your call.",
    body: "Nothing goes out in your name without your sign-off. Approve, edit or remove any creator, message or script.",
  },
];

export default function Services() {
  return (
    <section id="what" className="px-5 pb-24 sm:pb-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                One operator.
                <br />
                Every part of the job.
              </>
            }
            sub="Discovery, outreach, scripts and attribution usually take an agency or three hires. Zimmy runs them as one connected workflow."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="rounded-[28px] border border-line bg-[#f4f8f9] p-4 sm:p-8">
            <div className="flex items-center justify-between px-1 pb-6 sm:px-0">
              <span className="text-[15px] font-medium text-ink">What Zimmy handles</span>
              <span className="hidden text-[13px] text-muted sm:inline">Four jobs, one workflow</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* discovery */}
              <article className="flex flex-col rounded-[18px] bg-surface p-6 lift">
                <p className="flex items-center gap-2 text-[12.5px] text-muted">
                  <Search className="h-3.5 w-3.5" /> Creator discovery
                </p>
                <h3 className="display mt-2 text-[22px] text-ink">The right creators, ranked.</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                  Zimmy searches the Modash database by audience, fit and budget, and ranks
                  creators by how likely they are to perform for you.
                </p>
                <div className="mt-5 flex gap-1.5">
                  <Chip tone="mint">Audience match</Chip>
                  <Chip>Engagement</Chip>
                </div>
              </article>

              {/* outreach */}
              <article className="flex flex-col rounded-[18px] bg-mint p-6">
                <p className="flex items-center gap-2 text-[12.5px] text-accent">
                  <MessagesSquare className="h-3.5 w-3.5" /> Outreach &amp; negotiation
                </p>
                <div className="mt-4 space-y-2 text-[13.5px]">
                  <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-surface px-3.5 py-2.5 text-ink/85">
                    My rate for one Reel is $1,400.
                  </p>
                  <p className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-accent px-3.5 py-2.5 text-white">
                    Could we do $1,100 with 30 days of paid usage?
                  </p>
                  <p className="max-w-[85%] rounded-2xl rounded-bl-md bg-surface px-3.5 py-2.5 text-ink/85">
                    Deal. Going live on the 14th.
                  </p>
                </div>
                <div className="mt-5 flex gap-1.5">
                  <Chip>Email</Chip>
                  <Chip>DM</Chip>
                </div>
              </article>

              {/* scripts */}
              <article className="flex flex-col rounded-[18px] bg-surface p-6 lift">
                <p className="flex items-center gap-2 text-[12.5px] text-muted">
                  <PenLine className="h-3.5 w-3.5" /> Scripts &amp; hooks
                </p>
                <h3 className="display mt-2 text-[22px] text-ink">Written in their voice.</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                  A brief, a hook and talking points for every creator, shared with you for
                  sign-off before anything goes out.
                </p>
                <p className="mt-4 rounded-xl bg-soft px-4 py-3 text-[13.5px] text-ink/85">
                  &ldquo;I didn&rsquo;t believe it either, until{" "}
                  <mark className="rounded bg-highlight px-1 text-ink">day three</mark>.&rdquo;
                </p>
              </article>

              {/* attribution */}
              <article className="flex flex-col rounded-[18px] bg-surface p-6 lift">
                <p className="flex items-center gap-2 text-[12.5px] text-muted">
                  <LineChart className="h-3.5 w-3.5" /> Revenue attribution
                </p>
                <h3 className="display mt-2 text-[22px] text-ink">Sales, not just views.</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                  Connect BigQuery and every link is tied to the clicks and sales it drove.
                </p>
                <div className="mt-5 flex h-20 items-end gap-1.5">
                  {BARS.map((b, i) => (
                    <div
                      key={i}
                      className={`flex-1 rounded-t-[5px] ${i === BARS.length - 1 ? "bg-accent" : "bg-sky"}`}
                      style={{ height: `${b}%` }}
                    />
                  ))}
                </div>
              </article>
            </div>

            <div className="flex items-center justify-between px-1 pt-6 sm:px-0">
              <span className="text-[12.5px] text-muted">Illustrative examples</span>
              <TextLink href={DEMO_HREF}>See it on your brand</TextLink>
            </div>
          </div>
        </Reveal>

        <Reveal stagger={0.1} className="mt-14 grid gap-10 md:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title}>
                <Icon className="h-5 w-5 text-[#2e6f9e]" strokeWidth={1.7} />
                <h3 className="mt-4 text-[19px] font-medium tracking-[-0.015em] text-ink">{f.title}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{f.body}</p>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
