import Image from "next/image";
import Reveal from "./Reveal";
import PasteLink from "./PasteLink";
import { CREATOR_HREF } from "./ui";

/** Homepage closing frame: the same paste box as the hero, on the wheat image. */
export default function FinalCTA() {
  return (
    <section id="start" className="px-2 pb-2 pt-8 sm:px-3 sm:pb-3">
      <Reveal className="relative isolate overflow-hidden rounded-[28px] bg-[#3f86c9] sm:rounded-[36px]">
        <Image src="/hero-wheat-poster.jpg" alt="" fill sizes="100vw" className="-z-10 object-cover object-[center_30%]" />
        <div
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_60%_at_50%_45%,rgb(12_38_66/0.5),transparent_80%)]"
          aria-hidden
        />
        <div className="mx-auto flex max-w-3xl flex-col items-center px-4 py-20 text-center sm:py-28">
          <h2 className="display max-w-[16ch] text-[40px] text-white [text-shadow:0_2px_30px_rgb(10_40_70/0.35)] sm:text-[60px]">
            See what&rsquo;s working for your competitors.
          </h2>
          <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white [text-shadow:0_1px_12px_rgb(10_30_50/0.55)]">
            Paste one link. In a few minutes, see their best videos and ads, and why each one worked.
          </p>
          <div className="mt-8 flex w-full justify-center">
            <PasteLink id="cta-link" />
          </div>
          <p className="mt-8 text-[13.5px] text-white [text-shadow:0_1px_10px_rgb(10_30_50/0.6)]">
            Questions?{" "}
            <a href="mailto:shashank@zimmy.art" className="font-medium underline underline-offset-4">
              Write to the founder
            </a>
            {" · "}
            <a href={CREATOR_HREF} className="font-medium underline underline-offset-4">
              Are you a creator?
            </a>
          </p>
        </div>
      </Reveal>
    </section>
  );
}
