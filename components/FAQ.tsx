"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import { SectionHead } from "./ui";

const FAQS = [
  {
    q: "How does Zimmy find the right creators?",
    a: "You share your site, socials, audience, brand guidelines and budget. Zimmy searches the Modash creator database and ranks creators by audience match, engagement quality and past performance, then hands you a vetted shortlist to approve.",
  },
  {
    q: "Do I stay in control?",
    a: "Always. You can approve, edit, remove or add any creator, and nothing is sent in your brand's name without your sign-off. Zimmy does the work; you make the calls.",
  },
  {
    q: "Does Zimmy really handle outreach and negotiation?",
    a: "Yes, over email and DM. Zimmy pitches each creator, negotiates rate and usage rights within the limits you set, and locks go-live dates, whether you're running a one-week push or an always-on program.",
  },
  {
    q: "How does attribution work?",
    a: "Every creator gets a unique tracking link. Connect your BigQuery and Zimmy ties each click and sale back to the creator behind it, so you see real revenue rather than views and likes.",
  },
  {
    q: "How is this different from hiring an agency?",
    a: "You get agency-level execution at software pricing. There's no retainer and no black box: you can see every creator, message and number, and you're in control the whole way.",
  },
  {
    q: "How fast can I launch?",
    a: "Book a demo and we'll onboard you personally. Once your brief is in, your shortlist arrives within 24 hours and campaigns can go live in days, not weeks.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`card overflow-hidden transition-colors ${open ? "border-line-strong" : ""}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="font-display text-[17px] font-semibold text-snow sm:text-[19px]">{q}</span>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300 ${
            open ? "rotate-45 bg-accent text-white" : "bg-white/[0.06] text-snow"
          }`}
        >
          <Plus className="h-4 w-4" strokeWidth={2.5} />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-6 pr-14 text-[15.5px] leading-relaxed text-muted">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 sm:py-36">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal>
          <SectionHead
            center
            eyebrow="FAQ"
            title={
              <>
                Questions, <span className="serif text-accent-soft">answered.</span>
              </>
            }
          />
        </Reveal>

        <Reveal stagger={0.08} className="mt-12 flex flex-col gap-3">
          {FAQS.map((f) => (
            <Item key={f.q} q={f.q} a={f.a} />
          ))}
        </Reveal>
      </div>
    </section>
  );
}
