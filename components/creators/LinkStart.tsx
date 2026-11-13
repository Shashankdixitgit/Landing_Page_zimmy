"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { APP_START_HREF } from "../ui";

export const CREATORS_CTA = "Get my first 7 days free";

/**
 * The paste-a-link box from the creator app, re-themed. It does not start a scan
 * here: it carries the link straight to the creator app's onboarding, which reads
 * every platform the app supports, LinkedIn included. It used to go to
 * /creators/join, but that sign-up form only takes Instagram, TikTok, YouTube and
 * X handles, so a LinkedIn link dead-ended there. /creators/join stays as it is,
 * for its own brand-deal sign-up form.
 */
export default function LinkStart({ dark = false }: { dark?: boolean }) {
  const [url, setUrl] = useState("");
  const href = url.trim() ? `${APP_START_HREF}?u=${encodeURIComponent(url.trim())}` : APP_START_HREF;
  return (
    <form
      // Without JavaScript the browser still submits ?u=<link> to the same page.
      action={APP_START_HREF}
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = href;
      }}
      className={`mx-auto flex w-full max-w-[560px] flex-col gap-2 rounded-[26px] border p-2 sm:flex-row sm:items-center sm:rounded-full ${
        dark ? "border-white/40 bg-white/95" : "border-line bg-surface lift"
      }`}
    >
      <input
        name="u"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste your profile link"
        autoComplete="off"
        spellCheck={false}
        aria-label="Your profile link"
        className="min-w-0 flex-1 bg-transparent px-4 py-3 text-[15px] text-ink outline-none placeholder:text-faint"
      />
      <button className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-6 py-3.5 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-accent-hover">
        {CREATORS_CTA}
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </button>
    </form>
  );
}
