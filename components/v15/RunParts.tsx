import { Check, ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

/**
 * The pieces of a "run": the app's initials in a progress ring with a timer
 * under it, and the list of steps. Shared by the live runs in the heroes and the
 * example runs further down, so every run on the page looks like the same product.
 */

const TLD = /^(com|app|io|ai|co|sh|in|net|org|dev|so|xyz|me|us|uk|tv|gg|fm)$/i;
const letters = (w: string) => Array.from(w.replace(/[^\p{L}\p{N}]/gu, ""));

/**
 * Two letters for the ring. "calm.com" is CA (the .com is dropped), "HitRate" is
 * HR (its capitals), "Dawn" is Dw, "Über Eats" is ÜE, and non-Latin names keep
 * their own letters instead of falling back to "?".
 */
export function initials(name: string): string {
  const words = name
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split(/[\s./\-_]+/)
    .filter((w) => letters(w).length > 0);
  if (words.length > 1 && TLD.test(words[words.length - 1])) words.pop();
  if (!words.length) return "?";
  if (words.length > 1) return (letters(words[0])[0] + letters(words[1])[0]).toLocaleUpperCase();
  const one = letters(words[0]);
  const caps = one.filter((c) => /\p{Lu}/u.test(c));
  if (caps.length >= 2) return caps[0] + caps[1];
  return one[0].toLocaleUpperCase() + (one[1] ?? "").toLocaleLowerCase();
}

/** Pages put entities like &#x27; and &ndash; in their titles; the browser decodes them all. */
export function unescapeHtml(text: string): string {
  if (typeof document === "undefined") return text;
  const t = document.createElement("textarea");
  t.innerHTML = text;
  return t.value;
}

/** "Calm - Sleep & Meditation" is a page title; the name is the part before the dash, colon or bar. */
export function shortName(title: string): string {
  const first = title.split(/\s*[:|–—]\s+|\s+-\s+/)[0]?.trim() ?? "";
  return first.length >= 2 ? first : title.trim();
}

/** 0:07 */
export function clock(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

/**
 * The initials in a dark circle inside a light ring. While working, one short
 * dark arc travels the ring (or, with `progress`, the arc grows); when done, the
 * ring goes quiet and green. One moving thing at a time.
 */
export function RunRing({
  label,
  progress,
  busy,
  timer,
  failed = false,
}: {
  label: string;
  /** The run stopped: the ring stays grey, never the finished green. */
  failed?: boolean;
  /** 0..1, or null for "working, no measurable progress" */
  progress: number | null;
  busy: boolean;
  timer: string;
}) {
  const r = 53;
  const c = 2 * Math.PI * r;
  const done = !busy && !failed && (progress === null || progress >= 1);
  const p = progress === null ? 0 : Math.min(1, Math.max(0, progress));
  return (
    <div className="relative mx-auto h-[120px] w-[120px]">
      <svg viewBox="0 0 120 120" className="bd-ring absolute inset-0 h-full w-full" aria-hidden>
        <circle cx="60" cy="60" r={r} fill="none" stroke={done ? "var(--bd-green)" : "rgb(17 17 17 / 0.1)"} strokeWidth="2.5" />
        {!done && progress !== null ? (
          <circle
            cx="60"
            cy="60"
            r={r}
            fill="none"
            stroke="rgb(17 17 17 / 0.6)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={c * (1 - p)}
          />
        ) : null}
      </svg>
      {busy && progress === null ? (
        <svg viewBox="0 0 120 120" className="bd-ring-spin absolute inset-0 h-full w-full" aria-hidden>
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgb(17 17 17 / 0.6)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray={`${c * 0.09} ${c}`} />
        </svg>
      ) : null}
      <div className="serif absolute inset-[11px] grid place-items-center rounded-full bg-[#161616] text-[30px] text-white" aria-hidden>
        {label}
      </div>
      <span
        className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-black/[0.08] bg-white px-2.5 py-0.5 text-[12px] tabular-nums text-[var(--bd-muted)] shadow-[0_2px_8px_rgb(17_17_17/0.06)]"
        aria-hidden
      >
        {timer}
      </span>
    </div>
  );
}

/** active: working now; ready: the next thing, waiting on the visitor. */
export type StepState = "waiting" | "active" | "ready" | "done" | "failed";

const STATE_WORDS: Record<StepState, string> = {
  waiting: "Not started yet",
  active: "Working",
  ready: "Next",
  done: "Done",
  failed: "Stopped",
};

/** One row of the steps card. Waiting rows are quieter but still readable. */
export function StepRow({
  icon,
  title,
  note,
  state,
  badge,
  action,
}: {
  icon: ReactNode;
  title: string;
  note: ReactNode;
  state: StepState;
  badge?: number | null;
  action?: ReactNode;
}) {
  const quiet = state === "waiting";
  return (
    <li className="flex items-center gap-3.5 px-4 py-3.5 sm:px-5 sm:py-4">
      <span
        className={`relative grid h-10 w-10 shrink-0 place-items-center rounded-full ${
          quiet ? "bg-[var(--bd-soft)] text-[#a2a5a9]" : "bg-white text-[var(--bd-ink)] shadow-[0_1px_2px_rgb(17_17_17/0.08),0_0_0_1px_rgb(17_17_17/0.06)]"
        }`}
        aria-hidden
      >
        {icon}
        {badge ? (
          <span className="absolute -bottom-1 -right-1 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-[#111] px-1 text-[10.5px] font-semibold tabular-nums text-white ring-2 ring-white">
            {badge}
          </span>
        ) : null}
      </span>
      <div className="min-w-0 flex-1">
        <p className={`text-[15px] font-semibold leading-tight ${quiet ? "text-[var(--bd-muted)]" : "text-[var(--bd-ink)]"}`}>
          {title}
          <span className="sr-only"> ({STATE_WORDS[state]})</span>
        </p>
        <p
          key={typeof note === "string" ? note : undefined}
          className={`bd-rise mt-1 line-clamp-2 text-pretty text-[13px] leading-snug ${quiet ? "text-[var(--bd-faint)]" : "text-[var(--bd-muted)]"}`}
        >
          {note}
        </p>
      </div>
      {action ? (
        action
      ) : state === "active" ? (
        <span className="flex items-center gap-2 text-[#a2a5a9]" aria-hidden>
          <span className="bd-spinner" />
          <ChevronRight className="h-4 w-4" />
        </span>
      ) : state === "done" ? (
        <span className="grid h-6 w-6 place-items-center rounded-full bg-[var(--bd-green)] text-white" aria-hidden>
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
        </span>
      ) : null}
    </li>
  );
}

export function StepList({ children }: { children: ReactNode }) {
  return <ol className="bd-card divide-y divide-[var(--bd-line)] overflow-hidden rounded-[22px] text-left">{children}</ol>;
}
