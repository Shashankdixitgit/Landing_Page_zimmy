import { ArrowRight } from "lucide-react";
import ChatBox from "./ChatBox";
import { DEMO_HREF } from "../ui";

/**
 * /v10 hero. Dark frame so the chat box is the only bright thing on screen —
 * the whole page argues that one input replaces a marketing stack, so the input
 * has to be the hero, not a screenshot beside it.
 */
export default function ChatHero() {
  return (
    <section id="top" className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="relative isolate overflow-hidden rounded-[28px] bg-night sm:rounded-[36px]">
        {/* glow + grid so the dark panel has depth without an image */}
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_55%_at_50%_-5%,rgb(92_207_152/0.22),transparent_70%),radial-gradient(50%_40%_at_85%_20%,rgb(63_134_201/0.18),transparent_70%)]"
          aria-hidden
        />
        <div className="v10-grid pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden />

        <div className="relative mx-auto max-w-[1100px] px-5 pb-14 pt-32 sm:pb-20 sm:pt-40">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[12.5px] font-medium text-white/75">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-accent-bright" />
              One box instead of a marketing stack
            </span>

            <h1 className="display mx-auto mt-6 max-w-[22ch] text-balance text-[38px] text-white sm:text-[58px] md:text-[66px]">
              Run your whole marketing from one chat box.
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-[16.5px] leading-relaxed text-white/65">
              Ask for it the way you would ask a team. HitRate finds the videos already winning in your category, writes
              the scripts, makes the test videos, posts the ones you approve, and tells you which one brought users.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3.5">
              <a
                href={DEMO_HREF}
                className="group inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-[15.5px] font-medium text-ink transition-transform duration-300 hover:-translate-y-0.5"
              >
                Book a demo
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </a>
              <p className="text-[13px] text-white/45">For consumer app teams · you approve everything before it goes out</p>
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-[560px] sm:mt-14">
            <ChatBox />
            <p className="mt-3 text-center text-[12px] text-white/35">An example thread. Statuses are HitRate&rsquo;s today.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
