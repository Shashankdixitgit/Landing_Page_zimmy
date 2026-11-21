"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  ArrowRight,
  ArrowUp,
  Check,
  Clapperboard,
  Globe2,
  Mail,
  Megaphone,
  MessageCircle,
  PenLine,
  Plus,
  Search,
  Send,
  Users,
  Video,
} from "lucide-react";
import Link from "next/link";
import { CREATOR_HREF } from "../ui";
import Sky, { type SkyIcon, type Spot } from "../v15/Sky";
import { InstagramIcon, MetaIcon, ShortsIcon, TikTokIcon, YouTubeIcon } from "../v15/Brands";
import { fitHandoff, isBlank, linkIn, MAX_PROMPT } from "@/lib/appHandoff";
import { CAMPAIGNS, SOON, parseCampaign, type CampaignKey } from "@/lib/campaigns";
import CampaignMenu, { PICK_EVENT, StatusTag } from "./CampaignMenu";
import { CampaignIcon, SOON_SHORT } from "./campaignIcons";

/**
 * The jobs the box does (or will do: the mail and chat bubbles are email and
 * WhatsApp, coming soon), floating in the sky instead of app icons. Decoration
 * only: every claim is made in words below, with its status.
 */
const WHITE = "linear-gradient(150deg,#ffffff,#e9ebee)";
const JOBS: SkyIcon[] = [
  { Icon: InstagramIcon, bg: WHITE, fg: "#111", brand: true },
  { Icon: Video, bg: "linear-gradient(150deg,#73767d,#46494f)", fg: "#e9eaec" },
  { Icon: Mail, bg: "linear-gradient(150deg,#3b6f5e,#21443a)", fg: "#86e6b7" },
  { Icon: YouTubeIcon, bg: WHITE, fg: "#111", brand: true },
  { Icon: Globe2, bg: "linear-gradient(150deg,#ffffff,#eceef0)", fg: "#9a9da2" },
  { Icon: Megaphone, bg: "linear-gradient(150deg,#6e7178,#4a4d54)", fg: "#e8e9eb" },
  { Icon: PenLine, bg: WHITE, fg: "#26282c" },
  { Icon: TikTokIcon, bg: WHITE, fg: "#111", brand: true },
  { Icon: MetaIcon, bg: WHITE, fg: "#111", brand: true },
  { Icon: Users, bg: "linear-gradient(150deg,#45474c,#26282c)", fg: "#ffffff" },
  { Icon: ShortsIcon, bg: WHITE, fg: "#111", brand: true },
  { Icon: Search, bg: "linear-gradient(150deg,#55585e,#33363b)", fg: "#ffffff" },
  { Icon: MessageCircle, bg: "linear-gradient(150deg,#7a7d83,#585b61)", fg: "#ffffff" },
  { Icon: InstagramIcon, bg: WHITE, fg: "#111", brand: true },
  { Icon: Clapperboard, bg: "linear-gradient(150deg,#55575c,#2f3135)", fg: "#ffffff" },
  { Icon: YouTubeIcon, bg: WHITE, fg: "#111", brand: true },
  { Icon: Send, bg: "linear-gradient(150deg,#ffffff,#e4e6e9)", fg: "#3a3c40" },
  { Icon: Users, bg: "linear-gradient(150deg,#e9e6ff,#cfc9f5)", fg: "#7d74c9" },
];

/**
 * The /v16 layout of the floating icons: an open oval around the headline and
 * the chat box, with at least 50px of sky between any icon and any text. Laid
 * out on Sky's 1440px stage for a 960px hero (y is an icon's top edge). The box
 * and the campaign chips under it are at most 720px wide, which keeps that 50px
 * from the icons beside them.
 */
const SPOTS_V16: Spot[] = [
  // above the headline, clear of the nav and the pill
  { x: 440, y: 112, size: 64, r: -8 },
  { x: 590, y: 84, size: 42, r: 6, blur: 0.5 },
  { x: 880, y: 92, size: 46, r: 8 },
  { x: 1030, y: 124, size: 62, r: -10 },
  // beside the headline, only on wide screens
  { x: 112, y: 250, size: 54, r: -6, blur: 0.4 },
  { x: 1318, y: 286, size: 58, r: 7 },
  // beside the chat box
  { x: 236, y: 420, size: 72, r: -10, blur: 0.3 },
  { x: 1206, y: 440, size: 70, r: 6, blur: 1.2 },
  { x: 270, y: 610, size: 50, r: 8 },
  { x: 1170, y: 600, size: 52, r: -4 },
  // under everything (these hang from the hero's bottom edge)
  { x: 400, y: 830, size: 46, r: -6 },
  { x: 610, y: 850, size: 54, r: -4 },
  { x: 830, y: 842, size: 48, r: 10, blur: 1 },
  { x: 1040, y: 826, size: 44, r: -8 },
  // far and out of focus, for depth
  { x: 60, y: 560, size: 48, blur: 3, fade: 0.8 },
  { x: 1366, y: 600, size: 50, blur: 4, fade: 0.75 },
  { x: 150, y: 150, size: 50, blur: 2.6, r: 4 },
  { x: 1230, y: 160, size: 48, blur: 3, fade: 0.85 },
];

/** "https://www.calm.com/app" → "calm.com", for the button that shows the link was found. */
const hostOf = (link: string) =>
  link
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .split(/[/?#]/)[0];

/**
 * A campaign asked for in the address (?intent=ads), e.g. from the top bar's
 * "Campaigns" menu opened in a new tab. Read straight from the address bar, so
 * nothing has to be copied into state when the page loads; on the server there
 * is no address, so the page renders with the default first and then switches.
 */
const noSubscribe = () => () => {};
const intentInUrl = () => new URLSearchParams(window.location.search).get("intent");

/** Puts the caret at the end of the box, after React has drawn the new text. */
function caretToEnd(el: HTMLTextAreaElement | null) {
  requestAnimationFrame(() => {
    if (!el) return;
    el.focus();
    el.setSelectionRange(el.value.length, el.value.length);
  });
}

const CHIP =
  "flex h-11 min-w-0 items-center gap-2 rounded-[14px] border px-3 text-left text-[13.5px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111]";

/**
 * The hero: the chat box itself. The box comes first; under it, the campaigns
 * as a grid of chips (3 to a row, 2 on phones): the four you can start, the
 * three coming soon (greyed, can't be picked) and "More", which opens the
 * grouped menu. Picking a chip swaps the box's placeholder and example prompts.
 *
 * Sending hands the prompt to the app's chat workspace
 * (app.hitrate.sh/research?prompt&intent&link), which asks you to sign in and
 * then runs that campaign. Nothing is answered on this page, so nothing here can
 * promise more than the app does.
 */
export default function ChatHero() {
  const [text, setText] = useState("");
  // The campaign: the one picked here, else one named in the address, else the first (Meta ads).
  const [picked, setPicked] = useState<CampaignKey | null>(null);
  const fromUrl = useSyncExternalStore(noSubscribe, intentInUrl, () => null);
  const key: CampaignKey = picked ?? (fromUrl ? parseCampaign(fromUrl) : CAMPAIGNS[0].key);
  // After "Add your app's link", the box asks for the link itself.
  const [askLink, setAskLink] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const box = useRef<HTMLTextAreaElement>(null);
  const moreBtn = useRef<HTMLButtonElement>(null);
  // Blocks a second Enter while the browser is already leaving for the app. A ref,
  // not state, so the box keeps its text: Back from the sign-in page shows it again.
  const sending = useRef(false);

  const c = CAMPAIGNS.find((x) => x.key === key) ?? CAMPAIGNS[0];
  const link = linkIn(text);
  const blank = isBlank(text);
  // Cheap enough on every key: the text is at most MAX_PROMPT characters.
  const cut = !blank && fitHandoff(text, key).cut;

  // Coming back with Back restores this page from the browser's memory (the
  // back-forward cache) as it was, so the "sending" flag has to be lifted again.
  useEffect(() => {
    const onShow = () => {
      sending.current = false;
    };
    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  // The top bar's "Campaigns" menu picks a campaign here: switch to it, bring the
  // box into view and put the cursor in it.
  useEffect(() => {
    const onPick = (e: Event) => {
      const k = (e as CustomEvent<CampaignKey>).detail;
      if (!CAMPAIGNS.some((x) => x.key === k)) return;
      setPicked(k);
      setMenuOpen(false);
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      document.getElementById("start")?.scrollIntoView({ behavior: still ? "auto" : "smooth", block: "center" });
      box.current?.focus({ preventScroll: true });
    };
    window.addEventListener(PICK_EVENT, onPick);
    return () => window.removeEventListener(PICK_EVENT, onPick);
  }, []);

  const send = () => {
    if (blank || sending.current) return;
    sending.current = true;
    // A full page load, not a client-side route: the workspace is a different app.
    window.location.assign(fitHandoff(text, key).href);
  };

  const choose = (k: CampaignKey) => {
    setPicked(k);
    setMenuOpen(false);
    box.current?.focus();
  };

  return (
    // 990px, not the 960px the icons were laid out on: the lines under the box add
    // height, and the bottom icons hang from the hero's bottom edge, so they move
    // down with it and keep their 50px of sky from the text.
    <section className="relative isolate min-h-[800px] overflow-hidden px-5 pb-28 pt-[176px] md:min-h-[990px] md:pb-40 md:pt-[184px]">
      <Sky icons={JOBS} spots={SPOTS_V16} base={960} />

      <div className="relative mx-auto max-w-[1000px] text-center">
        <p className="bd-chip bd-rise mx-auto inline-flex items-center rounded-full px-4 py-1.5 text-[12.5px] font-medium text-[var(--bd-text)]">
          For consumer app teams · early access open
        </p>

        <h1 className="serif bd-rise mx-auto mt-6 max-w-[16ch] text-balance text-[40px] leading-[1.05] text-[var(--bd-ink)] sm:text-[52px] lg:max-w-none lg:text-[58px] xl:text-[64px]">
          Run your entire marketing <br className="hidden lg:block" />
          from a single chat box
        </h1>

        {/* id="start": the closing "Start" button and the top bar's menu bring people back here.
            relative z-20: the "More" menu opens over the example prompts below, which have
            their own fade-in animation (and so their own layer, which would otherwise win). */}
        <div id="start" className="bd-rise relative z-20 mx-auto mt-10 max-w-[720px] scroll-mt-24 text-left">
          <form
            id="v16-composer"
            aria-label="Chat box"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="bd-field rounded-[24px] p-2"
          >
            <label htmlFor="v16-box" className="sr-only">
              {`${c.label}: say what you want, and add your app's link`}
            </label>
            <textarea
              id="v16-box"
              ref={box}
              rows={3}
              maxLength={MAX_PROMPT}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                // Enter sends, Shift+Enter is a new line; never mid-way through an IME composition.
                if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder={askLink && !link ? "Paste your app's website, or its App Store or Google Play link" : c.placeholder}
              aria-describedby="v16-campaign-note v16-signin-note"
              className="block w-full resize-none bg-transparent px-3.5 pb-1 pt-3 text-[16px] leading-relaxed text-[var(--bd-ink)] outline-none placeholder:text-[#767676]"
            />
            <div className="flex items-center justify-between gap-3 px-1.5 pb-0.5">
              {/* No "https://" typed in for you: a pasted full link would become
                  "https://https://…". It puts the cursor where the link goes, on a
                  line of its own, and once a link is in the message it shows which
                  one was found. */}
              <button
                type="button"
                aria-label={link ? `Your app's link: ${hostOf(link)}` : undefined}
                onClick={() => {
                  setAskLink(true);
                  // A new line first, so a pasted "calm.com" can't stick to the last word
                  // ("…for uscalm.com") and be read as the wrong website.
                  if (text && !link && !/\s$/.test(text) && text.length < MAX_PROMPT) setText(`${text}\n`);
                  caretToEnd(box.current);
                }}
                className="inline-flex min-w-0 items-center gap-1.5 rounded-full px-2.5 py-2 text-[13px] text-[var(--bd-muted)] transition-colors hover:bg-[var(--bd-soft)] hover:text-[var(--bd-ink)]"
              >
                {link ? (
                  <>
                    <Check className="h-4 w-4 shrink-0" aria-hidden />
                    <span className="truncate">{hostOf(link)}</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4 shrink-0" aria-hidden />
                    {/* With text already in the box the placeholder can't show, so the button says it. */}
                    {askLink && text ? "Paste your link in the box" : "Add your app’s link"}
                  </>
                )}
              </button>
              <button
                type="submit"
                aria-label="Send"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#111] text-white transition-transform hover:-translate-y-px disabled:bg-[#d4d6d9] disabled:hover:translate-y-0"
                disabled={blank}
              >
                <ArrowUp className="h-[18px] w-[18px]" />
              </button>
            </div>
          </form>

          {/* The campaigns, as chips under the box. The greyed ones are coming: shown so
              nobody hunts for them, but they can't be picked. "More" opens the grouped menu. */}
          <div className="relative mt-3">
            <div role="group" aria-label="Pick a campaign" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {CAMPAIGNS.map((x) => {
                const on = x.key === key;
                return (
                  <button
                    key={x.key}
                    type="button"
                    aria-pressed={on}
                    onClick={() => choose(x.key)}
                    className={`${CHIP} ${
                      on
                        ? "border-[#111]/80 bg-white font-medium text-[var(--bd-ink)] shadow-[0_1px_3px_rgb(17_17_17/0.08)]"
                        : "border-black/[0.07] bg-white/80 text-[var(--bd-text)] backdrop-blur-sm hover:border-black/15 hover:bg-white"
                    }`}
                  >
                    <CampaignIcon k={x.key} className="h-4 w-4" />
                    <span className="truncate">
                      {/* Phones get the short name ("Creators"), so two chips fit a row. */}
                      <span className="sm:hidden">{x.short}</span>
                      <span className="hidden sm:inline">{x.label}</span>
                    </span>
                  </button>
                );
              })}
              {SOON.map((s) => (
                // Plain text, not a button: nothing to click. The hidden words tell screen readers why.
                <div
                  key={s.key}
                  title={s.blurb}
                  className={`${CHIP} cursor-default border-black/[0.05] bg-white/45 text-[#8a8d92]`}
                >
                  <CampaignIcon k={s.key} className="h-4 w-4 opacity-70" />
                  <span className="truncate">
                    <span className="sm:hidden">{SOON_SHORT[s.key]}</span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </span>
                  <span className="ml-auto shrink-0 rounded-full bg-black/[0.05] px-1.5 py-px text-[10.5px] font-semibold text-[var(--bd-muted)]">
                    Soon<span className="sr-only">: coming later, can&rsquo;t be started yet</span>
                  </span>
                </div>
              ))}
              <button
                ref={moreBtn}
                type="button"
                aria-haspopup="dialog"
                aria-expanded={menuOpen}
                aria-controls={menuOpen ? "v16-more" : undefined}
                onClick={() => setMenuOpen((o) => !o)}
                className={`${CHIP} bg-white/80 text-[var(--bd-text)] backdrop-blur-sm hover:border-black/15 hover:bg-white ${
                  menuOpen ? "border-black/20" : "border-black/[0.07]"
                }`}
              >
                More
                <span className="sr-only"> campaigns</span>
                <ArrowRight className={`ml-auto h-4 w-4 shrink-0 transition-transform ${menuOpen ? "rotate-90" : ""}`} aria-hidden />
              </button>
            </div>

            {menuOpen ? (
              <CampaignMenu
                id="v16-more"
                label="All campaigns"
                current={key}
                trigger={moreBtn}
                onPick={(k) => choose(k)}
                onClose={() => setMenuOpen(false)}
                className="absolute inset-x-0 top-full z-30 mt-2"
              />
            ) : null}
          </div>

          {/* What the picked campaign does today, with its status. Read out when it changes. */}
          <p id="v16-campaign-note" aria-live="polite" className="mx-auto mt-4 max-w-[600px] text-balance text-center text-[13.5px] leading-relaxed text-[var(--bd-text)]">
            <span className="mr-1.5 inline-flex align-[1px]">
              <StatusTag status={c.status} />
            </span>
            {c.blurb}
          </p>
          {cut ? (
            <p className="mt-2 text-center text-[12.5px] text-[var(--bd-muted)]" role="status">
              That&rsquo;s a long message, so the end will be cut to fit.
            </p>
          ) : null}
        </div>

        <div className="mx-auto mt-5 max-w-[720px]">
          <ul key={key} className="flex flex-wrap justify-center gap-2" aria-label="Examples to start from">
            {c.examples.map((t, i) => (
              <li key={t} className="bd-rise" style={{ animationDelay: `${i * 0.05}s` }}>
                <button
                  type="button"
                  onClick={() => {
                    // Keep a link that's already typed, so picking an example never loses it.
                    setText(link ? `${t}\n${link}` : t);
                    caretToEnd(box.current);
                  }}
                  className="bd-chip rounded-full px-3 py-1.5 text-[13px] text-[var(--bd-text)] transition-colors hover:bg-white"
                >
                  {t}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Sign-in comes before anything runs, and nothing goes out on its own: both said up front. */}
        <p id="v16-signin-note" className="mx-auto mt-7 max-w-[560px] text-balance text-[12.5px] text-[var(--bd-muted)]">
          When you send, you&rsquo;ll sign in with Google or an email code. Nothing posts, spends or sends without your OK.
        </p>

        <p className="mt-4 text-[13px] text-[var(--bd-muted)]">
          A creator, not an app?{" "}
          <Link href={CREATOR_HREF} className="text-[var(--bd-ink)] underline decoration-black/25 underline-offset-4 hover:decoration-black/60">
            See HitRate for creators
          </Link>
        </p>
      </div>
    </section>
  );
}
