import { Clapperboard, Mail, MessageCircle, Search, Users, Video, type LucideIcon } from "lucide-react";
import { useId, type ComponentType } from "react";
import { fitHandoff } from "@/lib/appHandoff";
import { CAMPAIGNS, SOON, parseCampaign, type CampaignGroup, type CampaignKey, type SoonKey } from "@/lib/campaigns";
import { MetaIcon, TikTokIcon } from "../v15/Brands";

/**
 * The picture next to each campaign and channel, wherever this site lists them
 * (the chat box's chips, the "More" and "Campaigns" menus, the Paid ads and
 * Social media cards), plus the one list of all of them that those places read.
 *
 * Channels get their real logo in their own colours (Meta, Google Ads, X,
 * Instagram, LinkedIn, Facebook, TikTok), drawn inline so nothing is loaded from
 * another site. Jobs that aren't one platform (creators, AI UGC, research, UGC,
 * email, WhatsApp) keep a plain line icon, matching the app's chat box. Only the
 * pictures live here: the names and words come from lib/campaigns.ts.
 */
type IconLike = LucideIcon | ComponentType<{ className?: string }>;

/** Any campaign or channel: the four built ones and the ones not built yet. */
export type AnyKey = CampaignKey | SoonKey;

/** The X logo (black), for "X ads" and "X". */
function XMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#111" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/**
 * The LinkedIn logo: the blue square with a white "in". The white square behind
 * it fills the letters, so they stay white on a tinted card too.
 */
function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <rect x="1" y="1" width="22" height="22" rx="2" fill="#fff" />
      <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/**
 * The Google Ads logo: a blue bar and a yellow bar meeting at the top, and a
 * green dot at the foot of the yellow one. Drawn from its shapes: the yellow bar
 * goes first, so the blue bar's round end covers its top and the dot its foot.
 */
function GoogleAdsMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <line x1="12" y1="5.07" x2="4" y2="18.93" stroke="#FBBC04" strokeWidth="8" />
      <line x1="12" y1="5.07" x2="20" y2="18.93" stroke="#4285F4" strokeWidth="8" strokeLinecap="round" />
      <circle cx="4" cy="18.93" r="4" fill="#34A853" />
    </svg>
  );
}

/** The Facebook logo: a blue circle with a white "f" that runs off its bottom edge. */
function FacebookMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0.044 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12.044" r="12" fill="#0866FF" />
      <path
        fill="#fff"
        d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245A12 12 0 0 1 9.101 23.691z"
      />
    </svg>
  );
}

/**
 * The Instagram logo: the same drawing as InstagramIcon in components/v15/Brands.tsx,
 * with a gradient id of its own. That one always names its gradient "ig-a", and
 * /v16 holds several copies: the browser paints every copy with the first "ig-a"
 * on the page, and when that one sits in a hidden sky icon (on phones the first
 * is hidden) some browsers don't paint the gradient, and the logo would go blank.
 */
function InstagramMark({ className }: { className?: string }) {
  const id = `ig-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <radialGradient id={id} cx="0.3" cy="1.07" r="1.2">
          <stop offset="0" stopColor="#fdf497" />
          <stop offset="0.1" stopColor="#fdf497" />
          <stop offset="0.5" stopColor="#fd5949" />
          <stop offset="0.68" stopColor="#d6249f" />
          <stop offset="1" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="1" y="1" width="22" height="22" rx="6.5" fill={`url(#${id})`} />
      <rect x="5.4" y="5.4" width="13.2" height="13.2" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="16.4" cy="7.6" r="1.05" fill="#fff" />
    </svg>
  );
}

export const CAMPAIGN_ICON: Record<AnyKey, IconLike> = {
  ads: MetaIcon,
  creators: Users,
  aiugc: Clapperboard,
  research: Search,
  google: GoogleAdsMark,
  x: XMark,
  instagram: InstagramMark,
  xsocial: XMark,
  linkedin: LinkedInMark,
  facebook: FacebookMark,
  tiktok: TikTokIcon,
  ugc: Video,
  email: Mail,
  whatsapp: MessageCircle,
};

/** Short names for small spaces (phones), for the channels not built yet; campaigns have their own `short`. */
export const SOON_SHORT: Record<SoonKey, string> = {
  google: "Google Ads",
  x: "X ads",
  instagram: "Instagram",
  xsocial: "X",
  linkedin: "LinkedIn",
  facebook: "Facebook",
  tiktok: "TikTok",
  ugc: "UGC",
  email: "Email",
  whatsapp: "WhatsApp",
};

/** The first sentence of a blurb: the one line on what a campaign does. */
export const firstSentence = (t: string) => t.match(/^.*?\.(?=\s|$)/)?.[0] ?? t;

/**
 * One campaign or channel, built or not, in the shape the chips, menus and cards
 * use. Nothing here is greyed or marked "Soon" (Shashank, 22 Nov: /v16 is only
 * seen by the team for now): a channel not built yet is picked like the others,
 * with its one example as the box's placeholder.
 */
export interface Entry {
  key: AnyKey;
  group: CampaignGroup;
  label: string;
  short: string;
  /** One line on what it does. */
  line: string;
  placeholder: string;
  /** What you could type; the cards use the first. */
  examples: string[];
  /** Built campaigns only ("Live" or "Early access"); the rest show no tag. */
  status?: "live" | "early";
}

/** Every campaign and channel, built ones first, in lib/campaigns.ts's order. Filter by group for a group's list. */
export const ENTRIES: Entry[] = [
  ...CAMPAIGNS.map(
    (c): Entry => ({
      key: c.key,
      group: c.group,
      label: c.label,
      short: c.short,
      line: firstSentence(c.blurb),
      placeholder: c.placeholder,
      examples: c.examples,
      status: c.status,
    }),
  ),
  ...SOON.map(
    (s): Entry => ({
      key: s.key,
      group: s.group,
      label: s.label,
      short: SOON_SHORT[s.key],
      line: s.blurb,
      placeholder: s.example,
      examples: [s.example],
    }),
  ),
];

/** Is this one of the keys above? (For values read from an event or the address.) */
export const isKey = (v: unknown): v is AnyKey => typeof v === "string" && ENTRIES.some((e) => e.key === v);

export const entryOf = (k: AnyKey): Entry => ENTRIES.find((e) => e.key === k) ?? ENTRIES[0];

/**
 * A ?intent= from the address: a channel's own key (google, instagram...) stays
 * itself; anything else goes through the app's parseCampaign (old names, or
 * research when it's unknown).
 */
export function parseKey(raw?: string | null): AnyKey {
  const v = (raw ?? "").trim().toLowerCase();
  const soon = SOON.find((s) => s.key === v);
  return soon ? soon.key : parseCampaign(v);
}

/**
 * The hand-off to the app (lib/appHandoff.ts) for any key. fitHandoff's type
 * only names the four built campaigns, but all it does with the key is write it
 * into the address as intent=. The app reads a channel's key with its own
 * parseCampaign, which starts a research chat until that channel is built.
 */
export const handoff = (text: string, key: AnyKey) => fitHandoff(text, key as CampaignKey);

export function CampaignIcon({ k, className = "h-4 w-4" }: { k: AnyKey; className?: string }) {
  const Icon = CAMPAIGN_ICON[k];
  // Decoration: the name is always written next to it.
  return (
    <span aria-hidden className="inline-flex shrink-0">
      <Icon className={className} />
    </span>
  );
}
