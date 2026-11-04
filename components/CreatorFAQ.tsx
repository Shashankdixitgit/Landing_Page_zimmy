"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";

const FAQS = [
  {
    q: "What can I use today?",
    a: "Sign-up. Paid brand deals are coming soon: once a brand’s tested format is ready to scale, HitRate will match it with creators whose audience fits and send a clear brief and agreed terms. The weekly content plan is coming soon too.",
  },
  {
    q: "How do I join?",
    a: "Fill in the short sign-up form. We’ll get back to you when brand deals open.",
  },
  {
    q: "Will brands tell me exactly what to say?",
    a: "When deals open, you’ll get a brief with the hook and key points, written for your style. Your video still sounds like you.",
  },
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

export default function CreatorFAQ() {
  return (
    <section className="px-5 pb-24 sm:pb-32">
      <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <Reveal>
          <h2 className="display text-[38px] text-ink sm:text-[52px]">
            Creator
            <br />
            questions.
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
