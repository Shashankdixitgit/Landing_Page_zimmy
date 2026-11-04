"use client";

import { useEffect, useRef } from "react";

/**
 * A sentence already on the page in faint ink that fills in, word by word, as it
 * scrolls through the viewport. Screen readers get the whole sentence at once;
 * reduced-motion users see it filled. Ported from the HitRate creator app.
 */
export default function ScrollFill({ parts, className = "" }: { parts: string[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  const words: string[] = [];
  parts.forEach((p) => p.split(/\s+/).filter(Boolean).forEach((w) => words.push(w)));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.setProperty("--p", "1");
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // starts filling as the top enters the lower part of the screen, done by the time it's a third up
      const p = (vh * 0.9 - r.top) / (vh * 0.45 + r.height * 0.4);
      el.style.setProperty("--p", String(Math.min(1, Math.max(0, p))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <p ref={ref} className={`sf ${className}`} style={{ ["--n" as string]: words.length }}>
      <span className="sr-only">{parts.join("")}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <span key={i} className="sf-w" style={{ ["--i" as string]: i }}>
            {w}{" "}
          </span>
        ))}
      </span>
    </p>
  );
}
