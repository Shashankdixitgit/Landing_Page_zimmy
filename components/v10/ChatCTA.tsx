import { ArrowRight } from "lucide-react";
import Reveal from "../Reveal";
import ChatBox from "./ChatBox";
import { CREATOR_HREF, DEMO_HREF } from "../ui";

export default function ChatCTA() {
  return (
    <section id="cta" className="px-2 pb-3 sm:px-3">
      <Reveal className="relative isolate overflow-hidden rounded-[28px] bg-night px-5 py-20 text-center sm:rounded-[36px] sm:py-28">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_110%,rgb(92_207_152/0.22),transparent_70%)]"
          aria-hidden
        />
        <div className="v10-grid pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />

        <div className="relative mx-auto max-w-xl">
          <h2 className="display text-[42px] text-white sm:text-[58px]">
            One box.
            <br />
            Ask it anything.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-white/60">
            Start with your app link. See what is already winning before you spend anything on a guess.
          </p>

          <div className="mx-auto mt-9 max-w-[460px]">
            <ChatBox compact />
          </div>

          <div className="mt-7 flex flex-col items-center gap-3.5">
            <a
              href={DEMO_HREF}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-[15.5px] font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
            >
              Book a demo
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
            <a href={CREATOR_HREF} className="text-[13.5px] font-medium text-white/60 underline-offset-4 hover:text-white hover:underline">
              Making videos? HitRate for creators &rarr;
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
