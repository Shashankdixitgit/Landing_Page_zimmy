import Reveal from "../Reveal";
import WebsiteStart from "./WebsiteStart";

/** Okara's closer: one line, the website box, nothing else to click. */
export default function ChatCTA() {
  return (
    <section className="relative isolate overflow-hidden border-b border-ok-hair px-5 py-24 text-center sm:py-32">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_70%_at_50%_100%,rgb(92_207_152/0.12),transparent_72%)]"
        aria-hidden
      />
      <Reveal className="relative mx-auto max-w-xl">
        <h2 className="ok-h text-[40px] text-white sm:text-[54px]">Ready to find what works?</h2>
        <p className="mx-auto mt-5 max-w-md text-[16px] leading-relaxed text-ok-muted">
          Enter your website and let the box do the rest.
        </p>
        <div className="mt-9">
          <WebsiteStart size="sm" />
        </div>
      </Reveal>
    </section>
  );
}
