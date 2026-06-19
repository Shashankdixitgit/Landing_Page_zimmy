"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Reveal from "./Reveal";

function Counter({
  to,
  prefix = "",
  suffix = "",
  decimals = 0,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const obj = { v: 0 };
    const render = () =>
      (el.textContent =
        prefix +
        obj.v.toLocaleString("en-US", {
          minimumFractionDigits: decimals,
          maximumFractionDigits: decimals,
        }) +
        suffix);

    if (reduce) {
      obj.v = to;
      render();
      return;
    }

    const tween = gsap.to(obj, {
      v: to,
      duration: 1.6,
      ease: "power2.out",
      onUpdate: render,
      scrollTrigger: { trigger: el, start: "top 88%", once: true },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [to, prefix, suffix, decimals]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

const STATS = [
  { to: 25, suffix: "×", label: "Faster to launch a full campaign" },
  { to: 24, prefix: "$", suffix: "k", label: "Saved on agency fees, per year" },
  { to: 100, suffix: "%", label: "Tracked to real, attributed revenue" },
];

export default function Metrics() {
  return (
    <section id="metrics" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal className="text-center">
          <p className="text-[13px] font-medium uppercase tracking-[0.18em] text-faint">
            Results
          </p>
          <h2 className="mx-auto mt-4 max-w-2xl text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] text-ink sm:text-[46px]">
            Measurable impact
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed text-muted sm:text-[17px]">
            Brands launch campaigns faster, spend smarter, and see real attributed
            revenue with Zimmy.
          </p>
        </Reveal>

        <Reveal stagger={0.14} className="mt-14 grid gap-5 sm:grid-cols-3">
          {STATS.map((s, i) => (
            <div
              key={i}
              className="rounded-[var(--radius-card)] border border-line bg-soft p-8 text-center"
            >
              <p className="text-[52px] font-semibold leading-none tracking-[-0.03em] text-ink sm:text-[60px]">
                <Counter
                  to={s.to}
                  prefix={s.prefix}
                  suffix={s.suffix}
                />
              </p>
              <p className="mt-4 text-[15px] font-medium text-muted">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
