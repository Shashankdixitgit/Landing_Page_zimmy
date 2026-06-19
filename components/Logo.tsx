import { Sparkle } from "lucide-react";

export default function Logo({
  className = "",
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid h-8 w-8 place-items-center rounded-[9px] border-2 border-ink bg-accent text-white">
        <Sparkle className="h-4 w-4" strokeWidth={2.5} fill="currentColor" />
      </span>
      <span
        className={`text-[20px] font-bold tracking-tight ${
          dark ? "text-cream" : "text-ink"
        }`}
      >
        zimmy
      </span>
    </span>
  );
}
