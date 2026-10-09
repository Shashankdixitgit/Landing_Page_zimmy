"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import { DEMO_HREF } from "./ui";

const LINKS = [
  { label: "Product", href: "/#what" },
  { label: "How it works", href: "/#how" },
  { label: "Why Zimmy", href: "/#compare" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full border px-3 py-2 transition-all duration-300 sm:px-4 ${
          scrolled
            ? "border-line-strong bg-night/70 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a href="/" aria-label="Zimmy home" className="pl-1">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-[14.5px] font-medium text-muted transition-colors hover:text-snow"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={DEMO_HREF}
          className="hidden items-center gap-1.5 rounded-full bg-snow px-4 py-2 text-[14.5px] font-semibold text-night transition-transform hover:-translate-y-0.5 md:inline-flex"
        >
          Book a demo <ArrowUpRight className="h-4 w-4" />
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border border-line-strong bg-white/[0.04] text-snow md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-line-strong bg-coal/95 p-3 backdrop-blur-xl md:hidden">
          <ul className="flex flex-col">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-3 py-3 text-[15px] font-medium text-snow/85"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={DEMO_HREF}
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-accent px-4 py-3 text-center text-[15px] font-semibold text-white"
          >
            Book a demo
          </a>
        </div>
      )}
    </header>
  );
}
