"use client";

import { useEffect, useRef } from "react";

/** Muted looping clip that only plays while it is on screen. */
export default function CardVideo({ name }: { name: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.2 }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      src={`/creators/${name}.mp4`}
      poster={`/creators/${name}.jpg`}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden
    />
  );
}
