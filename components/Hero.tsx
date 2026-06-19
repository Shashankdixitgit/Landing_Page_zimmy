"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ArrowUpRight, ArrowUpRight as Up } from "lucide-react";

const CARDS = [
  {
    tag: "RESULT · 01",
    stat: "12×",
    label: "faster to launch a campaign",
    brand: "Nuvora",
    bg: "bg-yellow",
    pos: "lg:left-2 lg:top-0 lg:rotate-[-4deg]",
  },
  {
    tag: "RESULT · 02",
    stat: "+128%",
    label: "attributed revenue",
    brand: "Lumora",
    bg: "bg-mint",
    pos: "lg:right-0 lg:top-24 lg:rotate-[3deg]",
  },
  {
    tag: "RESULT · 03",
    stat: "−41%",
    label: "lower cost per acquisition",
    brand: "Brightwell",
    bg: "bg-pink",
    pos: "lg:left-10 lg:top-64 lg:rotate-[-2deg]",
  },
];

export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const title = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set("[data-h]", { opacity: 1, y: 0, rotate: 0 });
        gsap.set(title.current, { opacity: 1 });
        return;
      }

      let split: SplitText | null = null;
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from("[data-h='badge']", { opacity: 0, y: 14, duration: 0.5 });

      if (title.current) {
        split = new SplitText(title.current, { type: "lines" });
        gsap.set(title.current, { opacity: 1 });
        tl.from(split.lines, { yPercent: 110, opacity: 0, duration: 0.9, stagger: 0.1 }, "-=0.1");
      }

      tl.from("[data-h='sub']", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
        .from("[data-h='cta']", { opacity: 0, y: 16, duration: 0.5 }, "-=0.35")
        .from(
          "[data-card]",
          { opacity: 0, y: 50, scale: 0.92, duration: 0.7, stagger: 0.12 },
          "-=0.4"
        );

      return () => split?.revert();
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="product" className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.05fr_0.95fr]">
        {/* LEFT */}
        <div>
          <span
            data-h="badge"
            className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream py-1 pl-1 pr-3 text-[12.5px] font-semibold"
          >
            <span className="rounded-full border-2 border-ink bg-accent px-2.5 py-0.5 text-[11px] uppercase tracking-wide text-white">
              New
            </span>
            <span className="uppercase tracking-[0.14em] text-ink/70">
              Agentic AI × Done-for-you
            </span>
          </span>

          <h1
            ref={title}
            className="mt-7 max-w-xl text-[42px] font-bold leading-[1.0] tracking-[-0.03em] text-ink opacity-0 sm:text-[56px] md:text-[64px]"
          >
            Your entire influencer program, run by{" "}
            <span className="mark text-accent">one AI operator.</span>
          </h1>

          <p data-h="sub" className="mt-7 max-w-lg text-[16.5px] leading-relaxed text-muted sm:text-[18px]">
            Zimmy finds the creators, runs outreach and negotiation, writes the
            scripts, and tracks real revenue end-to-end, so you ship campaigns that
            move the needle, without scaling headcount.
          </p>

          <div data-h="cta" className="mt-9 flex flex-wrap items-center gap-3.5">
            <a
              href="#cta"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-accent px-6 py-3.5 text-[15.5px] font-semibold text-white shadow-hard transition-transform hover:-translate-y-0.5"
            >
              Book a Demo <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-cream px-6 py-3.5 text-[15.5px] font-semibold text-ink transition-transform hover:-translate-y-0.5"
            >
              See how it works <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        {/* RIGHT, floating stat cards */}
        <div className="relative mx-auto flex w-full max-w-sm flex-col gap-5 lg:block lg:h-[480px] lg:max-w-none">
          {CARDS.map((c) => (
            <div
              key={c.tag}
              data-card
              className={`relative rounded-[20px] border-2 border-ink ${c.bg} p-6 shadow-hard-lg lg:absolute lg:w-[300px] ${c.pos}`}
            >
              <span className="tape" aria-hidden />
              <p className="flex items-center gap-1 text-[12px] font-bold uppercase tracking-wide text-ink/70">
                <Up className="h-3.5 w-3.5" /> {c.tag}
              </p>
              <p className="mt-3 text-[48px] font-bold leading-none tracking-[-0.03em] text-ink">
                {c.stat}
              </p>
              <p className="mt-2 text-[14.5px] font-medium text-ink/75">{c.label}</p>
              <p className="mt-5 text-[18px] font-bold tracking-tight text-ink/85">
                {c.brand}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
