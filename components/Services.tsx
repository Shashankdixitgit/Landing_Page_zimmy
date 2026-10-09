import { Search, ScanSearch, PenLine, ListOrdered, UserCheck, Clapperboard, Globe } from "lucide-react";
import Reveal from "./Reveal";
import { Chip, SplitHead, TextLink, DEMO_HREF } from "./ui";

const FEATURES = [
  {
    icon: UserCheck,
    title: "People check the judgement calls.",
    body: "AI does the research and drafts. A strategist reviews the reasoning before anything reaches you, so the system learns and improves.",
  },
  {
    icon: Clapperboard,
    title: "Your real product, on screen.",
    body: "Videos use real footage of your product or app. We never let a model invent a screen or feature you don't have.",
  },
  {
    icon: Globe,
    title: "Researched per market.",
    body: "What works in India is not what works in Germany or the US. Research is filtered to the country and audience you're selling to.",
  },
];

const BREAKDOWN = [
  ["Hook", "“I stopped doing this and my skin changed”"],
  ["Open question", "What did she stop?"],
  ["Sequence", "Problem, three quick cuts, reveal"],
  ["Payoff", "Product shown in use at 0:09"],
];

const BEATS = [
  ["0:00", "Hook"],
  ["0:03", "Setup"],
  ["0:08", "Payoff"],
  ["0:13", "Call to action"],
];

const TESTS = ["New hook, same video", "Same hook, outdoor setting", "Shorter cut, 12 seconds"];

function CardLabel({ icon: Icon, children, status }: { icon: typeof Search; children: React.ReactNode; status: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <p className="flex items-center gap-2 text-[12.5px] text-muted">
        <Icon className="h-3.5 w-3.5" /> {children}
      </p>
      <Chip tone={status === "Live" ? "mint" : "soft"}>{status}</Chip>
    </div>
  );
}

export default function Services() {
  return (
    <section id="what" className="px-5 pb-24 sm:pb-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                What goes into
                <br />
                the recipe.
              </>
            }
            sub="A view count tells you that a video worked. Zimmy works out why, then turns the answer into something you can shoot and test."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="rounded-[28px] border border-line bg-[#f4f8f9] p-4 sm:p-8">
            <div className="flex items-center justify-between px-1 pb-6 sm:px-0">
              <span className="text-[15px] font-medium text-ink">What Zimmy makes for you</span>
              <span className="hidden text-[13px] text-muted sm:inline">From research to a shoot-ready brief</span>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <article className="flex flex-col rounded-[18px] bg-surface p-6 lift">
                <CardLabel icon={Search} status="Live">Outlier research</CardLabel>
                <h3 className="display mt-3 text-[22px] text-ink">Videos that beat their own average.</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                  Zimmy ranks videos by how far they beat the account&rsquo;s usual views, not by raw
                  view counts. A small account with a breakout tells you more than a big
                  account&rsquo;s normal day.
                </p>
                <div className="mt-5 space-y-2">
                  {[
                    ["@devwithjay", "6.2× usual"],
                    ["@noor.cooks", "4.0× usual"],
                  ].map(([h, m]) => (
                    <div key={h} className="flex items-center justify-between rounded-xl bg-soft px-3.5 py-2.5 text-[13px]">
                      <span className="text-ink">{h}</span>
                      <span className="rounded-md bg-accent px-1.5 py-0.5 text-[11px] font-semibold text-white">{m}</span>
                    </div>
                  ))}
                </div>
              </article>

              <article className="flex flex-col rounded-[18px] bg-mint p-6">
                <CardLabel icon={ScanSearch} status="Live">Why it worked</CardLabel>
                <h3 className="display mt-3 text-[22px] text-ink">The hook, the question, the payoff.</h3>
                <dl className="mt-4 divide-y divide-[#cfe9c4] rounded-xl bg-surface px-4 text-[13px]">
                  {BREAKDOWN.map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-4 py-2.5">
                      <dt className="shrink-0 text-muted">{k}</dt>
                      <dd className="text-right text-ink">{v}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 flex items-center gap-2 text-[12.5px] text-accent">
                  <UserCheck className="h-3.5 w-3.5" /> Checked by a strategist before it reaches you
                </p>
              </article>

              <article className="flex flex-col rounded-[18px] bg-surface p-6 lift">
                <CardLabel icon={PenLine} status="Live">Shoot-ready brief</CardLabel>
                <h3 className="display mt-3 text-[22px] text-ink">Beat by beat, ready to film.</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                  Each winning idea becomes a brief for your brand: hook options, script, timings,
                  where the product appears, on-screen text and caption.
                </p>
                <ol className="mt-5 space-y-1.5 text-[13px]">
                  {BEATS.map(([t, l]) => (
                    <li key={t} className="flex items-center gap-3 rounded-lg bg-soft px-3 py-2">
                      <span className="font-mono text-[12px] text-muted">{t}</span>
                      <span className="text-ink">{l}</span>
                    </li>
                  ))}
                </ol>
              </article>

              <article className="flex flex-col rounded-[18px] bg-surface p-6 lift">
                <CardLabel icon={ListOrdered} status="Coming soon">Experiment board</CardLabel>
                <h3 className="display mt-3 text-[22px] text-ink">Change one thing at a time.</h3>
                <p className="mt-2 text-[14.5px] leading-relaxed text-muted">
                  Tests are ranked by how likely they are to work and how cheap they are to run.
                  Each test changes one thing, such as the hook or the setting, so you can tell
                  what moved the numbers.
                </p>
                <ol className="mt-5 space-y-1.5 text-[13px]">
                  {TESTS.map((t, i) => (
                    <li key={t} className="flex items-center gap-3 rounded-lg bg-soft px-3 py-2">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-sky text-[11px] font-semibold text-[#235a80]">
                        {i + 1}
                      </span>
                      <span className="text-ink">{t}</span>
                    </li>
                  ))}
                </ol>
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
