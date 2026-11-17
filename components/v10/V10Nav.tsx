"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { LogoMark } from "../Logo";
import { BRAND_JOIN_HREF, CREATOR_HREF } from "../ui";

const LINKS = [
  { label: "What it does", href: "#jobs" },
  { label: "How it works", href: "#how" },
  { label: "Instead of", href: "#instead" },
  { label: "FAQ", href: "#faq" },
];

/**
 * The okara.ai chrome: a thin ticker strip, then a dark bar with the mark, flat
 * text links and one light pill on the right. Square-ish (9px) corners, not the
 * fully rounded capsule the rest of HitRate uses.
 */
export default function V10Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const ticker = [
    "Early access for consumer app teams",
    "Find what’s winning before you pay creators",
    "AI UGC tests, then scale the winner",
  ];

  return (
    <header className="sticky top-0 z-[100]">
      {/* ticker */}
      <div className="flex items-center gap-4 overflow-hidden border-b border-ok-hair bg-ok-text py-2 text-ok-bg">
        <div className="ok-ticker min-w-0 flex-1">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0 items-center gap-8 pr-8" aria-hidden={dup === 1}>
              {ticker.map((t) => (
                <span key={t} className="flex shrink-0 items-center gap-8 text-[12.5px] font-medium">
                  {t}
                  <span className="h-1 w-1 rounded-full bg-ok-bg/40" />
                </span>
              ))}
            </div>
          ))}
        </div>
        {/* sits on its own solid block so the marquee never runs under the label */}
        <div className="hidden shrink-0 bg-ok-text py-1 pl-5 pr-3 sm:block">
          <a
            href={BRAND_JOIN_HREF}
            className="ok-label inline-flex items-center gap-1 whitespace-nowrap rounded-md bg-ok-bg px-2.5 py-1 text-ok-text"
          >
            Get in <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>

      {/* bar */}
      <div className="border-b border-ok-hair bg-ok-bg/90 backdrop-blur-md">
        <nav className="mx-auto flex max-w-[1180px] items-center gap-8 px-5 py-3.5">
          <a href="#top" className="flex shrink-0 items-center gap-1.5" aria-label="HitRate">
            <LogoMark light className="h-6 w-6" />
            <span className="font-display text-[19px] font-semibold tracking-[-0.03em] text-ok-text">hitrate</span>
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="text-[14px] text-ok-muted transition-colors hover:text-ok-text">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="ml-auto hidden items-center gap-2 md:flex">
            <a href={CREATOR_HREF} className="px-3 py-2 text-[14px] text-ok-muted transition-colors hover:text-ok-text">
              For creators
            </a>
            <a
              href="#top"
              className="rounded-[9px] bg-ok-text px-3.5 py-2 text-[14px] font-medium text-ok-bg transition-opacity hover:opacity-90"
            >
              Start free
            </a>
          </div>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="ml-auto grid h-9 w-9 place-items-center rounded-[9px] border border-ok-line text-ok-text lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </nav>

        {open ? (
          <div className="border-t border-ok-hair px-5 py-3 lg:hidden">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-[15px] text-ok-muted"
              >
                {l.label}
              </a>
            ))}
            <a
              href={CREATOR_HREF}
              onClick={() => setOpen(false)}
              className="block py-2.5 text-[15px] text-ok-muted"
            >
              For creators
            </a>
            <a
              href="#top"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-[9px] bg-ok-text px-4 py-2.5 text-center text-[15px] font-medium text-ok-bg"
            >
              Start free
            </a>
          </div>
        ) : null}
      </div>
    </header>
  );
}
