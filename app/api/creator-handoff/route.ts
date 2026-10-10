// Signs a short-lived hand-off link to HitRate (creator.zimmy.art) after a creator
// finishes the sign-up form. HitRate verifies it with the same ZIMMY_HANDOFF_SECRET,
// signs the creator in, and starts a scan of their main profile.

import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";

const PLATFORMS = ["instagram", "tiktok", "youtube", "x"] as const;
type P = (typeof PLATFORMS)[number];

const hits = new Map<string, { n: number; t: number }>();
function throttled(ip: string): boolean {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > 60 * 60 * 1000) {
    hits.set(ip, { n: 1, t: now });
    return false;
  }
  return ++h.n > 10;
}

export async function POST(req: Request) {
  const secret = process.env.ZIMMY_HANDOFF_SECRET;
  const app = process.env.CREATOR_APP_URL;
  if (!secret || !app) return NextResponse.json({ url: null }, { status: 503 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anon";
  if (throttled(ip)) return NextResponse.json({ url: null }, { status: 429 });

  const body = (await req.json().catch(() => ({}))) as {
    email?: string;
    handles?: Partial<Record<P, string>>;
    followers?: Partial<Record<P, number>>;
  };
  const email = String(body.email ?? "").trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return NextResponse.json({ url: null }, { status: 400 });

  const handles: Partial<Record<P, string>> = {};
  for (const p of PLATFORMS) {
    const h = String(body.handles?.[p] ?? "").trim().slice(0, 100);
    if (h) handles[p] = h;
  }
  if (!Object.keys(handles).length) return NextResponse.json({ url: null }, { status: 400 });

  // Scan the platform with the biggest audience first.
  const primary = (Object.keys(handles) as P[]).sort((a, b) => Number(body.followers?.[b] ?? 0) - Number(body.followers?.[a] ?? 0))[0];

  const payload = Buffer.from(JSON.stringify({ email, handles, primary, exp: Date.now() + 30 * 60 * 1000 })).toString("base64url");
  const mac = createHmac("sha256", secret).update(payload).digest("base64url");
  return NextResponse.json({ url: `${app.replace(/\/$/, "")}/api/zimmy/welcome?t=${payload}.${mac}` });
}
