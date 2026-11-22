import { Clapperboard, Mail, MessageCircle, Search, Users, Video, type LucideIcon } from "lucide-react";
import type { ComponentType } from "react";
import type { CampaignKey, SoonKey } from "@/lib/campaigns";
import { MetaIcon } from "../v15/Brands";

/**
 * The picture next to each campaign, wherever this site lists them (the chat box's
 * chips, the "More" and "Campaigns" menus, the campaign cards). Meta ads gets the
 * real Meta mark (the same drawing the app's sign-in page uses); the others get a
 * plain line icon, matching the app's chat box. Only the pictures live here: the
 * names and words come from lib/campaigns.ts.
 */
type IconLike = LucideIcon | ComponentType<{ className?: string }>;

/** The X logo (black), for "X campaigns". */
function XMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#111" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/** The LinkedIn logo (LinkedIn blue), for "LinkedIn campaigns". */
function LinkedInMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path fill="#0A66C2" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export const CAMPAIGN_ICON: Record<CampaignKey | SoonKey, IconLike> = {
  ads: MetaIcon,
  creators: Users,
  aiugc: Clapperboard,
  research: Search,
  ugc: Video,
  email: Mail,
  whatsapp: MessageCircle,
  x: XMark,
  linkedin: LinkedInMark,
};

/** Short names for small spaces (phones), for the "coming soon" items; campaigns have their own `short`. */
export const SOON_SHORT: Record<SoonKey, string> = { ugc: "UGC", email: "Email", whatsapp: "WhatsApp", x: "X", linkedin: "LinkedIn" };

/** The first sentence of a blurb: the one line on what a campaign does. */
export const firstSentence = (t: string) => t.match(/^.*?\.(?=\s|$)/)?.[0] ?? t;

export function CampaignIcon({ k, className = "h-4 w-4" }: { k: CampaignKey | SoonKey; className?: string }) {
  const Icon = CAMPAIGN_ICON[k];
  // Decoration: the name is always written next to it.
  return (
    <span aria-hidden className="inline-flex shrink-0">
      <Icon className={className} />
    </span>
  );
}
