import { ShoppingBag, Cpu, Store } from "lucide-react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

const SOLUTIONS = [
  {
    n: "01",
    icon: ShoppingBag,
    title: "DTC Brands",
    head: "Performance creator marketing for direct-to-consumer.",
    body: "Built for DTC brands scaling on Meta and TikTok, turn creators into a renewable, ad-ready content engine with clean attribution.",
    bg: "bg-yellow",
  },
  {
    n: "02",
    icon: Cpu,
    title: "Consumer Tech",
    head: "Educate, demo, and convert through credible creators.",
    body: "Tech-fluent creators across TikTok and Instagram, briefed for technical accuracy, with output optimised for organic and paid.",
    bg: "bg-mint",
  },
  {
    n: "03",
    icon: Store,
    title: "Retail & FMCG",
    head: "Mass-reach creator content built for shelf and search.",
    body: "Large-scale seeding, affiliate programmes, and creator content that drives discovery, trial, and repeat purchase.",
    bg: "bg-pink",
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionLabel n="⑥">Solutions</SectionLabel>
          <h2 className="mt-6 max-w-2xl text-[34px] font-bold leading-[1.05] tracking-[-0.025em] text-ink sm:text-[48px]">
            Built for the brands{" "}
            <span className="mark">shaping consumer.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-muted sm:text-[17.5px]">
            Every category has its own creator playbook. Zimmy tunes the engine
            across discovery, outreach, scripts, and attribution to the way your
            industry wins.
          </p>
        </Reveal>

        <Reveal stagger={0.12} className="mt-12 grid gap-5 md:grid-cols-3">
          {SOLUTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <article
                key={s.n}
                className={`flex flex-col rounded-[var(--radius-card)] border-2 border-ink ${s.bg} p-7 shadow-hard transition-transform hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-xl border-2 border-ink bg-cream text-ink">
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <span className="text-[13px] font-bold uppercase tracking-wide text-ink/55">
                    {s.n}
                  </span>
                </div>
                <h3 className="mt-5 text-[21px] font-bold tracking-tight text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] font-semibold leading-snug text-ink/80">
                  {s.head}
                </p>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ink/65">
                  {s.body}
                </p>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
