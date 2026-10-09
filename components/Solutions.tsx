import { Smartphone, ShoppingBag, Globe } from "lucide-react";
import Reveal from "./Reveal";
import { SplitHead } from "./ui";

const SOLUTIONS = [
  {
    icon: Smartphone,
    title: "For consumer apps",
    head: "Demos people actually watch.",
    body: "Real app footage, hooks taken from what's already winning in your category, and creators who can show the product in use.",
    bg: "bg-mint",
    fg: "text-accent",
  },
  {
    icon: ShoppingBag,
    title: "For DTC brands",
    head: "A steady supply of creator ads.",
    body: "Find the idea with cheap tests, remake it with creators, then run the proven ones as paid ads on Meta and TikTok.",
    bg: "bg-sky",
    fg: "text-[#235a80]",
  },
  {
    icon: Globe,
    title: "For new markets",
    head: "Local research before local spend.",
    body: "Launching in India, Europe or another English-speaking market? Start from what already works there, not from your home market.",
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
                Built for teams
                <br />
                that need content to work.
              </>
            }
            sub="If you post often and can't say why some videos work, Zimmy is for you."
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
