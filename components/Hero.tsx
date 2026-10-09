"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowDown, ArrowRight, ShieldCheck, Link2, Timer } from "lucide-react";
import CreatorCard, { CREATORS } from "./CreatorCard";
import { DEMO_HREF } from "./ui";

// Fan of creator cards across the bottom of the sky frame. x is px at desktop, scaled by --k.
const FAN = [
  { i: 2, x: 0, y: 0, r: 0, z: 50 },
  { i: 1, x: -215, y: 40, r: -6, z: 40 },
  { i: 3, x: 215, y: 40, r: 6, z: 40 },
  { i: 0, x: -420, y: 110, r: -11, z: 30, outer: true },
  { i: 4, x: 420, y: 110, r: 11, z: 30, outer: true },
];

const PROMISES = [
  { icon: ShieldCheck, text: "You approve every creator" },
  { icon: Link2, text: "Every sale traced to its creator" },
  { icon: Timer, text: "Shortlist within 24 hours" },
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
        {/* Photo: Łukasz Szmigiel on Unsplash (Unsplash License) */}
        <Image
          src="/hero-field.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_38%]"
        />
        {/* keep the headline readable over the brightest clouds */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_42%_at_50%_42%,rgb(12_38_66/0.42),transparent_75%),linear-gradient(180deg,rgb(18_60_110/0.3)_0%,transparent_60%)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl px-5 pt-36 text-center sm:pt-44">
          <h1
            data-h
            className="display text-[46px] text-white [text-shadow:0_2px_30px_rgb(20_60_100/0.25)] sm:text-[68px] md:text-[80px]"
          >
            Creators found. Deals done.
            <br />
            Every sale tracked.
          </h1>
          <p data-h className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white [text-shadow:0_1px_12px_rgb(10_30_50/0.55)] sm:text-[17px]">
            Zimmy is the AI operator for influencer marketing. It finds the right
            creators, runs outreach and negotiation, writes the scripts, and ties
            every post to real revenue. You approve every step.
          </p>
          <div data-h className="mt-8 flex justify-center">
            <a
              href={DEMO_HREF}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-[15px] font-medium text-[#1d5f8f] transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book a demo
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
          <p data-h className="mt-6 text-[13px] text-white [text-shadow:0_1px_10px_rgb(10_30_50/0.6)]">
            For DTC brands, consumer apps and retail teams
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
          Campaigns live, tracked to revenue
        </span>
        <a
          data-pill
          href="#what"
          className="absolute bottom-5 right-5 z-[60] hidden items-center gap-1.5 rounded-full bg-ink/55 px-3.5 py-1.5 text-[12.5px] font-medium text-white backdrop-blur-md sm:inline-flex"
        >
          See what it does <ArrowDown className="h-3.5 w-3.5" />
        </a>
      </div>

      {/* promise row */}
      <div className="mx-auto max-w-[1100px] border-b border-line px-5 py-6">
        <ul className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-12">
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
