"use client";

import { useState } from "react";
import { Check, Plus, UserCheck } from "lucide-react";
import { Chip } from "./ui";

export type Outlier = {
  handle: string;
  multiple: string;
  why: string;
  chips: string[];
  scene: [string, string];
};

/** One video on the research board. All data shown is illustrative. */
export default function OutlierCard({ o, delay = 0 }: { o: Outlier; delay?: number }) {
  const [added, setAdded] = useState(false);
  return (
    <li
      className="pop flex gap-3 rounded-[14px] border border-line bg-surface p-3"
      style={{ animationDelay: `${delay}s` }}
    >
      <span
        className="grain relative aspect-[9/16] w-14 shrink-0 overflow-hidden rounded-lg"
        style={{ background: `linear-gradient(160deg, ${o.scene[0]}, ${o.scene[1]})` }}
        aria-hidden
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate text-[13px] font-medium text-ink">{o.handle}</p>
          <span className="shrink-0 rounded-md bg-accent px-1.5 py-0.5 text-[11px] font-semibold text-white">
            {o.multiple}
          </span>
        </div>
        <p className="mt-1 text-[12.5px] leading-snug text-ink/75">{o.why}</p>
        <div className="mt-2 flex flex-wrap gap-1">
          {o.chips.map((c) => (
            <Chip key={c}>{c}</Chip>
          ))}
        </div>
        <div className="mt-2.5 flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-[11.5px] text-muted">
            <UserCheck className="h-3.5 w-3.5 text-accent" /> Reviewed by a strategist
          </span>
          {added ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-mint px-2.5 py-1 text-[11.5px] font-medium text-accent">
              <Check className="h-3 w-3" /> Added to tests
            </span>
          ) : (
            <button
              onClick={() => setAdded(true)}
              className="inline-flex items-center gap-1 rounded-full border border-line px-2.5 py-1 text-[11.5px] font-medium text-ink transition-colors hover:border-ink/30"
            >
              <Plus className="h-3 w-3" /> Test this
            </button>
          )}
        </div>
      </div>
    </li>
  );
}
