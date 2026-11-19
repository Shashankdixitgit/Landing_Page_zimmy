"use client";

import { useState } from "react";
import { ChevronRight, Globe } from "lucide-react";
import { START_EVENT } from "./Run";
import Reveal from "./Reveal";

/**
 * The last ask, under a second patch of sky. The input hands the link to the
 * hero, which scrolls into view and runs it there, so there is one run on the
 * page rather than two half-runs.
 */
export default function Closing({
  title = "Know which video to pay for",
  sub = "Paste your app’s website. We read it here; the research starts after a short sign-up.",
  button = "Read my app",
}: {
  title?: string;
  sub?: string;
  button?: string;
}) {
  const [site, setSite] = useState("");
  return (
    <section className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="relative isolate overflow-hidden rounded-[32px] px-5 py-24 text-center sm:py-28">
        <div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(50% 60% at 92% 100%, rgb(255 255 255 / 0.95), transparent 70%), radial-gradient(45% 55% at 0% 0%, rgb(255 248 228 / 0.9), transparent 65%), linear-gradient(180deg, #d3e0e8 0%, #e3ecf1 55%, #f2f6f8 100%)",
          }}
          aria-hidden
        />
        <Reveal className="mx-auto max-w-[760px]">
          <h2 className="serif text-balance text-[38px] leading-[1.08] text-[var(--bd-ink)] sm:text-[54px]">{title}</h2>
          <p className="mx-auto mt-4 max-w-[500px] text-balance text-[15px] text-[var(--bd-muted)]">
            {sub}
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (site.trim()) window.dispatchEvent(new CustomEvent(START_EVENT, { detail: site.trim() }));
            }}
            className="bd-field mx-auto mt-8 flex max-w-[520px] items-center gap-2 rounded-full p-1.5 pl-5"
          >
            <Globe className="h-5 w-5 shrink-0 text-[#2b6cb0]" aria-hidden />
            <input
              value={site}
              onChange={(e) => setSite(e.target.value)}
              inputMode="url"
              autoComplete="url"
              spellCheck={false}
              aria-label="Your app's website, or its App Store or Google Play link"
              placeholder="yourapp.com"
              className="min-w-0 flex-1 bg-transparent py-2.5 text-[16px] text-[var(--bd-ink)] outline-none placeholder:text-[#767676]"
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#111] px-5 py-3 text-[15px] font-medium text-white transition-transform hover:-translate-y-px"
            >
              {button}
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </form>
          <p className="mt-3 text-[13px] text-[var(--bd-muted)]">After the sign-up, a founder replies within 48 hours</p>
        </Reveal>
      </div>
    </section>
  );
}
