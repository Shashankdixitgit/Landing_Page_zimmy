import { GROUPS, type CampaignGroup } from "@/lib/campaigns";
import Reveal from "../v15/Reveal";
import { CampaignIcon, ENTRIES, handoff, type Entry } from "./campaignIcons";

/**
 * Right under the three points: the channels, in two sections, "Paid ads" (Meta
 * ads, Google Ads, X ads) and "Social media" (Instagram, X, LinkedIn, Facebook,
 * TikTok). The layout follows runable.com's grouped cards (Shashank, 22 Nov): a
 * serif section title on the left, then big tinted cards, each with the real
 * logo, the name, one line on what it does, an example prompt in a white pill and
 * a black "Get started" button.
 *
 * The first card of a section spans the full width; the rest sit two to a row,
 * one on phones. Each section has its own soft tint: sky blue for paid ads,
 * lavender for social media.
 *
 * "Get started" opens the app's chat workspace with that card's example and key
 * (app.hitrate.sh/research?prompt=...&intent=...), through the same hand-off as the
 * chat box: sign-in first, then the chat. A channel not built yet goes as its own
 * key; the app starts a research chat for it until it's built. Nothing here says
 * "Soon": /v16 is only seen by the team for now.
 *
 * The groups, names, lines and examples all come from lib/campaigns.ts (Meta ads'
 * example is its first one).
 */

/** The two sections, in this order, and each one's tint. */
const SECTIONS: { group: CampaignGroup; card: string }[] = [
  { group: "ads", card: "border-[#d3e5f3] bg-[#eaf4fb]" },
  { group: "social", card: "border-[#e0daf4] bg-[#f2effc]" },
];

function ChannelCard({ e, wide, tint }: { e: Entry; wide: boolean; tint: string }) {
  const example = e.examples[0];
  return (
    <li className={`flex flex-col rounded-[24px] border p-7 sm:p-9 ${tint} ${wide ? "md:col-span-2" : ""}`}>
      <div className="flex items-center gap-3">
        <CampaignIcon k={e.key} className="h-7 w-7" />
        <h3 className="serif text-[30px] leading-tight text-[var(--bd-ink)] sm:text-[34px]">{e.label}</h3>
      </div>
      <p className="mt-3 max-w-[560px] text-[15px] leading-relaxed text-[var(--bd-muted)]">{e.line}</p>
      <div className="mt-auto flex flex-wrap items-center gap-3 pt-8">
        <p className="min-w-0 rounded-[22px] border border-black/[0.06] bg-white px-5 py-2.5 text-[14px] leading-snug text-[var(--bd-text)] shadow-[0_1px_2px_rgb(17_17_17/0.04)]">
          <span className="sr-only">For example: </span>&ldquo;{example}&rdquo;
        </p>
        {/* A full page load into the app: sign-in first, then this channel with this prompt. */}
        <a
          href={handoff(example, e.key).href}
          aria-label={`Get started with ${e.label}`}
          className="inline-flex shrink-0 items-center rounded-full bg-[#111] px-5 py-2.5 text-[14px] font-medium text-white transition-transform hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]"
        >
          Get started
        </a>
      </div>
    </li>
  );
}

export default function ChannelSections() {
  return (
    // id="campaigns": a place to link to (hitrate.sh/v16#campaigns).
    <section id="campaigns" aria-label="Channels" className="scroll-mt-6 px-5 py-20 sm:py-28">
      <div className="mx-auto max-w-[1080px] space-y-20 sm:space-y-24">
        {SECTIONS.map(({ group, card }) => {
          const title = GROUPS.find((g) => g.key === group)?.label ?? "";
          const items = ENTRIES.filter((e) => e.group === group);
          return (
            <Reveal key={group}>
              <section aria-labelledby={`channels-${group}`}>
                <h2 id={`channels-${group}`} className="serif text-[40px] leading-[1.1] text-[var(--bd-ink)] sm:text-[48px]">
                  {title}
                </h2>
                <ul className="mt-8 grid gap-4 md:grid-cols-2 sm:mt-10">
                  {items.map((e, i) => (
                    <ChannelCard key={e.key} e={e} wide={i === 0} tint={card} />
                  ))}
                </ul>
              </section>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
