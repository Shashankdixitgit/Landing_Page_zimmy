"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Link2 } from "lucide-react";
import { START_HREF } from "./ui";

/**
 * The one ask on the homepage: paste a store or website link.
 * A plain GET form, so it works without JavaScript: the browser sends the
 * visitor to campaign.zimmy.art/start?link=<encoded link>.
 */
const LONG = "Paste your App Store, Google Play or website link";
const SHORT = "Paste your app or website link";

export default function PasteLink({ id, tone = "light" }: { id: string; tone?: "light" | "dark" }) {
  const onImage = tone === "light";
  // The full prompt doesn't fit a phone-width input, so phones get a shorter one.
  const [placeholder, setPlaceholder] = useState(LONG);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const set = () => setPlaceholder(mq.matches ? SHORT : LONG);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  return (
    <div className="w-full max-w-[640px]">
      <form
        action={START_HREF}
        method="get"
        className={`flex flex-col gap-2 rounded-[22px] p-2 text-left sm:flex-row sm:items-center sm:rounded-full ${
          onImage ? "bg-white shadow-[0_20px_50px_-20px_rgb(12_38_66/0.55)]" : "border border-line bg-surface lift"
        }`}
      >
        <label htmlFor={id} className="sr-only">
          Your App Store, Google Play or website link
        </label>
        <div className="flex min-w-0 flex-1 items-center gap-2.5 pl-3 sm:pl-4">
          <Link2 className="h-4 w-4 shrink-0 text-faint" aria-hidden />
          <input
            id={id}
            name="link"
            type="text"
            inputMode="url"
            autoComplete="url"
            autoCapitalize="none"
            spellCheck={false}
            required
            placeholder={placeholder}
            className="h-12 w-full min-w-0 bg-transparent text-[15px] text-ink outline-none placeholder:text-faint"
          />
        </div>
        <button
          type="submit"
          className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-accent px-6 text-[15px] font-medium text-white transition-colors duration-300 hover:bg-accent-hover"
        >
          See what&rsquo;s working
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </form>
      <p
        className={`mt-3 text-[13px] ${
          onImage ? "text-white [text-shadow:0_1px_10px_rgb(10_30_50/0.6)]" : "text-muted"
        }`}
      >
        Free. No sign-up to see results.
      </p>
    </div>
  );
}
