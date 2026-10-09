"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { CREATOR_HREF, DEMO_HREF } from "./ui";

const LINKS = [
  { label: "How it works", href: "/#how" },
  { label: "The ladder", href: "/#ladder" },
  { label: "Why Zimmy", href: "/#compare" },
  { label: "For creators", href: "/#creators" },
  { label: "About", href: "/about" },
];

/** `overHero` renders white text until the page scrolls past the hero frame. */
export default function Navbar({ overHero = true }: { overHero?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = overHero && !scrolled && !open;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-5">
      <nav
        className={`mx-auto flex max-w-[1180px] items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 sm:px-6 ${
          light ? "bg-transparent" : "border border-line bg-surface/85 backdrop-blur-xl lift"
        }`}
      >
        <a href="/" aria-label="Zimmy home">
          <Logo light={light} />
        </a>

        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className={`whitespace-nowrap text-[13.5px] font-medium transition-opacity hover:opacity-70 ${
                  light ? "text-white" : "text-ink"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto mr-2 hidden items-center gap-2 md:flex lg:ml-0 lg:mr-0">
          <a
            href={CREATOR_HREF}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors ${
              light
                ? "border-white/60 text-white hover:bg-white/15"
                : "border-line text-ink hover:border-ink/30"
            }`}
          >
            Join as a creator
          </a>
          <a
            href={DEMO_HREF}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors ${
              light ? "bg-white text-accent hover:bg-white/90" : "bg-accent text-white hover:bg-accent-hover"
            }`}
          >
            Book a demo
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full lg:hidden ${
            light ? "bg-white/20 text-white" : "bg-soft text-ink"
          }`}
        >
          {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-[1180px] rounded-3xl border border-line bg-surface p-3 lift lg:hidden">
          <ul className="flex flex-col">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-[15px] font-medium text-ink"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={DEMO_HREF}
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-accent px-4 py-3 text-center text-[15px] font-medium text-white"
          >
            Book a demo
          </a>
          <a
            href={CREATOR_HREF}
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full border border-line px-4 py-3 text-center text-[15px] font-medium text-ink"
          >
            Join as a creator
          </a>
        </div>
      )}
    </header>
  );
}
