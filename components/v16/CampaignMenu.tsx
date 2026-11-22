"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type MouseEvent, type RefObject } from "react";
import { Check, ChevronRight } from "lucide-react";
import { GROUPS, type CampaignGroup } from "@/lib/campaigns";
import { CampaignIcon, ENTRIES, entryOf, type AnyKey, type Entry } from "./campaignIcons";

/**
 * The grouped campaign menu: groups on the left (Paid ads, Social media,
 * Creators & UGC, Messaging, Research, from GROUPS in lib/campaigns.ts), and that
 * group's campaigns and channels on the right, each with its icon, name and
 * one-line blurb. Every item can be picked, built or not (Shashank, 22 Nov: /v16
 * is only seen by the team, so no "Soon" tags and nothing greyed); one not built
 * yet starts a research chat in the app for now. The pattern is borrowed from
 * runable.com's "Grow" menu; the words are ours.
 *
 * Used twice: behind the chat box's "More" chip (picking sets the campaign) and
 * behind "Campaigns" in the top bar (picking sets the chat box's campaign and
 * scrolls to it).
 *
 * Keyboard and screen readers: the groups are a tab list (arrow keys, Home, End),
 * the campaigns are plain buttons or links (Tab, or Up and Down), Escape closes
 * and puts focus back on the button that opened it, and so does a click outside.
 */

/** Window event the top bar's menu sends; the chat box listens and switches to that campaign. */
export const PICK_EVENT = "hitrate:pick-campaign";
export const pickCampaign = (key: AnyKey) => window.dispatchEvent(new CustomEvent<AnyKey>(PICK_EVENT, { detail: key }));

/** A group's campaigns and channels: the built ones first, then the rest, in lib/campaigns.ts's order. */
const rowsOf = (group: CampaignGroup): Entry[] => ENTRIES.filter((e) => e.group === group);

/** "Live" with a green dot (green only marks what's live), or a grey "Early access". Built campaigns only. */
export function StatusTag({ status }: { status: "live" | "early" }) {
  if (status === "live")
    return (
      <span className="inline-flex shrink-0 items-center gap-1 text-[11px] font-medium text-[var(--bd-ink)]">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--bd-green)]" aria-hidden />
        Live
      </span>
    );
  return (
    <span className="inline-flex shrink-0 rounded-full bg-[var(--bd-soft)] px-1.5 py-px text-[10.5px] font-medium text-[var(--bd-muted)]">
      Early access
    </span>
  );
}

/** Buttons and links inside an element that keyboard focus can land on. */
const focusables = (el: HTMLElement | null) => Array.from(el?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);

export default function CampaignMenu({
  id,
  label,
  current = null,
  trigger,
  onPick,
  onClose,
  hrefFor,
  className = "",
}: {
  /** Base for the ids inside (tabs, panel). Must be unique on the page. */
  id: string;
  /** What a screen reader calls the menu, e.g. "All campaigns". */
  label: string;
  /** The campaign picked now: its group opens first and it carries a tick. */
  current?: AnyKey | null;
  /** The button that opened the menu. Clicks on it don't count as "outside", and focus goes back to it. */
  trigger: RefObject<HTMLElement | null>;
  onPick: (key: AnyKey, e: MouseEvent) => void;
  onClose: () => void;
  /** When set, campaigns are real links (so they also work opened in a new tab). */
  hrefFor?: (key: AnyKey) => string;
  /** Where it sits: the parent positions it. */
  className?: string;
}) {
  const [group, setGroup] = useState<CampaignGroup>(() => (current ? entryOf(current).group : GROUPS[0].key));
  const root = useRef<HTMLDivElement>(null);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  // Hovering a group shows it after a short pause, so a mouse moving across to a
  // campaign on the right doesn't flick through the groups it passes over.
  const hover = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const close = (refocus: boolean) => {
    onClose();
    if (refocus) trigger.current?.focus();
  };
  // The latest close, for the listeners below (they're added once, when the menu opens).
  const closeRef = useRef(close);
  useEffect(() => {
    closeRef.current = close;
  });

  // On open: focus goes to the open group's tab. A click anywhere else closes it.
  useEffect(() => {
    tabs.current[GROUPS.findIndex((g) => g.key === group)]?.focus();
    const onDown = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!root.current?.contains(t) && !trigger.current?.contains(t)) closeRef.current(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      clearTimeout(hover.current);
    };
    // Once per opening: the parent mounts this only while the menu is open.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const showGroup = (i: number, focus: boolean) => {
    const n = GROUPS.length;
    const to = (i + n) % n;
    setGroup(GROUPS[to].key);
    if (focus) tabs.current[to]?.focus();
  };

  const onTabsKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const at = GROUPS.findIndex((g) => g.key === group);
    const to =
      e.key === "ArrowDown" || e.key === "ArrowRight"
        ? at + 1
        : e.key === "ArrowUp" || e.key === "ArrowLeft"
          ? at - 1
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? GROUPS.length - 1
              : null;
    if (to === null) return;
    e.preventDefault();
    showGroup(to, true);
  };

  // Up and Down move between the campaigns of the open group.
  const onItemsKey = (e: KeyboardEvent<HTMLUListElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const items = focusables(e.currentTarget);
    if (!items.length) return;
    e.preventDefault();
    const at = items.indexOf(document.activeElement as HTMLElement);
    items[(at + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length]?.focus();
  };

  const rows = rowsOf(group);
  const openLabel = GROUPS.find((g) => g.key === group)?.label ?? "";

  return (
    <div
      ref={root}
      id={id}
      role="dialog"
      aria-label={label}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          close(true);
        }
      }}
      onBlur={(e) => {
        // Tabbing out of the menu closes it, like a click outside.
        const next = e.relatedTarget as Node | null;
        if (next && !root.current?.contains(next) && !trigger.current?.contains(next)) close(false);
      }}
      className={`bd-rise flex flex-col gap-1 rounded-[20px] border border-black/[0.08] bg-white p-2 text-left shadow-[0_1px_2px_rgb(17_17_17/0.05),0_24px_48px_-20px_rgb(30_60_90/0.35)] sm:flex-row sm:gap-2 ${className}`}
    >
      {/* the groups: pills that wrap onto a second line on phones (so none is hidden off
          the edge), a column on wider screens */}
      <div
        role="tablist"
        aria-label="Campaign groups"
        onKeyDown={onTabsKey}
        className="flex shrink-0 flex-wrap gap-1 p-0.5 sm:w-[172px] sm:flex-col sm:flex-nowrap"
      >
        {GROUPS.map((g, i) => {
          const on = g.key === group;
          return (
            <button
              key={g.key}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              id={`${id}-tab-${g.key}`}
              type="button"
              role="tab"
              aria-selected={on}
              aria-controls={`${id}-panel`}
              tabIndex={on ? 0 : -1}
              onClick={() => showGroup(i, false)}
              onMouseEnter={() => {
                clearTimeout(hover.current);
                hover.current = setTimeout(() => showGroup(i, false), 140);
              }}
              onMouseLeave={() => clearTimeout(hover.current)}
              className={`flex shrink-0 items-center justify-between gap-2 whitespace-nowrap rounded-[12px] px-3 py-2 text-[13.5px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#111] ${
                on ? "bg-[var(--bd-soft)] font-medium text-[var(--bd-ink)]" : "text-[var(--bd-muted)] hover:bg-[var(--bd-soft)] hover:text-[var(--bd-ink)]"
              }`}
            >
              {g.label}
              <ChevronRight className={`hidden h-3.5 w-3.5 shrink-0 sm:block ${on ? "opacity-70" : "opacity-0"}`} aria-hidden />
            </button>
          );
        })}
      </div>

      {/* the open group's campaigns and channels: every one can be picked */}
      <div
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${group}`}
        className="min-w-0 flex-1 border-t border-[var(--bd-line)] pt-1 sm:border-l sm:border-t-0 sm:pl-2 sm:pt-0"
      >
        <ul key={group} onKeyDown={onItemsKey} aria-label={openLabel} className="space-y-0.5">
          {rows.map((r) => {
            const on = r.key === current;
            const pick = (e: MouseEvent) => onPick(r.key, e);
            const cls =
              "flex w-full items-start gap-3 rounded-[14px] px-2.5 py-2.5 text-left transition-colors hover:bg-[var(--bd-soft)] focus-visible:bg-[var(--bd-soft)] focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#111]";
            const body = (
              <>
                <span className="mt-px grid h-8 w-8 shrink-0 place-items-center rounded-[10px] bg-[var(--bd-soft)] text-[var(--bd-ink)]">
                  <CampaignIcon k={r.key} className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[14px] font-medium text-[var(--bd-ink)]">
                    {r.label}
                    {r.status ? <StatusTag status={r.status} /> : null}
                  </span>
                  <span className="mt-0.5 block text-[12.5px] leading-snug text-[var(--bd-muted)]">{r.line}</span>
                </span>
                {on ? (
                  <>
                    <Check className="mt-1 h-4 w-4 shrink-0 text-[var(--bd-ink)]" aria-hidden />
                    {/* Buttons say it with aria-pressed; links need the words. */}
                    {hrefFor ? <span className="sr-only">(picked)</span> : null}
                  </>
                ) : null}
              </>
            );
            return (
              <li key={r.key}>
                {hrefFor ? (
                  <a href={hrefFor(r.key)} onClick={pick} className={cls}>
                    {body}
                  </a>
                ) : (
                  <button type="button" onClick={pick} aria-pressed={on} className={cls}>
                    {body}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
