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

export const CAMPAIGN_ICON: Record<CampaignKey | SoonKey, IconLike> = {
  ads: MetaIcon,
  creators: Users,
  aiugc: Clapperboard,
  research: Search,
  ugc: Video,
  email: Mail,
  whatsapp: MessageCircle,
};

/** Short names for small spaces (phones), for the "coming soon" items; campaigns have their own `short`. */
export const SOON_SHORT: Record<SoonKey, string> = { ugc: "UGC", email: "Email", whatsapp: "WhatsApp" };

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
