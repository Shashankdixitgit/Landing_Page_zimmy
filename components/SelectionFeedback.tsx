"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, MessageSquareQuote } from "lucide-react";

type Pop = { text: string; x: number; y: number; below: boolean };

const MIN = 3;
const MAX = 500;

/** When a visitor highlights text, offer to quote it in feedback (or copy it). */
export default function SelectionFeedback() {
  const [pop, setPop] = useState<Pop | null>(null);
  const [copied, setCopied] = useState(false);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const show = () => {
      const sel = window.getSelection();
      const text = sel?.toString().replace(/\s+/g, " ").trim() ?? "";
      if (!sel || sel.isCollapsed || text.length < MIN || text.length > MAX) {
        setPop(null);
        return;
      }
      const anchor = sel.anchorNode?.parentElement;
      // ignore selections inside form fields, buttons or the pop-up itself
      if (anchor?.closest("input, textarea, button, [data-quote-pop]")) return;
      const r = sel.getRangeAt(0).getBoundingClientRect();
      if (!r.width && !r.height) return;
      const below = r.top < 140; // not enough room above (e.g. under the navbar)
      setCopied(false);
      setPop({
        text,
        x: Math.min(Math.max(r.left + r.width / 2, 170), window.innerWidth - 170),
        y: below ? r.bottom + 10 : r.top - 10,
        below,
      });
    };

    const onUp = (e: MouseEvent | TouchEvent) => {
      if (box.current?.contains(e.target as Node)) return;
      // wait for the browser to finish updating the selection
      setTimeout(show, 10);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPop(null);
      else if (e.shiftKey) setTimeout(show, 10);
    };
    const hide = () => setPop(null);

    document.addEventListener("mouseup", onUp);
    document.addEventListener("touchend", onUp);
    document.addEventListener("keyup", onKey);
    window.addEventListener("scroll", hide, { passive: true });
    window.addEventListener("resize", hide);
    return () => {
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("touchend", onUp);
      document.removeEventListener("keyup", onKey);
      window.removeEventListener("scroll", hide);
      window.removeEventListener("resize", hide);
    };
  }, []);

  if (!pop) return null;

  const page = typeof window !== "undefined" ? window.location.pathname : "/";
  const mail =
    "mailto:shashank@zimmy.art" +
    `?subject=${encodeURIComponent("Feedback on zimmy.art")}` +
    `&body=${encodeURIComponent(`About this line on ${page}:\n\n> "${pop.text}"\n\nMy thoughts: `)}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pop.text);
      setCopied(true);
      setTimeout(() => setPop(null), 900);
    } catch {
      setPop(null);
    }
  };

  return (
    // outer box positions the pop-up; the inner one animates (an animated transform would override the offset)
    <div
      ref={box}
      data-quote-pop
      role="dialog"
      aria-label="Quote this text"
      className="fixed z-[70] w-[300px]"
      style={{
        left: pop.x,
        top: pop.y,
        transform: `translate(-50%, ${pop.below ? "0" : "-100%"})`,
      }}
    >
      <div className="pop rounded-2xl border border-white/10 bg-ink p-3 text-white shadow-[0_18px_40px_-12px_rgb(25_41_45/0.55)]">
      <p className="line-clamp-2 border-l-2 border-accent-bright pl-2.5 text-[12.5px] italic leading-snug text-white/80">
        &ldquo;{pop.text}&rdquo;
      </p>
      <div className="mt-2.5 flex gap-1.5">
        <a
          href={mail}
          onClick={() => setTimeout(() => setPop(null), 100)}
          className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-accent-bright px-3 py-2 text-[12.5px] font-semibold text-[#05130d] transition-opacity hover:opacity-90"
        >
          <MessageSquareQuote className="h-3.5 w-3.5" /> Send feedback
        </a>
        <button
          onClick={copy}
          className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-white/10 px-3 py-2 text-[12.5px] font-medium transition-colors hover:bg-white/15"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      </div>
    </div>
  );
}
