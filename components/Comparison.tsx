import { Check, Minus, X } from "lucide-react";
import Reveal from "./Reveal";
import { SectionHead } from "./ui";

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
  if (v === "yes")
    return (
      <span className="grid h-7 w-7 place-items-center rounded-full bg-lime text-night">
        <Check className="h-4 w-4" strokeWidth={3} />
      </span>
    );
  if (v === "part")
    return (
      <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-snow/70">
        <Minus className="h-4 w-4" strokeWidth={3} />
      </span>
    );
  return (
    <span className="grid h-7 w-7 place-items-center rounded-full border border-line text-faint">
      <X className="h-3.5 w-3.5" strokeWidth={3} />
    </span>
  );
}

export default function Comparison() {
  return (
    <section id="compare" className="py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHead
            eyebrow="Why Zimmy"
            title={
              <>
                Agency results.{" "}
                <span className="serif text-accent-soft">Software speed.</span>
              </>
            }
            sub="DIY tools hand the work back to you. Agencies do the work, but they're slow, opaque and expensive. Zimmy does the work, shows you everything, and costs a fraction of a retainer."
          />
        </Reveal>

        <Reveal delay={0.1} className="mt-14">
          <div className="overflow-x-auto">
            <div className="card min-w-[640px] overflow-hidden">
              <div className="grid grid-cols-[1.8fr_1fr_1fr_1fr] border-b border-line">
                <div className="px-6 py-5 text-[12px] font-semibold uppercase tracking-[0.14em] text-faint">
                  Capability
                </div>
                {COLS.map((c) => (
                  <div
                    key={c}
                    className={`px-4 py-5 text-center font-display text-[16px] font-bold ${
                      c === "Zimmy" ? "bg-accent text-white" : "text-snow/80"
                    }`}
                  >
                    {c}
                  </div>
                ))}
              </div>

              {ROWS.map((r, i) => (
                <div
                  key={r.label}
                  className={`grid grid-cols-[1.8fr_1fr_1fr_1fr] items-center ${
                    i < ROWS.length - 1 ? "border-b border-line" : ""
                  }`}
                >
                  <div className="px-6 py-4 text-[14.5px] font-medium text-snow/85">{r.label}</div>
                  <div className="flex justify-center px-4 py-4">
                    <Mark v={r.cells[0]} />
                  </div>
                  <div className="flex justify-center self-stretch bg-accent/[0.07] px-4 py-4">
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
