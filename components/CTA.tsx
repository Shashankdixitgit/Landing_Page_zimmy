import Reveal from "./Reveal";
import CreatorCard, { CREATORS } from "./CreatorCard";
import { GhostButton, PrimaryButton } from "./ui";

export default function CTA() {
  return (
    <section id="cta" className="px-5 pb-16 pt-8">
      <Reveal className="card-glow relative mx-auto max-w-6xl overflow-hidden px-6 py-20 text-center sm:py-28">
        <div
          className="pointer-events-none absolute left-1/2 top-full h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-[130px]"
          style={{ background: "radial-gradient(closest-side, #ff4d3d, rgb(155 140 255 / 0.5), transparent)" }}
          aria-hidden
        />

        {/* side cards, desktop only */}
        <div className="pointer-events-none absolute -left-10 top-1/2 hidden -translate-y-1/2 -rotate-12 opacity-80 lg:block" aria-hidden>
          <CreatorCard c={CREATORS[5]} className="w-[180px]" compact />
        </div>
        <div className="pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 rotate-12 opacity-80 lg:block" aria-hidden>
          <CreatorCard c={CREATORS[2]} className="w-[180px]" compact />
        </div>

        <div className="relative">
          <h2 className="mx-auto max-w-3xl font-display text-[40px] font-bold leading-[1.0] tracking-[-0.04em] text-snow sm:text-[64px]">
            Your next campaign could be{" "}
            <span className="serif glow-text">live next week.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-[16.5px] leading-relaxed text-muted sm:text-[18px]">
            Book a demo and we&rsquo;ll onboard you personally. Send us your brief and
            you&rsquo;ll have a vetted creator shortlist within 24 hours.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <PrimaryButton />
            <GhostButton href="#how">See how it works</GhostButton>
          </div>
          <p className="mt-7 text-[14.5px] text-muted">
            Prefer email?{" "}
            <a
              href="mailto:shashank@zimmy.art"
              className="font-semibold text-snow underline underline-offset-4 hover:text-accent"
            >
              shashank@zimmy.art
            </a>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
