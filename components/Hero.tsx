"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { Check, Sparkle } from "lucide-react";
import CreatorCard, { CREATORS } from "./CreatorCard";
import { GhostButton, PrimaryButton } from "./ui";

// Fan layout, centre card first. x is in px at desktop size and scaled down by --k.
const FAN = [
  { i: 2, x: 0, y: 0, r: 0, w: "w-[210px] sm:w-[240px]", z: 50 },
  { i: 1, x: -230, y: 34, r: -7, w: "w-[180px] sm:w-[210px]", z: 40 },
  { i: 3, x: 230, y: 34, r: 7, w: "w-[180px] sm:w-[210px]", z: 40 },
  { i: 0, x: -440, y: 96, r: -13, w: "w-[170px] sm:w-[190px]", z: 30, outer: true },
  { i: 4, x: 440, y: 96, r: 13, w: "w-[170px] sm:w-[190px]", z: 30, outer: true },
];

const TASKS = [
  "Shortlisted 24 creators",
  "Negotiated 9 rates",
  "Wrote 9 scripts",
  "Generated UTM links",
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set("[data-h], [data-fan]", { opacity: 1, y: 0, scale: 1 });
        gsap.set(title.current, { opacity: 1 });
        return;
      }

      let split: SplitText | null = null;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-h='badge']", { opacity: 0, y: 14, duration: 0.5 });

      if (title.current) {
        split = new SplitText(title.current, { type: "words" });
        gsap.set(title.current, { opacity: 1 });
        tl.from(
          split.words,
          { yPercent: 60, opacity: 0, filter: "blur(8px)", duration: 0.8, stagger: 0.05 },
          "-=0.2"
        );
      }

      tl.from("[data-h='sub']", { opacity: 0, y: 16, duration: 0.6 }, "-=0.45")
        .from("[data-h='cta']", { opacity: 0, y: 16, duration: 0.5 }, "-=0.4")
        .from(
          "[data-fan]",
          { opacity: 0, y: 160, scale: 0.85, rotate: 0, duration: 1.1, stagger: 0.09, ease: "expo.out" },
          "-=0.5"
        )
        .from("[data-h='chip']", { opacity: 0, y: 20, scale: 0.9, duration: 0.6, stagger: 0.12 }, "-=0.6");

      return () => split?.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="relative overflow-hidden pt-36 sm:pt-44">
      {/* background */}
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute left-1/2 top-[38%] h-[620px] w-[900px] -translate-x-1/2 rounded-full opacity-60 blur-[140px]"
        style={{ background: "radial-gradient(closest-side, rgb(255 77 61 / 0.55), rgb(155 140 255 / 0.25), transparent)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-5xl px-5 text-center">
        <span
          data-h="badge"
          className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-white/[0.04] py-1 pl-1 pr-3.5 text-[12.5px] font-medium text-muted backdrop-blur"
        >
          <span className="rounded-full bg-accent px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
            New
          </span>
          The AI operator for influencer marketing
        </span>

        <h1
          ref={title}
          className="mx-auto mt-8 max-w-4xl font-display text-[46px] font-bold leading-[0.98] tracking-[-0.045em] text-snow opacity-0 sm:text-[72px] md:text-[84px]"
        >
          Creator campaigns that{" "}
          <span className="serif glow-text pr-1 text-[1.08em]">run themselves.</span>
        </h1>

        <p
          data-h="sub"
          className="mx-auto mt-7 max-w-2xl text-[17px] leading-relaxed text-muted sm:text-[19px]"
        >
          Zimmy finds the right creators, negotiates the deals, writes the scripts
          and tracks every post to real revenue. Your whole influencer program,
          run by one AI operator, with you approving every step.
        </p>

        <div data-h="cta" className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <PrimaryButton />
          <GhostButton href="#how">See how it works</GhostButton>
        </div>
      </div>

      {/* creator fan */}
      <div
        className="relative mx-auto mt-16 h-[440px] max-w-6xl [--k:0.48] sm:mt-20 sm:h-[520px] sm:[--k:0.75] lg:[--k:1]"
        aria-hidden
      >
        {FAN.map((f) => (
          <div
            key={f.i}
            className={`absolute left-1/2 top-0 ${f.outer ? "hidden sm:block" : ""}`}
            style={{
              zIndex: f.z,
              transform: `translateX(calc(-50% + ${f.x}px * var(--k))) translateY(${f.y}px) rotate(${f.r}deg)`,
            }}
          >
            <div data-fan>
              <div className="floaty" style={{ animationDelay: `${f.i * 0.7}s` }}>
                <CreatorCard c={CREATORS[f.i]} className={f.w} />
              </div>
            </div>
          </div>
        ))}

        {/* operator activity panel */}
        <div
          data-h="chip"
          className="absolute bottom-10 left-4 z-[60] hidden w-[250px] rounded-2xl border border-line-strong bg-coal/85 p-4 text-left shadow-2xl backdrop-blur-xl md:block lg:left-0"
        >
          <p className="flex items-center gap-2 text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">
            <span className="grid h-5 w-5 place-items-center rounded-md bg-accent text-white">
              <Sparkle className="h-3 w-3" fill="currentColor" />
            </span>
            Zimmy, this week
          </p>
          <ul className="mt-3 space-y-2">
            {TASKS.map((t) => (
              <li key={t} className="flex items-center gap-2 text-[13.5px] text-snow/90">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-lime text-night">
                  <Check className="h-2.5 w-2.5" strokeWidth={3.5} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div
          data-h="chip"
          className="absolute right-4 top-24 z-[60] hidden rounded-2xl border border-line-strong bg-coal/85 px-4 py-3 text-left shadow-2xl backdrop-blur-xl md:block lg:right-0"
        >
          <p className="text-[11.5px] font-semibold uppercase tracking-[0.14em] text-muted">
            Awaiting your OK
          </p>
          <p className="mt-1.5 text-[14px] font-medium text-snow">3 scripts ready to review</p>
          <div className="mt-3 flex gap-2">
            <span className="rounded-full bg-snow px-3 py-1 text-[12px] font-semibold text-night">Approve</span>
            <span className="rounded-full border border-line-strong px-3 py-1 text-[12px] font-semibold text-snow/80">Edit</span>
          </div>
        </div>
      </div>

      {/* fade into page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent" aria-hidden />
    </section>
  );
}
