"use client";

import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import Logo from "./Logo";

const LINKS = [
  { label: "What we do", href: "/#what" },
  { label: "How it works", href: "/#how" },
  { label: "Solutions", href: "/#solutions" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav
        className={`mx-auto flex items-center rounded-full border-2 border-ink bg-cream shadow-hard transition-all duration-500 ease-out ${
          scrolled
            ? "w-fit justify-center gap-2.5 px-2.5 py-1.5"
            : "max-w-6xl justify-between px-3 py-2 sm:px-4"
        }`}
      >
        <a href="/" aria-label="Zimmy home" className="pl-1">
          <Logo />
        </a>

        <ul
          className={`hidden items-center overflow-hidden transition-all duration-300 ease-out md:flex ${
            scrolled
              ? "max-w-0 gap-0 opacity-0"
              : "max-w-2xl gap-1 opacity-100"
          }`}
        >
          {LINKS.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                className="whitespace-nowrap rounded-full px-3.5 py-2 text-[14.5px] font-medium text-ink/75 transition-colors hover:text-ink"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="https://cal.com/ranveerkochhar"
          target="_blank"
          rel="noopener noreferrer"
          className={`hidden items-center gap-1.5 rounded-full border-2 border-ink bg-accent text-[14.5px] font-semibold text-white shadow-hard-sm transition-all duration-300 hover:-translate-y-0.5 md:inline-flex ${
            scrolled ? "px-4 py-1.5" : "px-4 py-2"
          }`}
        >
          Book a Demo <ArrowUpRight className="h-4 w-4" />
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="grid h-10 w-10 place-items-center rounded-full border-2 border-ink bg-cream md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="mx-auto mt-2 max-w-6xl rounded-2xl border-2 border-ink bg-cream p-3 shadow-hard md:hidden">
          <ul className="flex flex-col">
            {LINKS.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-3 py-3 text-[15px] font-medium text-ink/80"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="https://cal.com/ranveerkochhar"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full border-2 border-ink bg-accent px-4 py-3 text-center text-[15px] font-semibold text-white"
          >
            Book a Demo
          </a>
        </div>
      )}
    </header>
  );
}
