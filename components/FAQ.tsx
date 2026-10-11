"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import { TextLink } from "./ui";

const FAQS = [
  {
    q: "What does Zimmy actually do?",
    a: "We run your creator marketing. We research what is working in your niche, write briefs from proven hooks, find and brief creators, and report results each week. You approve every step.",
  },
  {
    q: "Is it software or a service?",
    a: "Both. The AI does the research and the heavy lifting. Our team runs the campaign with you.",
  },
  {
    q: "What does it cost?",
    a: "It depends on your markets and how much content you need. We’ll walk you through pricing on the call.",
  },
  {
    q: "How do you pick creators?",
    a: "We look for creators whose audience matches yours, in the markets you sell to. You approve every creator before anything goes out.",
  },
  {
    q: "How do you measure results?",
    a: "We report views per platform and clicks per creator link, every week. Sales tracking is coming soon.",
  },
  {
    q: "Which markets and categories?",
    a: "Consumer apps and D2C brands: beauty, fashion, food, fitness, fintech and more. Research filters by country. We’ll confirm coverage for your markets on the call.",
  },
  {
    q: "Can you guarantee results?",
    a: "No one honestly can. We make it more predictable by starting from what already works and testing before you scale.",
  },
  {
    q: "Do I stay in control?",
    a: "Always. You pick the tests, approve every creator and script, and decide what gets ad spend. Your real product, never an invented one.",
  },
  {
    q: "What’s live today?",
    a: "Research per market, why-it-worked breakdowns, briefs, and finding and briefing creators. AI UGC test videos are coming soon.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-line">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-[15.5px] font-medium text-ink">{q}</span>
        <Plus
          className={`h-4 w-4 shrink-0 text-muted transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 pr-8 text-[14.5px] leading-relaxed text-muted">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="px-5 py-24 sm:py-32">
      <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <Reveal>
          <h2 className="display text-[38px] text-ink sm:text-[52px]">
            Questions,
            <br />
            answered.
          </h2>
          <p className="mt-5 text-[15px] text-muted">Anything else? Ask the founder directly.</p>
          <div className="mt-6">
            <TextLink href="mailto:shashank@zimmy.art">shashank@zimmy.art</TextLink>
          </div>
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
