/**
 * Zimmy "growing m" mark: the mm in zimmy as three arches that keep getting
 * taller, the last one green. Momentum built into the name.
 */
export function LogoMark({ light = false, className = "h-7 w-7" }: { light?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path
        d="M6 40 V33 A5 5 0 0 1 16 33 V40 M16 40 V26 A6 6 0 0 1 28 26 V40"
        fill="none"
        stroke={light ? "#ffffff" : "#19292d"}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M28 40 V17 A7 7 0 0 1 42 17 V40"
        fill="none"
        stroke={light ? "#7fe0b0" : "#2fb57a"}
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Logo({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <LogoMark light={light} className="h-8 w-8" />
      <span
        className={`text-[21px] font-semibold tracking-[-0.03em] ${light ? "text-white" : "text-ink"}`}
      >
        zimmy
      </span>
    </span>
  );
}
