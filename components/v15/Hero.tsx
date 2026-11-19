"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronRight, Clapperboard, Globe, PenLine } from "lucide-react";
import Link from "next/link";
import { CREATOR_HREF } from "../ui";
import Sky from "./Sky";
import { StepList, StepRow } from "./RunParts";
import { hostOf, RunAnnouncer, RunView, scrollToTop, START_EVENT, trimLink, useSiteRead } from "./Run";

/**
 * The /v15 hero: one input. Paste your app's website and HitRate reads it right
 * here, then shows what it read the way the product shows a run. Only that read
 * happens on this page; the research starts after the sign-up, and the steps say so.
 */
export default function Hero() {
  const [site, setSite] = useState("");
  const { phase, read, asked, elapsed, start, reset } = useSiteRead();
  const top = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const wasIdle = useRef(true);

  // Focus follows the run: onto its heading when it starts, back to the input on "Start over".
  useEffect(() => {
    if (phase !== "idle" && wasIdle.current) heading.current?.focus({ preventScroll: true });
    if (phase === "idle" && !wasIdle.current) input.current?.focus({ preventScroll: true });
    wasIdle.current = phase === "idle";
  }, [phase]);

  useEffect(() => {
    const onStart = (e: Event) => {
      const url = (e as CustomEvent<string>).detail;
      setSite(url);
      scrollToTop(top.current);
      void start(url);
      requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
    };
    window.addEventListener(START_EVENT, onStart);
    return () => window.removeEventListener(START_EVENT, onStart);
  }, [start]);

  const where = hostOf(read?.website ?? asked);

  return (
    <section ref={top} className="relative isolate min-h-[760px] overflow-hidden px-5 pb-28 pt-[176px] sm:pt-[168px] md:min-h-[840px]">
      <Sky quiet={phase !== "idle"} />
      <RunAnnouncer phase={phase} read={read} asked={asked} />

      {phase === "idle" ? (
        <div className="relative mx-auto max-w-[1000px] text-center">
          <p className="bd-chip bd-rise mx-auto inline-flex items-center rounded-full px-4 py-1.5 text-[12.5px] font-medium text-[var(--bd-text)]">
            For consumer app teams · early access open
          </p>

          <h1 className="serif bd-rise mt-6 text-balance text-[42px] leading-[1.05] text-[var(--bd-ink)] sm:text-[54px] lg:text-[64px] xl:text-[70px]">
            Find the videos already winning <br className="hidden lg:block" />
            for apps like yours
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void start(trimLink(site));
            }}
            className="bd-field bd-rise mx-auto mt-9 flex max-w-[560px] items-center gap-2 rounded-full p-1.5 pl-5"
          >
            <Globe className="h-5 w-5 shrink-0 text-[#2b6cb0]" aria-hidden />
            <input
              ref={input}
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
              className="inline-flex shrink-0 items-center gap-1 rounded-full bg-[#111] px-5 py-3 text-[15px] font-medium text-white transition-transform hover:-translate-y-px active:translate-y-0"
            >
              Read my app
              <ChevronRight className="h-4 w-4" aria-hidden />
            </button>
          </form>
          <p className="mx-auto mt-3 max-w-[320px] text-balance text-[13px] text-[var(--bd-muted)] sm:max-w-none">
            Paste your app&rsquo;s website, or its App Store or Google Play link
          </p>

          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {["Research live today", "Done with the founders", "Nothing goes out without your OK"].map((t) => (
              <li key={t} className="bd-chip inline-flex items-center gap-1.5 rounded-full py-1 pl-1 pr-3 text-[13px] font-medium text-[var(--bd-text)]">
                <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-[var(--bd-green)] text-white" aria-hidden>
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <p className="mt-7 text-[13px] text-[var(--bd-muted)]">
            A creator, not an app?{" "}
            <Link href={CREATOR_HREF} className="text-[var(--bd-ink)] underline decoration-black/25 underline-offset-4 hover:decoration-black/60">
              See HitRate for creators
            </Link>
          </p>
        </div>
      ) : (
        <RunView
          phase={phase}
          read={read}
          asked={asked}
          elapsed={elapsed}
          onReset={reset}
          headingRef={heading}
          steps={(href) => (
            <StepList>
              <StepRow
                icon={<Globe className="h-[18px] w-[18px]" />}
                title="Reading your app"
                note={
                  phase === "reading"
                    ? `Reading ${where}`
                    : phase === "error"
                      ? `Couldn't open ${where}`
                      : read?.store
                        ? "Store link noted for the sign-up"
                        : read?.category
                          ? `Looks like: ${read.category}`
                          : `Read ${where}`
                }
                state={phase === "reading" ? "active" : phase === "done" ? "done" : "failed"}
              />
              <StepRow
                icon={<Clapperboard className="h-[18px] w-[18px]" />}
                title="Finding what's winning"
                note={phase === "done" ? "After a short sign-up, from the founders" : "Starts once we've read your app"}
                state={phase === "done" ? "ready" : "waiting"}
                action={
                  phase === "done" ? (
                    <a
                      href={href}
                      className="hidden shrink-0 items-center gap-1 rounded-full bg-[#111] px-3.5 py-2 text-[13px] font-medium text-white transition-transform hover:-translate-y-px sm:inline-flex"
                    >
                      Continue <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  ) : undefined
                }
              />
              <StepRow icon={<PenLine className="h-[18px] w-[18px]" />} title="Your first scripts" note="Written from the winners, in a calendar" state="waiting" />
            </StepList>
          )}
        />
      )}
    </section>
  );
}
