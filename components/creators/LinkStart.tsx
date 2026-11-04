"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { CREATOR_JOIN_HREF } from "../ui";

export const CREATORS_CTA = "Get my first 7 days free";

/**
 * The paste-a-link box from the creator app, re-themed. It does not start a scan
 * here: it carries the link to /creators/join, which reads the profile first.
 */
export default function LinkStart({ dark = false }: { dark?: boolean }) {
  const [url, setUrl] = useState("");
  const href = url.trim() ? `${CREATOR_JOIN_HREF}?u=${encodeURIComponent(url.trim())}` : CREATOR_JOIN_HREF;
  return (
    <form
      action={CREATOR_JOIN_HREF}
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
