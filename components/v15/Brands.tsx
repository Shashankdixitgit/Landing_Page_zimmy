/**
 * Platform marks, drawn as SVG so they stay sharp at every size: Instagram,
 * YouTube, YouTube Shorts, TikTok and Meta. Used wherever the page names a
 * platform, so "Reels" shows the Instagram mark, "Meta ads" the Meta mark.
 * Each takes a className for size; colours are the platforms' own.
 */
type P = { className?: string; strokeWidth?: number; mono?: boolean };

export function InstagramIcon({ className = "h-4 w-4", mono = false }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <radialGradient id="ig-a" cx="0.3" cy="1.07" r="1.2">
          <stop offset="0" stopColor="#fdf497" />
          <stop offset="0.1" stopColor="#fdf497" />
          <stop offset="0.5" stopColor="#fd5949" />
          <stop offset="0.68" stopColor="#d6249f" />
          <stop offset="1" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="1" y="1" width="22" height="22" rx="6.5" fill={mono ? "currentColor" : "url(#ig-a)"} />
      <rect x="5.4" y="5.4" width="13.2" height="13.2" rx="4" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="1.8" />
      <circle cx="16.4" cy="7.6" r="1.05" fill="#fff" />
    </svg>
  );
}

export function YouTubeIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#FF0000"
        d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.2 31.2 0 0 0 0 12a31.2 31.2 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.2 31.2 0 0 0 24 12a31.2 31.2 0 0 0-.5-5.8z"
      />
      <path fill="#fff" d="M9.6 15.6 15.8 12 9.6 8.4z" />
    </svg>
  );
}

export function ShortsIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#FF0000"
        d="M17.77 10.32c-.77-.32-1.2-.5-1.2-.5L18 9.06c1.84-.96 2.53-3.23 1.56-5.06s-3.24-2.53-5.07-1.56L6 6.94c-1.29.68-2.07 2.04-2 3.49.07 1.42.93 2.67 2.22 3.25.03.01 1.2.5 1.2.5L6 14.93c-1.83.97-2.53 3.24-1.56 5.07.97 1.83 3.24 2.53 5.07 1.56l8.5-4.5c1.29-.68 2.06-2.04 1.99-3.49-.07-1.42-.94-2.68-2.23-3.25z"
      />
      <path fill="#fff" d="M10 14.65v-5.3L15 12z" />
    </svg>
  );
}

export function TikTokIcon({ className = "h-4 w-4" }: P) {
  const d =
    "M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z";
  return (
    <svg viewBox="-1 -1 26 26" className={className} aria-hidden>
      <path d={d} fill="#25F4EE" transform="translate(-0.9 -0.7)" />
      <path d={d} fill="#FE2C55" transform="translate(0.9 0.7)" />
      <path d={d} fill="#111111" />
    </svg>
  );
}

export function MetaIcon({ className = "h-4 w-4" }: P) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        fill="#0081FB"
        d="M6.92 4.03C4.95 4.03 3.24 5.31 2.04 7.14.7 9.2 0 11.88 0 14.45c0 .7.07 1.37.21 1.97.07.3.16.58.27.86.1.27.23.52.37.76.7 1.16 1.82 1.93 3.6 1.93 1.49 0 2.63-.67 3.96-2.45.76-1.01 1.14-1.62 2.66-4.32l.76-1.34.18-.32.19.3 2.15 3.59c.72 1.21 1.67 2.56 2.47 3.32 1.05.98 1.99 1.21 3.06 1.21 1.08 0 1.88-.35 2.46-.84.33-.27.6-.6.81-.97.54-.94.86-2.13.86-3.75 0-2.72-.68-5.36-2.08-7.45-1.28-1.91-2.96-2.93-4.72-2.93-1.05 0-2.09.47-3.05 1.31-.66.57-1.26 1.29-1.82 2.05-.69-.88-1.34-1.55-1.96-2.06-1.18-.97-2.32-1.3-3.46-1.3zm10.16 2.05c1.15 0 2.19.76 2.99 2 1.13 1.75 1.65 4.2 1.65 6.4 0 1.55-.37 2.9-1.84 2.9-.58 0-1.03-.23-1.66-1-.5-.6-1.35-1.88-2.84-4.36l-.61-1.03c-.45-.75-.87-1.42-1.26-1.98l.21-.33c1.12-1.67 2.12-2.6 3.36-2.6zm-10.2.56c1.26 0 2.05.79 2.67 1.44.31.33.74.87 1.24 1.58l-1.02 1.57c-.76 1.16-1.89 3.02-2.84 4.34-1.19 1.65-1.81 1.82-2.49 1.82-.52 0-1.04-.24-1.38-.8-.26-.42-.46-1.13-.46-2.04 0-2.22.63-4.54 1.66-6.09.45-.69.96-1.23 1.53-1.53.34-.19.71-.28 1.09-.29z"
      />
    </svg>
  );
}

/** Three platform marks side by side, for "TikTok, Reels and Shorts". */
export function PlatformRow({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <span className="inline-flex items-center gap-1" aria-hidden>
      <TikTokIcon className={className} />
      <InstagramIcon className={className} />
      <ShortsIcon className={className} />
    </span>
  );
}
