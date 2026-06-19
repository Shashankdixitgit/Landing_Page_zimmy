"use client";

import { useRef, useEffect, ElementType } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type RevealProps = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  /** stagger direct children instead of the element itself */
  stagger?: number;
};

export default function Reveal({
  children,
  as: Tag = "div",
  className = "",
  delay = 0,
  y = 24,
  stagger,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets =
      stagger != null ? (Array.from(el.children) as HTMLElement[]) : el;

    const ctx = gsap.context(() => {
      if (reduce) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          delay,
          ease: "power3.out",
          stagger: stagger ?? 0,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y, stagger]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
