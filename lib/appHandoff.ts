import type { CampaignKey } from "@/lib/campaigns";

/**
 * Handing a prompt from hitrate.sh to the app's chat workspace.
 *
 * The chat box on the landing page doesn't answer anything itself: it sends what
 * was typed to app.hitrate.sh/research, which asks the visitor to sign in first
 * and then runs the real flow. The URL shape is a contract shared with the app:
 *   /research?prompt=<text>&intent=<CampaignKey>[&link=<url>]
 * `intent` is always one of the keys in lib/campaigns.ts (ads, creators, aiugc,
 * research), the same list the app reads.
 *
 * Only /v16 uses this file.
 */

/**
 * The brand app (app.hitrate.sh), where the chat box and the research workspace live.
 * NEXT_PUBLIC_APP_ORIGIN overrides it. In local dev it points at the app's dev
 * server on port 3000, so run this site's dev server on another port
 * (`npm run dev -- -p 3001`) or set NEXT_PUBLIC_APP_ORIGIN. A trailing "/" is
 * dropped, so links never come out as "app.hitrate.sh//research".
 */
export const APP_ORIGIN = (
  process.env.NEXT_PUBLIC_APP_ORIGIN || (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://app.hitrate.sh")
).replace(/\/+$/, "");

/**
 * How long a message can be. The real limit is the sign-in round trip: signed out,
 * the app sends the visitor to its sign-in page with next=/research?prompt=…, and
 * the app refuses a `next` longer than 2000 characters, which would silently lose
 * the message.
 * Same numbers as the app's own chat box (components/chat/ChatComposer.tsx).
 */
export const MAX_PROMPT = 1200;
/** The longest link the closing "yourapp.com" box takes. */
export const MAX_LINK_INPUT = 500;
/** The longest "/research?…" this site sends: under the app's 2000 cap, with room to spare. */
const MAX_HREF = 1900;

/**
 * "https://https://calm.com" becomes "https://calm.com". It happens when someone
 * pastes a full link after a typed "https://", and the app would otherwise read
 * the site's address as "https".
 */
const oneScheme = (s: string) => s.replace(/(?:https?:\/\/)+(https?:\/\/)/gi, "$1");

/** Nothing worth sending yet: empty, spaces, or only a scheme like "https://". */
export function isBlank(text: string): boolean {
  const t = text.trim();
  return !t || /^(?:https?:\/\/)+$/i.test(t);
}

/**
 * The whole message is a link: a web scheme, or a bare domain made only of the
 * characters a website's name can have (yourapp.dev, apps.apple.com/...). The
 * ending must be lowercase, so a sentence typed without a space after its full
 * stop isn't read as a website. Allowing only name characters before the ending
 * keeps strings like "javascript:..." or "data:..." from being taken as a link.
 */
const WHOLE_LINK = /^https?:\/\/\S+$|^[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[a-z]{2,}(?:[/?#]\S*)?$/;

/**
 * Social and video sites. A link to one of these is a video or a profile the
 * visitor wants to talk about ("make an ad like instagram.com/reel/abc"), never
 * their own app's website, so it never goes to the app as link=. A mirror of
 * SOCIAL_HOSTS in the app's lib/links.ts (keep the two the same); the app's
 * server refuses these too.
 */
const SOCIAL_HOSTS = [
  "tiktok.com", "instagram.com", "youtube.com", "youtu.be", "facebook.com", "fb.com", "fb.watch",
  "x.com", "twitter.com", "threads.net", "linkedin.com", "snapchat.com", "pinterest.com",
];
const isSocialHost = (host: string) => {
  const h = host.toLowerCase().replace(/^www\./, "");
  return SOCIAL_HOSTS.some((d) => h === d || h.endsWith(`.${d}`));
};

/**
 * Could this be an app's website? Not an email address, not "Hi...ok", and its
 * host part has no ":" (a port, or a scheme like "javascript:"), isn't a raw IP
 * address and isn't a social or video site: only real websites and store links
 * show on the link button and go to the app as link=. The app's server checks
 * again (parseLink in its /api/flow).
 */
function plausible(s: string): boolean {
  if (s.includes("@") || s.includes("..")) return false;
  const host = s.replace(/^https?:\/\//i, "").split(/[/?#]/)[0];
  return (
    !!host && !host.includes(":") && !host.startsWith("[") && !/^\d+(?:\.\d+){3}$/.test(host) && !isSocialHost(host)
  );
}
/** Endings that are file types, not websites ("Node.js", "notes.pdf"). */
const FILE_ENDING = /\.(?:js|ts|jsx|tsx|py|txt|pdf|png|jpe?g|gif|webp|mp4|mov|css|html?|json|csv|docx?)$/i;

/**
 * The first link in what was typed, or "" if there is none.
 *
 * A message that is only a link counts whatever its ending. Inside a sentence we
 * match the way the app's chat box does: a full URL, or a bare domain on a common
 * ending. The (?<![@\w.-]) stops it taking the domain out of an email address, so
 * "what's winning for calm.com?" carries calm.com but "founder@calm.com" doesn't.
 * Links that can't be the app's (social and video sites, see plausible) are
 * skipped: the first other one wins, full addresses before bare domains, as in
 * the app's chat box.
 */
export function linkIn(text: string): string {
  const t = oneScheme(text.trim());
  // A pasted link often brings a bracket, a quote or the sentence's full stop with it.
  const tidy = (s: string) => s.replace(/^[("'[<“‘]+/, "").replace(/[.,!?;:)\]"'>”’]+$/, "");
  const whole = tidy(t);
  if (WHOLE_LINK.test(whole) && plausible(whole) && (/^https?:\/\//i.test(whole) || !FILE_ENDING.test(whole))) return whole;
  const first = (re: RegExp) => {
    for (const m of t.matchAll(re)) {
      const found = tidy(m[0]);
      if (found && plausible(found)) return found;
    }
    return "";
  };
  return (
    first(/https?:\/\/[^\s<>"']+/gi) ||
    first(/(?<![@\w.-])(?:[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)+\.[a-z]{2,}|[A-Za-z0-9-]+\.(?:com|app|io|ai|co|in|sh|net|org))\b(?:\/[^\s<>"']*)?/g)
  );
}

/** How long a value gets once it's written into a web address the way the link below writes it. */
const encodedLength = (v: string) => new URLSearchParams({ v }).toString().length - 2;

/**
 * Where a message goes, and whether its end had to be cut to fit.
 *
 * The length is measured after encoding, not in letters: in a web address one
 * Hindi or Chinese letter becomes 9 characters (%E0%A4%A8) and an emoji 12, so even
 * a short message in those can be too long for the sign-in round trip. Then the
 * end of the message is cut (whole letters only), and the box says so before
 * sending. Ported from the app's fitMessage() so both boxes behave the same.
 */
export function fitHandoff(text: string, campaign: CampaignKey): { href: string; cut: boolean } {
  const full = oneScheme(text.trim()).slice(0, MAX_PROMPT);
  let link = linkIn(full).slice(0, 500);
  // A freak link (very long, or full of non-Latin letters) stays in the message only, not sent twice.
  if (encodedLength(link) > 700) link = "";
  const make = (prompt: string) => {
    const q = new URLSearchParams({ prompt, intent: campaign });
    if (link) q.set("link", link);
    return `/research?${q.toString()}`;
  };
  // Whole letters and emoji (not halves of one), so a cut never leaves a broken character behind.
  const all = Array.from(full);
  let chars = all;
  let path = make(full);
  while (path.length > MAX_HREF && chars.length) {
    // Shrink by how far over the limit it is (always by at least one letter), then measure again.
    const keep = Math.min(chars.length - 1, Math.floor((chars.length * MAX_HREF) / path.length));
    chars = chars.slice(0, Math.max(0, keep));
    path = make(chars.join("").trimEnd());
  }
  return { href: `${APP_ORIGIN}${path}`, cut: chars.length < all.length };
}

/** The app URL a prompt goes to: sign-in first (the app handles that), then the live run. */
export function researchHref(prompt: string, campaign: CampaignKey): string {
  return fitHandoff(prompt, campaign).href;
}
