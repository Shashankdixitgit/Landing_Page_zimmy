// Creator sign-up questions. Designed for matching and fair pricing; branches by tier
// (steps "how_you_work" and "deal_terms") while always showing exactly 8 steps.

export type Tier = "nano" | "micro" | "mid" | "macro";

export type Field = {
  id: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "multiselect" | "chips" | "textarea" | "files" | "followers";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  showFor?: Tier[];
  max?: number;
};

export type Step = { id: string; title: string; help: string; fields: Field[] };

export const TIERS: { id: Tier; label: string; range: string; min: number }[] = [
  { id: "nano", label: "Nano", range: "Under 10K", min: 0 },
  { id: "micro", label: "Micro", range: "10K–100K", min: 10_000 },
  { id: "mid", label: "Mid", range: "100K–500K", min: 100_000 },
  { id: "macro", label: "Macro", range: "500K+", min: 500_000 },
];

export function tierFor(followers: number): Tier {
  let t: Tier = "nano";
  for (const x of TIERS) if (followers >= x.min) t = x.id;
  return t;
}

export const PLATFORMS = [
  { id: "instagram", label: "Instagram" },
  { id: "tiktok", label: "TikTok" },
  { id: "youtube", label: "YouTube" },
  { id: "x", label: "X" },
] as const;

export const STEPS: Step[] = [
  {
    id: "contact",
    title: "Where should we send your deals?",
    help: "We'll only contact you about deals. Your country sets your currency.",
    fields: [
      { id: "email", label: "Email", type: "email", required: true, placeholder: "you@example.com" },
      { id: "whatsapp", label: "WhatsApp or phone (optional)", type: "tel", placeholder: "+91 98765 43210" },
      {
        id: "country",
        label: "Where are you based?",
        type: "select",
        required: true,
        options: ["India", "United States", "United Kingdom", "Canada", "Australia", "New Zealand", "Ireland", "Germany", "France", "Spain", "Italy", "Netherlands", "Sweden", "Other Europe", "Other"],
      },
    ],
  },
  {
    id: "handles",
    title: "Where do you post?",
    help: "Add at least one. We'll read your public profile and fill in the next steps for you.",
    fields: [
      { id: "handle_instagram", label: "Instagram handle", type: "text", placeholder: "@yourname" },
      { id: "handle_tiktok", label: "TikTok handle", type: "text", placeholder: "@yourname" },
      { id: "handle_youtube", label: "YouTube channel", type: "text", placeholder: "@yourchannel" },
      { id: "handle_x", label: "X (Twitter) handle", type: "text", placeholder: "@yourname" },
    ],
  },
  {
    id: "reach",
    title: "How big is your audience?",
    help: "Rough numbers are fine. Your biggest platform sets your tier.",
    fields: [
      { id: "followers", label: "Followers on each platform", type: "followers", required: true, placeholder: "e.g. 24000" },
      {
        id: "avg_views",
        label: "Typical views per Reel, TikTok or Short",
        type: "select",
        required: true,
        options: ["Under 1K", "1K–10K", "10K–50K", "50K–250K", "250K–1M", "1M+"],
      },
    ],
  },
  {
    id: "niche",
    title: "What do you post about?",
    help: "Pick up to 3. Brands search by niche first.",
    fields: [
      {
        id: "niches",
        label: "Your niches",
        type: "chips",
        required: true,
        max: 3,
        options: ["Fashion", "Beauty & skincare", "Fitness", "Health & wellness", "Food & cooking", "Travel", "Tech & gadgets", "Gaming", "Personal finance", "Business & careers", "Education", "Comedy & entertainment", "Music & dance", "Art & design", "Lifestyle", "Home & decor", "Parenting & family", "Pets", "Sports", "Cars & bikes"],
      },
    ],
  },
  {
    id: "audience",
    title: "Who watches you?",
    help: "Your best guess is fine. Your screenshots can confirm it.",
    fields: [
      {
        id: "audience_countries",
        label: "Where most viewers are (up to 3)",
        type: "chips",
        required: true,
        max: 3,
        options: ["India", "United States", "United Kingdom", "Canada", "Australia", "UAE & Gulf", "Germany", "France", "Spain", "Italy", "Netherlands", "Other Europe", "Other"],
      },
      { id: "audience_age", label: "Main age group", type: "select", required: true, options: ["13–17", "18–24", "25–34", "35–44", "45+", "Not sure"] },
      { id: "audience_gender", label: "Gender split", type: "select", required: true, options: ["Mostly women (60%+)", "Mostly men (60%+)", "Roughly even", "Not sure"] },
    ],
  },
  {
    id: "how_you_work",
    title: "How do you work today?",
    help: "This helps us match deals to where you are now.",
    fields: [
      { id: "posting_frequency", label: "How often do you post?", type: "select", required: true, options: ["Daily", "3–5 times a week", "1–2 times a week", "A few times a month"], showFor: ["nano", "micro"] },
      { id: "growth_goal", label: "Your main goal right now", type: "select", required: true, options: ["Grow my following", "Land my first paid deal", "Earn more per deal", "Go full-time", "Build long-term brand partnerships"], showFor: ["nano", "micro"] },
      { id: "manager_email", label: "Manager or agency email (if you have one)", type: "email", placeholder: "Leave blank if you handle deals yourself", showFor: ["mid", "macro"] },
      { id: "past_partners", label: "Brands you've worked with", type: "textarea", placeholder: "e.g. three or four brand names", showFor: ["mid", "macro"] },
    ],
  },
  {
    id: "deal_terms",
    title: "What deals work for you?",
    help: "Rates show in your currency, per Reel, TikTok or Short.",
    fields: [
      { id: "deal_types", label: "Deals you're open to", type: "chips", required: true, options: ["Paid posts", "Gifted products", "Affiliate / commission", "Long-term ambassador", "Events & launches"], showFor: ["nano", "micro"] },
      {
        id: "rate_card",
        label: "Your current rate per video",
        type: "select",
        required: true,
        // "INR | USD" — the form shows the half that matches the country
        options: ["Under ₹50K | Under $1K", "₹50K–1L | $1K–2.5K", "₹1L–2.5L | $2.5K–5K", "₹2.5L–5L | $5K–10K", "₹5L–10L | $10K–25K", "₹10L+ | $25K+", "No fixed rate card yet"],
        showFor: ["mid", "macro"],
      },
      { id: "usage_exclusivity", label: "Usage rights and exclusivity you'll accept", type: "chips", options: ["Organic post only", "Brand can repost on its pages", "Paid ads allowed (whitelisting)", "Category exclusivity up to 30 days", "Longer exclusivity at a higher fee", "Decide per deal"], showFor: ["mid", "macro"] },
    ],
  },
  {
    id: "analytics",
    title: "Upload your analytics screenshots",
    help: "So we can get you the deals you deserve. Verified numbers get better offers.",
    fields: [
      { id: "analytics_screenshots", label: "Instagram Insights, TikTok analytics or YouTube Studio (up to 5 images)", type: "files", max: 5 },
    ],
  },
];
