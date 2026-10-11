import Image from "next/image";
import { ArrowRight, Mail } from "lucide-react";
import Reveal from "./Reveal";
import { BRAND_JOIN_HREF, CREATOR_HREF, DEMO_HREF } from "./ui";


export default function CTA() {
  return (
    <section id="cta" className="px-2 pb-2 pt-8 sm:px-3 sm:pb-3">
      {/* one wheat image behind the whole block; left side sits on it, right side is a white card */}
      <Reveal className="relative grid items-center gap-6 overflow-hidden rounded-[28px] bg-[#3f86c9] p-3 sm:rounded-[36px] sm:p-5 lg:grid-cols-[1.5fr_1fr] lg:gap-4">
        <Image src="/hero-wheat-poster.jpg" alt="" fill sizes="100vw" className="object-cover object-[center_30%]" />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_60%_at_30%_45%,rgb(12_38_66/0.45),transparent_75%)]"
          aria-hidden
        />

        {/* left: transparent, over the image */}
        <div className="relative px-4 pb-10 pt-16 text-center sm:pb-16 sm:pt-20">
          <div>
            <h2 className="display mx-auto max-w-xl text-[42px] text-white [text-shadow:0_2px_30px_rgb(10_40_70/0.35)] sm:text-[60px]">
              Bring your brand.
              <br />
              See what will sell.
            </h2>
            <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-white [text-shadow:0_1px_12px_rgb(10_30_50/0.55)]">
              On the call we&rsquo;ll show you what&rsquo;s working in your niche right now. You&rsquo;ll leave with a starting point.
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

        {/* right: white card on top of the image */}
        <div className="relative flex flex-col rounded-[22px] bg-surface p-7 shadow-[0_20px_50px_-20px_rgb(12_38_66/0.45)] sm:rounded-[28px] sm:p-9 lg:self-stretch">
          <p className="text-[13px] font-medium text-accent">Prefer to start yourself?</p>
          <h3 className="display mt-3 text-[28px] text-ink">
            Tell us about
            <br />
            your brand.
          </h3>
          <p className="mt-3 text-[14.5px] leading-relaxed text-muted">
            Eight quick questions. We&rsquo;ll come back with what&rsquo;s working in your niche.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            <a
              href={BRAND_JOIN_HREF}
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
            >
              Join as a brand
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
          <div className="mt-auto pt-8">
            <div className="flex items-center gap-3 rounded-2xl bg-soft p-4">
              <Image src="/founder-avatar.jpg" alt="" width={40} height={40} className="h-10 w-10 shrink-0 rounded-xl object-cover" />
              <div className="min-w-0">
                <p className="text-[13.5px] font-medium text-ink">Or write to the founder</p>
                <a href="mailto:shashank@zimmy.art" className="inline-flex items-center gap-1.5 text-[13.5px] text-accent hover:underline">
                  <Mail className="h-3.5 w-3.5" /> shashank@zimmy.art
                </a>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
      <p className="mt-4 text-center text-[13px] text-muted">
        <a href={CREATOR_HREF} className="underline-offset-4 hover:text-ink hover:underline">
          Making videos? Zimmy for creators &rarr;
        </a>
      </p>
    </section>
  );
}
