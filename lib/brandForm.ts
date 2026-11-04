// Brand sign-up questions (8 steps). Step 2 reads the app or website link and prefills
// brand name, category, country and socials for the brand to confirm.

export type BrandField = {
  id: string;
  label: string;
  type: "text" | "email" | "url" | "select" | "chips" | "textarea";
  required?: boolean;
  placeholder?: string;
  options?: string[];
  max?: number;
};

export type BrandStep = { id: string; title: string; help: string; fields: BrandField[] };

export const CATEGORIES = ["AI app", "Consumer app", "Health & fitness", "Fintech", "Education", "Gaming", "Travel", "Food & delivery", "Beauty & wellness", "Shopping", "Social & dating", "Other"];

export const BRAND_STEPS: BrandStep[] = [
  {
    id: "you",
    title: "Who are we talking to?",
    help: "We'll reply within one working day.",
    fields: [
      { id: "email", label: "Work email", type: "email", required: true, placeholder: "you@yourapp.com" },
      { id: "name", label: "Your name", type: "text", required: true, placeholder: "First and last name" },
      { id: "role", label: "Your role", type: "select", required: true, options: ["Founder", "Marketing / growth lead", "Brand / social manager", "Agency", "Other"] },
    ],
  },
  {
    id: "website",
    title: "Paste your app link",
    help: "Your App Store, Play Store or website link. We'll read it and fill in the next steps for you to confirm.",
    fields: [{ id: "website", label: "Your app or website link", type: "url", required: true, placeholder: "apps.apple.com/app/your-app" }],
  },
  {
    id: "brand",
    title: "Is this your app?",
    help: "Check what we found and fix anything that's off.",
    fields: [
      { id: "brand_name", label: "App or company name", type: "text", required: true },
      { id: "category", label: "Category", type: "select", required: true, options: CATEGORIES },
      { id: "country", label: "Where you're based", type: "select", required: true, options: ["United States", "India", "United Kingdom", "Canada", "Australia", "UAE & Gulf", "Germany", "France", "Spain", "Italy", "Netherlands", "Other Europe", "Other"] },
    ],
  },
  {
    id: "socials",
    title: "Your app's socials",
    help: "Optional. Add them if you want tests posted on your own accounts.",
    fields: [
      { id: "social_instagram", label: "Instagram", type: "text", placeholder: "@yourbrand" },
      { id: "social_tiktok", label: "TikTok", type: "text", placeholder: "@yourbrand" },
      { id: "social_youtube", label: "YouTube", type: "text", placeholder: "@yourbrand" },
      { id: "social_x", label: "X (Twitter)", type: "text", placeholder: "@yourbrand" },
    ],
  },
  {
    id: "goal",
    title: "What should your videos do for you?",
    help: "Pick the one that matters most right now.",
    fields: [
      { id: "goal", label: "Main goal", type: "select", required: true, options: ["App installs / sign-ups", "Paid conversions", "Find winning formats", "Launch in a new market"] },
      { id: "platforms", label: "Platforms", type: "chips", required: true, options: ["Instagram Reels", "TikTok", "YouTube Shorts", "X", "Not sure yet"] },
      { id: "markets", label: "Markets you want to win (up to 3)", type: "chips", required: true, max: 3, options: ["United States", "United Kingdom", "Europe", "India", "UAE & Gulf", "Southeast Asia", "Global"] },
    ],
  },
  {
    id: "today",
    title: "Where are you today?",
    help: "No wrong answers. This sets the starting point.",
    fields: [
      { id: "ugc_today", label: "Short video ads or UGC today", type: "select", required: true, options: ["Not started", "A few tests", "Running it regularly", "Through an agency"] },
      { id: "videos_per_month", label: "Video formats you'd like to test per month", type: "select", required: true, options: ["1–5", "5–20", "20–50", "50+", "Not sure"] },
    ],
  },
  {
    id: "budget",
    title: "What's your monthly budget?",
    help: "For video tests and ads. A range is fine.",
    fields: [
      { id: "budget", label: "Monthly budget", type: "select", required: true, options: ["Under ₹50K | Under $1K", "₹50K–2L | $1K–5K", "₹2L–8L | $5K–15K", "₹8L–25L | $15K–50K", "₹25L+ | $50K+", "Not sure yet"] },
      { id: "timeline", label: "When do you want to start?", type: "select", required: true, options: ["This month", "Next 1–3 months", "Just exploring"] },
    ],
  },
  {
    id: "extra",
    title: "Anything we should know?",
    help: "Competitors you're watching, past campaigns, what worked or didn't.",
    fields: [
      { id: "notes", label: "Notes", type: "textarea", placeholder: "e.g. competitor apps whose videos keep going viral" },
      { id: "heard_from", label: "How did you hear about HitRate?", type: "select", options: ["LinkedIn", "X", "A friend or colleague", "Google", "Other"] },
    ],
  },
];
