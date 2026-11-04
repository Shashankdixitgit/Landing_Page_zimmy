// The profile lookup on /creators/join. It calls the HitRate creator app's public
// endpoint straight from the browser (the endpoint's CORS allows hitrate.sh and
// this project's Vercel previews), so the app's per-visitor rate limit counts
// the real visitor and not this site's server.

import { HITRATE_APP_URL } from "@/components/ui";

export type LookupPlatform = "instagram" | "tiktok" | "youtube" | "x";

/** The shape returned by GET /api/public/profile-preview (hitrate repo, lib/preview.ts). */
export type ProfilePreview = {
  platform: LookupPlatform | "linkedin";
  handle: string;
  name: string;
  avatar: string | null;
  followers: number;
  postsRead: number;
  spanDays: number;
  postsPerWeek: number | null;
  hasViews: boolean;
  avgViews: number | null;
  medianViews: number | null;
  engagementRate: number | null;
  engagementBasis: "views" | "followers";
  estimate: { currency: "USD"; cpmLow: number; cpmHigh: number; priceLow: number; priceHigh: number; note: string } | null;
  topPosts: { text: string; url: string; date: string; views: number; likes: number; comments: number }[];
  audience: { commentsRead: number; who: string; languages: string[]; countries: string[]; asks: string[] } | null;
  niches: string[];
};

export type LookupResult = { ok: true; preview: ProfilePreview } | { ok: false; message: string };

const DOWN = "We couldn't read that profile just now. You can fill in your details by hand.";

export async function lookupProfile(platform: LookupPlatform, handle: string): Promise<LookupResult> {
  try {
    const res = await fetch(
      `${HITRATE_APP_URL}/api/public/profile-preview?platform=${platform}&handle=${encodeURIComponent(handle)}`,
      { signal: AbortSignal.timeout(170_000) }
    );
    const data = (await res.json().catch(() => null)) as { ok?: boolean; preview?: ProfilePreview; message?: string } | null;
    if (res.ok && data?.ok && data.preview) return { ok: true, preview: data.preview };
    return { ok: false, message: data?.message || DOWN };
  } catch {
    return { ok: false, message: DOWN };
  }
}

const PATTERNS: { platform: LookupPlatform; re: RegExp }[] = [
  { platform: "x", re: /(?:twitter|x)\.com\/@?([A-Za-z0-9_]{1,15})/i },
  { platform: "instagram", re: /instagram\.com\/@?([A-Za-z0-9._]{1,30})/i },
  { platform: "tiktok", re: /tiktok\.com\/@([A-Za-z0-9._]{1,24})/i },
  { platform: "youtube", re: /youtube\.com\/@([A-Za-z0-9._-]{1,30})/i },
];

/** A pasted profile link names its own platform; a bare handle keeps the one picked. */
export function readHandle(input: string, picked: LookupPlatform): { platform: LookupPlatform; handle: string } | null {
  const raw = input.trim();
  if (!raw) return null;
  for (const { platform, re } of PATTERNS) {
    const m = raw.match(re);
    if (m) return { platform, handle: m[1] };
  }
  const bare = raw.replace(/^@/, "");
  return /^[A-Za-z0-9._-]{1,60}$/.test(bare) ? { platform: picked, handle: bare } : null;
}

export function profileUrl(platform: LookupPlatform, handle: string): string {
  const h = handle.replace(/^@/, "");
  if (platform === "x") return `https://x.com/${h}`;
  if (platform === "instagram") return `https://www.instagram.com/${h}`;
  if (platform === "tiktok") return `https://www.tiktok.com/@${h}`;
  return `https://www.youtube.com/@${h}`;
}

/** The creator app's onboarding, with the profile already in the box. */
export function planHref(platform: LookupPlatform, handle: string): string {
  return `${HITRATE_APP_URL}/start?u=${encodeURIComponent(profileUrl(platform, handle))}`;
}

/* ── mapping the preview onto the sign-up form's options ── */

export function viewsBucket(v: number | null): string | null {
  if (v == null || !Number.isFinite(v) || v <= 0) return null;
  if (v < 1_000) return "Under 1K";
  if (v < 10_000) return "1K–10K";
  if (v < 50_000) return "10K–50K";
  if (v < 250_000) return "50K–250K";
  if (v < 1_000_000) return "250K–1M";
  return "1M+";
}

export function frequencyFor(perWeek: number | null): string | null {
  if (perWeek == null) return null;
  if (perWeek >= 6) return "Daily";
  if (perWeek >= 3) return "3–5 times a week";
  if (perWeek >= 1) return "1–2 times a week";
  return "A few times a month";
}

const FORM_COUNTRIES = ["India", "United States", "United Kingdom", "Canada", "Australia", "Germany", "France", "Spain", "Italy", "Netherlands"];
const ALIAS: [RegExp, string][] = [
  [/^(usa|us|u\.s\.a?\.?|america|united states of america)$/i, "United States"],
  [/^(uk|u\.k\.|england|britain|great britain|scotland|wales)$/i, "United Kingdom"],
  [/(uae|emirates|dubai|saudi|qatar|kuwait|oman|bahrain|gulf)/i, "UAE & Gulf"],
  [/^(ireland|sweden|norway|denmark|finland|poland|portugal|belgium|austria|switzerland|greece|czech|romania|hungary|ukraine)/i, "Other Europe"],
];

/** Free-text country names from the audience read -> the form's audience chips. */
export function audienceCountries(names: string[]): string[] {
  const out: string[] = [];
  for (const raw of names) {
    const n = raw.trim();
    const direct = FORM_COUNTRIES.find((c) => c.toLowerCase() === n.toLowerCase());
    const mapped = direct ?? ALIAS.find(([re]) => re.test(n))?.[1] ?? "Other";
    if (!out.includes(mapped)) out.push(mapped);
    if (out.length === 3) break;
  }
  return out;
}
