import { Check } from "lucide-react";

/**
 * Sign-up page layout: the form on the left, and on large screens a short
 * summary of what you get on the right.
 */
export default function FormBackdrop({
  title,
  points,
  note,
  children,
}: {
  title: string;
  points: string[];
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid max-w-[1320px] items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
      <div className="rounded-[28px] border border-line bg-surface px-5 py-10 lift sm:px-12 sm:py-14">{children}</div>

      <aside className="sticky top-8 hidden lg:block" aria-label="What you get">
        <div className="px-1">
          <p className="text-[13px] font-medium text-accent">Inside HitRate</p>
          <h2 className="display mt-1.5 text-[26px] text-ink">{title}</h2>
          <ul className="mt-4 space-y-2.5">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[14.5px] text-ink/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.2} /> {p}
              </li>
            ))}
          </ul>
          {note ? <p className="mt-4 text-[12px] text-faint">{note}</p> : null}
        </div>
      </aside>
    </div>
  );
}
