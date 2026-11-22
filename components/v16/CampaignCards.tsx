import { ArrowRight } from "lucide-react";
import { GROUPS } from "@/lib/campaigns";
import Reveal from "../v15/Reveal";
import { StatusTag } from "./CampaignMenu";
import { CampaignIcon, ENTRIES, handoff } from "./campaignIcons";

/**
 * NOT RENDERED: /v16 dropped this section (21 Nov) and shows the Paid ads and
 * Social media cards instead (ChannelSections.tsx, which also has id="campaigns").
 * Kept in case the full grid comes back.
 *
 * Every campaign and channel on one screen, grouped the way the menus group them
 * (GROUPS in lib/campaigns.ts). Each card says what it does in one line, shows an
 * example of what you could type, and "Start" opens the app's chat workspace with
 * that example and that key already filled in, through the same sign-in as the
 * chat box. Every card can be started, built or not (no "Soon": /v16 is only seen
 * by the team for now); one not built yet starts a research chat in the app.
 *
 * All the words come from lib/campaigns.ts (the mirror of the app's list).
 */
export default function CampaignCards() {
  return (
    // id="campaigns": a place to link to (e.g. hitrate.sh/#campaigns).
    <section id="campaigns" className="scroll-mt-6 px-5 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-[1080px]">
        <div className="text-center">
          <p className="text-[12.5px] font-medium uppercase tracking-[0.12em] text-[var(--bd-faint)]">Campaigns</p>
          <h2 className="serif mt-3 text-balance text-[34px] leading-tight text-[var(--bd-ink)] sm:text-[44px]">Pick a campaign. The chat runs it.</h2>
          <p className="mx-auto mt-4 max-w-[520px] text-balance text-[15px] text-[var(--bd-muted)]">
            Each one starts from what&rsquo;s already winning in your category, and asks for your OK before anything goes out.
          </p>
        </div>

        <div className="mt-14 space-y-10 sm:space-y-12">
          {GROUPS.map((g) => (
            <div key={g.key} className="grid gap-4 lg:grid-cols-[168px_minmax(0,1fr)] lg:gap-8">
              <h3 className="text-[12.5px] font-medium uppercase tracking-[0.1em] text-[var(--bd-faint)] lg:pt-6">{g.label}</h3>
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {ENTRIES.filter((e) => e.group === g.key).map((card) => (
                  <li key={card.key} className="bd-card flex flex-col rounded-[22px] p-5">
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[11px] bg-[var(--bd-soft)] text-[var(--bd-ink)]">
                        <CampaignIcon k={card.key} className="h-[18px] w-[18px]" />
                      </span>
                      <h4 className="min-w-0 flex-1 text-[15.5px] font-medium text-[var(--bd-ink)]">{card.label}</h4>
                      {card.status ? <StatusTag status={card.status} /> : null}
                    </div>
                    <p className="mt-3 text-[13.5px] leading-relaxed text-[var(--bd-muted)]">{card.line}</p>
                    <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-[var(--bd-text)]">
                      <span className="sr-only">For example: </span>&ldquo;{card.examples[0]}&rdquo;
                    </p>
                    {/* A full page load into the app: sign-in first, then this campaign with this prompt. */}
                    <a
                      href={handoff(card.examples[0], card.key).href}
                      aria-label={`Start ${card.label} with: ${card.examples[0]}`}
                      className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#111] px-4 py-2 text-[13.5px] font-medium text-white transition-transform hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]"
                    >
                      Start
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-[520px] text-balance text-center text-[13px] text-[var(--bd-muted)]">
          Start opens HitRate after you sign in with Google or an email code. Nothing posts, spends or sends without your OK.
        </p>
      </Reveal>
    </section>
  );
}
