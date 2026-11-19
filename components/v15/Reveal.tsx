"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Slides its content in once, the first time it scrolls into view. */
export default function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = el.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          node.setAttribute("data-shown", "");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={el} className={`bd-reveal ${className}`}>
      {children}
    </div>
  );
}
