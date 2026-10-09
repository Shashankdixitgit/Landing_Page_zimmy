"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { DEMO_HREF } from "./ui";

/** Small floating "talk to us" chip, shown after the visitor scrolls past the hero. */
export default function TalkChip() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.9);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={DEMO_HREF}
      className={`fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-ink py-2.5 pl-3 pr-4 text-[13.5px] font-medium text-white shadow-[0_10px_30px_-8px_rgb(25_41_45/0.5)] transition-all duration-500 hover:-translate-y-0.5 ${
        show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="grid h-6 w-6 place-items-center rounded-full bg-accent">
        <MessageCircle className="h-3.5 w-3.5" />
      </span>
      Talk to the founder
    </a>
  );
}
