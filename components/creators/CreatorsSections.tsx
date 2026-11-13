"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Image from "next/image";
import Reveal from "../Reveal";
import PlanCalendar from "./PlanCalendar";
import ScrollFill from "./ScrollFill";
import LinkStart from "./LinkStart";
import { SampleLink } from "./CreatorsHero";
import sample from "@/lib/creatorsSample.json";
import { FREE_DAYS, WRITTEN_DAYS, PRO_PRICE_USD, PLATFORM_LIST, POSTS_READ, POSTS_READ_X, SIGNAL_COUNT } from "@/lib/planPhases";

export function PlanSection() {
  return (
    <section id="plan" aria-labelledby="plan-h" className="px-2 sm:px-3">
      <div className="rounded-[28px] bg-night px-4 py-16 text-center sm:rounded-[36px] sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1180px]">
          <Reveal>
            <span className="inline-flex rounded-full bg-white/10 px-3.5 py-1.5 text-[12.5px] font-medium text-accent-bright">60-day plan</span>
            <h2 id="plan-h" className="display mt-5 text-[38px] text-white sm:text-[52px]">
              Sixty days. <span className="text-accent-bright">Pick one.</span>
            </h2>
          </Reveal>
          <PlanCalendar drafts={sample.drafts} handle={sample.handle} />
          <p className="mx-auto mt-7 max-w-[600px] text-[14.5px] leading-relaxed text-white/65">
            Days 16–60 aren&apos;t written yet. They depend on a re-read of your posts after day 15, which isn&apos;t automated.
          </p>
        </div>
      </div>
    </section>
  );
}

export function ProofSection() {
  return (
    <section aria-label="What every report does" className="px-5 py-24 sm:py-36">
      <div className="mx-auto max-w-[980px]">
        <ScrollFill
          className="display text-[30px] leading-[1.18] text-ink sm:text-[50px]"
          parts={[
            `Your latest ${POSTS_READ} posts (${POSTS_READ_X} on X), each read for `,
            `${SIGNAL_COUNT} signals`,
            " and scored against ",
            "your own median,",
            " never against other creators. On ",
            PLATFORM_LIST + ".",
          ]}
        />
      </div>
    </section>
  );
}

const FAQS: { q: string; a: string }[] = [
  { q: "What do you need from me?", a: "A public profile link and an email. We read public posts only: no account connection, no password." },
  { q: "Does Hitrate post for me?", a: "No. Hitrate doesn't connect to your accounts, so it can't post for you." },
  {
    q: "What's free?",
    a: `The report and days 1–${FREE_DAYS} are free, and no card is taken. Days ${FREE_DAYS + 1}–${WRITTEN_DAYS} and the Brainstorm studio are Pro, at $${PRO_PRICE_USD} a month.`,
  },
  { q: "Can it predict a viral post?", a: "No. It shows patterns in what you've posted, to test again." },
  { q: "What are hits and flops?", a: "Hits are the top quarter of your own posts, flops the bottom quarter." },
  { q: "What do you keep?", a: "Your report and the public posts it was built from, saved to your email." },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button onClick={() => setOpen((v) => !v)} className="flex w-full items-center justify-between gap-4 py-5 text-left" aria-expanded={open}>
        <span className="text-[15.5px] font-medium text-ink">{q}</span>
        <Plus className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 ${open ? "rotate-45" : ""}`} />
      </button>
      <div className={`grid transition-all duration-300 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="pb-5 pr-8 text-[14.5px] leading-relaxed text-muted">{a}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <section id="faq" aria-labelledby="faq-h" className="px-5 pb-24 sm:pb-32">
      <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <Reveal>
          <span className="inline-flex rounded-full bg-mint px-3.5 py-1.5 text-[12.5px] font-medium text-accent">FAQ</span>
          <h2 id="faq-h" className="display mt-5 text-[38px] text-ink sm:text-[52px]">
            Short <span className="text-accent">answers.</span>
          </h2>
        </Reveal>
        <Reveal stagger={0.06}>
          {FAQS.map((f) => (
            <Item key={f.q} q={f.q} a={f.a} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}

export function CloseSection() {
  return (
    <section aria-labelledby="close-h" className="px-2 pb-2 sm:px-3 sm:pb-3">
      <Reveal className="relative overflow-hidden rounded-[28px] bg-[#3f86c9] px-5 pb-20 pt-20 text-center sm:rounded-[36px] sm:pb-24 sm:pt-28">
        <Image src="/hero-wheat-poster.jpg" alt="" fill sizes="100vw" className="object-cover object-[center_30%]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgb(12_38_66/0.45),transparent_75%)]" aria-hidden />
        <div className="relative">
          <h2 id="close-h" className="display mx-auto max-w-xl text-[40px] text-white [text-shadow:0_2px_30px_rgb(10_40_70/0.35)] sm:text-[64px]">
            Your posts, read.
          </h2>
          <div className="mt-9">
            <LinkStart dark />
            <div className="mt-3">
              <SampleLink light />
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
