import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { DEMO_HREF } from "./ui";

export default function CTA() {
  return (
    <section id="cta" className="px-2 pb-2 pt-8 sm:px-3 sm:pb-3">
      <Reveal className="sky-frame relative overflow-hidden rounded-[28px] px-6 pb-40 pt-24 text-center sm:rounded-[36px] sm:pt-32">
        <h2 className="display mx-auto max-w-3xl text-[42px] text-white [text-shadow:0_2px_30px_rgb(20_60_100/0.25)] sm:text-[64px]">
          Your next campaign
          <br />
          could be live next week.
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-[16px] leading-relaxed text-white/95">
          Book a demo and we&rsquo;ll onboard you personally. Send your brief and get a
          vetted creator shortlist within 24 hours.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href={DEMO_HREF}
            className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-[15px] font-medium text-[#1d5f8f] transition-transform duration-300 hover:-translate-y-0.5"
          >
            Book a demo
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>
        <p className="mt-6 text-[13.5px] text-white/90">
          Prefer email?{" "}
          <a href="mailto:shashank@zimmy.art" className="font-medium underline underline-offset-4">
            shashank@zimmy.art
          </a>
        </p>
        <div className="clouds pointer-events-none absolute inset-x-0 bottom-0 h-40" aria-hidden />
      </Reveal>
    </section>
  );
}
