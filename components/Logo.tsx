import { Sparkle } from "lucide-react";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="grid h-8 w-8 place-items-center rounded-[10px] bg-accent text-white shadow-[0_0_24px_-4px_rgb(255_77_61/0.7)]">
        <Sparkle className="h-4 w-4" strokeWidth={2.5} fill="currentColor" />
      </span>
      <span className="font-display text-[21px] font-bold tracking-tight text-snow">
        zimmy
      </span>
    </span>
  );
}
