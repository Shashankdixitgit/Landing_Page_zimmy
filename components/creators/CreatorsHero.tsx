import Reveal from "../Reveal";
import LinkStart from "./LinkStart";
import { SAMPLE_REPORT_HREF } from "../ui";
import { PLATFORM_LIST } from "@/lib/planPhases";

export function SampleLink({ light = false }: { light?: boolean }) {
  return (
    <a
      href={SAMPLE_REPORT_HREF}
      className={`inline-block py-2 text-[14px] font-medium underline-offset-4 hover:underline ${light ? "text-white [text-shadow:0_1px_10px_rgb(10_30_50/0.7)]" : "text-accent"}`}
    >
      See a finished report <span aria-hidden>&rarr;</span>
    </a>
  );
}

export default function CreatorsHero() {
  return (
    <header className="px-5 pb-10 pt-32 text-center sm:pb-16 sm:pt-44" id="start">
      <Reveal className="mx-auto max-w-[860px]">
        <span className="inline-flex rounded-full bg-mint px-3.5 py-1.5 text-[12.5px] font-medium text-accent">For creators</span>
        <h1 className="display mt-6 text-balance text-[34px] text-ink sm:text-[48px] md:text-[56px]">
          Know why your posts work.
          <br />
          <span className="text-accent">Plan what to make next.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-[640px] text-balance text-[16px] leading-relaxed text-muted sm:text-[17px]">
          Your latest posts, read against your own median. Your first 7 days, written.
        </p>
        <div className="mt-9">
          <LinkStart />
          <p className="mt-4 text-[13.5px] text-muted">Public profiles on {PLATFORM_LIST}. Email only, no card.</p>
          <SampleLink />
        </div>
      </Reveal>
    </header>
  );
}
