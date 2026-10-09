import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Reveal from "./Reveal";
import { CREATOR_JOIN_HREF } from "./ui";

export default function CreatorJoin() {
  return (
    <section className="px-2 pb-2 sm:px-3 sm:pb-3">
      <Reveal className="relative overflow-hidden rounded-[28px] bg-[#3f86c9] px-6 pb-24 pt-20 text-center sm:rounded-[36px] sm:pt-28">
        <Image src="/hero-wheat-poster.jpg" alt="" fill sizes="100vw" className="object-cover object-[center_30%]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_55%_at_50%_45%,rgb(12_38_66/0.45),transparent_75%)]" aria-hidden />
        <div className="relative">
          <h2 className="display mx-auto max-w-xl text-[42px] text-white [text-shadow:0_2px_30px_rgb(10_40_70/0.35)] sm:text-[60px]">
            Post what works.
            <br />
            Get paid for it.
          </h2>
          <div className="mt-8 flex justify-center">
            <a
              href={CREATOR_JOIN_HREF}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-[15.5px] font-medium text-accent transition-transform duration-300 hover:-translate-y-0.5"
            >
              Join as a creator
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
