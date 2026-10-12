"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import { TextLink } from "./ui";

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "Is AI video believable?",
    a: "Today’s top video models make natural-looking, creator-style videos. Every video is checked before you see it: lips match the words, hands look normal, the face stays the same. If one fails, Zimmy quietly makes another. Videos always show your real app, never a screen invented by AI.",
  },
  {
    q: "Do you post for me?",
    a: "Yes, on a paid plan. Zimmy sets up new TikTok, Instagram, YouTube Shorts and Facebook accounts, warms them up like a normal person would, and posts your calendar on schedule. Want to check every video first? Switch on “Review each video before it posts.”",
  },
  {
    q: "What about platform rules and AI labels?",
    a: "Captions, hashtags and each platform’s “made with AI” label are added automatically. We follow each platform’s rules for AI-made videos and for brands that run several accounts, and posting is built around them.",
  },
  {
    q: "When do you ask for my sales data?",
    a: "Never at sign-up. Only after your first videos get views do we ask: “Want to see which ones brought downloads?” It’s optional, and connects to tools teams already use, such as AppsFlyer, Adjust, RevenueCat, App Store Connect or Google Analytics.",
  },
  {
    q: "What happens with real creators?",
    a: (
      <>
        AI videos find the winning idea; real creators make it more trusted. Once a format is proven, Zimmy writes the creator brief
        (opening, script, shots and the proof it works) and suggests creators who already make this kind of video. Making videos
        yourself?{" "}
        <a href="/creators" className="font-medium text-accent hover:underline">
          Zimmy for creators
        </a>
        .
      </>
    ),
  },
  {
    q: "Is it only for apps?",
    a: "It’s built first for app growth teams: paste an App Store or Google Play link. A website link works too, so online brands that sell direct can use it.",
  },
];

function Item({ q, a }: { q: string; a: React.ReactNode }) {
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
    <section id="faq" className="px-4 py-20 sm:px-5 sm:py-24">
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
