import { Sparkle } from "lucide-react";

export default function Logo({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid h-7 w-7 place-items-center rounded-[8px] bg-zimmy text-white">
        <Sparkle className="h-3.5 w-3.5" strokeWidth={2.5} fill="currentColor" />
      </span>
      <span
        className={`text-[21px] font-semibold tracking-[-0.03em] ${light ? "text-white" : "text-ink"}`}
      >
        zimmy
      </span>
    </span>
  );
}
