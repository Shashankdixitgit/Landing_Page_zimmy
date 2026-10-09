"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import { TextLink } from "./ui";

const FAQS = [
  {
    q: "How does Zimmy find the right creators?",
    a: "You share your site, socials, audience, brand guidelines and budget. Zimmy searches the Modash creator database and ranks creators by audience match, engagement quality and past performance, then hands you a vetted shortlist to approve.",
  },
  {
    q: "Do I stay in control?",
    a: "Always. You can approve, edit, remove or add any creator, and nothing is sent in your brand's name without your sign-off.",
  },
  {
    q: "Does Zimmy really handle outreach and negotiation?",
    a: "Yes, over email and DM. Zimmy pitches each creator, negotiates rate and usage rights within the limits you set, and locks go-live dates.",
  },
  {
    q: "How does attribution work?",
    a: "Every creator gets a unique tracking link. Connect your BigQuery and Zimmy ties each click and sale back to the creator behind it.",
  },
  {
    q: "How is this different from hiring an agency?",
    a: "Agency-level execution at software pricing. No retainer and no black box: you see every creator, message and number.",
  },
  {
    q: "How fast can I launch?",
    a: "We onboard you personally. Your shortlist arrives within 24 hours of the brief, and campaigns can go live in days, not weeks.",
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
