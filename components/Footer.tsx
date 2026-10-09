import Logo from "./Logo";
import { DEMO_HREF } from "./ui";

const COLS = [
  {
    title: "Product",
    links: [
      { label: "What Zimmy does", href: "/#what" },
      { label: "How it works", href: "/#how" },
      { label: "Technology", href: "/#tech" },
      { label: "Who it's for", href: "/#solutions" },
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
    <footer className="px-5 pb-8">
      <div className="mx-auto max-w-6xl border-t border-line pt-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
              The AI operator for influencer marketing. Discovery, outreach, scripts
              and attribution, run end-to-end so one person can run a whole program.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="text-[12px] font-semibold uppercase tracking-[0.14em] text-faint">{c.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-[14.5px] text-snow/75 transition-colors hover:text-snow">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-line pt-7 text-[13.5px] text-faint sm:flex-row">
          <p>© 2026 Zimmy. All rights reserved.</p>
          <a href="mailto:shashank@zimmy.art" className="hover:text-snow">
            shashank@zimmy.art
          </a>
        </div>

        <p
          className="pointer-events-none mt-10 select-none text-center font-display text-[22vw] font-extrabold leading-[0.8] tracking-[-0.06em] text-white/[0.04] lg:text-[260px]"
          aria-hidden
        >
          zimmy
        </p>
      </div>
    </footer>
  );
}
