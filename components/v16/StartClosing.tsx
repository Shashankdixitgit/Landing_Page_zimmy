"use client";

import { ArrowUp, ArrowUpRight } from "lucide-react";
import { DEMO_HREF } from "../ui";
import Reveal from "../v15/Reveal";

/**
 * The last ask on /v16: "Start with one sentence." There is one chat
 * box on the page, at the top, so instead of a second box this sends people back
 * to it, with the cursor in it. It's a plain link to #start underneath, so it
 * still works before the page's scripts load.
 *
 * Pricing is said plainly: app teams start on a paid pilot. Never "free".
 */
export default function StartClosing() {
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
          <h2 className="serif text-balance text-[38px] leading-[1.08] text-[var(--bd-ink)] sm:text-[54px]">Start with one sentence</h2>
          <p className="mx-auto mt-4 max-w-[480px] text-balance text-[15px] text-[var(--bd-muted)]">
            Say what you want and add your app&rsquo;s link. HitRate asks the rest, one question at a time.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <a
              href="#start"
              onClick={(e) => {
                const box = document.getElementById("v16-box");
                if (!box) return;
                e.preventDefault();
                const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                document.getElementById("start")?.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "center" });
                box.focus({ preventScroll: true });
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#111] px-6 py-3 text-[15px] font-medium text-white transition-transform hover:-translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]"
            >
              Write it in the chat box
              <ArrowUp className="h-4 w-4" aria-hidden />
            </a>
            <a href={DEMO_HREF} className="inline-flex items-center gap-1 text-[14.5px] font-medium text-[var(--bd-ink)] hover:underline">
              Or talk to a founder
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
          <p className="mt-6 text-[13px] text-[var(--bd-muted)]">App teams start on a paid four-week founding pilot ($1,500), done with the founders.</p>
        </Reveal>
      </div>
    </section>
  );
}
