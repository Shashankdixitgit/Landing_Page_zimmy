"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { BRAND_JOIN_HREF, CREATOR_HREF, CREATOR_JOIN_HREF } from "./ui";

const LINKS = [
  { label: "Research", href: "/#research" },
  { label: "How it works", href: "/#how" },
  { label: "FAQ", href: "/#faq" },
  { label: "About", href: "/about" },
];

/** `overHero` renders white text until the page scrolls past the hero frame. */
/** `onCreators` swaps the creator button from "For creators" (a link to /creators) to "Join as a creator". */
export default function Navbar({ overHero = true, onCreators = false }: { overHero?: boolean; onCreators?: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const creatorHref = onCreators ? CREATOR_JOIN_HREF : CREATOR_HREF;
  const creatorLabel = onCreators ? "Join as a creator" : "For creators";

  // Close the mobile menu on Escape or a tap outside it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: PointerEvent) => {
      if (header.current && !header.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = overHero && !scrolled && !open;

  return (
    <header ref={header} className="fixed inset-x-0 top-0 z-[100] px-3 pt-3 sm:px-5 sm:pt-5">
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
            href={creatorHref}
            className={`whitespace-nowrap rounded-full border px-4 py-2 text-[13.5px] font-medium transition-colors ${
              light
                ? "border-white/60 text-white hover:bg-white/15"
                : "border-line text-ink hover:border-ink/30"
            }`}
          >
            {creatorLabel}
          </a>
          <a
            href={BRAND_JOIN_HREF}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors ${
              light ? "bg-white text-accent hover:bg-white/90" : "bg-accent text-white hover:bg-accent-hover"
            }`}
          >
            Join as a brand
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-full lg:hidden ${
            light ? "bg-white/20 text-white" : "bg-soft text-ink"
          }`}
        >
          {open ? <X className="h-4.5 w-4.5" /> : <Menu className="h-4.5 w-4.5" />}
        </button>
      </nav>

      {open && (
        <div id="mobile-menu" className="mx-auto mt-2 max-w-[1180px] rounded-3xl border border-line bg-surface p-3 lift lg:hidden">
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
            href={BRAND_JOIN_HREF}
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full bg-accent px-4 py-3 text-center text-[15px] font-medium text-white"
          >
            Join as a brand
          </a>
          <a
            href={creatorHref}
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-full border border-line px-4 py-3 text-center text-[15px] font-medium text-ink"
          >
            {creatorLabel}
          </a>
        </div>
      )}
    </header>
  );
}
