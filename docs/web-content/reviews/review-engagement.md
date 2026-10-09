# Engagement review: zimmy.art landing page

Lens: page structure, and swapping text for visuals. Based on all 23 desktop and 37 mobile screenshots, `sections.json`, the product sheet, and the components in `zimmy-landing/components/`. I changed nothing in the repo.

**The short version:** the page explains one idea four times: research, then decode, then brief. It does this in the research demo, "What goes into the recipe", "A loop", and the dark tech carousel. It also shows the same five creator videos twice (in the hero and in the platform reel). Cut it to 8 sections, let the research demo carry the product story, and the page roughly halves in length without losing a single real claim.

---

## 1. Page length

| | Now | Target |
|---|---|---|
| Desktop (1440×900) | **23 viewport captures, about 20–23 screens** (~20,000px). The captures overlap a little, so 20 is the floor. | **9–10 screens** |
| Mobile (390×844) | **37 captures, about 34–37 screens** (~30,000px) | **16–18 screens** |
| Visible words | **2,523** counted. The platform reel repeats its captions 4×, so about **2,200 are unique**. | **≤ 550 visible**, plus FAQ answers that stay collapsed |
| Sections | 13 plus a footer | **8 including CTA/footer** |

Where the length comes from: three sections run to 2+ desktop screens each (research demo, "what goes into the recipe", how-it-works with the your-part/Zimmy's-part cards). On mobile, "What goes into the recipe" alone takes **4 screens** (mobile-05 to 08). Every section also starts with ~200px of empty padding. You can see it in desktop-07, desktop-08, mobile-08, mobile-11 and mobile-18, where half the screen is blank.

---

## 2. Overlap map

Each row is one idea, where it currently appears, and the **one place it survives**.

| Idea | Said in… (count) | Survives in |
|---|---|---|
| **Find outliers, not raw views** | Hero subhead, research demo, Recipe card 1 ("Videos that beat their own average"), How 02, Tech "Research", Comparison row 1, FAQ "What is an outlier?" (7) | **Research demo**. It *shows* the 8.4× / 5.1× / 3.7× multiples. FAQ keeps one line for anyone who wants the definition. |
| **Why it worked (hook / question / sequence / payoff)** | Recipe card 2, How 03, Tech "Breakdown", Comparison row 2, the outlier cards' `why` lines inside the demo (5) | **Research demo**. Each OutlierCard already has a one-line "why". Add the 4-row hook/question/sequence/payoff table as the expanded view of the top card. |
| **Shoot-ready brief** | Recipe card 3, Tech "Briefs", How 03, Comparison row 5, "Zimmy's part" list (5) | **Research demo, final step.** After the board fills, show the 0:00 Hook → 0:03 Setup → 0:08 Payoff → 0:13 CTA strip from Services/Technology as "→ becomes this brief". |
| **A person checks the calls** | Hero chip, Recipe feature 1, Recipe card 2 footnote, Tech headline ("People check the calls"), How subhead, Comparison row 3, FAQ (7) | **Hero trust chip** + **one Comparison row**. Delete the rest. |
| **Your real product, never invented** | Hero chip, Recipe feature 2, Ladder step 1, Tech "AI video", FAQ (5) | **Hero trust chip** + **FAQ**. |
| **Researched per market** | Hero chip, demo market picker, Recipe feature 3, Solutions "New markets", Comparison row 4, FAQ (6) | **Demo market picker**. It *proves* it in one tap (India / Europe / US & UK boards differ). Keep the hero chip. |
| **AI test → creators → ads** | Hero subhead, Ladder (all of it), How 04–05, Solutions "DTC brands" card, Footer blurb, CTA headline (6) | **Ladder**. |
| **You stay in control / approve everything** | Ladder footer bar, "Your part" card, Tech footer ("Nothing goes out…"), Comparison last row, FAQ "Do I stay in control?" (5) | **One line under the Ladder** + FAQ. Delete the "Your part / Zimmy's part" pair entirely. |
| **Each platform read on its own** | How stage 05 visual (TikTok Drop / Reels Remake / Shorts Keep testing, mobile-14), Platform scorecard, Comparison row 8 (3) | **Platform scorecard**, folded into the loop section as stage 05. |
| **Finding and signing creators** | Ladder step 2, Tech "Creators" (rate negotiation chat), Comparison row 7, "Zimmy's part", Creators section (5) | **Ladder rung 2**, which takes over the negotiation-chat visual from Tech. |
| **Click tracking** | Tech "Tracking" (zimmy.link counters), Scorecard "Action" card, Platforms footnote, "Zimmy's part", FAQ (5) | **Scorecard "Action" card**. Put the zimmy.link counter there instead of the bare bar. |
| **Creator videos as proof of vibe** | Hero card fan *and* the platform reel use **the same five clips, captions and badges** | **Hero only**. Delete the reel. |
| **Process timeline (Define → Read)** | How accordion only, but it repeats demo + ladder content in words | **Compact 5-step strip** (no paragraphs) above the scorecard. |

**Cut outright:** Services ("What goes into the recipe", 322 words), Technology carousel (196), the Reel strip (456 counted), and the "Your part / Zimmy's part" cards. Each useful visual in them moves somewhere else (section 4 below).

---

## 3. Proposed section order (8 sections)

| # | Section | Purpose (5 words) | Main visual / interaction | Max words | Desktop screens |
|---|---|---|---|---|---|
| 1 | **Hero** | Promise: less guessing, real proof | Wheat video + 5-card creator fan (keep). Three trust chips stay. Subhead cut to ≤ 25 words. | **50** | 1 |
| 2 | **Research, live** (ResearchDemo, extended) | Show research and decoding happening | Market picker → board **auto-fills on scroll** (no empty state) → top card expands to hook/question/sequence/payoff → "becomes this brief" 4-beat strip. "Illustrative" label stays. | **70** | 1.5 |
| 3 | **The ladder** | Test cheap, scale what's proven | 3 rungs with a rising "cost per test" bar. Each rung gets a mini-visual instead of a paragraph (see §4). One line under it: "You approve every creator, script and rupee." | **70** | 1 |
| 4 | **The loop** (Flow strip + PlatformScorecard) | Every round, every platform, measured | 5-step horizontal timeline (Day 1 / Days 1–3 / Days 2–4 / Week 2 / Every week) with a loop-back arrow, then the **TikTok / Reels / Shorts scorecard tabs** as stage 05. | **90** | 1.5 |
| 5 | **Why not tools or agencies** (Comparison) | Zimmy versus the two alternatives | Table trimmed to **6 rows**, Zimmy column first on mobile. | **60** | 1 |
| 6 | **Who it's for** (Solutions + Creators merged) | Find yourself in ten seconds | 4 compact tiles in one row: Consumer apps · DTC brands · New markets · Creators (→ "Join the creator list"). No empty colour blocks. | **60** | 0.75 |
| 7 | **Founder + FAQ** | Trust the person, clear doubts | One founder row (photo, $30M+, ex-logos), then the FAQ cut to **5 questions**. | **60 visible** (answers ≤ 40 each, collapsed) | 1.5 |
| 8 | **CTA + footer** | Book the demo now | Keep the wheat split CTA with its 3-item "you'll leave with" checklist. Footer as-is. | **45** | 1 |

**Total:** about 9.25 desktop screens and about 500 visible words.

Why this order works: promise (1) → proof it's real (2) → how money is protected (3) → how it keeps improving (4) → why not the alternatives (5) → is it for me (6) → can I trust them (7) → act (8). Each section answers the next question a buyer has, and none of them repeats an earlier one.

FAQ cut, from 8 to 5. Keep: *Guarantee viral?*, *Different from ChatGPT?*, *Different from an agency?*, *Fake product?*, *What's live vs coming?*. Drop *What is an outlier?* (the demo shows it), *Do I stay in control?* (the line under the ladder covers it) and *Which markets?* (the market picker shows it).

Nav labels then map 1:1 to sections: Research · Ladder · Loop · Why Zimmy · For creators · About.

---

## 4. Visual-first swaps (show, don't tell)

| Now (text) | Replace with | Reuse |
|---|---|---|
| Research demo opens on an **empty board**: "Winning videos will appear here. Press 'Find outliers'" (desktop-02, mobile-04, a full mobile screen of nothing) | Board **auto-runs when 40% in view**, with cards popping in one by one. The button becomes "Run again". | `ResearchDemo` `found` state + `OutlierCard` `pop` animation already exist. Start `found=true` on intersect. |
| Research brief card: 40-word paragraph ("Niche: self-improvement… Show me outliers…") | 3 chips: `Niche: self-improvement` `Market: India · EN/HI` `Last 30 days` | `Chip` from `ui.tsx` |
| Recipe card 2 paragraph + Tech "Breakdown" checklist | Expanded top OutlierCard showing the Hook / Open question / Sequence / Payoff table + "Checked by a strategist" tick | Table markup from `Services.tsx` |
| Recipe card 3 "Each winning idea becomes a brief…" (27 words) | The 0:00 / 0:03 / 0:08 / 0:13 beat strip, animated left to right as the demo's last step | From `Services.tsx` / `Technology.tsx` |
| Ladder rung 1 paragraph (35 words: camera angle, light, hands…) | A small 9:16 card tagged "AI test · Coming soon" with a watch-through line. Keep the "Move up when" line. | `CardVideo` / `CreatorCard` |
| Ladder rung 2 paragraph (33 words) | The **rate negotiation chat** ("My rate is $1,400." → "$1,100 with 30 days of usage?" → "Deal."), animated as messages | From `Technology.tsx` "Creators" card. Label "Illustrative". |
| Ladder rung 3 paragraph | A cost-per-result line that stays flat while a spend bar grows ("Keep going while the cost holds") | New, small SVG |
| "Cost per test goes up at each step. So does trust." footer bar | A single rising bar behind the three rungs: £ → ££ → £££ | Ladder background |
| How-it-works 5-row accordion with paragraphs and a 5-second auto-advance | A 5-node timeline with day badges and a curved "back to 03" arrow. No body text. | Day badges from `Flow.tsx` |
| Scorecard "Action" card: a bare progress bar labelled "Strong link clicks" | The zimmy.link counter rows (zimmy.link/noor 412 clicks…) | From `Technology.tsx` "Tracking" card |
| Solutions cards: tinted header blocks with only an icon + label (~150px of empty colour × 3, desktop-16, mobile-23/24) | Put a mini-visual in each header: app screen for apps, a 3-ad stack for DTC, the 🇮🇳 🇪🇺 🇺🇸 flags for markets. Or drop the block and use compact tiles. | Flags from `ResearchDemo` |
| Founder paragraph (28 words) | Keep only the $30M+ stat + ex-logos row. The headline carries the rest. | `Founders.tsx` |
| "Tools stop at ideas…" 36-word subhead | Delete it. The table *is* the argument. | — |

---

## 5. Engagement hooks: keep, fix or cut

**These earn their place:**
- **Research demo + market picker.** This is the best thing on the page and the only place a visitor *does* something and sees the product's core idea. Fix: auto-run it, and add the expand-to-why and brief steps so it replaces three other sections.
- **Platform scorecard tabs (TikTok / Reels / Shorts).** One tap changes four verdicts and the "Zimmy's call" line. Clear cause and effect. Keep it. (Small bug: on Reels, "Repeatable" says **Yes** while Run 3 is amber. Make them agree.)
- **Hero creator-card fan.** Motion and faces above the fold. Keep, but make sure the badges ("Outlier · 6.2× usual", "Remade by a creator") aren't clipped by the hero's bottom edge. They are in desktop-01 and mobile-01, and those badges *are* the story.
- **OutlierCard "+ add to board".** A tiny bit of fun, and it fits the flow if adding feeds the brief step.
- **FAQ accordion.** Fine as it is. Fewer items.
- **"Talk to the founder" chip.** Good for a founder-led sale, but see the mobile problems below.

**These are noise:**
- **Platform reel (infinite scroll).** It repeats the hero clips and captions. Cut it.
- **Tech carousel with prev/next arrows.** It hides 2 of 6 cards behind arrows on desktop, a peeking card on mobile tells no one to swipe, and every card repeats something said above. Cut it, and move its two good visuals (negotiation chat, link counters).
- **How-it-works auto-advancing accordion (5s timer).** It moves while people are reading and changes height on mobile (mobile-12 vs mobile-13 show different stages open). Replace it with a static timeline.
- **"Read the FAQ" button** in "Your part". It sends people *down* the page, past the sections that sell. Cut it along with the card.
- **"See it on your brand →"** under the Recipe cards. A third demo CTA within two screens. The nav button, the chip and section CTAs already cover this.

---

## 6. Mobile problems seen in the screenshots

1. **The comparison table hides Zimmy.** On 390px the table shows only "Capability" + "Research tools" (mobile-21/22). The **Zimmy column is off-screen**, so a phone visitor sees a column of ✕ and — and never sees Zimmy's ticks. This is the worst bug on the page. Fix: on mobile, show a two-column "Zimmy | Others" view, or put Zimmy first and stick the label column.
2. **The "Talk to the founder" chip covers content on almost every mobile screen.** It hides the research brief text (mobile-02), the CTA's third checklist item "The first three tests we'd run" (mobile-33), and the **footer email address** (mobile-35). Fix: icon-only on mobile, hide it while the CTA or footer is in view, and add bottom padding.
3. **The research demo makes you scroll before you can act.** The brief card pushes "Find outliers" to the second screen, and then an empty board fills a whole screen (mobile-03/04). Auto-run it, and put the board *above* the brief on mobile.
4. **The market chips wrap to two rows** (mobile-02: India / Europe on row 1, US & UK alone on row 2). Shorten them to flags + "IN / EU / US·UK", or make them a horizontal scroller.
5. **"What goes into the recipe" is 4 mobile screens** of stacked cards (mobile-05 to 08). It is cut in the new order.
6. **The hero subhead runs 6 lines** and the card fan crops to 3 cards with their labels clipped (mobile-00/01). Cut the subhead to ≤ 25 words and raise the fan so the badges show.
7. **The founder photo takes a full screen** (mobile-29), and the headline hyphen-breaks as "tool- / maker" (mobile-28). Crop the photo to a square avatar on mobile and rewrite or no-wrap the headline.
8. **Dead space between sections.** Mobile-08, 11, 18 and 30 are about 40% blank. Cut section top padding on mobile by about half.
9. **The platform scorecard stacks to about 2 screens** (mobile-17/18). Use a 2×2 grid of compact cards on mobile, or show only Hook and Action expanded.
10. **The Solutions tinted blocks** are ~150px of colour with just an icon (mobile-23/24). They take three phone-screens to say three lines.
11. **The creators card** has "Join the creator list" pressed right against the paragraph above it (mobile-26). It needs spacing.
12. **The tech carousel** peeks only ~40px of the next card with arrows above it and no swipe cue (mobile-19). It is cut in the new order.

---

*Every mock-up above (boards, chat, link counters, calendars, scorecards) stays labelled "Illustrative". No new product features are proposed. Each visual reuses an existing live or coming-soon item from the current page and the product sheet.*
