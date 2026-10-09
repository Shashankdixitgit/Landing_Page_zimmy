import { Check, Minus, X } from "lucide-react";
import Reveal from "./Reveal";
import { SplitHead } from "./ui";

type Cell = "yes" | "part" | "no";

const COLS = ["Research tools", "Zimmy", "UGC agencies"] as const;

const ROWS: { label: string; cells: [Cell, Cell, Cell] }[] = [
  { label: "Finds outlier videos, not just big view counts", cells: ["yes", "yes", "no"] },
  { label: "Explains why each video worked", cells: ["part", "yes", "part"] },
  { label: "A person checks the reasoning", cells: ["no", "yes", "part"] },
  { label: "Research for your market, not just the US", cells: ["part", "yes", "part"] },
  { label: "Turns research into a shoot-ready brief", cells: ["part", "yes", "yes"] },
  { label: "Tests ideas cheaply before paying creators", cells: ["no", "yes", "no"] },
  { label: "Finds and signs real creators", cells: ["no", "yes", "yes"] },
  { label: "Reads each platform on its own", cells: ["no", "yes", "no"] },
  { label: "You see every creator, script and number", cells: ["yes", "yes", "no"] },
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
                Tools stop at ideas.
                <br />
                Agencies start with a guess.
              </>
            }
            wide
            sub="Research tools show you what went viral and leave the rest to you. Agencies make videos, but rarely start from data. Zimmy does both, and shows you its reasoning."
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
          <p className="mt-3 text-center text-[12.5px] text-muted">
            Based on publicly listed features of typical tools and agencies.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
