import { ArrowRight } from "lucide-react";
import { researchHref } from "@/lib/appHandoff";
import { CAMPAIGNS, GROUPS, SOON, type CampaignGroup } from "@/lib/campaigns";
import Reveal from "../v15/Reveal";
import { StatusTag } from "./CampaignMenu";
import { CampaignIcon, firstSentence } from "./campaignIcons";

/**
 * Every campaign on one screen, grouped the way the menus group them (GROUPS in
 * lib/campaigns.ts: Paid ads, Creators & UGC, Messaging, Research). Each card
 * says what the campaign does in one line, shows an example of what you could
 * type, and "Start" opens the app's chat workspace with that example and that
 * campaign already filled in, through the same sign-in as the chat box.
 * What's coming later is greyed, with no button.
 *
 * All the words come from lib/campaigns.ts (the mirror of the app's list), so a
 * card can't promise more than the app's own chat box does.
 */

type Card =
  | { live: true; key: (typeof CAMPAIGNS)[number]["key"]; label: string; line: string; example: string; status: "live" | "early" }
  | { live: false; key: (typeof SOON)[number]["key"]; label: string; line: string };

function cardsOf(group: CampaignGroup): Card[] {
  return [
    ...CAMPAIGNS.filter((c) => c.group === group).map(
      (c): Card => ({ live: true, key: c.key, label: c.label, line: firstSentence(c.blurb), example: c.examples[0], status: c.status }),
    ),
    ...SOON.filter((s) => s.group === group).map((s): Card => ({ live: false, key: s.key, label: s.label, line: s.blurb })),
  ];
}

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
                {cardsOf(g.key).map((card) => (
                  <li
                    key={card.key}
                    className={`flex flex-col rounded-[22px] p-5 ${card.live ? "bd-card" : "border border-dashed border-black/[0.09] bg-[#fafafa]"}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`grid h-9 w-9 shrink-0 place-items-center rounded-[11px] ${
                          card.live ? "bg-[var(--bd-soft)] text-[var(--bd-ink)]" : "bg-black/[0.04] text-[#8a8d92]"
                        }`}
                      >
                        <CampaignIcon k={card.key} className="h-[18px] w-[18px]" />
                      </span>
                      <h4 className={`min-w-0 flex-1 text-[15.5px] font-medium ${card.live ? "text-[var(--bd-ink)]" : "text-[#8a8d92]"}`}>{card.label}</h4>
                      <StatusTag status={card.live ? card.status : "soon"} />
                    </div>
                    <p className={`mt-3 text-[13.5px] leading-relaxed ${card.live ? "text-[var(--bd-muted)]" : "text-[#8a8d92]"}`}>{card.line}</p>
                    {card.live ? (
                      <>
                        <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-[var(--bd-text)]">
                          <span className="sr-only">For example: </span>&ldquo;{card.example}&rdquo;
                        </p>
                        {/* A full page load into the app: sign-in first, then this campaign with this prompt. */}
                        <a
                          href={researchHref(card.example, card.key)}
                          aria-label={`Start ${card.label} with: ${card.example}`}
                          className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-[#111] px-4 py-2 text-[13.5px] font-medium text-white transition-transform hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]"
                        >
                          Start
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                        </a>
                      </>
                    ) : (
                      <p className="mt-3 text-[12.5px] text-[#8a8d92]">Coming soon. It can&rsquo;t be started yet.</p>
                    )}
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
