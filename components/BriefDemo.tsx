"use client";

import { useState } from "react";
import { Check, Search, Sparkle } from "lucide-react";
import Reveal from "./Reveal";
import { SplitHead } from "./ui";

// Illustrative shortlist for the demo. Not real creators.
const SHORTLIST = [
  { h: "@noor.cooks", n: "Food · 212K", fit: 94, g: "from-[#ff7a59] to-[#7b2cbf]" },
  { h: "@mira.moves", n: "Fitness · 1.2M", fit: 91, g: "from-[#ffb703] to-[#fb5607]" },
  { h: "@sana.skin", n: "Beauty · 560K", fit: 88, g: "from-[#ff99c8] to-[#a05195]" },
  { h: "@theweekendcamper", n: "Outdoors · 39K", fit: 84, g: "from-[#90e0a8] to-[#2d6a4f]" },
];

export default function BriefDemo() {
  const [found, setFound] = useState(false);

  return (
    <section className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                Write the brief.
                <br />
                Zimmy does the rest.
              </>
            }
            sub="Tell Zimmy who you sell to and what you can spend. It comes back with creators whose audience already looks like your customer."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="rounded-[28px] bg-sky p-4 sm:p-12">
            <div className="grid gap-4 md:grid-cols-[1.25fr_1fr]">
              {/* brief */}
              <div className="flex flex-col rounded-[20px] border border-white bg-surface lift">
                <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                  <span className="flex gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#d4dfe6]" />
                    <span className="h-2 w-2 rounded-full bg-[#d4dfe6]" />
                    <span className="h-2 w-2 rounded-full bg-[#d4dfe6]" />
                  </span>
                  <span className="text-[12px] text-muted">Campaign brief · example</span>
                  <span className="w-8" />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <p className="text-[12.5px] text-muted">Spring launch, protein snack bar</p>
                  <h3 className="display mt-3 text-[28px] text-ink sm:text-[32px]">
                    Reach busy people
                    <br />
                    who train before work.
                  </h3>
                  <p className="mt-5 text-[14.5px] leading-[1.8] text-ink/80">
                    Budget $15k across six weeks.{" "}
                    <mark className="rounded bg-highlight px-1 text-ink">
                      Creators in fitness and food, 30K to 1M followers,
                    </mark>{" "}
                    mostly US audience. Honest, unscripted tone. Track sales on our store.
                  </p>
                  <div className="mt-auto flex items-center justify-between gap-4 pt-8">
                    <span className="text-[12.5px] text-muted">Ready when you are</span>
                    <button
                      onClick={() => setFound(true)}
                      className="inline-flex items-center gap-2.5 rounded-full bg-accent px-5 py-3 text-[13.5px] font-medium text-white transition-colors hover:bg-accent-hover"
                    >
                      {found ? "Shortlist ready" : "Find creators"}
                      {found ? <Check className="h-4 w-4" /> : <Search className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* shortlist */}
              <div className="flex flex-col rounded-[20px] border border-white bg-surface/80 p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[13.5px] font-medium text-ink">
                    <span className="grid h-6 w-6 place-items-center rounded-md bg-zimmy text-white">
                      <Sparkle className="h-3 w-3" fill="currentColor" />
                    </span>
                    Shortlist
                  </span>
                  <span className="text-[12px] text-muted">{found ? SHORTLIST.length : 0} creators</span>
                </div>

                {found ? (
                  <ul className="mt-5 space-y-2.5">
                    {SHORTLIST.map((c, i) => (
                      <li
                        key={c.h}
                        className="pop flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2.5"
                        style={{ animationDelay: `${i * 0.09}s` }}
                      >
                        <span className={`h-8 w-8 shrink-0 rounded-full bg-gradient-to-br ${c.g}`} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[13.5px] font-medium text-ink">{c.h}</p>
                          <p className="text-[11.5px] text-muted">{c.n}</p>
                        </div>
                        <span className="rounded-md bg-mint px-2 py-0.5 text-[11.5px] font-medium text-accent">
                          {c.fit}% fit
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex flex-1 flex-col items-center justify-center py-12 text-center">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sky text-[#2e6f9e] lift">
                      <Search className="h-6 w-6" strokeWidth={1.8} />
                    </span>
                    <p className="display mt-5 text-[24px] text-[#2a4d5c]">
                      Your creators
                      <br />
                      will appear here.
                    </p>
                    <p className="mt-2 text-[13px] text-muted">Press &ldquo;Find creators&rdquo; to try it.</p>
                  </div>
                )}
              </div>
            </div>
            <p className="mt-5 text-center text-[12.5px] text-[#4b6878]">
              Illustrative example. Real shortlists come from the Modash creator database.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
