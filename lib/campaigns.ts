/*
 * MIRROR of hitrate-app/lib/campaigns.ts (the brand app, app.hitrate.sh). Two repos can't share a file,
 * so this is a copy: same keys, groups, labels, blurbs and examples, so the chat box on hitrate.sh and the
 * one in the app say the same thing, and every ?intent= this site sends is a key the app knows.
 * To change a campaign: edit the app's file first, then copy it over everything below this note, and
 * check with `diff` that the two match (run it again just before committing either repo).
 * Last copied: 20 Nov 2026, after the app added GROUPS and a `group` on every campaign.
 */

/**
 * The campaign types a chat can run: the one list the chat box, the workspace, the spaces rail and the
 * API all read, so a label or an order only ever changes here.
 *
 * Order = build order (Shashank, 20 Nov 2026): Meta ads and creator marketing first, end to end; then UGC,
 * then AI UGC, then email and WhatsApp. Research is the first part of every campaign, and can also be run
 * on its own.
 *
 * "status" is what the UI may promise:
 * - "early": works end to end, but needs a connection or is in early access.
 * - "live": works today with nothing to connect.
 * The `SOON` list is shown greyed out and can't be started.
 */

export type CampaignKey = "ads" | "creators" | "aiugc" | "research";
export type SoonKey = "google" | "x" | "instagram" | "xsocial" | "linkedin" | "facebook" | "tiktok" | "ugc" | "email" | "whatsapp";

/**
 * Campaigns are grouped by the job they do, like a menu of marketing jobs (idea from runable.com's
 * "Grow" menu: Running ads / Social / Outreach / Listening). Pickers show the groups in this order, with
 * each item's one-line blurb, and "Soon" items sit greyed next to the live ones.
 */
export type CampaignGroup = "ads" | "social" | "creators" | "outreach" | "research";
export const GROUPS: { key: CampaignGroup; label: string }[] = [
  { key: "ads", label: "Paid ads" },
  { key: "social", label: "Social media" },
  { key: "creators", label: "Creators & UGC" },
  { key: "outreach", label: "Messaging" },
  { key: "research", label: "Research" },
];

export interface Campaign {
  key: CampaignKey;
  group: CampaignGroup;
  /** Full name, e.g. on the chat box tabs. */
  label: string;
  /** Short name for chips and chat titles. */
  short: string;
  status: "live" | "early";
  /** One honest line on what this campaign does today. */
  blurb: string;
  placeholder: string;
  examples: string[];
}

export const CAMPAIGNS: Campaign[] = [
  {
    key: "ads",
    group: "ads",
    label: "Meta ads",
    short: "Meta ads",
    status: "early",
    blurb: "Finds the ads winning in your category, makes your version as a test video, then builds it on your Meta ad account. Nothing spends until you confirm.",
    placeholder: "What should the ad do? Add your app's link, e.g. yourapp.com",
    examples: [
      "Find the Meta ads working for apps like ours and make one for us",
      "Make a small test ad from my competitors' best video",
      "Which ad angle should we test first?",
    ],
  },
  {
    key: "creators",
    group: "creators",
    label: "Creator marketing",
    short: "Creators",
    status: "early",
    blurb: "Finds the creator videos winning in your category, writes the brief, finds creators who fit and drafts the invites. Nothing is sent until you approve it.",
    placeholder: "Who do you want to reach? Add your app's link, e.g. yourapp.com",
    examples: [
      "Find creators who could make videos like my competitors' best ones",
      "Brief creators on the angle that's working in my category",
      "Which kind of creator should we work with first?",
    ],
  },
  {
    key: "aiugc",
    group: "creators",
    label: "AI UGC",
    short: "AI UGC",
    status: "early",
    blurb: "Remakes a winning video for your app as a short AI test video, so you can see the idea before anyone films it.",
    placeholder: "Which video idea should we test? Add your app's link",
    examples: [
      "Remake my competitors' top video for our app",
      "Make a test video from the format that's winning right now",
      "Turn our best angle into a 15-second test video",
    ],
  },
  {
    key: "research",
    group: "research",
    label: "Research",
    short: "Research",
    status: "live",
    blurb: "Reads your app, finds the apps you really compete with and ranks their winning videos and ads from the last 60 days.",
    placeholder: "What do you want to know? Add your app's link, e.g. yourapp.com",
    examples: [
      "What's working for my competitors right now?",
      "Who are we really up against?",
      "Which video formats are winning in my category?",
    ],
  },
];

/**
 * Channels and campaign types not built yet. Shown in the chat box, the menus and the /v16 cards like the
 * others (no "Soon" tag: /v16 and the new app pages are only seen by the team for now, Shashank 22 Nov).
 * Picking one starts a research chat until its own steps exist. `example` is the prompt its card offers.
 */
export const SOON: { key: SoonKey; group: CampaignGroup; label: string; blurb: string; example: string }[] = [
  { key: "google", group: "ads", label: "Google Ads", blurb: "Search and YouTube ads, built from what already works in your category.", example: "Set up Google Ads for my app" },
  { key: "x", group: "ads", label: "X ads", blurb: "Ad campaigns on X, written and set up for you.", example: "Run X ads for our launch" },
  { key: "instagram", group: "social", label: "Instagram", blurb: "Plan, make and post to your Instagram, and keep up with comments.", example: "Manage my Instagram and post every week" },
  { key: "xsocial", group: "social", label: "X", blurb: "Posts, threads and replies on a steady schedule that grows your audience.", example: "Run my X account and grow my audience" },
  { key: "linkedin", group: "social", label: "LinkedIn", blurb: "Regular posts that build your company's presence.", example: "Grow my LinkedIn with regular posts" },
  { key: "facebook", group: "social", label: "Facebook", blurb: "Keep your Page active with posts and replies to comments.", example: "Manage my Facebook page and post regularly" },
  { key: "tiktok", group: "social", label: "TikTok", blurb: "Short videos for your brand, posted week after week.", example: "Create and post TikTok videos for my app" },
  { key: "ugc", group: "creators", label: "UGC", blurb: "Real creators make videos for your own channels and ads.", example: "Get real creators to make videos for our ads" },
  { key: "email", group: "outreach", label: "Email campaigns", blurb: "Plan, write and send email campaigns.", example: "Plan and write our next email campaign" },
  { key: "whatsapp", group: "outreach", label: "WhatsApp", blurb: "Broadcasts and follow-ups on WhatsApp.", example: "Send a WhatsApp broadcast to our users" },
];

/** The chips under the chat box, in order (a 3 x 3 grid with "More" last). Everything else is in "More". */
export const CHIPS: (CampaignKey | SoonKey)[] = ["ads", "creators", "aiugc", "research", "google", "x", "instagram", "linkedin"];

const KEYS = new Set<string>(CAMPAIGNS.map((c) => c.key));

/**
 * Any incoming ?intent= value → a campaign. Older links used research | scripts | videos | ads:
 * "videos" was the AI test video, so it maps to AI UGC; "scripts" maps to research. Anything else
 * becomes research.
 */
export function parseCampaign(raw?: string | null): CampaignKey {
  const v = (raw ?? "").trim().toLowerCase();
  if (KEYS.has(v)) return v as CampaignKey;
  if (v === "videos" || v === "video" || v === "ugc-ai") return "aiugc";
  if (v === "meta" || v === "meta-ads" || v === "metaads") return "ads";
  if (v === "creator" || v === "influencer" || v === "influencers") return "creators";
  return "research";
}

export const campaignOf = (key: CampaignKey): Campaign => CAMPAIGNS.find((c) => c.key === key) ?? CAMPAIGNS[CAMPAIGNS.length - 1];

/** A short title for a chat in the spaces rail: "Meta ads · find the ads working for…". */
export function chatTitle(key: CampaignKey, prompt?: string | null): string {
  const c = campaignOf(key);
  const p = (prompt ?? "").replace(/https?:\/\/\S+/g, "").replace(/\s+/g, " ").trim();
  if (!p) return c.label;
  const cut = p.length > 42 ? `${p.slice(0, 42).replace(/\s+\S*$/, "")}…` : p;
  return `${c.short} · ${cut.charAt(0).toLowerCase()}${cut.slice(1)}`;
}
