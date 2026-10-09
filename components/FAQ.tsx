"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import { TextLink } from "./ui";

const FAQS = [
  {
    q: "Can Zimmy guarantee a viral video?",
    a: "No one honestly can. Zimmy starts from videos already beating their usual views, so results get far more predictable.",
  },
  {
    q: "Why not just ask ChatGPT for ideas?",
    a: "It doesn't know what's winning in your niche this month. Zimmy starts from real, recent videos in your market, and a person checks the reasoning.",
  },
  {
    q: "Do I stay in control?",
    a: "Always. You pick the tests, approve every creator and script, and decide what gets ad spend. We use your real product footage, never a made-up screen.",
  },
  {
    q: "What's live today?",
    a: "Outlier research per market, why-it-worked breakdowns, shoot-ready briefs and creator brand deals. AI UGC videos and the creator calendar are coming soon.",
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
