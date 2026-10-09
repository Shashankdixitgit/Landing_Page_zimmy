# Cut plan: from 2,500 words to about 500

This combines four reviews of the `site-verbose-v1` page. The full reports are in `reviews/`:
- `review-cut-editor.md`: line-by-line cuts and exact new copy
- `review-product-truth.md`: checks the page against the founder's sheet (Strategy tab)
- `review-engagement.md`: structure, overlap and visuals instead of text
- `review-skim-test.md`: a five-second skim by three personas (app growth lead, micro creator, investor)

The saved original is git tag `site-verbose-v1`, and its copy is in `snapshot-verbose-v1.md`.

## What all four agreed on

1. **The page tells one idea five to seven times.** "Find outliers → explain why → write a brief" appears in the research demo, "What goes into the recipe", How it works, the tech carousel, the comparison table and the FAQ. Keep **one** of them: the research demo.
2. **Nobody reads the paragraphs.** Every section has a 25–40 word grey paragraph beside the headline, plus paragraphs under every card. Keep the titles, chips and visuals. A body line survives only if it is 12 words or fewer.
3. **Creators are buried.** The sheet says the go-to-market is creator-first, but the creator section sits about 70% of the way down and leads with brand deals. A creator who skims leaves by the third screen, thinking Zimmy is "a brand tool".
4. **The page drifts from the sheet.** The sheet's first brand objective, *AI UGC on autopilot*, never appears in those words. Outreach, negotiation, click tracking and the comparison with agencies take up space that the sheet ranks last ("Influencer Marketing" sits at the end of the ladder).
5. **It undercuts its own trust.** The "Illustrative videos, not real clients" chip in the hero, "Coming soon" on Step 01 (the step the hero promises), and the rate-haggling chat ("$1,400 → $1,100"), which reads to creators as brands squeezing their pay.

## Proposed page: 7 sections, about 500 visible words

| # | Section | What it shows | Words | Built from |
|---|---|---|---:|---|
| 1 | **Hero** | Wheat video, headline, 1-line sub, **two buttons: "I'm a brand" (demo) and "I'm a creator" (creator.zimmy.art)**, cards with status chips only | ~45 | Hero (trimmed) |
| 2 | **For creators** (moved up) | Headline + 2 cards: content calendar for follower and view growth, and paid brand deals | ~40 | Creators (rewritten, growth first) |
| 3 | **Research first** | Market picker + outlier board that **fills in by itself** when scrolled into view; one-line "outlier" definition | ~60 | Research demo |
| 4 | **AI UGC → creator UGC → ads** | The 3 ladder steps as **headlines only** + chips | ~40 | Ladder (the founder's example) |
| 5 | **The loop** | 5-step timeline from the sheet (Define → Research → Decode → Test → Read & decide) + the TikTok/Reels/Shorts scorecard | ~110 | How it works + scorecard |
| 6 | **Founder + 4 FAQs** | Founder photo card; questions on guarantees, ChatGPT, control, what's live | ~120 | Founder + FAQ |
| 7 | **CTA + footer** | "Find your recipe. Then scale it." + Book a demo / Join as a creator | ~60 | CTA, footer |

**Removed entirely:** "What goes into the recipe", the dark tech carousel, the scrolling reel (it repeats the hero clips), the Your part / Zimmy's part cards, the comparison table (it is also broken on mobile, where it hides Zimmy's column), "Who it's for", and the hero's trust strip (its three points move into the FAQ and the chips).

## Hero copy options

| Option | Headline | Sub-line |
|---|---|---|
| A (keeps today's theme) | A recipe for viral content. | Find what's winning in your niche. Test it with AI UGC. Scale what works. |
| B (product-truth pick) | Go viral on purpose. | Research what works, test it with AI UGC, scale the winners. |

## Fixes regardless of copy

- On mobile the comparison table hides Zimmy's column. This goes away if the table is removed.
- The floating "Talk to the founder" chip covers the footer email and the CTA checklist on phones.
- The Reels scorecard shows "Repeatable: Yes" while one of its three runs is amber. Make them consistent.
- The demo's biggest text is an empty state ("Winning videos will appear here"). Auto-fill the board.
- Rename "The ladder" in the navbar. It is jargon; use "How it works".

## Founder decisions needed before building

1. **Is AI UGC creation live?** If not, the hero can't lead with it, and Step 1 shows "Coming soon".
2. **Is the creator content calendar live?** It decides whether the creator section leads with it.
3. **Keep creator outreach and negotiation on the page at all?** The sheet doesn't list it as an objective.
4. **Is the "$30M+" founder figure approved for the public site?** Two reviewers flagged that it has no unit or source.
5. **creator.zimmy.art doesn't resolve yet.** The new button goes nowhere until the subdomain is set up.
