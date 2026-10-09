"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import { TextLink } from "./ui";

const FAQS = [
  {
    q: "Can Zimmy guarantee a viral video?",
    a: "No one honestly can. What Zimmy changes is where you start: from videos that already beat their account's usual views, with a clear reason why. That makes results more predictable, and it means you stop paying for guesses.",
  },
  {
    q: "What is an outlier?",
    a: "A video doing far better than that account usually does. A small account with a breakout often tells you more than a big account's average post. An outlier is a reason to look closer, not proof, which is why a strategist checks each one.",
  },
  {
    q: "How is this different from asking ChatGPT for video ideas?",
    a: "ChatGPT doesn't know what is winning in your niche this month. Zimmy starts from real, recent videos in your market, explains why they worked, and a person checks that reasoning before you see it.",
  },
  {
    q: "How is this different from a UGC agency?",
    a: "Agencies usually start with a creative guess and charge per video. Zimmy starts with research, tests ideas cheaply first, and only then brings in real creators. You see every step and every number.",
  },
  {
    q: "Do I stay in control?",
    a: "Always. You pick the tests, approve every creator and script, and decide what gets ad spend. Nothing goes out in your name without your sign-off.",
  },
  {
    q: "Will the AI videos show a fake version of my product?",
    a: "No. We use real footage of your product or app. A model is never allowed to invent a screen or feature you don't have.",
  },
  {
    q: "Which markets do you cover?",
    a: "Research is filtered by country and audience, so a launch in India starts from what works in India. Tell us your markets on the demo call and we'll confirm the coverage.",
  },
  {
    q: "What's live today, and what's coming?",
    a: "Live today: outlier research, why-it-worked breakdowns, shoot-ready briefs, creator discovery and outreach, and click tracking per creator. Coming soon: AI test videos in the product, the experiment board, posting across platforms and sales tracking. Our team covers the gaps for you in the meantime.",
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
