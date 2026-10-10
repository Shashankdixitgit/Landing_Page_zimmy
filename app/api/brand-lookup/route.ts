// Reads a brand's own website (homepage only) and returns what the sign-up form can
// prefill: name, one-line description, social handles, a category guess and a country
// guess. No API keys needed. The brand confirms or edits everything.

import { NextResponse } from "next/server";

const BLOCKED_HOST = /^(localhost|.*\.local|.*\.internal|0\.0\.0\.0|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|\[?::1\]?$|\d+\.\d+\.\d+\.\d+$)/i;

const hits = new Map<string, { n: number; t: number }>();
function throttled(ip: string): boolean {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > 60 * 60 * 1000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > 30;
}

const CATEGORY_RULES: [RegExp, string][] = [
  [/\b(app|ios|android|download|play store|app store)\b/i, "Consumer app"],
  [/\b(saas|platform|api|developer|workflow|dashboard|b2b|teams?)\b/i, "SaaS / B2B"],
  [/\b(skin|beauty|cosmetic|serum|makeup|hair)\b/i, "Beauty & personal care"],
  [/\b(fashion|apparel|clothing|wear|shoes|sneaker|jewel)\b/i, "Fashion"],
  [/\b(food|snack|beverage|drink|coffee|tea|nutrition|protein)\b/i, "Food & beverage"],
  [/\b(fitness|gym|workout|wellness|health|supplement)\b/i, "Health & fitness"],
  [/\b(fintech|bank|invest|credit|payments?|loan|insurance)\b/i, "Fintech"],
  [/\b(learn|course|education|edtech|tutor|exam)\b/i, "Education"],
  [/\b(game|gaming)\b/i, "Gaming"],
  [/\b(travel|hotel|flight|trip)\b/i, "Travel"],
  [/\b(home|furniture|decor|kitchen)\b/i, "Home & living"],
  [/\b(shop|store|cart|buy now|free shipping)\b/i, "D2C / e-commerce"],
];

const TLD_COUNTRY: Record<string, string> = { in: "India", uk: "United Kingdom", us: "United States", ca: "Canada", au: "Australia", de: "Germany", fr: "France", es: "Spain", it: "Italy", nl: "Netherlands", ae: "UAE & Gulf" };

function meta(html: string, name: string): string | null {
  const re = new RegExp(`<meta[^>]+(?:property|name)=["']${name}["'][^>]*content=["']([^"']+)["']|<meta[^>]+content=["']([^"']+)["'][^>]*(?:property|name)=["']${name}["']`, "i");
  const m = html.match(re);
  return (m?.[1] ?? m?.[2] ?? null)?.trim() ?? null;
}

function decode(s: string): string {
  return s.replace(/&amp;/g, "&").replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/\s+/g, " ").trim();
}

function handleFrom(html: string, re: RegExp, skip: RegExp): string | null {
  for (const m of html.matchAll(re)) {
    const h = m[1];
    if (h && !skip.test(h)) return "@" + h.replace(/^@/, "");
  }
  return null;
}

export async function GET(req: Request) {
  const raw = (new URL(req.url).searchParams.get("url") ?? "").trim();
  let target: URL;
  try {
    target = new URL(/^https?:\/\//i.test(raw) ? raw : `https://${raw}`);
  } catch {
    return NextResponse.json({ ok: false, reason: "bad_url" }, { status: 400 });
  }
  if (!/^https?:$/.test(target.protocol) || !target.hostname.includes(".") || BLOCKED_HOST.test(target.hostname)) {
    return NextResponse.json({ ok: false, reason: "bad_url" }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (throttled(ip)) return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });

  let html = "";
  let finalHost = target.hostname;
  try {
    const res = await fetch(target.toString(), {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; ZimmyBot/1.0; +https://www.zimmy.art)", Accept: "text/html" },
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!res.ok) return NextResponse.json({ ok: false, reason: "unreachable" }, { status: 502 });
    finalHost = new URL(res.url).hostname;
    if (BLOCKED_HOST.test(finalHost)) return NextResponse.json({ ok: false, reason: "bad_url" }, { status: 400 });
    html = (await res.text()).slice(0, 600_000);
  } catch {
    return NextResponse.json({ ok: false, reason: "unreachable" }, { status: 502 });
  }

  const title = decode(meta(html, "og:site_name") ?? html.match(/<title[^>]*>([^<]{1,140})<\/title>/i)?.[1] ?? "");
  const brandName = title.split(/\s[|\-–—:]\s/)[0].trim() || finalHost.replace(/^www\./, "").split(".")[0];
  const description = decode(meta(html, "og:description") ?? meta(html, "description") ?? "").slice(0, 220) || null;

  const text = `${title} ${description ?? ""} ${html.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, " ").replace(/<[^>]+>/g, " ").slice(0, 20000)}`;
  const categoryScores = CATEGORY_RULES.map(([re, name]) => [name, (text.match(new RegExp(re.source, "gi")) ?? []).length] as const).filter(([, n]) => n > 0).sort((a, b) => b[1] - a[1]);
  const category = categoryScores[0]?.[0] ?? null;

  const tld = finalHost.split(".").pop()?.toLowerCase() ?? "";
  const country = TLD_COUNTRY[tld] ?? (/\+91[\s-]?\d|₹|\binr\b/i.test(html) ? "India" : null);

  const skip = /^(p|reel|reels|explore|share|sharer|intent|home|watch|channel|c|user|hashtag|embed|plugins|tr|accounts)$/i;
  const socials = {
    instagram: handleFrom(html, /instagram\.com\/([A-Za-z0-9._]{2,30})/gi, skip),
    tiktok: handleFrom(html, /tiktok\.com\/@([A-Za-z0-9._]{2,30})/gi, skip),
    youtube: handleFrom(html, /youtube\.com\/(?:@)([A-Za-z0-9._-]{2,40})/gi, skip),
    x: handleFrom(html, /(?:twitter|x)\.com\/([A-Za-z0-9_]{2,15})(?![A-Za-z0-9_])/gi, skip),
  };

  return NextResponse.json({ ok: true, website: `https://${finalHost}`, brand_name: brandName, description, category, country, socials });
}
