# zimmy.art site plan

Written by the web-writer agent on 9 Oct 2026, from `FILTER.md`, `research.md` and the current site (`app/page.tsx`, `components/`). The copy below is final and ready to paste. Where a line depends on a feature that is not live yet, the plan says so and gives the fallback line.

**Design system (unchanged):** light theme, Inter, green accent (`accent` #0f7a52), `sky` and `mint` panels, `night` dark card, `SplitHead` headlines (two-line title on the left, short paragraph on the right), `Reveal` on every section, `PrimaryButton` / `OutlineButton` / `TextLink` / `Chip` from `components/ui.tsx`.

**Global rules for the developer**
- "Book a demo" always uses `DEMO_HREF` (`mailto:shashank@zimmy.art?subject=Zimmy%20demo`).
- Every mock-up carries a small "Illustrative example" line. Handles, numbers and multipliers in mocks are made up and must stay labelled.
- No client logos, testimonials, counters or result numbers anywhere.
- Status words used on the page: **Live** (the product does it today), **Done by our team** (part of the service, a person does it), **Coming soon** (shown as a `Chip` with the text "Coming soon").

---

## Hero options

| # | Headline | Sub-line | Why |
|---|---|---|---|
| **1 (pick)** | **A recipe for viral content.** | Zimmy finds the videos already winning in your niche, works out why they worked, and tests that recipe with AI videos. The winners get remade by real creators and scaled as ads. Not guaranteed. Just far less guessing. | The founder's theme in plain words. "A recipe" (not "the recipe") keeps it honest, and the sub-line carries the full mechanism: research, decode, test, scale. The last two short sentences say "more predictable, not guaranteed" without sounding defensive. |
| 2 | **Stop guessing what to post.** | Zimmy studies what is already working for your audience, decodes why, and turns it into tests you can run this week. Scale only what proves itself. | Names the pain every marketer feels. Strong, but it describes the problem rather than Zimmy's promise. |
| 3 | **Test with AI. Scale with creators.** | Find a winning idea cheaply with AI videos, remake it with real creators people trust, then put money behind the ones that work. | The clearest statement of the ladder, which no competitor shows. Better as the ladder section headline than as the hero. |

**Why not the exact phrase "Recipe to create viral content":** it reads as a translation and is long at 80px. "A recipe for viral content." says the same thing in four words and breaks cleanly into two lines.

**If AI video creation is not live on launch day** (see filter check row C7), use this sub-line for option 1 instead:
> Zimmy finds the videos already winning in your niche, works out why they worked, and turns that into briefs your creators can shoot. Test, keep the winners, scale them as ads. Not guaranteed. Just far less guessing.

---

## Section order

| # | Section | Anchor | Component | Status |
|---|---|---|---|---|
| 0 | Navbar | | `Navbar.tsx` | change links |
| 1 | Hero | `#top` | `Hero.tsx` | rework (video background, new copy) |
| 2 | Research demo | `#research` | `BriefDemo.tsx` → rename `ResearchDemo.tsx` | rework |
| 3 | What's in the recipe | `#what` | `Services.tsx` | rework copy and card contents |
| 4 | The ladder | `#ladder` | **new** `Ladder.tsx` | new |
| 5 | How it works | `#how` | `Flow.tsx` | rework (5 stages) |
| 6 | Every platform, read on its own | `#platforms` | `Reel.tsx` | rework copy, add question row |
| 7 | AI does the work. People check it. | `#tech` | `Technology.tsx` | rework copy |
| 8 | Comparison | `#compare` | `Comparison.tsx` | new rows and columns |
| 9 | Who it's for | `#solutions` | `Solutions.tsx` | rework copy |
| 10 | For creators (P1) | `#creators` | **new** `Creators.tsx` | new |
| 11 | Founder | `#founder` | `Founders.tsx` | keep, one sub-line change |
| 12 | FAQ | `#faq` | `FAQ.tsx` | new questions |
| 13 | Final CTA | `#cta` | `CTA.tsx` | new copy |
| 14 | Footer | | `Footer.tsx` | new blurb and links |

New components: `Ladder.tsx`, `Creators.tsx`, `OutlierCard.tsx` (used in sections 2 and 3), and a `HeroVideo` block inside `Hero.tsx` (can stay inline). Rename `BriefDemo.tsx` to `ResearchDemo.tsx`.

---

## 0. Navbar

**Purpose:** get brands to the mechanism fast; give creators a way in.
**Element:** existing floating pill nav. White text over the hero video, solid after scroll (current behaviour).
**Reuse:** `Navbar.tsx`, replace `LINKS`.

**Copy**
- Links: `How it works` → `/#how` · `The ladder` → `/#ladder` · `Why Zimmy` → `/#compare` · `For creators` → `/#creators` · `About` → `/about`
- Button: `Book a demo` (DEMO_HREF)

---

## 1. Hero

**Purpose:** core promise (predictable outcomes from research) plus the full workflow in one sentence. Brands (P0).
**Element:** full-bleed rounded frame (keep the current `rounded-[28px] sm:rounded-[36px]` frame). Background is a looping video of golden wheat moving in the wind under a blue sky. The fanned `CreatorCard`s sit along the bottom edge (keep the `FAN` layout). Original; competitors use dark video heroes or chat boxes. Ours leads with calm and a plain promise, not a chat demo.

**Video build notes**
- `<video autoPlay muted loop playsInline poster="/hero-field.jpg">` with `object-cover`. Ship an MP4 (H.264) and a WebM, under about 4 MB, 8 to 12 seconds, seamless loop.
- `prefers-reduced-motion: reduce` → render the poster image only, no video.
- Keep both overlay gradients that already sit over the photo. Wheat is bright, so if white text fails a 4.5:1 check against the brightest frame, raise the radial overlay from `0.42` to about `0.5`. Keep the existing `text-shadow` on the headline and sub-line.
- Text is centred, `max-w-4xl`, headline `max-w-[14ch]` so it breaks after "recipe for".

**Copy (white on video)**
- Eyebrow pill (small, `bg-white/15 backdrop-blur`, white text): `Creator content, researched first`
- H1: `A recipe for` / `viral content.`
- Sub-line: `Zimmy finds the videos already winning in your niche, works out why they worked, and tests that recipe with AI videos. The winners get remade by real creators and scaled as ads. Not guaranteed. Just far less guessing.`
- Primary button (white pill, current style): `Book a demo` (DEMO_HREF)
- Secondary text link (white, underline on hover): `See how it works` → `#how`
- Small line under buttons: `For consumer apps, DTC brands and teams launching in new markets`

**Creator fan (bottom edge)**: update the illustrative `CREATORS` in `CreatorCard.tsx` so the status pill shows the recipe in motion instead of the old outreach pipeline. Keep handles, niches and gradients; change `caption`, `status` and `tone`:

| Card | caption | status | tone |
|---|---|---|---|
| @noor.cooks | ok this replaced my whole morning routine | Hook decoded | done |
| @devwithjay | 3 apps I actually use every day | Outlier · 6.2× usual | work |
| @mira.moves | day 14 and I'm genuinely shocked | AI test · live on Reels | live |
| @sana.skin | honest review, no filter | Remade by a creator | done |
| @theweekendcamper | packed it all in one bag | Scaling as an ad | live |
| @budgetwithben | how I stopped overspending | Next test queued | work |

**Corner pills**
- Bottom left: `Illustrative videos, not real clients`
- Bottom right: `See the research` ↓ → `#research`

**Promise row (under the frame)**, replace `PROMISES`:
- `ShieldCheck` · `A person checks every judgement call`
- `Clapperboard` · `Your real product on screen, never a made-up one`
- `Globe` · `Research for your market, not just the US`

---

## 2. Research demo

**Purpose:** workflow steps 1 to 4 (pick the niche, find outliers, decode, rank). Proves "research comes before generation".
**Element:** interactive demo. Left: a short input card (niche, market, product). Right: an outlier board that fills with three `OutlierCard`s when the button is pressed. Adapts the "prompt → result" pattern from Lightreel and UGC Pulse and the multiplier badge from UGC Pulse. Ours differs: the answer is a ranked board, every card says why it is there, shows a human-check row and has a "Test this" button that turns research into an experiment.
**Reuse:** `BriefDemo.tsx`, renamed `ResearchDemo.tsx`. Same `bg-sky` panel and two-column grid. New `OutlierCard.tsx` replaces the shortlist rows.

**Copy**
- SplitHead title: `Research first.` / `Then make videos.`
- SplitHead sub: `Asking an AI for "a viral video" gets you a guess. Zimmy starts by finding videos that beat their own account's usual views, in your niche and your market.`

**Left card (input)**
- Header bar: `Research brief · example`
- Small label: `Habit-tracking app, launching in India`
- Title: `Find what's working` / `for people building habits.`
- Body: `Niche: self-improvement and productivity. Market: India, English and Hindi.` Then highlighted (`mark`): `Show me outliers from the last 30 days,` then plain: `and what a viewer can see that makes the benefit obvious.`
- Footer left: `Takes a few minutes on real data`
- Button before: `Find outliers` (icon `Search`) · after: `Board ready` (icon `Check`)

**Right panel (board)**
- Header: `Outlier board` · count `0 videos` → `3 videos`
- Empty state: title `Winning videos` / `will appear here.` · line `Press "Find outliers" to try it.`
- Definition line, always visible at the top of the panel, `text-[12px] text-muted`: `Outlier: a video doing far better than that account usually does.`

**`OutlierCard` contents** (three cards, illustrative)

| Thumb | Handle | Badge | Why it's on the board | Chips |
|---|---|---|---|---|
| CreatorCard gradient (compact) | @dailyrituals.in | `8.4× usual` | `Shows the streak screen in the first second. The payoff is visible before anyone reads a word.` | `Hook: before/after` · `Hindi + English` |
| | @studywithriya | `5.1× usual` | `Opens on a question students already ask. The app answers it on screen.` | `Hook: question` · `Talking head` |
| | @the30dayguy | `3.7× usual` | `Day-by-day sequence keeps people watching to see day 30.` | `Format: diary` · `Series` |

- Row under each card's text: `Check` icon + `Reviewed by a strategist`
- Card button: `Test this` (outline small). After click: `Added to tests` (mint chip).
- Panel footer, centred: `Illustrative example. Real boards come from public video data in your niche and market.`

---

## 3. What's in the recipe

**Purpose:** the four research-to-brief capabilities, each as a mini product view. Steps 2, 3, 4 and the brief hand-off.
**Element:** the existing 2×2 card grid on the `#f4f8f9` panel, then the three-column feature row. Adapts UGC Pulse's breakdown card and timecoded script card; ours adds the human check and the one-change-at-a-time board, which no competitor shows.
**Reuse:** `Services.tsx`, replace card contents and `FEATURES`.

**Copy**
- SplitHead title: `What goes into` / `the recipe.`
- SplitHead sub: `A view count tells you that a video worked. Zimmy works out why, then turns the answer into something you can shoot and test.`
- Panel header left: `What Zimmy makes for you` · right: `From research to a shoot-ready brief`

**Card 1** (white, `lift`) · label `Search` icon `Outlier research` · Chip `Live`
- Title: `Videos that beat their own average.`
- Body: `Zimmy ranks videos by how far they beat the account's usual views, not by raw view counts. A small account with a breakout tells you more than a big account's normal day.`
- Mini UI: two stacked rows, each `@handle` + green badge (`6.2× usual`, `4.0× usual`).

**Card 2** (`bg-mint`) · label `ScanSearch` icon `Why it worked` · Chip `Live`
- Title: `The hook, the question, the payoff.`
- Mini UI: four rows, label left and value right:
  - `Hook` · `"I stopped doing this and my skin changed"`
  - `Open question` · `What did she stop?`
  - `Sequence` · `Problem, three quick cuts, reveal`
  - `Payoff` · `Product shown in use at 0:09`
- Bottom row with `UserCheck` icon: `Checked by a strategist before it reaches you`

**Card 3** (white, `lift`) · label `PenLine` icon `Shoot-ready brief` · Chip `Live`
- Title: `Beat by beat, ready to film.`
- Body: `Each winning idea becomes a brief for your brand: hook options, script, timings, where the product appears, on-screen text and caption.`
- Mini UI: four timecoded rows: `0:00 Hook` · `0:03 Setup` · `0:08 Payoff` · `0:13 Call to action`

**Card 4** (white, `lift`) · label `ListOrdered` icon `Experiment board` · Chip `Coming soon`
- Title: `Change one thing at a time.`
- Body: `Tests are ranked by how likely they are to work and how cheap they are to run. Each test changes one thing, such as the hook or the setting, so you can tell what moved the numbers.`
- Mini UI: three ranked rows: `1 · New hook, same video` · `2 · Same hook, outdoor setting` · `3 · Shorter cut, 12 seconds`

- Panel footer left: `Illustrative examples` · right `TextLink`: `See it on your brand` (DEMO_HREF)

**Feature row** (replace `FEATURES`)
1. `UserCheck` · `People check the judgement calls.` · `AI does the research and drafts. A strategist reviews the reasoning before anything reaches you, so the system learns and improves.`
2. `Clapperboard` · `Your real product, on screen.` · `Videos use real footage of your product or app. We never let a model invent a screen or feature you don't have.`
3. `Globe` · `Researched per market.` · `What works in India is not what works in Germany or the US. Research is filtered to the country and audience you're selling to.`

---

## 4. The ladder

**Purpose:** the brand objectives in order: AI UGC on autopilot → real UGC → ads, with influencer outreach and tracking inside the creator rung. The main white-space claim.
**Element:** original. Three rising step cards left to right (each one taller than the last, on desktop; stacked on mobile), joined by an arrow. Each card has a rung number, a title, what happens, and a "move up when" line. A thin bar under all three reads `Cost per test goes up at each step. So does trust.` No competitor shows the whole path.
**Reuse:** new component `Ladder.tsx`, using `SplitHead`, `Chip`, `Reveal stagger`.

**Copy**
- SplitHead title: `Test with AI.` / `Scale with creators.`
- SplitHead sub: `Most teams pay creators before they know an idea works. Zimmy finds the winner cheaply first, then moves it up one step at a time.`

**Rung 1** (`bg-sky`) · `01` · Chip `Coming soon` (remove once C7 is live)
- Title: `AI videos find the winner.`
- Body: `Zimmy turns the top tests into short AI videos with your real product footage. Camera angle, light, hands and sound are chosen on purpose, so the video feels real.`
- Move-up line (small, bold): `Move up when: people watch past the hook and understand the product.`

**Rung 2** (`bg-mint`) · `02` · Chip `Live`
- Title: `Real creators make it trusted.`
- Body: `The ideas that worked get remade by real creators whose audience looks like your customer. Zimmy finds them, handles outreach and the deal within your limits, and writes the brief.`
- Move-up line: `Move up when: the creator version gets clicks and sign-ups, not just views.`

**Rung 3** (`bg-night`, white text) · `03` · Chip `Done by our team`
- Title: `Ads scale what's proven.`
- Body: `Only the creator videos that keep working get budget as paid ads. You spend on proof, not on hope.`
- Move-up line: `Keep going while: the cost per result holds as spend grows.`

- Bar under the cards: `Cost per test goes up at each step. So does trust.`
- Footnote: `You approve every creator, every script and every euro, rupee or dollar of spend.`

---

## 5. How it works

**Purpose:** the 0 to 8 workflow from the Strategy tab, grouped into five stages.
**Element:** the existing numbered grid (`gap-px` cards), widened to five columns at `lg`, then the two "Your part / Zimmy's part" cards. Adapts TokPortal's numbered steps; ours shows a loop, not a one-way order (stage 05 points back to 03).
**Reuse:** `Flow.tsx`, replace `STEPS`, `YOU`, `ZIMMY`; change grid to `lg:grid-cols-5`. On stage 05 add a small `RotateCcw` icon with the text `Back to 03`.

**Copy**
- SplitHead title: `A loop,` / `not a lucky guess.`
- SplitHead sub: `Every round teaches the next one. You make the calls at each checkpoint. Zimmy does the work in between.`

**Stages** (`n` · `title` · time chip · body)
1. `01` · `Define` · `Day 1` · `Your product, your audience, and the moment someone watching "gets it". Then the niche and market to study.`
2. `02` · `Research` · `Days 1–3` · `Zimmy finds outlier videos in that niche, market by market.`
3. `03` · `Decode and plan` · `Days 2–4` · `Why each video worked, checked by a strategist. Then a ranked board of what to test.`
4. `04` · `Test` · `Week 2` · `AI videos and creator videos go out on TikTok, Reels and Shorts.`
5. `05` · `Read and decide` · `Every week` · `Results per platform. Double down, remake with real creators, or drop it, within your budget.`

Small line under the grid: `Timings are typical for a first round and depend on your niche.`

**Your part** card (sky)
- Label `Your part` · title `Decide. Approve.` · line `A few minutes at each checkpoint.`
- List: `Set the product, market and budget` · `Pick which tests to run` · `Approve every creator and script` · `Decide what gets ad spend`
- Button: OutlineButton `Read the FAQ` → `#faq`

**Zimmy's part** card (mint)
- Label `Zimmy's part` · title `Everything in between.` · line `Research, briefs, creators and tracking.`
- List: `Find and decode outlier videos` · `Rank the tests and write the briefs` · `Find, contact and agree terms with creators` · `Track clicks for every creator link`
- Button: PrimaryButton `Book a demo`

---

## 6. Every platform, read on its own

**Purpose:** step 7, live analytics, and the article's per-platform judgement point.
**Element:** keep the `CreatorCard` marquee. Under it, add a row of four question cards (white, `border-line`, numbered). Original framing; no competitor names these questions.
**Reuse:** `Reel.tsx`, new copy plus a `QUESTIONS` array rendered below the marquee.

**Copy**
- SplitHead title: `Every platform,` / `read on its own.`
- SplitHead sub: `A weak TikTok doesn't cancel a strong Reel. Zimmy reads each platform separately and asks the same four questions.`
- `aria-label` on the section: `Example creator videos`
- Question cards:
  1. `Did the opening earn attention?`
  2. `Did people understand the product?`
  3. `Did it lead to action?`
  4. `Is it repeatable enough to fund?`
- Line under the cards: `Views per platform and clicks per creator link are tracked today. Sales tracking is coming soon.`

---

## 7. AI does the work. People check it.

**Purpose:** human in the loop, and an honest map of what runs today.
**Element:** the existing `night` dark card with rows. Each row now ends with a status chip. Original: competitors sell "AI replaces your team"; ours names where a person checks.
**Reuse:** `Technology.tsx`, replace `AGENTS` (add a `status` field rendered as a small chip: `Live` in `accent-bright`, `Coming soon` in `white/15`).

**Copy**
- SplitHead title: `AI does the work.` / `People check the calls.`
- SplitHead sub: `Zimmy is software and a service. Agents handle the repetitive work. A strategist reviews every judgement call, and you approve what goes out.`
- Card heading: `How Zimmy runs` · badge `Running for you`

| Icon | Row title | Head | Body | Status |
|---|---|---|---|---|
| `Radar` | Research | `Outliers, not raw views.` | `Finds videos beating their account's usual views in your niche and market.` | Live |
| `ScanSearch` | Breakdown | `Why it worked, checked.` | `Breaks down hook, question, sequence and payoff. A strategist confirms it.` | Live |
| `PenLine` | Briefs | `Ready to shoot.` | `Hook options, script, timings and product placement for your brand.` | Live |
| `Handshake` | Creators | `Found and signed.` | `Finds creators by audience fit, contacts them and agrees terms within your limits.` | Live |
| `Clapperboard` | AI video | `Cheap first tests.` | `Short AI videos built on your real product footage.` | Coming soon |
| `Activity` | Tracking | `Every link counted.` | `A tracking link per creator, and views per platform. Sales tracking next.` | Live |

- Bottom line: `Nothing goes out in your name without your sign-off.`

---

## 8. Comparison

**Purpose:** answer "why not a research tool or a UGC agency?"
**Element:** existing table, Zimmy column highlighted in mint.
**Reuse:** `Comparison.tsx`, new `COLS` and `ROWS`.

**Copy**
- SplitHead title: `Research tools stop at ideas.` / `Agencies start with a guess.`
- SplitHead sub: `Research tools show you what went viral and leave the rest to you. Agencies make videos, but rarely start from data. Zimmy does both, and shows you its reasoning.`
- `COLS`: `Research tools` · `Zimmy` · `UGC agencies`

| Row | Research tools | Zimmy | UGC agencies |
|---|---|---|---|
| Finds outlier videos, not just big view counts | yes | yes | no |
| Explains why each video worked | part | yes | part |
| A person checks the reasoning | no | yes | part |
| Research for your market, not just the US | part | yes | part |
| Turns research into a shoot-ready brief | part | yes | yes |
| Tests ideas cheaply before paying creators | no | yes | no |
| Finds and signs real creators | no | yes | yes |
| Reads each platform on its own | no | yes | no |
| You see every creator, script and number | yes | yes | no |

Small line under the table: `Based on publicly listed features of typical tools and agencies.`

---

## 9. Who it's for

**Purpose:** brand personas (P0), each tied to a rung of the ladder.
**Element:** existing three-card grid with tinted tops.
**Reuse:** `Solutions.tsx`, replace `SOLUTIONS`.

**Copy**
- SplitHead title: `Built for teams` / `that need content to work.`
- SplitHead sub: `If you post often and can't say why some videos work, Zimmy is for you.`

1. `Smartphone` · `For consumer apps` · bg `mint` · head `Demos people actually watch.` · body `Real app footage, hooks taken from what's already winning in your category, and creators who can show the product in use.`
2. `ShoppingBag` · `For DTC brands` · bg `sky` · head `A steady supply of creator ads.` · body `Find the idea with cheap tests, remake it with creators, then run the proven ones as paid ads on Meta and TikTok.`
3. `Globe` · `For new markets` · bg `#f6efe2` · head `Local research before local spend.` · body `Launching in India, Europe or another English-speaking market? Start from what already works there, not from your home market.`

---

## 10. For creators (P1)

**Purpose:** creator objectives: views and growth from a calendar built on what works, plus brand deals.
**Element:** original. A compact split section: `SplitHead`, then one wide `bg-sky` card with two halves. Left: brand deals (live). Right: content calendar (coming soon) with a mini week strip of five day tiles. Button opens an email.
**Reuse:** new component `Creators.tsx`.

**Copy**
- SplitHead title: `Making videos?` / `Zimmy works for you too.`
- SplitHead sub: `Brands on Zimmy brief creators with ideas that are already working. That makes your job easier and your posts stronger.`

**Left half** · Chip `Live`
- Title: `Paid brand deals.`
- Body: `Brands use Zimmy to find creators whose audience fits. You get a clear brief, agreed terms and a tracking link, all in one place.`

**Right half** · Chip `Coming soon`
- Title: `A calendar built on what works.`
- Body: `A weekly plan of video ideas based on outliers in your niche, so you grow your views on purpose.`
- Week strip tiles: `Mon · Hook test` · `Tue · Reel` · `Wed · Rest` · `Thu · Remake` · `Fri · Series ep. 2`
- Caption under strip: `Illustrative example`

- Button: OutlineButton `Join the creator list` → `mailto:shashank@zimmy.art?subject=Zimmy%20creator%20list`

---

## 11. Founder

**Purpose:** trust without client logos.
**Element:** existing two cards (profile card and dark `$30M+` card).
**Reuse:** `Founders.tsx`. Keep the card contents, `CREDS`, the LinkedIn link and the `$30M+` card exactly as they are. Change only the SplitHead sub.

**Copy**
- SplitHead title (unchanged): `Built by an operator.` / `Not just a tool-maker.`
- SplitHead sub: `Zimmy comes from years of running growth and campaign funnels at Emergent, Bentolabs and Entrepreneur First, where guessing was expensive.`
- Profile card: `Shashank Dixit` · `Founder & CEO` · `ex-Bentolabs` · `ex-Emergent` · `ex-Entrepreneur First`
- Dark card: `Founder track record` · badge `Before Zimmy` · `$30M+` · `in yearly campaign funnels automated end-to-end.`

---

## 12. FAQ

**Purpose:** handle objections: ChatGPT, agencies, guarantees, control, what's live.
**Element:** existing split FAQ (title left, accordion right).
**Reuse:** `FAQ.tsx`, replace `FAQS`. Left column copy unchanged: `Questions,` / `answered.` · `Anything else? Ask the founder directly.` · `shashank@zimmy.art`.

1. **Can Zimmy guarantee a viral video?**
   No one honestly can. What Zimmy changes is where you start: from videos that already beat their account's usual views, with a clear reason why. That makes results more predictable, and it means you stop paying for guesses.
2. **What is an outlier?**
   A video doing far better than that account usually does. A small account with a breakout often tells you more than a big account's average post. An outlier is a reason to look closer, not proof, which is why a strategist checks each one.
3. **How is this different from asking ChatGPT for video ideas?**
   ChatGPT doesn't know what is winning in your niche this month. Zimmy starts from real, recent videos in your market, explains why they worked, and a person checks that reasoning before you see it.
4. **How is this different from a UGC agency?**
   Agencies usually start with a creative guess and charge per video. Zimmy starts with research, tests ideas cheaply first, and only then brings in real creators. You see every step and every number.
5. **Do I stay in control?**
   Always. You pick the tests, approve every creator and script, and decide what gets ad spend. Nothing goes out in your name without your sign-off.
6. **Will the AI videos show a fake version of my product?**
   No. We use real footage of your product or app. A model is never allowed to invent a screen or feature you don't have.
7. **Which markets do you cover?**
   Research is filtered by country and audience, so a launch in India starts from what works in India. Tell us your markets on the demo call and we'll confirm the coverage.
8. **What's live today, and what's coming?**
   Live today: outlier research, why-it-worked breakdowns, shoot-ready briefs, creator discovery and outreach, and click tracking per creator. Coming soon: AI test videos in the product, the experiment board, posting across platforms and sales tracking. Our team covers the gaps for you in the meantime.

---

## 13. Final CTA

**Purpose:** one action: book a demo.
**Element:** existing rounded sky-photo frame. Use the same wheat video (or its poster) as the hero so the page opens and closes on the same scene.
**Reuse:** `CTA.tsx`, new copy.

**Copy (white on image)**
- H2: `Find your recipe.` / `Then scale it.`
- Body: `Book a demo and tell us your product and market. We'll show you what's already working in your niche and why.`
- Button: `Book a demo` (DEMO_HREF)
- Line: `Prefer email?` `shashank@zimmy.art` (mailto)

---

## 14. Footer and metadata

**Reuse:** `Footer.tsx`, `app/layout.tsx`, `app/opengraph-image.tsx`.

- Footer blurb: `Zimmy researches what's already working, decodes why, and helps you test and scale it: AI videos first, then real creators, then ads.`
- Product column: `How it works` → `/#how` · `The ladder` → `/#ladder` · `Why Zimmy` → `/#compare` · `For creators` → `/#creators`
- Company column: unchanged (`About`, `FAQ`, `Book a demo`, `Contact`).
- `<title>` and OG title: `Zimmy: A recipe for viral content`
- Meta description: `Zimmy finds the videos already winning in your niche, works out why, and helps you test and scale them: AI videos first, then real creators, then ads.`
- OG image: update the headline text to `A recipe for viral content.`

---

## Launch gates

Before going live, confirm each of these with the founder. If a gate fails, use the fallback.

| Gate | Check | Fallback |
|---|---|---|
| G1 | AI video creation works end to end (C7) | Hero sub-line fallback above; Rung 1 keeps `Coming soon` chip |
| G2 | Outreach email is switched on in the product (C11) | Change the Creators row status to `Done by our team` |
| G3 | A strategist really reviews breakdowns before the brand sees them (C9) | Do not launch the "checked by a strategist" lines until this is a team habit |
| G4 | Hero video asset exists and passes white-text contrast | Use `/hero-field.jpg` with the current overlay |

---

## Filter check

Sources: **Sheet** = Khatarnaak Spreadsheet (tab named). **Art.** = Jake Castillo article, point number from FILTER.md §2. **Product** = the Zimmy app as built (competitor viral-post research with outlier score, Gemini breakdown and "Adapt for your brand" brief, Modash discovery, AgentMail outreach, tracking links, view snapshots; Higgsfield video in code, awaiting key). **Site** = an existing fact already on zimmy.art.

| # | Claim on the page | Where | Source | Status | Pass/fail |
|---|---|---|---|---|---|
| C1 | "A recipe for viral content" (with "Not guaranteed. Just far less guessing.") | Hero | Sheet: Strategy (predictable outcomes) | Positioning | Pass. Indefinite article plus the explicit "not guaranteed" keeps it within "more predictable, not guaranteed" |
| C2 | Finds videos already winning in your niche; outliers = beating the account's usual views | Hero, 2, 3, 7, FAQ | Sheet: Strategy step 2; Art. 2; Product (outlier score vs account average) | Live | Pass |
| C3 | Works out why they worked (hook, question, sequence, payoff) | Hero, 3, 7 | Sheet: Strategy step 3; Art. 4; Product (Gemini breakdown, whyItWorked) | Live | Pass |
| C4 | Shoot-ready brief: hook options, script, timings, placement, on-screen text, caption | 3, 7 | Art. 4; Product ("Adapt for your brand") | Live | Pass |
| C5 | Experiment board, one change at a time, ranked | 3, 5 | Sheet: Strategy step 4; Art. 3, 5 | Coming soon | Pass (labelled) |
| C6 | "Test this" button on outlier cards | 2 | Art. 3 | Illustrative demo | Pass (labelled illustrative) |
| C7 | Tests the recipe with AI videos | Hero, 4, 7 | Sheet: Strategy step 5, Product Vision; Product (Higgsfield in code, unverified) | Coming soon | Pass only with the Coming soon chip and gate G1 |
| C8 | Winners remade by real creators, then scaled as ads | Hero, 4 | Sheet: Strategy (ladder); Art. 9 | Rung 2 live, rung 3 done by our team | Pass |
| C9 | A strategist checks every judgement call | Hero, 2, 3, 7, FAQ | Sheet: Product Vision (human in the loop); FILTER keep rule | Service | Pass if gate G3 holds |
| C10 | Real product footage, never an invented screen | Hero, 3, FAQ | Art. 7 | Policy | Pass |
| C11 | Finds creators by audience fit, contacts them, agrees terms within limits | 4, 5, 7 | Product (Modash discovery, AgentMail outreach with guardrails); Site | Live, email activation pending | Pass with gate G2 |
| C12 | Research for your market, not just the US (India, EU, English-speaking) | Hero, 3, 9, FAQ | Sheet: Strategy (global narrative, local relevance); Product (country filters in discovery and research) | Partly live | Pass. Worded as "filtered by country", and FAQ asks to confirm coverage on the call |
| C13 | Posting to TikTok, Reels and Shorts | 5, FAQ | Sheet: Strategy step 6 | Coming soon in product; FAQ lists it | Pass (labelled) |
| C14 | Views per platform and clicks per creator link tracked today | 6, 7, FAQ | Product (view snapshots, tracking links with click redirect) | Live | Pass |
| C15 | Sales tracking | 6, 7, FAQ | Site (old BigQuery claim); Product (BigQuery deferred) | Coming soon | Pass (labelled). The old "ties posts to revenue in BigQuery" claim is removed |
| C16 | Four platform questions; weak TikTok doesn't cancel a strong Reel | 6 | Art. 8 | Method | Pass |
| C17 | Believability: camera angle, light, hands, sound chosen on purpose | 4 | Art. 6 | Method (applies once C7 is live) | Pass |
| C18 | Move-up rules for each rung | 4 | Art. 8, 9 | Method | Pass. Rules, not result numbers |
| C19 | Stage timings (Day 1, Days 1–3, Week 2, every week) | 5 | Product (scrape and breakdown run in minutes); service practice | Typical, labelled | Pass with "Timings are typical" line. Founder to confirm |
| C20 | You approve every creator, script and spend | 4, 5, 7, FAQ | Site; Product (approve step in cockpit) | Live | Pass |
| C21 | Comparison table marks for tools and agencies | 8 | research.md §2 and §3 | Category-level | Pass. No competitor named, footnote added |
| C22 | Creators get paid brand deals with brief, terms and link | 10 | Sheet: Product Vision (creators P1); Product (outreach, briefs, links) | Live | Pass |
| C23 | Creator content calendar | 10 | Sheet: Product Vision (creators P1) | Coming soon | Pass (labelled) |
| C24 | Founder: Shashank Dixit, ex-Bentolabs, ex-Emergent, ex-Entrepreneur First, $30M+ yearly campaign funnels automated | 11 | Site (founder card) | Fact | Pass |
| C25 | Mock handles, multipliers (8.4×, 6.2×, 5.1×, 4.0×, 3.7×) and card statuses | Hero, 2, 3 | Illustrative | Mock | Pass. Every mock carries an "Illustrative" line |
| C26 | Removed from the old site: "Every sale tracked", "Shortlist within 24 hours", "work of a ten-person team", "Transparent, flat pricing", "Ties posts to revenue in BigQuery" | — | Unverified or not built | Dropped | Fail on the old site, so removed |
| C27 | No client logos, testimonials, counters or result numbers | Whole page | FILTER drop rules | — | Pass |
