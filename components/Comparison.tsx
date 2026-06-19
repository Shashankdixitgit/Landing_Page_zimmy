import { Check, Minus, X } from "lucide-react";
import Reveal from "./Reveal";
import SectionLabel from "./SectionLabel";

type Cell = "yes" | "part" | "no";

const COLS = ["DIY Tools", "Zimmy", "Agencies"] as const;

const ROWS: { label: string; cells: [Cell, Cell, Cell] }[] = [
  { label: "Finds best-fit creators with real data (Modash)", cells: ["part", "yes", "yes"] },
  { label: "Runs outreach & negotiation for you", cells: ["no", "yes", "yes"] },
  { label: "Writes scripts & hooks in each creator's voice", cells: ["no", "yes", "part"] },
  { label: "Unique UTM link per creator", cells: ["part", "yes", "part"] },
  { label: "Tracks real revenue (BigQuery attribution)", cells: ["no", "yes", "no"] },
  { label: "You approve every creator", cells: ["yes", "yes", "no"] },
  { label: "Runs end-to-end without added headcount", cells: ["no", "yes", "yes"] },
  { label: "Continuously refines the creator mix", cells: ["no", "yes", "part"] },
  { label: "Transparent, flat pricing", cells: ["yes", "yes", "no"] },
];

function Mark({ v }: { v: Cell }) {
  if (v === "yes")
    return (
      <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-mint text-ink">
        <Check className="h-4 w-4" strokeWidth={2.6} />
      </span>
    );
  if (v === "part")
    return (
      <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-yellow text-ink">
        <Minus className="h-4 w-4" strokeWidth={2.6} />
      </span>
    );
  return (
    <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink/20 bg-paper text-ink/30">
      <X className="h-4 w-4" strokeWidth={2.6} />
    </span>
  );
}

export default function Comparison() {
  return (
    <section id="compare" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionLabel n="⑤">A new category</SectionLabel>
          <h2 className="mt-6 max-w-2xl text-[34px] font-bold leading-[1.05] tracking-[-0.025em] text-ink sm:text-[48px]">
            Zimmy vs <span className="mark">the old way.</span>
          </h2>
          <p className="mt-5 max-w-2xl text-[16.5px] leading-relaxed text-muted sm:text-[17.5px]">
            DIY tools dump the work back on you. Agencies are strategic but opaque and
            expensive. Zimmy delivers agency-level execution, run by AI, with you in
            control.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="overflow-x-auto">
            <div className="min-w-[640px] overflow-hidden rounded-[var(--radius-card)] border-2 border-ink shadow-hard">
              {/* header */}
              <div className="grid grid-cols-[1.7fr_1fr_1.1fr_1fr] border-b-2 border-ink">
                <div className="bg-cream px-6 py-5 text-[12px] font-bold uppercase tracking-wide text-ink/55">
                  The capability
                </div>
                {COLS.map((c) => {
                  const hot = c === "Zimmy";
                  return (
                    <div
                      key={c}
                      className={`border-l-2 border-ink px-4 py-5 text-center text-[15px] font-bold ${
                        hot ? "bg-accent text-white" : "bg-cream text-ink"
                      }`}
                    >
                      {c}
                    </div>
                  );
                })}
              </div>

              {/* rows */}
              {ROWS.map((r, i) => (
                <div
                  key={r.label}
                  className={`grid grid-cols-[1.7fr_1fr_1.1fr_1fr] items-center ${
                    i < ROWS.length - 1 ? "border-b-2 border-ink/10" : ""
                  } ${i % 2 ? "bg-cream/50" : "bg-paper"}`}
                >
                  <div className="px-6 py-4 text-[14.5px] font-semibold text-ink/85">
                    {r.label}
                  </div>
                  <div className="flex justify-center px-4 py-4">
                    <Mark v={r.cells[0]} />
                  </div>
                  <div className="flex justify-center bg-accent/[0.06] px-4 py-4">
                    <Mark v={r.cells[1]} />
                  </div>
                  <div className="flex justify-center px-4 py-4">
                    <Mark v={r.cells[2]} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
