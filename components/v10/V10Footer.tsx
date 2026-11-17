import { LogoMark } from "../Logo";
import { BRAND_JOIN_HREF, CREATOR_HREF, DEMO_HREF } from "../ui";

const COLS = [
  {
    title: "Product",
    links: [
      { label: "What it does", href: "#jobs" },
      { label: "How it works", href: "#how" },
      { label: "Instead of", href: "#instead" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "The main site", href: "/" },
      { label: "About", href: "/about" },
      { label: "Book a demo", href: DEMO_HREF },
      { label: "For creators", href: CREATOR_HREF },
    ],
  },
];

/** A dark footer for /v10 — the site footer is built for the light theme. */
export default function V10Footer() {
  return (
    <footer className="px-5 pb-10 pt-16">
      <div className="mx-auto max-w-[1100px]">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-w-xs">
            <span className="flex items-center gap-1.5">
              <LogoMark light className="h-7 w-7" />
              <span className="font-display text-[20px] font-semibold tracking-[-0.03em] text-ok-text">hitrate</span>
            </span>
            <p className="mt-4 text-[14px] leading-relaxed text-ok-muted">
              Find what&rsquo;s winning. Test it with AI UGC. Scale the winner.
            </p>
            <a
              href={BRAND_JOIN_HREF}
              className="mt-5 inline-flex rounded-[9px] bg-ok-text px-3.5 py-2 text-[14px] font-medium text-ok-bg transition-opacity hover:opacity-90"
            >
              Start free
            </a>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <p className="ok-label text-ok-faint">{c.title}</p>
              <ul className="mt-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="inline-block py-2 text-[14px] text-ok-muted transition-colors hover:text-ok-text">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-ok-hair pt-6 text-[13px] text-ok-faint sm:flex-row">
          <p>© 2026 HitRate. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a href="/privacy" className="inline-block py-2 hover:text-ok-text">Privacy</a>
            <a href="/terms" className="inline-block py-2 hover:text-ok-text">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
