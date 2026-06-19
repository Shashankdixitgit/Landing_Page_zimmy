import Logo from "./Logo";

const COLS = [
  { title: "Product", links: ["What we do", "How it works", "Technology", "Solutions"] },
  { title: "Company", links: ["About Us", "Careers", "Contact", "Blog"] },
  { title: "Resources", links: ["Case Studies", "Playbooks", "Webinars", "Pricing"] },
];

export default function Footer() {
  return (
    <footer className="px-5 pb-8">
      <div className="mx-auto max-w-6xl rounded-[28px] border-2 border-ink bg-cream p-8 shadow-hard sm:p-12">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_repeat(3,1fr)]">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-[14.5px] leading-relaxed text-muted">
              Zimmy runs your influencer marketing end-to-end, discovery, outreach,
              scripts, and attribution, so one person can run a full program.
            </p>
          </div>
          {COLS.map((c) => (
            <div key={c.title}>
              <h4 className="text-[12px] font-bold uppercase tracking-[0.12em] text-ink/55">
                {c.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[14.5px] font-medium text-ink/75 transition-colors hover:text-ink"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t-2 border-ink/10 pt-7 text-[13.5px] text-muted sm:flex-row">
          <p>© 2026 Zimmy. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="font-medium hover:text-ink">Privacy</a>
            <a href="#" className="font-medium hover:text-ink">Terms</a>
            <a href="mailto:hello@zimmy.ai" className="font-medium hover:text-ink">
              hello@zimmy.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
