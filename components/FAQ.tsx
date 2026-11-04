"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import { DEMO_HREF, TextLink } from "./ui";

const FAQS = [
  {
    q: "Who is HitRate for?",
    a: "Consumer app teams. We’re starting with AI and consumer app startups.",
  },
  {
    q: "Why test with AI UGC first?",
    a: "Most marketing spend goes on formats nobody knew would work until the money is already gone. AI UGC is a cheap way to find the winning format first. UGC, real creators and paid ads are how you scale it.",
  },
  {
    q: "Why not just make more videos with an AI tool?",
    a: "You don’t need more videos. You need to know which video to pay for. HitRate starts from what’s already winning, tests it cheaply with AI, and only then sends the winner to real creators and ads.",
  },
  {
    q: "Whose accounts do the tests post from?",
    a: "Your own accounts, or warmed-up AI UGC accounts from our inventory if you’d rather not test on your own. Testing is in early access, so this starts once you’re let in.",
  },
  {
    q: "Do I stay in control?",
    a: "Always. You approve every script, video and post before it goes out, and you decide which winner to scale.",
  },
  {
    q: "Can HitRate guarantee results?",
    a: "No one honestly can. HitRate starts from videos already winning for your competitors and tests before you spend, so you are not starting from a guess.",
  },
  {
    q: "What’s live today?",
    a: "Paste your app link and see your competitors’ winning videos and ads, a summary of your product from its store reviews, AI-written scripts and a content calendar. Early access: AI UGC test videos and posting them. Coming soon: scaling the winner through UGC, real creators and paid ads.",
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
          <p className="mt-5 text-[15px] text-muted">Anything else? Ask the founders directly.</p>
          <div className="mt-6">
            <TextLink href={DEMO_HREF}>Book a 30-minute call</TextLink>
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
