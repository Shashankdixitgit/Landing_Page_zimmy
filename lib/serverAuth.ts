// Server-side check that a request carries a real HitRate creator session.
//
// The session is Supabase Auth's cookie (sb-<ref>-auth-token, sometimes split into
// .0/.1 chunks, value "base64-" + base64url JSON), set by the creator app on path
// "/". The access token in it is checked with Supabase itself (GET /auth/v1/user),
// so a forged cookie fails. This never refreshes the token: refreshing here would
// spend the browser's refresh token without handing the new one back. The join
// page asks the app (/creators/app/api/auth/me) first, which refreshes when needed.

const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || "https://ualijxplfntxlcklduaf.supabase.co").replace(/\/+$/, "");
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_xYhAMCxJ6h0dDkT53bKo-g_Aj33DGym";
const COOKIE = `sb-${new URL(SUPABASE_URL).hostname.split(".")[0]}-auth-token`;

function parseCookies(header: string | null): Map<string, string> {
  const out = new Map<string, string>();
  for (const part of (header ?? "").split(";")) {
    const i = part.indexOf("=");
    if (i < 0) continue;
    const name = part.slice(0, i).trim();
    let value = part.slice(i + 1).trim();
    try {
      value = decodeURIComponent(value);
    } catch {
      /* keep as is */
    }
    out.set(name, value);
  }
  return out;
}

function accessToken(header: string | null): string | null {
  const jar = parseCookies(header);
  let raw = jar.get(COOKIE) ?? "";
  if (!raw) {
    const parts: string[] = [];
    for (let i = 0; jar.has(`${COOKIE}.${i}`); i++) parts.push(jar.get(`${COOKIE}.${i}`)!);
    raw = parts.join("");
  }
  if (!raw) return null;
  try {
    const json = raw.startsWith("base64-") ? Buffer.from(raw.slice(7), "base64url").toString("utf8") : raw;
    const session = JSON.parse(json) as { access_token?: unknown };
    return typeof session.access_token === "string" ? session.access_token : null;
  } catch {
    return null;
  }
}

/** The signed-in creator's auth user id, or null. */
export async function signedInUserId(req: Request): Promise<string | null> {
  const token = accessToken(req.headers.get("cookie"));
  if (!token) return null;
  try {
    const res = await fetch(`${SUPABASE_URL}/auth/v1/user`, {
      headers: { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) return null;
    const user = (await res.json()) as { id?: unknown };
    return typeof user.id === "string" ? user.id : null;
  } catch {
    return null;
  }
}
