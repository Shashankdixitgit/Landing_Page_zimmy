// Sign-in for the creator lookup on /creators/join.
//
// Sign-in itself lives in the HitRate creator app (hitrate.sh/creators/app/signin,
// Google or a 6-digit email code). Its session cookies sit on path "/", and this
// site reaches the app same-origin through the /creators/app proxy, so the
// browser sends them along and the app can say who is signed in.

import { HITRATE_APP_PATH } from "@/components/ui";

export type Me = { signedIn: boolean; email: string | null };

/** Asks the creator app whether this browser is signed in. Any failure reads as signed out. */
export async function fetchMe(): Promise<Me> {
  try {
    const res = await fetch(`${HITRATE_APP_PATH}/api/auth/me`, { cache: "no-store", credentials: "same-origin" });
    if (!res.ok) return { signedIn: false, email: null };
    const data = (await res.json()) as Partial<Me>;
    return data.signedIn && typeof data.email === "string" ? { signedIn: true, email: data.email } : { signedIn: false, email: null };
  } catch {
    return { signedIn: false, email: null };
  }
}

/** The app's sign-in page, coming back to `next` (a path on this site) afterwards. */
export function signinHref(next: string): string {
  return `${HITRATE_APP_PATH}/signin?next=${encodeURIComponent(next)}`;
}
