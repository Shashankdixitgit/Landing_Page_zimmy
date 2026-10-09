import Image from "next/image";
import { ArrowRight, Mail, Check } from "lucide-react";
import Reveal from "./Reveal";
import { DEMO_HREF } from "./ui";

const ON_THE_CALL = [
  "What's already working in your niche",
  "Why it worked, in plain words",
  "The first three tests we'd run",
];

export default function CTA() {
  return (
    <section id="cta" className="px-2 pb-2 pt-8 sm:px-3 sm:pb-3">
      <Reveal className="grid gap-2 sm:gap-3 lg:grid-cols-[1.6fr_1fr]">
        {/* left: the ask, over the same wheat scene as the hero */}
        <div className="relative overflow-hidden rounded-[28px] bg-[#3f86c9] px-6 pb-24 pt-20 text-center sm:rounded-[36px] sm:pt-28">
          <Image src="/hero-wheat-poster.jpg" alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover object-[center_30%]" />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_50%_40%,rgb(12_38_66/0.45),transparent_75%)]"
            aria-hidden
          />
          <div className="relative">
            <h2 className="display mx-auto max-w-xl text-[42px] text-white [text-shadow:0_2px_30px_rgb(10_40_70/0.35)] sm:text-[60px]">
              Find your recipe.
              <br />
              Then scale it.
            </h2>
            <p className="mx-auto mt-6 max-w-md text-[16px] leading-relaxed text-white [text-shadow:0_1px_12px_rgb(10_30_50/0.55)]">
              Book a demo and tell us your product and market. We&rsquo;ll show you what&rsquo;s
              already working in your niche and why.
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
          </div>
        </div>

        {/* right: what the call covers, and the founder's email */}
        <div className="flex flex-col rounded-[28px] border border-line bg-surface p-7 sm:rounded-[36px] sm:p-9">
          <p className="text-[13px] font-medium text-accent">On the demo call</p>
          <h3 className="display mt-3 text-[28px] text-ink">
            You&rsquo;ll leave with
            <br />
            a starting point.
          </h3>
          <ul className="mt-6 space-y-3">
            {ON_THE_CALL.map((t) => (
              <li key={t} className="flex items-start gap-3 text-[14.5px] text-ink/85">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2} /> {t}
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-8">
            <div className="flex items-center gap-3 rounded-2xl bg-soft p-4">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-sky text-[13px] font-medium text-[#235a80]">
                SD
              </span>
              <div className="min-w-0">
                <p className="text-[13.5px] font-medium text-ink">Prefer email? Write to the founder.</p>
                <a href="mailto:shashank@zimmy.art" className="inline-flex items-center gap-1.5 text-[13.5px] text-accent hover:underline">
                  <Mail className="h-3.5 w-3.5" /> shashank@zimmy.art
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
