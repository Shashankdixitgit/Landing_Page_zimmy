import { ShoppingBag, Cpu, Store } from "lucide-react";
import Reveal from "./Reveal";
import { SectionHead } from "./ui";

const SOLUTIONS = [
  {
    icon: ShoppingBag,
    title: "DTC brands",
    head: "Turn creators into a steady supply of ads that sell.",
    body: "For brands scaling on Meta and TikTok. Zimmy builds a renewable pipeline of creator content you can run organically or as paid ads, with every sale traced back.",
    glow: "#ff4d3d",
  },
  {
    icon: Cpu,
    title: "Consumer tech & apps",
    head: "Explain, demo and convert through creators people trust.",
    body: "Tech-fluent creators on TikTok, Instagram and YouTube, briefed for accuracy, with content tuned for installs and sign-ups.",
    glow: "#9b8cff",
  },
  {
    icon: Store,
    title: "Retail & FMCG",
    head: "Reach at scale, built for shelf and search.",
    body: "Large seeding runs, affiliate programs and creator content that drives discovery, trial and repeat purchase.",
    glow: "#c8f560",
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHead
            eyebrow="Who it's for"
            title={
              <>
                Built for brands that{" "}
                <span className="serif text-accent-soft">sell to people.</span>
              </>
            }
            sub="Every category has its own creator playbook. Zimmy tunes discovery, scripts and attribution to the way your industry wins."
          />
        </Reveal>

        <Reveal stagger={0.12} className="mt-14 grid gap-5 md:grid-cols-3">
          {SOLUTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <article key={s.title} className="card relative flex flex-col overflow-hidden p-7">
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-30 blur-3xl"
                  style={{ background: s.glow }}
                  aria-hidden
                />
                <span className="relative grid h-11 w-11 place-items-center rounded-xl border border-line-strong text-snow">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <p className="relative mt-6 text-[12px] font-semibold uppercase tracking-[0.14em] text-faint">{s.title}</p>
                <h3 className="relative mt-2 font-display text-[22px] font-bold leading-snug tracking-tight text-snow">
                  {s.head}
                </h3>
                <p className="relative mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
