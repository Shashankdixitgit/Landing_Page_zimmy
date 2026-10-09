"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowDown, ArrowRight, ShieldCheck, Clapperboard, Globe } from "lucide-react";
import CreatorCard, { CREATORS } from "./CreatorCard";
import { DEMO_HREF } from "./ui";

// Fan of creator cards across the bottom of the frame. x is px at desktop, scaled by --k.
const FAN = [
  { i: 2, x: 0, y: 0, r: 0, z: 50 },
  { i: 1, x: -215, y: 40, r: -6, z: 40 },
  { i: 3, x: 215, y: 40, r: 6, z: 40 },
  { i: 0, x: -420, y: 110, r: -11, z: 30, outer: true },
  { i: 4, x: 420, y: 110, r: 11, z: 30, outer: true },
];

const PROMISES = [
  { icon: ShieldCheck, text: "A person checks every judgement call" },
  { icon: Clapperboard, text: "Your real product on screen, never a made-up one" },
  { icon: Globe, text: "Research for your market, not just the US" },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from("[data-h]", { opacity: 0, y: 22, duration: 1, stagger: 0.08 })
        .from("[data-fan]", { opacity: 0, y: 140, duration: 1.2, stagger: 0.07 }, "-=0.7")
        .from("[data-pill]", { opacity: 0, y: 10, duration: 0.6, stagger: 0.1 }, "-=0.6");
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="top" className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="relative overflow-hidden rounded-[28px] bg-[#3f86c9] sm:rounded-[36px]">
        {/* Video: "A Wheat Field Swaying in the Wind", Pexels #17442173 (Pexels License) */}
        <video
          className="absolute inset-0 h-full w-full object-cover object-[center_30%] motion-reduce:hidden"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero-wheat-poster.jpg"
          aria-hidden
        >
          <source src="/hero-wheat-960.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/hero-wheat.mp4" type="video/mp4" />
        </video>
        <Image
          src="/hero-wheat-poster.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="hidden object-cover object-[center_30%] motion-reduce:block"
        />
        {/* keep white text readable over bright wheat */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_40%,rgb(12_38_66/0.48),transparent_75%),linear-gradient(180deg,rgb(18_60_110/0.3)_0%,transparent_60%)]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-4xl px-5 pt-36 text-center sm:pt-44">
          <span
            data-h
            className="inline-flex rounded-full bg-white/15 px-3.5 py-1.5 text-[12.5px] font-medium text-white backdrop-blur-md"
          >
            Creator content, researched first
          </span>
          <h1
            data-h
            className="display mx-auto mt-6 max-w-[14ch] text-[50px] text-white [text-shadow:0_2px_30px_rgb(10_40_70/0.35)] sm:text-[76px] md:text-[88px]"
          >
            A recipe for viral content.
          </h1>
          <p
            data-h
            className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-white [text-shadow:0_1px_12px_rgb(10_30_50/0.6)] sm:text-[17px]"
          >
            Zimmy finds the videos already winning in your niche, works out why they
            worked, and tests that recipe with AI videos. The winners get remade by real
            creators and scaled as ads. Not guaranteed. Just far less guessing.
          </p>
          <div data-h className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <a
              href={DEMO_HREF}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-[15px] font-medium text-[#1d5f8f] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book a demo
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a
              href="#how"
              className="text-[15px] font-medium text-white underline-offset-4 [text-shadow:0_1px_10px_rgb(10_30_50/0.6)] hover:underline"
            >
              See how it works
            </a>
          </div>
          <p data-h className="mt-6 text-[13px] text-white [text-shadow:0_1px_10px_rgb(10_30_50/0.6)]">
            For consumer apps, DTC brands and teams launching in new markets
          </p>
        </div>

        {/* creator fan */}
        <div
          className="relative mx-auto mt-14 h-[330px] max-w-6xl [--k:0.5] sm:mt-16 sm:h-[400px] sm:[--k:0.78] lg:[--k:1]"
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
                <div className="floaty" style={{ animationDelay: `${f.i * 0.6}s` }}>
                  <CreatorCard c={CREATORS[f.i]} className="w-[180px] sm:w-[210px]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* corner pills */}
        <span
          data-pill
          className="absolute bottom-5 left-5 z-[60] hidden rounded-full bg-ink/55 px-3.5 py-1.5 text-[12.5px] font-medium text-white backdrop-blur-md sm:inline-flex"
        >
          Illustrative videos, not real clients
        </span>
        <a
          data-pill
          href="#research"
          className="absolute bottom-5 right-5 z-[60] hidden items-center gap-1.5 rounded-full bg-ink/55 px-3.5 py-1.5 text-[12.5px] font-medium text-white backdrop-blur-md sm:inline-flex"
        >
          See the research <ArrowDown className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* promise row */}
      <div className="mx-auto max-w-[1100px] border-b border-line px-5 py-6">
        <ul className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-10">
          {PROMISES.map((p) => {
            const Icon = p.icon;
            return (
              <li key={p.text} className="flex items-center gap-2.5 text-[13px] text-muted">
                <Icon className="h-4 w-4 text-accent" strokeWidth={1.8} />
                {p.text}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
