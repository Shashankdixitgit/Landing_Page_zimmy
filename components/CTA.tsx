import { ArrowUpRight } from "lucide-react";
import Reveal from "./Reveal";

export default function CTA() {
  return (
    <section id="cta" className="px-5 pb-16 pt-4">
      <Reveal className="relative mx-auto max-w-6xl overflow-hidden rounded-[28px] border-2 border-ink bg-ink px-6 py-20 text-center shadow-hard-lg sm:py-28">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/25 blur-[120px]"
          aria-hidden
        />
        <div className="relative">
          <span className="inline-flex items-center gap-2 rounded-full border-2 border-cream/25 py-1 pl-1 pr-3 text-[12.5px] font-bold uppercase tracking-[0.14em] text-cream/80">
            <span className="rounded-full border-2 border-cream/25 bg-accent px-2.5 py-0.5 text-[11px] text-white">
              Start
            </span>
            the conversation
          </span>
          <h2 className="mx-auto mt-7 max-w-2xl text-[36px] font-bold leading-[1.04] tracking-[-0.025em] text-cream sm:text-[56px]">
            Let&rsquo;s build your{" "}
            <span className="text-accent">creator engine.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[16.5px] leading-relaxed text-cream/65 sm:text-[18px]">
            From discovery to whitelisted attribution, one AI operator running every
            creator dollar end-to-end. Book a demo and we onboard you personally.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3.5">
            <a
              href="https://cal.com/ranveerkochhar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-accent px-7 py-3.5 text-[15.5px] font-semibold text-white shadow-[4px_4px_0_0_rgba(255,255,255,0.85)] transition-transform hover:-translate-y-0.5"
            >
              Book a Demo <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-full border-2 border-cream/30 px-7 py-3.5 text-[15.5px] font-semibold text-cream transition-transform hover:-translate-y-0.5"
            >
              See how it works
            </a>
          </div>
          <p className="mt-7 text-[14.5px] text-cream/60">
            Prefer email?{" "}
            <a
              href="mailto:shashank@zimmy.art"
              className="font-semibold text-cream underline underline-offset-2 hover:text-accent"
            >
              shashank@zimmy.art
            </a>{" "}
            ·{" "}
            <a
              href="mailto:ranveer@zimmy.art"
              className="font-semibold text-cream underline underline-offset-2 hover:text-accent"
            >
              ranveer@zimmy.art
            </a>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
