# Brand-first homepage plan (10 Oct)

**Reader:** the head of growth at a D2C or consumer-app brand. After reading, they book a demo.
**Rule of thumb:** say what the brand gets (sales, installs, cost per result, speed, less agency work). Every primary CTA goes to brands. Creators get one small path. The page ends up shorter than today, because one section is cut.

Link constants (components/ui.tsx): `DEMO_HREF` (cal.com, 30 min), `BRAND_JOIN_HREF` (/brands/join), `CREATOR_HREF` (/creators).

## Final order

| # | Section | Action |
|---|---|---|
| 0 | Meta (app/layout.tsx) | Rewrite |
| 1 | Navbar | Re-caption |
| 2 | Hero | Re-caption |
| 3 | ResearchDemo `#research` | Re-caption (heading only) |
| 4 | ~~CreatorMap `#markets`~~ | **Cut** from homepage. Its "every market" point moves into the Hero sub and the FAQ. Keep the component file. |
| 5 | Ladder `#ladder` | Re-caption |
| 6 | Flow + PlatformScorecard `#how` | Re-caption |
| 7 | Founders `#founder` | Keep, minus the $30M+ card (see flags) |
| 8 | FAQ `#faq` | Rebuild copy |
| 9 | CTA `#cta` | Rebuild the right card |
| 10 | Footer | Re-caption |

---

## 0. Meta: app/layout.tsx
- **title:** `Zimmy: Creator marketing that sells`
- **description:** `Zimmy finds what is already selling in your niche, briefs vetted creators on proven hooks, runs the campaign and reports results. For D2C and consumer-app brands.`
- **openGraph:** use the same title and description.

## 1. Navbar
- **Links:** How it works (`#how`), Research (`#research`), FAQ, About.
- **Right side:**
  - Plain text link "For creators" → `CREATOR_HREF`. Small, muted, no button styling, placed first.
  - Filled button "Book a demo" → `DEMO_HREF`.
- **Mobile menu:** "Book a demo" (filled), then "Join as a brand" → `BRAND_JOIN_HREF` (text), then "For creators" (text, last).
- Why: there is now one brand ask everywhere, and the creator link stops competing with it.

## 2. Hero (re-caption, same visual)
- **H1:** `Creator content that sells. Planned, not guessed.`
- **Sub:** `Zimmy finds the hooks already selling in your niche, briefs vetted creators to remake them, runs the campaign and reports what worked. In every market you sell to.`
- **Primary CTA:** "Book a demo" → `DEMO_HREF`
- **Secondary:** text link "Or tell us about your brand →" → `BRAND_JOIN_HREF`
- **Remove:** "Are you a creator? Start here →".
- **Corner pill:** change "Example videos" to `Illustrative campaign`.
- **Visual:** keep the wheat video and the CreatorCard fan. Change the card status pills to the brand's pipeline:
  - "Hook decoded"
  - "Outlier · 6.2× usual"
  - "Briefed to a vetted creator"
  - "Live on Reels"
  - "Scaling as an ad"
- **Optional:** drop the follower counts from the cards so they read less like creator profiles.
- AI UGC is left out of the hero on purpose, because it is still Coming soon. It appears in the Ladder, labelled.

## 3. ResearchDemo `#research` (heading only)
- **Eyebrow:** `Research`
- **H2:** `Know what sells / before you spend.`
- **Sub (new, one line):** `Zimmy finds videos in your niche that beat their account's usual views, and explains why they worked.`
- **Demo:** unchanged, including its "Illustrative example" label.

## 4. CreatorMap: cut
- Why: it shortens the page and removes a wall of creator faces.
- The market point lives on in the Hero sub ("In every market you sell to") and in FAQ question 6.
- Remove `<CreatorMap />` from app/page.tsx. Do not delete the component.

## 5. Ladder `#ladder` (re-caption, same staircase)
- **H2:** `Spend on proof, / not on hope.`
- **Sub:** `Test cheaply, keep what works, then scale it.`
- **Cards (status chips stay exactly as they are):**
  1. `Cheap AI UGC tests find the hook.` (Coming soon)
  2. `Vetted creators make it trusted.` (Live)
  3. `Ads scale it while cost per result holds.` (Done by our team)

## 6. Flow + PlatformScorecard `#how` (re-caption)
- **Eyebrow:** `How it works`
- **H2:** `We run it. / You approve it.`
- **Sub:** `One loop, from research to results. Every round makes the next one sharper.`
- **Accordion stages** (titles and one-liners; StageView panels and timings unchanged; the "typical" footnote stays):
  1. **Brief** (Day 1). `Your product, audience, market and budget.`
  2. **Research** (Days 1–3). `What's already working in your niche, market by market.`
  3. **Plan** (Days 2–4). `Why each video worked, then a ranked list of what to test.`
  4. **Launch** (Week 2). `Vetted creators briefed and posting on TikTok, Reels and Shorts.`
  5. **Report** (Every week). `Results per platform. Double down, remake or drop it, within your budget.`
- **Scorecard:**
  - H3: `Every platform, judged on results.`
  - Reorder the four questions so **Action** comes first, renamed `Did it drive clicks?`. Then Hook, Clarity, Repeatable.
  - Keep the illustrative labels.
  - Do not add installs or sales as tracked metrics. Sales tracking is Coming soon.
- **Your part / Decide. Approve.:** keep all four bullets and the sign-off line as they are.
- **Zimmy's part / Everything in between.:**
  - `Research on what's selling in your niche and market`
  - `Briefs and scripts built on proven hooks`
  - `Creators found, vetted for audience fit, and briefed`
  - `Weekly results per platform and per creator link`
- **CTA:** "Book a demo" → `DEMO_HREF`.

## 7. Founders `#founder`
- **H2:** `Built by an operator. / You work with the founder.`
- **Card:** Shashank Dixit, Founder & CEO. Credentials: IIT Madras, BS degree · ex-Emergent · ex-Entrepreneur First. "Say hi on LinkedIn".
- **Stat card:** remove the "$30M+" card unless the owner approves it (see flags). If it is removed, the founder card goes full width.

## 8. FAQ `#faq` (rebuild)
- **H2:** `Questions, / answered.`
- **Line under the H2:** `Anything else? Ask the founder directly.` shashank@zimmy.art

1. **What does Zimmy actually do?**
   We run your creator marketing. We research what is working in your niche, write briefs from proven hooks, find and brief creators, and report results each week. You approve every step.
2. **Is it software or a service?**
   Both. The AI does the research and the heavy lifting. Our team runs the campaign with you.
3. **What does it cost?**
   It depends on your markets and how much content you need. We'll walk you through pricing on the call.
4. **How do you pick creators?**
   We look for creators whose audience matches yours, in the markets you sell to. You approve every creator before anything goes out.
5. **How do you measure results?**
   We report views per platform and clicks per creator link, every week. Sales tracking is coming soon.
6. **Which markets and categories?**
   Consumer apps and D2C brands: beauty, fashion, food, fitness, fintech and more. Research filters by country. We'll confirm coverage for your markets on the call.
7. **Can you guarantee results?**
   No one honestly can. We make it more predictable by starting from what already works and testing before you scale.
8. **Do I stay in control?**
   Always. You pick the tests, approve every creator and script, and decide what gets ad spend. Your real product, never an invented one.
9. **What's live today?**
   Research per market, why-it-worked breakdowns, briefs, and finding and briefing creators. AI UGC test videos are coming soon.

- Dropped: "Why not just ask ChatGPT?". Answer 1 covers it.
- Optional, if the page is too long: cut question 2 or question 7.

## 9. CTA `#cta` (keep the layout, brand-only)
- **Left side (wheat image):**
  - H2: `Bring your brand. / See what will sell.`
  - Sub: `On the call we'll show you what's working in your niche right now. You'll leave with a starting point.`
  - CTA: "Book a demo" → `DEMO_HREF`
- **Right card (replaces the creator card):**
  - Eyebrow: `Prefer to start yourself?`
  - H3: `Tell us about / your brand.`
  - Line: `Eight quick questions. We'll come back with what's working in your niche.`
  - Filled button: "Join as a brand" → `BRAND_JOIN_HREF`
  - Keep the founder row: "Or write to the founder", shashank@zimmy.art.
- **Under the block:** one small muted line, `Making videos? Zimmy for creators →` → `CREATOR_HREF`.

## 10. Footer
- **Tagline:** `Creator marketing that sells. Researched, run and reported by Zimmy.`
- **Product column:** How it works, Research, FAQ, For creators (last).
- **Company column:** About, Book a demo, Join as a brand (`BRAND_JOIN_HREF`), Contact.
- **Remove** "Join as a creator". It is already reachable from /creators.

---

## Flags for the owner (decide before shipping)
1. **"$30M+ in yearly campaign funnels automated" (Founders.tsx).** No source, and it is outside the founder facts you allowed. The plan removes it. Keep it only if you confirm it.
2. **"Checked by a strategist" (Flow StageView).** Keep it only if a person really reviews each board. Otherwise change it to "Reviewed by our team".
3. **Stage timings (Day 1 / Week 2).** Speed matters to brands, so they are kept and labelled "typical". Remove them if you can't stand behind them.
4. **/brands/join promises "conversions and revenue".** That reads as live, but sales tracking is Coming soon. The join page is out of scope for this edit, so it is not changed here.
5. **Sources.** Don't copy from site-plan.md section 11, which still lists Bentolabs.

## Compliance check
- No client names, logos, testimonials, stats or case studies.
- Every mock stays labelled illustrative.
- AI UGC is shown as Coming soon wherever it appears.
- Sales tracking is never described as live.
- The founder card names only Shashank.
- No new media.
