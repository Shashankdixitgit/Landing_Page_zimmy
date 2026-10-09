import { ArrowRight, CalendarDays, Handshake } from "lucide-react";
import Reveal from "./Reveal";
import { Chip, CREATOR_HREF, SplitHead } from "./ui";

const WEEK = [
  ["Mon", "Hook test"],
  ["Tue", "Reel"],
  ["Wed", "Rest"],
  ["Thu", "Remake"],
  ["Fri", "Series"],
];

export default function Creators() {
  return (
    <section id="creators" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                Creators:
                <br />
                grow on purpose.
              </>
            }
            sub="Post what's already working in your niche. Get paid by brands for it."
          />
        </Reveal>

        <Reveal stagger={0.1} className="mt-12 grid gap-4 md:grid-cols-2">
          <article className="flex flex-col rounded-[24px] bg-sky p-7 sm:p-8">
            <div className="flex items-center justify-between">
              <CalendarDays className="h-5 w-5 text-[#235a80]" strokeWidth={1.8} />
              <Chip>Coming soon</Chip>
            </div>
            <h3 className="display mt-6 text-[26px] text-ink">A content calendar built on what works.</h3>
            <div className="mt-6 grid grid-cols-5 gap-1.5">
              {WEEK.map(([d, t]) => (
                <div key={d} className={`rounded-xl px-1.5 py-3 text-center ${t === "Rest" ? "bg-white/50" : "bg-surface"}`}>
                  <p className="text-[11px] text-muted">{d}</p>
                  <p className="mt-1 text-[11.5px] font-medium leading-tight text-ink">{t}</p>
                </div>
              ))}
            </div>
          </article>

          <article className="flex flex-col rounded-[24px] bg-mint p-7 sm:p-8">
            <div className="flex items-center justify-between">
              <Handshake className="h-5 w-5 text-accent" strokeWidth={1.8} />
              <Chip tone="mint">Live</Chip>
            </div>
            <h3 className="display mt-6 text-[26px] text-ink">Paid brand deals that fit your audience.</h3>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Clear brief", "Agreed terms", "Your tracking link"].map((t) => (
                <span key={t} className="rounded-full bg-surface px-3.5 py-1.5 text-[13px] font-medium text-ink">
                  {t}
                </span>
              ))}
            </div>
          </article>
        </Reveal>

        <Reveal delay={0.15} className="mt-6 flex justify-center">
          <a
            href={CREATOR_HREF}
            className="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-white transition-transform duration-300 hover:-translate-y-0.5"
          >
            Join as a creator
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
