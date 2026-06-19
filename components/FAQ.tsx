"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const FAQS = [
  {
    q: "How does Zimmy find the right creators?",
    a: "You share your site and socials and answer a few questions about your thesis, ICP, brand guidelines, and budget. Zimmy uses the Modash database to surface best-fit creators by audience, fit, and historical signal, then hands you a vetted shortlist to approve.",
  },
  {
    q: "Do I stay in control?",
    a: "Always. You approve, edit, remove, or add any creator before anything goes out. Nothing is ever sent in your brand's name without your sign-off, Zimmy does the work, you make the calls.",
  },
  {
    q: "How does attribution actually work?",
    a: "Zimmy generates a unique UTM link for every creator and connects to your BigQuery, so every click and sale is tracked to the exact creator behind it. Full-funnel, real revenue, no vanity metrics.",
  },
  {
    q: "Does Zimmy really handle outreach and negotiation?",
    a: "Yes, over email and DM. Zimmy reaches out, negotiates rate and usage rights, locks each creator's go-live date, and assembles your campaign for a week, a month, or a PR push.",
  },
  {
    q: "How is this different from hiring an agency?",
    a: "You get agency-level execution at software pricing, run by AI agents with senior oversight, fully transparent, and with you in control the whole way. No retainers, no black box, no chasing for updates.",
  },
  {
    q: "How fast can I launch?",
    a: "Book a demo and we onboard you personally. Once your links and brief are in, vetted shortlists land in 24 hours and campaigns can be live in days, not weeks.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="overflow-hidden rounded-2xl border-2 border-ink bg-cream shadow-hard-sm">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className="text-[16.5px] font-bold text-ink sm:text-[18px]">{q}</span>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-ink transition-transform duration-300 ${
            open ? "rotate-45 bg-accent text-white" : "bg-paper text-ink"
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
          <p className="px-6 pb-6 pr-14 text-[15.5px] leading-relaxed text-muted">
            {a}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5">
        <Reveal className="text-center">
          <div className="flex justify-center">
            <SectionLabel n="⑦">FAQ</SectionLabel>
          </div>
          <h2 className="mt-6 text-[34px] font-bold leading-[1.05] tracking-[-0.025em] text-ink sm:text-[48px]">
            Questions, <span className="mark">answered.</span>
          </h2>
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
