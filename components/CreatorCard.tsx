import { Heart, MessageCircle, Send } from "lucide-react";

export type Creator = {
  handle: string;
  niche: string;
  followers: string;
  caption: string;
  status: string;
  tone: "live" | "work" | "done";
  scene: [string, string, string];
};

// Illustrative creators for the product mock-ups. Not real people or clients.
export const CREATORS: Creator[] = [
  {
    handle: "@noor.cooks",
    niche: "Food",
    followers: "212K",
    caption: "ok this replaced my whole morning routine",
    status: "Hook decoded",
    tone: "done",
    scene: ["#ff7a59", "#7b2cbf", "#1b0f2e"],
  },
  {
    handle: "@devwithjay",
    niche: "Tech",
    followers: "84K",
    caption: "3 apps I actually use every day",
    status: "Outlier · 6.2× usual",
    tone: "work",
    scene: ["#4cc9f0", "#3a0ca3", "#0b0a24"],
  },
  {
    handle: "@mira.moves",
    niche: "Fitness",
    followers: "1.2M",
    caption: "day 14 and I'm genuinely shocked",
    status: "AI test · live on Reels",
    tone: "live",
    scene: ["#ffb703", "#fb5607", "#2a0d05"],
  },
  {
    handle: "@sana.skin",
    niche: "Beauty",
    followers: "560K",
    caption: "honest review, no filter",
    status: "Remade by a creator",
    tone: "done",
    scene: ["#ff99c8", "#a05195", "#1e0c1f"],
  },
  {
    handle: "@theweekendcamper",
    niche: "Outdoors",
    followers: "39K",
    caption: "packed it all in one bag",
    status: "Scaling as an ad",
    tone: "live",
    scene: ["#90e0a8", "#2d6a4f", "#07170f"],
  },
  {
    handle: "@budgetwithben",
    niche: "Finance",
    followers: "148K",
    caption: "how I stopped overspending",
    status: "Next test queued",
    tone: "work",
    scene: ["#c8f560", "#3a7d44", "#0a1a0c"],
  },
];

const TONE: Record<Creator["tone"], string> = {
  live: "bg-[#d6f5c9] text-[#0b4a31]",
  work: "bg-white/90 text-[#19292d]",
  done: "bg-[#0f7a52] text-white",
};

export default function CreatorCard({
  c,
  className = "",
  compact = false,
}: {
  c: Creator;
  className?: string;
  compact?: boolean;
}) {
  const [a, b, d] = c.scene;
  const gid = `s-${c.handle.replace(/[^a-z0-9]/gi, "")}`;
  return (
    <div
      className={`grain relative aspect-[9/16] overflow-hidden rounded-[22px] border border-white/10 shadow-[0_30px_80px_-20px_rgb(0_0_0/0.8)] ${className}`}
      style={{
        background: `radial-gradient(120% 70% at 30% 18%, ${a} 0%, transparent 60%), radial-gradient(90% 60% at 85% 70%, ${b} 0%, transparent 70%), ${d}`,
      }}
    >
      {/* subject silhouette */}
      <svg
        viewBox="0 0 90 160"
        className="absolute inset-x-0 bottom-0 h-[78%] w-full"
        preserveAspectRatio="xMidYMax meet"
        aria-hidden
      >
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#000" stopOpacity="0.1" />
            <stop offset="1" stopColor="#000" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <ellipse cx="45" cy="62" rx="17" ry="20" fill={`url(#${gid})`} />
        <path
          d="M8 160 C 10 118, 26 98, 45 98 C 64 98, 80 118, 82 160 Z"
          fill={`url(#${gid})`}
        />
      </svg>

      {/* story bar */}
      <div className="absolute inset-x-3 top-3 h-[3px] overflow-hidden rounded-full bg-white/25">
        <div className="story-bar h-full w-full rounded-full bg-white" />
      </div>

      {/* handle */}
      <div className="absolute left-3 right-3 top-6 flex items-center gap-2">
        <span
          className="h-6 w-6 shrink-0 rounded-full border border-white/60"
          style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
        />
        <div className="min-w-0 leading-tight">
          <p className="truncate text-[11px] font-semibold text-white">{c.handle}</p>
          {!compact ? (
            <p className="text-[9.5px] text-white/70">
              {c.niche} · {c.followers}
            </p>
          ) : null}
        </div>
      </div>

      {/* side actions */}
      {!compact ? (
        <div className="absolute bottom-24 right-2.5 flex flex-col items-center gap-3 text-white/90">
          <Heart className="h-4 w-4" fill="currentColor" />
          <MessageCircle className="h-4 w-4" />
          <Send className="h-4 w-4" />
        </div>
      ) : null}


      {/* burned-in caption */}
      <p className="absolute inset-x-4 bottom-14 text-center text-[13px] font-bold leading-snug text-white [text-shadow:0_2px_8px_rgb(0_0_0/0.7)]">
        {c.caption}
      </p>

      {/* Zimmy pipeline status */}
      <div className="absolute inset-x-3 bottom-3 flex items-center justify-center">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-semibold ${TONE[c.tone]}`}
        >
          {c.tone === "live" ? (
            <span className="live-dot h-1.5 w-1.5 rounded-full bg-[#0b4a31]" />
          ) : null}
          {c.status}
        </span>
      </div>
    </div>
  );
}
