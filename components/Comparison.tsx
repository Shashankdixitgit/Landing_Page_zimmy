import { Check, Minus, X } from "lucide-react";
import Reveal from "./Reveal";
import { SplitHead } from "./ui";

type Cell = "yes" | "part" | "no";

const COLS = ["DIY tools", "Zimmy", "Agencies"] as const;

const ROWS: { label: string; cells: [Cell, Cell, Cell] }[] = [
  { label: "Finds best-fit creators with real audience data", cells: ["part", "yes", "yes"] },
  { label: "Runs outreach and negotiation for you", cells: ["no", "yes", "yes"] },
  { label: "Writes scripts in each creator's voice", cells: ["no", "yes", "part"] },
  { label: "A unique tracking link for every creator", cells: ["part", "yes", "part"] },
  { label: "Ties posts to real revenue in BigQuery", cells: ["no", "yes", "no"] },
  { label: "You approve every creator", cells: ["yes", "yes", "no"] },
  { label: "Runs without adding headcount", cells: ["no", "yes", "yes"] },
  { label: "Keeps refining the creator mix", cells: ["no", "yes", "part"] },
  { label: "Transparent, flat pricing", cells: ["yes", "yes", "no"] },
];

function Mark({ v }: { v: Cell }) {
  if (v === "yes") return <Check className="h-4.5 w-4.5 text-accent" strokeWidth={2.2} aria-label="Yes" />;
  if (v === "part") return <Minus className="h-4.5 w-4.5 text-faint" strokeWidth={2.2} aria-label="Partly" />;
  return <X className="h-4 w-4 text-[#c3c9ca]" strokeWidth={2.2} aria-label="No" />;
}

export default function Comparison() {
  return (
    <section id="compare" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                Agency results.
                <br />
                Software speed.
              </>
            }
            sub="DIY tools hand the work back to you. Agencies do the work, but they're slow, opaque and expensive. Zimmy does the work and shows you everything."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="overflow-x-auto">
            <div className="min-w-[620px] overflow-hidden rounded-[22px] border border-line bg-surface">
              <div className="grid grid-cols-[1.9fr_1fr_1fr_1fr] border-b border-line text-[13.5px] font-medium">
                <div className="px-6 py-4 text-muted">Capability</div>
                {COLS.map((c) => (
                  <div
                    key={c}
                    className={`px-4 py-4 text-center ${c === "Zimmy" ? "bg-mint text-accent" : "text-ink"}`}
                  >
                    {c}
                  </div>
                ))}
              </div>
              {ROWS.map((r, i) => (
                <div
                  key={r.label}
                  className={`grid grid-cols-[1.9fr_1fr_1fr_1fr] items-center ${
                    i < ROWS.length - 1 ? "border-b border-line" : ""
                  }`}
                >
                  <div className="px-6 py-3.5 text-[14px] text-ink/85">{r.label}</div>
                  <div className="flex justify-center px-4 py-3.5">
                    <Mark v={r.cells[0]} />
                  </div>
                  <div className="flex justify-center self-stretch bg-mint/50 px-4 py-3.5">
                    <Mark v={r.cells[1]} />
                  </div>
                  <div className="flex justify-center px-4 py-3.5">
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
