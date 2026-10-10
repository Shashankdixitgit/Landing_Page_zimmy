import { Check } from "lucide-react";

/**
 * Sign-up page layout: the form on the left, and on large screens a real product
 * walkthrough (recorded from the Zimmy app) in a browser frame on the right.
 */
export default function FormBackdrop({
  demo,
  title,
  points,
  children,
}: {
  demo: string;
  title: string;
  points: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto grid max-w-[1320px] items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-10">
      <div className="rounded-[28px] border border-line bg-surface px-5 py-10 lift sm:px-12 sm:py-14">{children}</div>

      <aside className="sticky top-8 hidden lg:block" aria-label="Product preview">
        <div className="overflow-hidden rounded-[22px] border border-line bg-surface shadow-[0_40px_90px_-40px_rgb(25_41_45/0.45)]">
          <div className="flex items-center gap-1.5 border-b border-line bg-soft px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#f2493a]/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#f6c453]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#5ccf98]" />
            <span className="ml-3 truncate rounded-md bg-surface px-3 py-1 text-[11.5px] text-muted">campaign.zimmy.art</span>
          </div>
          <video
            className="block aspect-[16/10] w-full bg-soft object-cover"
            src={`/demo/${demo}.mp4`}
            poster={`/demo/${demo}.jpg`}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden
          />
        </div>
        <div className="mt-6 px-1">
          <p className="text-[13px] font-medium text-accent">Inside Zimmy</p>
          <h2 className="display mt-1.5 text-[26px] text-ink">{title}</h2>
          <ul className="mt-4 space-y-2.5">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-[14.5px] text-ink/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" strokeWidth={2.2} /> {p}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-[12px] text-faint">Real screens from the Zimmy app, using a demo brand.</p>
        </div>
      </aside>
    </div>
  );
}
