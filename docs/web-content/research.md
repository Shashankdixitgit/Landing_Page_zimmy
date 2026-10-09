# Zimmy web research: competitors and article

Prepared by the web-researcher agent on 9 Oct 2026. This file is input for the writer agent. It describes patterns in our own words. It is not site copy, and none of the companies below are Zimmy clients.

---

## 1. Sources and access

| Source | How it was read | Result |
|---|---|---|
| tokportal.com (live) | Playwright at 1440×1000 (scrolled viewport by viewport) and 390×844, plus rendered page text | Full access |
| ugcpulse.app (live) | Same | Full access |
| lightreel.ai (live) | Same | Full access |
| passionbits.io (live) | Same | Full access. A Calendly embed loads near the footer. |
| Wayback CDX, tokportal.com | 15 monthly captures, Sep 2024 to Oct 2026. Opened Sep 2024, Mar 2025, Oct 2025 and Mar 2026. | Readable |
| Wayback CDX, ugcpulse.app | 1 capture (Jun 2026). Opened it. | Readable, and it differs a lot from the live site |
| Wayback CDX, lightreel.ai | 3 captures (Mar to May 2026). Opened Mar and May. | Readable, but they show the logged-out app, not a marketing page |
| Wayback CDX, passionbits.io | 37 captures, Oct 2020 to Jun 2026. Opened Oct 2020, Feb 2023 and Mar 2024. | The Oct 2020 page is a blank shell. The Jan 2025 and Jun 2026 captures are JS-only and rendered blank in both curl and Playwright, so **the moment PassionBits pivoted is not visible**. |
| Jake Castillo article | The local extracted text, used to check details. FILTER.md §2 already summarises it. | Read |

The first CDX call for passionbits.io returned "Internet Archive: Temporarily Offline". A retry worked.

The screenshots, scripts and raw downloads are in the session scratchpad under `research/`. They are not in the repo.

Two capture caveats:
- **TokPortal:** clipped full-page captures left a large sticky-scroll region blank. The viewport-by-viewport pass filled it in.
- **UGC Pulse:** the hero demo animates. Two captures show different states: an empty input, then a typed question with three hook cards above it.

---

## 2. Competitor profiles

### 2.1 TokPortal (tokportal.com)

**Positioning:** It is distribution infrastructure. It sets up and runs local TikTok and Instagram accounts in other countries, on real phones and SIMs with local operators, so a brand's content gets organic reach in that market. It targets app startups, AI startups, app studios, record labels, and marketing and UGC agencies. The audience line sits just above the final CTA.

**Section order (live):**
1. Top nav (Product, Integrations, Pricing, Developers) with a bright cyan "Get started" button.
2. Hero.
   - The headline names a country, and that country rotates.
   - A **country picker dropdown** (20 countries with flags) sits above the main CTA, with a secondary "Schedule a call" button below it.
   - Below that is a one-line rotating testimonial with an avatar and role.
   - Then three stat counters (accounts created, organic views, countries).
3. Large **product-mock hero**: a fake chat prompt ("You ask your AI…") above a dashboard.
   - The dashboard has an account list on the left and one account's stats on the right (views, followers, engagement, a line chart).
   - Three video thumbnails, each with a view count, sit under the chart.
   - A pager in the corner reads "01 / 05", so (inferred) the mock cycles through five states.
4. Logo wall, 8 logos.
5. **Accordion "how it works"** with four numbered rows: geo accounts, niche warming, analytics, MCP/agent. The open row shows its text on the left and a small UI card on the right (for example, a market list with flags and account counts). Progress dashes underneath suggest it auto-advances (inferred).
6. Dark navy band: "your AI can now distribute" (paraphrased), with a **horizontal drag carousel of about 16 feature cards**. Each card has an illustrated UI vignette on top, then a small all-caps label, a two-line title and one sentence. Examples: a calendar, a comment thread, an audio waveform, an ad-code chip, a CSV import table, a credits balance, a webhook log.
7. Integrations grid: their logo on the left, connector lines, and about 14 tool logos (AI assistants, automation tools, and AI-video tools such as HeyGen and Arcads).
8. Pricing ("Pay as you grow"), two big cards.
9. FAQ accordion with about 13 questions.
10. A two-part CTA block: "launch" on the left and a "free 30-minute planning call" card on the right.
11. Dark final CTA, then a large footer with SEO hubs (markets, comparisons, "local accounts vs VPN").

A floating "talk distribution" call chip sits in the bottom-right corner throughout.

**Elements worth borrowing:**
- **Market selector in the hero.** Picking a country changes the headline. It tells you in one gesture that the product works per market. Zimmy could **adapt** this as a "pick your market" selector (India / EU / English-speaking) that swaps the example outlier videos. It should be clearly labelled illustrative.
- **"You ask → the system does" hero mock.** A one-line prompt sits on top and the resulting dashboard sits below. It explains an agent product without a video. Zimmy's version could show a niche prompt producing a ranked experiment board, with a human-review step visible.
- **Numbered accordion with a UI card per step.** It is compact and readable, and it maps well onto Zimmy's 0–8 workflow (though nine steps may need grouping into four or five stages).
- **Feature carousel of mini-UI vignettes.** Each card shows the feature in miniature rather than an icon. It is good for a long tail of capabilities. One card, "get ad codes for winners", is literally the "turn winning UGC into ads" step.
- **Pricing layout.** On the left is one card holding three stacked self-serve tiers as rows (name, account limit, monthly price), with shared features listed once underneath. On the right is a contrasting "talk to us" card for large accounts. Fewer boxes and easy comparison.

**Proof strategy:**
- Big aggregate counters (accounts, organic views, countries, "5,000+ businesses").
- Logo wall.
- A rotating one-line testimonial.
- A Trustpilot and Product Hunt link in the footer.

The dashboard uses a fictional brand ("Morrow") with fictional handles and numbers. It is presented as a product view and is not labelled as a mock. Zimmy can't honestly use big counters yet, and under FILTER rules any mock must be labelled illustrative.

**Gaps (Zimmy can own):**
- No research on *what* to post. Their FAQ even asks whether they give virality guidance, which suggests it's a frequent question (inferred).
- No "why it worked" analysis and no content creation. They integrate with AI-video tools instead.
- No human judgement on creative.
- No path from AI UGC to real creators.

They own distribution. Zimmy can own the decision about what to distribute.

**Change over time (Wayback):**
- **Sep 2024:** a single-purpose "post TikToks in any country" page. It had a hero, an old-way vs new-way comparison (VPNs, SIM cards and scams vs organic local posting), 4 numbered steps, and three pricing tiers from $19/mo.
- **Mar 2025:** same structure. The headline now focused on a US account, and the basic tier became one-time.
- **Oct 2025:** a news-driven hero banner about the US–China TikTok deal urged visitors to "get a US account before migration" (paraphrased). The page added persona cards (startups, SaaS, agencies).
- **Mar 2026:** Instagram added. Headline "real US accounts from anywhere" (paraphrased). The page added a problem section explaining location signals (IP, SIM, GPS, locale), feature blocks (bulk creation, niche warming, scheduler, analytics) and third-party testimonials.
- **Oct 2026 (live):** repositioned as an agent-operated "distribution network" with an MCP connection and 90+ tools. Pricing moved from per-video tiers to per-account tiers plus credits.

The arc: **single utility → platform → AI-agent infrastructure**, with counters growing at each step.

---

### 2.2 UGC Pulse (ugcpulse.app), by 1811 Labs

**Positioning:** A research and intelligence tool for consumer-app marketers. It finds outlier UGC videos across thousands of apps, decodes why they worked, and turns that into hooks, scripts and (newer) AI-generated replicas. It targets app founders, growth leads and UGC agencies.

**Section order (live):**
1. Floating pill nav. The Product dropdown lists five verbs: Discover, Decode, Analyze, Create, Track.
2. Dark cinematic hero over blurred video footage.
   - Two small mono-font stat pills (apps tracked, videos analyzed) sit above the headline.
   - The headline promises a multiple of competitors' views, with that phrase on a blue highlight block.
   - Two CTAs: "Get started" and "Book a call".
   - Then a **chat input demo**. A question types itself in, and three "hook" answer cards appear above the box. Each card shows a thumbnail, the hook line and a view count.
   - Beneath the input are three feature tags (outlier feed, virality breakdowns, hooks & scripts).
3. **Problem section as a fake group chat.** Four teammates ask "why did that work? are we late?" (paraphrased) in message bubbles, and the reply is "just post it and see". Then a big "Sound familiar?" with a one-line "we have the answers" (paraphrased).
4. "01 Find every app doing UGC": a cloud of app icons, with a hover tooltip showing total views.
5. "02 Discover the winners": a **horizontal strip of vertical video cards**.
   - Each card has a green **"↑ 2.7K×" multiplier badge** top-right (how far the video beat its baseline).
   - Below the thumbnail: the app name and handle, plus a row of likes, shares, comments and engagement %.
   - The supporting line says results are ranked by engagement multiplier, not raw popularity.
6. "03 Analyze what made it work": **the breakdown card**.
   - On the left is a playable vertical video.
   - On the right is a panel with three stat tiles (views, likes, engagement), each with a sparkline.
   - Below the tiles is a "Creative DNA" row of three labelled chips (format, pattern, hook).
   - Then a "Deep analysis" table: emotional driver, story arc (hook → setup → payoff), and replication score and audience signal, both blurred as a teaser.
7. "Create content from what works": three dark cards.
   - **Content calendar:** a week of planned posts tagged carousel or video.
   - **Hook list:** hooks ranked by views, each with a format tag and a progress bar.
   - **Script:** four timecoded beats (hook, setup, payoff, close).
   - A red gradient banner follows: "Replicate winners with AI".
8. "Stay ahead": two cards. One is a competitor table (app, number of accounts, views, engagement). The other is an alert feed with typed alerts: breakout, trend rising, competitor, saturation.
9. Pricing: three cards.
   - Starter shows a struck-through launch price.
   - Pro is the highlighted "most popular" card.
   - "Strategy & consulting" starts at $5,000.
10. FAQ, including "how is this different from a UGC agency?" and "where does your data come from?"
11. Final CTA over a landscape illustration, with the "no vibes, all data" idea (paraphrased).

**Elements worth borrowing:**
- **Outlier multiplier badge on video cards.** This is the single most relevant pattern for Zimmy. It makes "outlier, not raw views" visible at a glance, and it matches the article's point that an outlier beats a raw view count. **Adopt the pattern** with Zimmy's own styling. Add a one-line definition of "outlier" and a "why it's on the board" line, which UGC Pulse doesn't show.
- **Breakdown card (video + DNA chips + analysis rows).** This is a direct visual for workflow step 3, "decode the why". **Adapt it.** Add a visible **"reviewed by a strategist"** checkpoint row, since UGC Pulse's analysis is presented as fully automatic. That is how Zimmy shows its human in the loop.
- **Timecoded script card.** It shows the output is shoot-ready, not vague. Adapt it for the AI UGC → real creator brief.
- **Typed alert feed** (breakout / rising / competitor / saturation). It shows "live analytics" (step 7) as events rather than charts. Adapt it.
- **Group-chat problem framing.** It is relatable and quick, and it states the guessing problem without a paragraph. Adapt the idea in Zimmy's voice. Don't copy the dialogue.
- **Numbered, verb-led sections (01 Find, 02 Discover, 03 Analyze, then Create, Track).** The nav, sections and product all share one vocabulary. Zimmy can do the same with its own step verbs.
- **Struck-through launch pricing plus a services tier.** Avoid the fake-urgency strike-through. The services tier is relevant, though (see change over time).

**Proof strategy:**
- Dataset-size counters (apps, videos analyzed, "data refreshed daily").
- Real, recognisable apps used as *examples in the data*, not as clients.
- No testimonials or case studies on the live page.

The June snapshot claimed the founders ran the same playbook on their own apps. The headline's view multiplier is an unbacked claim that Zimmy must not imitate. Zimmy could honestly show dataset scope (markets and niches covered) once that is real.

**Gaps (Zimmy can own):**
- US and English-centric. No per-market research.
- No human review of the analysis.
- "Replicate with AI" is a banner, not a ladder. There is no step from AI UGC to real creators to paid ads.
- No experiment design. Nothing about changing one variable at a time or a ranked test board.
- No per-platform judgement.

**Change over time:** The site changed noticeably between June and October 2026.
- **June 2026 snapshot:**
  - The page framed itself as "the intelligence layer" for UGC, with tracked apps, accounts and videos counted in the hero.
  - A big **live app dashboard mock** (a Duolingo page with stats, accounts and recent winning videos).
  - A code-styled "stop posting on vibes" section that parodied the generate → post → pray loop.
  - A four-part how-it-works (viral feed, decode, recreate as AI UGC, track with Slack alerts).
  - A logo strip labelled as apps *in the dataset*, and a **persona grid** where each persona's pain point is paired with a one-line outcome.
  - Pricing: Pro $249, Team/Agency $599, a $299 one-off strategy session, and **"Or, let us run it"**: a managed service from $1,500 covering strategy, AI UGC content, scripting, posting and iteration.
- **October 2026 (live):**
  - A bolder results headline, a chat-first hero, cheaper tiers ($99/$199 launch prices) and a $5k consulting tier.
  - The managed "we run it" offer is folded into consulting.
  - The persona grid is gone.

That June managed offer was the closest any competitor came to Zimmy's AI UGC engine. Takeaway: they are moving from "dashboard" to "ask the AI" framing and leaning harder on outcome claims (inferred).

---

### 2.3 Lightreel (lightreel.ai)

**Positioning:** An AI research agent for UGC marketers that "watches TikTok for you" (paraphrased). It answers questions about hooks and trends, finds creators with contact emails, gives feedback on accounts and drafts, and exposes an API. It targets consumer-app founders, UGC managers and music marketers.

**Section order (live):**
1. Hero inside a big rounded **electric-blue panel**.
   - On the left: the headline (an AI that doomscrolls, paraphrased), a one-line subhead and a "try 3 days free" pill.
   - On the right: a **live-typing chat box** with TikTok and Instagram icons and a ticking "videos watched today" counter. A small "try our API" link sits under it.
   - At the bottom of the panel is a "trusted by" logo strip.
2. "Develops your marketing strategy": **alternating feature rows**, each with a prompt bubble and a result.
   - **Find creators:** a natural-language query becomes a table (handle, followers, engagement, email, tags).
   - **Develop strategy:** "why can't this account break 10k?" (paraphrased) gets a diagnosis plus three competitor video thumbnails with view counts.
   - **Get feedback:** a draft review returns "3 pacing fixes".
3. "Based on live, non-hallucinated data" (paraphrased): a bento grid.
   - One tile shows a big counter (UGC videos analyzed).
   - Other tiles: real-time search, automatic alerts (Gmail and Messages badges) and trend detection with a "new trend detected" toast.
   - One wide tile covers team share links.
4. "Trusted by top marketing teams": a **wall of tweet-style testimonial cards**, each with a name, handle, X icon, the quote, and a credential line (ad spend, views or funding).
5. Dark **API section** with a typewriter headline, tabbed use cases and a code sample.
6. "Try free": two marquee rows of use-case chips, plus a single pricing card ($199/mo, 3-day trial, money-back line), flanked by two floating quote cards.
7. FAQ (four questions, including "how is this different from ChatGPT?" and "how do I know the answers are legit?"), a final CTA and a dark footer with a "UGC Playbook" blog link.

**Elements worth borrowing:**
- **Prompt → structured result rows.** Each capability is shown as the question a marketer would actually type plus the answer card it produces. Concrete and checkable. Zimmy can **adapt** this for steps 1–4, for example "find outliers in fitness apps in India" leading to a ranked board.
- **Credentialed social proof cards.** They earn trust because the credential (ad spend, views) sits under the quote. Zimmy can only **adopt** this once real, consented quotes exist. FILTER rules forbid using the POCs.
- **The "how is this different from ChatGPT?" FAQ.** Zimmy will get the same question. Answer it with the research moat and the human review.
- **A single pricing card with a trial and a guarantee.** Simple, but it suits self-serve SaaS more than Zimmy's likely service-plus-software offer (inferred).
- **Use-case chip marquee.** A cheap way to show breadth. Use with care: a long list of verbs dilutes a focused workflow story.

**Proof strategy:**
- About eight tweet-style testimonials from named founders, with metrics in their bios.
- A logo strip.
- A large analyzed-videos counter.
- "Non-hallucinated" positioning plus an FAQ on legitimacy.

**Gaps (Zimmy can own):**
- No creation: no AI UGC and no real-creator production.
- No experiment loop or budget decisions.
- No markets beyond what the data happens to contain.
- No human in the loop. Their whole pitch is that the AI replaces people; one quote brags about replacing VAs.

Zimmy's "AI does the work, a person checks the judgement calls" is a clear contrast.

**Change over time:** In March and May 2026 the root URL served the **logged-out app itself**: a chat box with suggested prompts (hooks for a workout app, finding UGC creators, "why did my TikTok get 200 views?"), tagged "your AI UGC marketing researcher". By May it had added quick actions (marketing strategy, page feedback, trends, video feedback) and tabs for alerts and team. The live site is a full marketing landing page with testimonials, an API and pricing. The arc: **product-as-homepage → marketing site** once they had proof to show (inferred).

---

### 2.4 PassionBits (passionbits.io)

**Positioning:** A managed marketplace for performance UGC videos. Brands post a brief, get matched with vetted creators, and receive edited videos in days, priced per video in rupees. It is India-first and also serves the US, UK and Canada. It targets D2C and consumer brands, apps and fintech.

**Section order (live):**
1. Thin black announcement bar ("need a video today?" with a "10+ creators online" pill and avatars). Then a nav with a "Creative Copilot" item and "Join as creator".
2. Hero: the headline on the left, and three tilted vertical creator-video cards on the right (one centred and raised). CTAs: "Explore creators", "Start for free" with a "0 cost" chip, and a "book a call" text link.
3. Lavender strip of three promise chips (order in minutes, a per-video starting price, the creator count).
4. Client logo grid; some logos carry a "case study" link.
5. "Find the face": country flag chips and a "17+ languages" pill. Below them, a **creator card carousel**. Each card has a language tag, a play button, a name and an avatar, and one card is a "6000+ creators" map card with an "Explore creators" button.
6. Two rows of auto-scrolling brand video thumbnails, each labelled with the brand underneath.
7. "Super-powered by AI": three illustrated cards (competitor snooping, AI scripts "informed by real brand work", an event-calendar for timely content).
8. Results: three metric cards (hours saved, cost saved, reach multiplier), each with a client logo.
9. "From script to high-performing videos": three step cards (brief → production → review & polish), each with a small UI illustration and a "learn more" link.
10. **Case-study carousel** of vertical video cards. Each card has a brand logo top-left and a big metric overlay (for example, a lift in installs or ROAS) with "view case study".
11. "Why choose us": three cards (creator pool, revisions checklist, every format).
12. A creator-recruitment strip, a dotted world map with creator pins, the FAQ, and an embedded Calendly booking widget.
13. A big footer with "vs" comparison pages (Billo, ContentBeta, Icons, Testimonial Hero) and city SEO pages (US and Indian cities).

**Elements worth borrowing:**
- **Case-study video cards with the metric on the video.** Proof and creative are fused in one tile. **Adopt only when a real, documented, consented campaign exists.** Until then Zimmy could use the same card shape for *research examples* (a public outlier video plus its multiplier), clearly labelled as research, not results.
- **Language and market chips.** India-first, multi-language reach is shown concretely. Zimmy's "global narrative, local relevance" can borrow this to show which markets the research covers.
- **Three-step process cards with mini UIs.** A clear but generic pattern. Zimmy's version should show the experiment loop, not a linear order flow.
- **Embedded booking calendar.** Lowers friction for a sales-led offer. Worth considering if Zimmy is still demo-led (inferred).
- **"vs competitor" SEO pages.** A later-stage tactic; note it, don't prioritise it.

**Proof strategy:**
- Heavy proof: about 14 well-known Indian and global brand logos, metric cards, a case-study carousel with percentage lifts, a 6,000+ creator count and "100+ clients".

Zimmy can't match this honestly today. It is the clearest example of proof Zimmy must earn rather than imitate.

**Gaps (Zimmy can own):**
- No research layer. "Snoop on competitors" is a single card.
- No AI UGC testing before paying creators.
- No outlier logic.
- No experiment ranking or per-platform readout.
- No ads hand-off beyond case-study claims.

PassionBits sits at the *real creators* rung of Zimmy's ladder. Zimmy's pitch could be "test cheaply with AI before you brief creators" (paraphrase for the writer).

**Change over time:**
- **2023–Mar 2024:** a completely different product, a portfolio, CRM and payments tool for freelancers ("run your freelance business", paraphrased), with freelancer testimonials.
- **Jan 2025 to Jun 2026:** the archived pages are JS-only and render blank, so when the brand-side UGC marketplace started can't be confirmed here.
- **Live:** a brand-side UGC marketplace with an "AI copilot" layer bolted on. The "Creative Copilot" nav item and the AI section show AI being added to a services business (inferred).

---

## 3. Cross-site patterns

| Pattern | Seen on | Zimmy | Why |
|---|---|---|---|
| Chat or prompt box as the hero demo (typing question, answer cards) | UGC Pulse, Lightreel, TokPortal (prompt above dashboard) | **Adapt** | It is now the category default, so a plain one won't stand out. Zimmy's version should make the answer a *ranked experiment board* with a visible "human reviewed" step, not a chat reply. |
| Video cards with metrics (thumbnail plus views or engagement) | All four | **Adopt, with rules** | The core visual language of the category. Zimmy's cards need the outlier multiplier, a "why it's here" line and the market. Label example data as illustrative. |
| Outlier multiplier badge | UGC Pulse (on the live site, and as "8× your avg" in the June snapshot) | **Adopt the pattern** | Matches the article's main research idea. Pair it with a plain-English definition. |
| "Why it worked" breakdown panel (hook, format, story arc chips) | UGC Pulse; Lightreel partly | **Adapt** | Show step 3, and add the human-check row competitors leave out. |
| Script or brief output card with timecodes | UGC Pulse; PassionBits (brief form) | **Adapt** | Shows the hand-off from research to creation, which is the AI UGC → real UGC bridge. |
| Alert or trend feed | UGC Pulse, Lightreel | **Adapt** | Good for "live analytics". Keep it to what Zimmy actually tracks. |
| Big aggregate counters in the hero | All four | **Avoid for now** | Zimmy has no honest equivalents yet. If used later, counters should be research scope (markets, niches, videos reviewed), not outcomes. |
| Logo wall | TokPortal, Lightreel, PassionBits | **Avoid** | FILTER rules ban the POC names, and there are no consented clients. Don't show "dataset example" logos either; they read as clients. |
| Tweet-style or quote testimonials | Lightreel, TokPortal, PassionBits | **Avoid until consented** | Strong when real, a liability when not. |
| Results-metric case studies (+X% installs, N× reach) | PassionBits, Lightreel quotes, UGC Pulse headline | **Avoid** | FILTER rules ban invented results. Use "more predictable" language. |
| Numbered steps or accordion "how it works" with UI cards | TokPortal, UGC Pulse, PassionBits | **Adopt** | The obvious home for the 0–8 workflow. Group it into about 4–5 stages, each with one mini-UI card. |
| Pricing: self-serve tiers plus a services or "talk to us" tier | TokPortal, UGC Pulse (consulting, and the June managed service), Lightreel (single tier) | **Adapt** | All the software players are adding human services. Zimmy's mix of human and AI can be the explicit product, not an upsell. |
| "Book a call" as an equal second CTA | All four | **Adopt** | The category is sales-assisted. |
| FAQ that answers "how is this different from X?" (ChatGPT, agencies) | Lightreel, UGC Pulse | **Adopt** | Zimmy will be compared with ChatGPT and with UGC agencies. Answer both. |
| API, MCP or "connect your AI" section | TokPortal, Lightreel | **Avoid for now** | Only if Zimmy actually ships it (keep/drop rule: checkable). |
| Market or country selector, language chips | TokPortal, PassionBits | **Adapt** | Ties directly to Zimmy's multi-market research claim. |

---

## 4. White space: claims no competitor makes

1. **The full ladder in one place.** No one shows AI UGC → real creators → paid ads as one decision path.
   - UGC Pulse stops at "replicate with AI".
   - PassionBits starts at real creators.
   - TokPortal only distributes, though it does offer ad codes.
   - Lightreel only researches.

   Zimmy can be the only site that explains *when* to move a concept up a rung and why.
2. **A human in the loop as a feature.** Every competitor sells "AI does it all" or "AI replaces your VAs". None shows a person checking the reasoning. Zimmy can show the checkpoint on the breakdown card and the experiment board.
3. **Per-market research.** TokPortal localises *distribution* and PassionBits localises *creators*. Nobody researches what goes viral *in India vs the EU vs the US* separately.
4. **Experiment design, not just inspiration.** No one talks about a ranked test board, changing one variable at a time, or deciding the next test within budget. Competitors stop at "here are winning hooks".
5. **Per-platform judgement.** No one says a weak TikTok result shouldn't cancel a strong Reels one, or names the questions: did the opening earn attention, did people understand the product, did it lead to action, is it repeatable enough to fund?
6. **Honest promise.** Competitors promise multiples of views ("10x", "go viral"). Zimmy's "more predictable, not guaranteed" can come across as the trustworthy option. Say it plainly.
7. **Real product footage rule.** No competitor addresses the risk of AI UGC inventing an app interface. A short "we use your real product footage" line would stand out in the AI UGC space.

---

## 5. Article insights that matter for the site

All paraphrased from Jake Castillo's piece. FILTER.md §2 has the full list. These are the ones with direct site implications:

- **Research comes before generation.** The article's main point is that prompting for "a viral video" fails without knowing the audience, the problem, and the *visible* moment that makes the benefit obvious. Site implication: open "how it works" with research, and name step 0 (the AHA moment) explicitly.
- **Outliers are signals to investigate, not proof.** Site implication: wherever a multiplier badge appears, pair it with "why it's on the board" and a human check.
- **Research should become a board of cards.** The article describes a gallery where each card shows the source, its metrics, why it was shortlisted, and a select button. This is nearly the same card UGC Pulse shows. Zimmy's version should include the *select / test this* action, which competitors don't show. That turns research into an experiment queue.
- **Decode the structure, not the caption.** Hook, open question, sequence, payoff. This maps onto the breakdown-card pattern.
- **Change one thing at a time.** This is Zimmy's experiment-board story, and no competitor tells it.
- **Believability is designed.** Camera angle, light, hands and sound are deliberate. Use it as a small trust detail in the AI UGC step, not a headline.
- **Use real product footage.** This supports white-space point 7.
- **Judge each platform separately with four questions.** It fits a "live analytics" stage card.
- **AI is the testing ground; real creators are the scale.** This is the ladder in one line, and the clearest framing for the hero subhead or the ladder section.

---

## Five-line summary for the writer

1. The category has settled on a look: a chat-box hero, then video cards with metrics, then a "why it worked" breakdown, then a script card. Use these shapes in Zimmy's own styling, but don't make a plain chat box the hero.
2. Borrow UGC Pulse's outlier-multiplier badge and breakdown card, but add a one-line outlier definition, a "why it's on the board" line and a visible human-review row. Competitors leave all three out.
3. Build the 0–8 workflow as four or five numbered stages, each with one mini-UI card (TokPortal's accordion pattern). Show the AI UGC → real creators → ads ladder explicitly, because no competitor does.
4. Lead with what's unclaimed: per-market research (India/EU/English-speaking), human in the loop, one-variable experiments, per-platform judgement, and "more predictable, not guaranteed".
5. Skip logo walls, testimonials, big counters and percentage-lift case studies until they're real and consented. Label any product mock as illustrative. Keep "Book a call" as an equal second CTA, and answer "how is this different from ChatGPT / a UGC agency?" in the FAQ.
