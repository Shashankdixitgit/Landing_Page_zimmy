"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import CampaignMenu, { pickCampaign } from "./CampaignMenu";

/**
 * "Campaigns" in /v16's top bar (components/v16/Chrome.tsx): the same grouped
 * menu as the chat box's "More", groups from GROUPS (Paid ads, Social media,
 * Creators & UGC, Messaging, Research). Every item can be picked, built or not:
 * picking one sets it on the chat box at the top of the page and puts the cursor
 * there, so the next step is typing. Each item is also a real link
 * (/v16?intent=ads#start, /v16?intent=instagram#start), so it works opened in a
 * new tab, or before the page's scripts have loaded: the chat box reads ?intent=
 * when the page opens.
 *
 * The menu is placed against the nearest positioned parent (the top bar's link
 * group, which is `relative`), so on a narrow window it opens leftwards from the
 * right edge instead of running off the screen.
 */
export default function NavCampaigns({ home }: { home: string }) {
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);
  const look = "text-[var(--bd-text)] hover:text-black";
  return (
    <div className="hidden sm:block">
      <button
        ref={btn}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={open ? "nav-campaigns" : undefined}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex items-center gap-1 rounded-full px-1 py-1 ${look} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]`}
      >
        Campaigns
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden />
      </button>
      {open ? (
        <CampaignMenu
          id="nav-campaigns"
          label="Campaigns"
          trigger={btn}
          hrefFor={(k) => `${home}?intent=${k}#start`}
          onPick={(k, e) => {
            // On a page with the chat box, switch it in place instead of reloading.
            if (!document.getElementById("v16-box")) return;
            e.preventDefault();
            setOpen(false);
            pickCampaign(k);
          }}
          onClose={() => setOpen(false)}
          className="absolute right-0 top-full z-50 mt-2 w-[min(600px,calc(100vw-2.5rem))]"
        />
      ) : null}
    </div>
  );
}
