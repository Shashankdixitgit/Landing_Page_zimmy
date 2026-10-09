import { Sparkle } from "lucide-react";

const STAGES = [
  "Creator discovery",
  "Outreach",
  "Rate negotiation",
  "Usage rights",
  "Scripts & hooks",
  "UTM links",
  "Go-live tracking",
  "Revenue attribution",
];

export default function Ticker() {
  const row = [...STAGES, ...STAGES];
  return (
    <section className="relative border-y border-line bg-coal/60 py-5" aria-label="What Zimmy handles">
      <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
        <div className="marquee-track">
          {row.map((s, i) => (
            <span
              key={i}
              className="flex items-center gap-6 whitespace-nowrap pr-6 font-display text-[22px] font-semibold tracking-tight text-snow/80 sm:text-[26px]"
            >
              {s}
              <Sparkle className="h-4 w-4 text-accent" fill="currentColor" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
