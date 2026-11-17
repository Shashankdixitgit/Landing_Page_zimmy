"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "../Reveal";
import { DEMO_HREF } from "../ui";

const FAQS = [
  {
    q: "Is it really just a chat box?",
    a: "That is how you drive it. Underneath there are dashboards for the research, the calendar and the videos, and you can open any of them — but you never have to. Asking in the thread is enough.",
  },
  {
    q: "What can it do today?",
    a: "Live: read your app, find the apps your users also watch, show their winning videos and ads market by market, write scripts from them and lay out a calendar. Early access: make your version as an AI UGC video and post it. Coming soon: taking a proven format to real creators and paid ads, and reading installs by format.",
  },
  {
    q: "Does it post on its own?",
    a: "No. Every script, video and post waits for your approval, and you choose whether it goes out from your accounts or from warmed-up AI UGC accounts.",
  },
  {
    q: "Why would a chat box beat a marketing team?",
    a: "It doesn’t beat a team at taste. It beats one at the part that is just work: reading hundreds of competitor videos a week, keeping a calendar honest, and making a cheap test before anyone spends on a format nobody has proved.",
  },
  {
    q: "Who is this for?",
    a: "Consumer app teams, starting with AI and consumer app startups — small teams where marketing is one person’s half-job.",
  },
  {
    q: "Can it guarantee results?",
    a: "No one honestly can. It starts from videos already winning in your category and tests before you spend, so you are not starting from a guess.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-ok-hair">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-[15.5px] font-medium text-ok-text">{q}</span>
        <Plus
          className={`h-4 w-4 shrink-0 text-ok-faint transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        />
      </button>
      <div className={`grid transition-all duration-400 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-5 pr-8 text-[14.5px] leading-relaxed text-ok-muted">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function ChatFAQ() {
  return (
    <section id="faq" className="border-b border-ok-hair px-5 py-24 sm:py-28">
      <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        <Reveal>
          <p className="ok-label text-ok-faint">FAQ</p>
          <h2 className="ok-h mt-4 text-[36px] text-white sm:text-[44px]">Fair questions.</h2>
          <p className="mt-5 max-w-xs text-[15px] leading-relaxed text-ok-muted">
            Anything else, ask a founder directly.
          </p>
          <a
            href={DEMO_HREF}
            className="mt-5 inline-flex items-center gap-2 rounded-[9px] border border-ok-line px-3.5 py-2 text-[14px] font-medium text-ok-text transition-colors hover:border-ok-faint"
          >
            Book a demo
          </a>
        </Reveal>
        <Reveal delay={0.1}>
          {FAQS.map((f) => (
            <Item key={f.q} {...f} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
