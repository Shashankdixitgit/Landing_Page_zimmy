import { ShoppingBag, Cpu, Store } from "lucide-react";
import Reveal from "./Reveal";
import { SplitHead } from "./ui";

const SOLUTIONS = [
  {
    icon: ShoppingBag,
    title: "For DTC brands",
    head: "A steady supply of creator ads that sell.",
    body: "For brands scaling on Meta and TikTok. Creator content you can run organically or as paid ads, with every sale traced back.",
    bg: "bg-mint",
    fg: "text-accent",
  },
  {
    icon: Cpu,
    title: "For consumer tech & apps",
    head: "Demos from creators people trust.",
    body: "Tech-fluent creators on TikTok, Instagram and YouTube, briefed for accuracy and tuned for installs and sign-ups.",
    bg: "bg-sky",
    fg: "text-[#235a80]",
  },
  {
    icon: Store,
    title: "For retail & FMCG",
    head: "Reach at scale, built for shelf and search.",
    body: "Large seeding runs, affiliate programs and creator content that drives discovery, trial and repeat purchase.",
    bg: "bg-[#f6efe2]",
    fg: "text-[#7a5a1e]",
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                Built for brands
                <br />
                that sell to people.
              </>
            }
            sub="Every category has its own creator playbook. Zimmy tunes discovery, scripts and attribution to how your industry wins."
          />
        </Reveal>

        <Reveal stagger={0.1} className="mt-12 grid gap-4 md:grid-cols-3">
          {SOLUTIONS.map((s) => {
            const Icon = s.icon;
            return (
              <article key={s.title} className="flex flex-col rounded-[22px] border border-line bg-surface p-2">
                <div className={`rounded-[16px] ${s.bg} px-5 py-10`}>
                  <Icon className={`h-7 w-7 ${s.fg}`} strokeWidth={1.6} />
                  <p className={`mt-6 text-[13px] font-medium ${s.fg}`}>{s.title}</p>
                </div>
                <div className="p-5">
                  <h3 className="text-[19px] font-medium leading-snug tracking-[-0.015em] text-ink">{s.head}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{s.body}</p>
                </div>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
