// Reads a creator's public profile from Modash and maps it onto the sign-up form's
// options, so the form can prefill steps 3-5 and the creator only has to confirm.
// Instagram, TikTok and YouTube only (Modash doesn't cover X).
// Each handle's report is cached for 7 days, so repeat lookups don't spend credits.

import { NextResponse } from "next/server";

const PLATFORMS = new Set(["instagram", "tiktok", "youtube"]);
const HANDLE = /^[A-Za-z0-9._-]{1,60}$/;

// Best-effort per-instance throttle against someone looping the endpoint.
const hits = new Map<string, { n: number; t: number }>();
function throttled(ip: string): boolean {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > 60 * 60 * 1000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  h.n += 1;
  return h.n > 20;
}

const GULF = new Set(["AE", "SA", "QA", "KW", "OM", "BH"]);
const EUROPE = new Set(["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "GR", "HU", "IE", "LV", "LT", "LU", "MT", "NO", "PL", "PT", "RO", "SK", "SI", "SE", "CH", "UA", "RS", "IS"]);
const COUNTRY: Record<string, string> = { IN: "India", US: "United States", GB: "United Kingdom", CA: "Canada", AU: "Australia", DE: "Germany", FR: "France", ES: "Spain", IT: "Italy", NL: "Netherlands" };
const HOME: Record<string, string> = { ...COUNTRY, NZ: "New Zealand", IE: "Ireland", SE: "Sweden" };

function audienceCountry(code: string): string {
  if (COUNTRY[code]) return COUNTRY[code];
  if (GULF.has(code)) return "UAE & Gulf";
  if (EUROPE.has(code)) return "Other Europe";
  return "Other";
}

function homeCountry(code: string | null): string | null {
  if (!code) return null;
  if (HOME[code]) return HOME[code];
  return EUROPE.has(code) ? "Other Europe" : "Other";
}

function viewsBucket(v: number | null): string | null {
  if (v == null || !Number.isFinite(v) || v <= 0) return null;
  if (v < 1_000) return "Under 1K";
  if (v < 10_000) return "1K–10K";
  if (v < 50_000) return "10K–50K";
  if (v < 250_000) return "50K–250K";
  if (v < 1_000_000) return "250K–1M";
  return "1M+";
}

// Modash interest names -> the form's niche chips (keyword match).
const NICHE_RULES: [RegExp, string][] = [
  [/cloth|fashion|shoe|handbag|accessor|jewel|watch/i, "Fashion"],
  [/beauty|cosmetic|skin/i, "Beauty & skincare"],
  [/fitness|yoga|gym|sport/i, "Fitness"],
  [/health|wellness|lifestyle/i, "Health & wellness"],
  [/food|restaurant|grocer|coffee|tea|beverage/i, "Food & cooking"],
  [/travel|tourism|aviation/i, "Travel"],
  [/electronic|computer|tech|camera|photograph/i, "Tech & gadgets"],
  [/gaming|video game/i, "Gaming"],
  [/finance|bank|invest/i, "Personal finance"],
  [/business|career/i, "Business & careers"],
  [/educat|school|learn/i, "Education"],
  [/television|film|movie|entertain|comedy/i, "Comedy & entertainment"],
  [/music|danc/i, "Music & dance"],
  [/art|design/i, "Art & design"],
  [/home|decor|furniture|garden/i, "Home & decor"],
  [/family|child|baby|toys|parent/i, "Parenting & family"],
  [/pet/i, "Pets"],
  [/car|motor/i, "Cars & bikes"],
];

function niches(interests: { name?: string; weight?: number }[]): string[] {
  const out: string[] = [];
  for (const i of interests) {
    const hit = NICHE_RULES.find(([re]) => re.test(i.name ?? ""));
    if (hit && !out.includes(hit[1])) out.push(hit[1]);
    if (out.length === 3) break;
  }
  return out;
}

function ageGroup(ages: { code?: string; weight?: number }[]): string | null {
  if (!ages.length) return null;
  const sum: Record<string, number> = {};
  for (const a of ages) {
    const key = a.code === "13-17" ? "13–17" : a.code === "18-24" ? "18–24" : a.code === "25-34" ? "25–34" : a.code === "35-44" ? "35–44" : "45+";
    sum[key] = (sum[key] ?? 0) + (a.weight ?? 0);
  }
  return Object.entries(sum).sort((x, y) => y[1] - x[1])[0][0];
}

function genderSplit(genders: { code?: string; weight?: number }[]): string | null {
  const f = genders.find((g) => g.code === "FEMALE")?.weight;
  const m = genders.find((g) => g.code === "MALE")?.weight;
  if (f == null && m == null) return null;
  if ((f ?? 0) >= 0.6) return "Mostly women (60%+)";
  if ((m ?? 0) >= 0.6) return "Mostly men (60%+)";
  return "Roughly even";
}

export async function GET(req: Request) {
  const key = process.env.MODASH_API_KEY;
  if (!key) return NextResponse.json({ ok: false, reason: "unavailable" }, { status: 503 });

  const url = new URL(req.url);
  const platform = url.searchParams.get("platform") ?? "";
  const handle = (url.searchParams.get("handle") ?? "").trim().replace(/^@/, "").replace(/^https?:\/\/[^/]+\//, "").replace(/\/.*$/, "");
  if (!PLATFORMS.has(platform) || !HANDLE.test(handle)) {
    return NextResponse.json({ ok: false, reason: "bad_request" }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (throttled(ip)) return NextResponse.json({ ok: false, reason: "rate_limited" }, { status: 429 });

  let res: Response;
  try {
    res = await fetch(`https://api.modash.io/v1/${platform}/profile/${encodeURIComponent(handle.toLowerCase())}/report`, {
      headers: { Authorization: `Bearer ${key}` },
      next: { revalidate: 60 * 60 * 24 * 7 }, // one paid report per handle per week
      signal: AbortSignal.timeout(20_000),
    });
  } catch {
    return NextResponse.json({ ok: false, reason: "timeout" }, { status: 504 });
  }
  if (res.status === 404) return NextResponse.json({ ok: false, reason: "not_found" }, { status: 404 });
  if (!res.ok) return NextResponse.json({ ok: false, reason: "lookup_failed" }, { status: 502 });

  const data = (await res.json()) as { profile?: Record<string, unknown> };
  const p = data.profile ?? {};
  const prof = (p.profile ?? {}) as { followers?: number; fullname?: string; picture?: string };
  const audience = (p.audience ?? {}) as {
    geoCountries?: { code?: string; weight?: number }[];
    ages?: { code?: string; weight?: number }[];
    genders?: { code?: string; weight?: number }[];
  };
  const views = (p.avgReelsPlays as number) ?? (p.avgViews as number) ?? null;

  const countries: string[] = [];
  for (const c of audience.geoCountries ?? []) {
    const name = audienceCountry(String(c.code ?? ""));
    if (!countries.includes(name)) countries.push(name);
    if (countries.length === 3) break;
  }

  return NextResponse.json({
    ok: true,
    platform,
    handle,
    name: prof.fullname ?? null,
    followers: typeof prof.followers === "number" ? prof.followers : null,
    avg_views: viewsBucket(views),
    country: homeCountry((p.country as string) ?? null),
    niches: niches((p.interests as { name?: string; weight?: number }[]) ?? []),
    audience_countries: countries,
    audience_age: ageGroup(audience.ages ?? []),
    audience_gender: genderSplit(audience.genders ?? []),
  });
}
