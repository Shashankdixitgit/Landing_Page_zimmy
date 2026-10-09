import Logo from "./Logo";
import { DEMO_HREF } from "./ui";

const COLS = [
  {
    title: "Product",
    links: [
      { label: "How it works", href: "/#how" },
      { label: "The ladder", href: "/#ladder" },
      { label: "Why Zimmy", href: "/#compare" },
      { label: "For creators", href: "/#creators" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/#faq" },
      { label: "Book a demo", href: DEMO_HREF },
      { label: "Contact", href: "mailto:shashank@zimmy.art" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="px-5 pb-24 pt-16">
      <div className="mx-auto max-w-[1100px]">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-[14px] leading-relaxed text-muted">
              Zimmy researches what&rsquo;s already working, decodes why, and helps you test and
              scale it: AI videos first, then real creators, then ads.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="text-[13px] font-medium text-ink">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[14px] text-muted transition-colors hover:text-ink">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 text-[13px] text-faint sm:flex-row">
          <p>© 2026 Zimmy. All rights reserved.</p>
          <a href="mailto:shashank@zimmy.art" className="hover:text-ink">
            shashank@zimmy.art
          </a>
        </div>
      </div>
    </footer>
  );
}
