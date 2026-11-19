"use client";

import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUp,
  BarChart3,
  CalendarDays,
  Check,
  Clapperboard,
  Globe,
  Globe2,
  MessageSquare,
  PenLine,
  Plus,
  Search,
  Send,
  Shuffle,
  Sparkles,
  Star,
  Users,
  Video,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { CREATOR_HREF } from "../ui";
import { LogoMark } from "../Logo";
import Sky, { type SkyIcon, type Spot } from "../v15/Sky";
import { InstagramIcon, MetaIcon, ShortsIcon, TikTokIcon, YouTubeIcon } from "../v15/Brands";
import type { ComponentType } from "react";
import { StepList, StepRow } from "../v15/RunParts";
import { hostOf, looksLikeLink, RunAnnouncer, RunView, scrollToTop, START_EVENT, trimLink, useSiteRead } from "../v15/Run";

/** The nine jobs the box does, floating in the sky instead of app icons. */
const WHITE = "linear-gradient(150deg,#ffffff,#e9ebee)";
const JOBS: SkyIcon[] = [
  { Icon: InstagramIcon, bg: WHITE, fg: "#111", brand: true },
  { Icon: Video, bg: "linear-gradient(150deg,#73767d,#46494f)", fg: "#e9eaec" },
  { Icon: CalendarDays, bg: "linear-gradient(150deg,#3b6f5e,#21443a)", fg: "#86e6b7" },
  { Icon: YouTubeIcon, bg: WHITE, fg: "#111", brand: true },
  { Icon: Globe2, bg: "linear-gradient(150deg,#ffffff,#eceef0)", fg: "#9a9da2" },
  { Icon: BarChart3, bg: "linear-gradient(150deg,#6e7178,#4a4d54)", fg: "#e8e9eb" },
  { Icon: PenLine, bg: WHITE, fg: "#26282c" },
  { Icon: TikTokIcon, bg: WHITE, fg: "#111", brand: true },
  { Icon: MetaIcon, bg: WHITE, fg: "#111", brand: true },
  { Icon: Users, bg: "linear-gradient(150deg,#45474c,#26282c)", fg: "#ffffff" },
  { Icon: ShortsIcon, bg: WHITE, fg: "#111", brand: true },
  { Icon: Search, bg: "linear-gradient(150deg,#55585e,#33363b)", fg: "#ffffff" },
  { Icon: CalendarDays, bg: "linear-gradient(150deg,#7a7d83,#585b61)", fg: "#ffffff" },
  { Icon: InstagramIcon, bg: WHITE, fg: "#111", brand: true },
  { Icon: Clapperboard, bg: "linear-gradient(150deg,#55575c,#2f3135)", fg: "#ffffff" },
  { Icon: YouTubeIcon, bg: WHITE, fg: "#111", brand: true },
  { Icon: Send, bg: "linear-gradient(150deg,#ffffff,#e4e6e9)", fg: "#3a3c40" },
  { Icon: Users, bg: "linear-gradient(150deg,#e9e6ff,#cfc9f5)", fg: "#7d74c9" },
];

/**
 * The /v16 layout of the floating icons: an open oval around the headline and
 * the chat box, with at least 50px of sky between any icon and any text. Laid
 * out on Sky's 1440px stage for a 960px hero (y is an icon's top edge).
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

/**
 * The box has a tab per kind of work, the way an app builder has "web app /
 * mobile app / video". Each tab sets the placeholder, the suggestions under the
 * box, and how honestly the first reply is worded: research and scripts are
 * live, test videos are in early access, Meta ads are coming.
 */
type Idea = { t: string; I: LucideIcon | ComponentType<{ className?: string }> };
type Mode = {
  key: string;
  Icon: LucideIcon | ComponentType<{ className?: string }>;
  label: string;
  badge?: string;
  placeholder: string;
  reply: string;
  ideas: Idea[];
};

const LINK_ASK = "Paste its website, or its App Store or Google Play link.";

const MODES: Mode[] = [
  {
    key: "research",
    Icon: Search,
    label: "Research",
    placeholder: "Paste your app's website to start, or ask what's winning for apps like yours",
    reply: `Good question. HitRate answers it from your own category, and a founder sends you the answer after a short sign-up. First, your app: ${LINK_ASK.charAt(0).toLowerCase() + LINK_ASK.slice(1)}`,
    ideas: [
      { t: "What's winning for my competitors?", I: TikTokIcon },
      { t: "Who am I really competing with?", I: Users },
      { t: "Which market should I start in?", I: Globe2 },
      { t: "What do my store reviews say?", I: Star },
      { t: "Which hooks repeat on YouTube Shorts?", I: ShortsIcon },
      { t: "What are fitness apps posting on Reels?", I: InstagramIcon },
    ],
  },
  {
    key: "scripts",
    Icon: PenLine,
    label: "Scripts",
    placeholder: "Ask for scripts, hooks or next week's plan",
    reply: `Scripts start from what's already winning for apps like yours, and the founders write them with you after a short sign-up. First, your app: ${LINK_ASK.charAt(0).toLowerCase() + LINK_ASK.slice(1)}`,
    ideas: [
      { t: "Write me three hooks", I: PenLine },
      { t: "Plan my next week", I: CalendarDays },
      { t: "Turn the top winner into a 15-second script", I: InstagramIcon },
      { t: "A YouTube video script for my launch", I: YouTubeIcon },
      { t: "A script for my app's main feature", I: Sparkles },
      { t: "Three openers for a TikTok", I: TikTokIcon },
    ],
  },
  {
    key: "videos",
    Icon: Clapperboard,
    label: "UGC videos",
    badge: "Early access",
    placeholder: "Describe the test video you want made",
    reply: `Test videos are in early access, and they start from your category too. First, your app: ${LINK_ASK.charAt(0).toLowerCase() + LINK_ASK.slice(1)}`,
    ideas: [
      { t: "Make Tuesday's script as a test video", I: Clapperboard },
      { t: "A Reel with an AI creator", I: InstagramIcon },
      { t: "Same video, three different hooks", I: Sparkles },
      { t: "A 15-second Short of my app's best screen", I: ShortsIcon },
      { t: "A day-in-my-life TikTok that ends on my app", I: TikTokIcon },
      { t: "Post it once I approve", I: Send },
    ],
  },
  {
    key: "ads",
    Icon: MetaIcon,
    label: "Meta ads",
    badge: "Soon",
    placeholder: "Ask about running the winner as a Meta ad",
    reply: `Running Meta ads is coming soon. It will start from the style that already won. First, your app: ${LINK_ASK.charAt(0).toLowerCase() + LINK_ASK.slice(1)}`,
    ideas: [
      { t: "Turn the winning style into a Meta ad", I: MetaIcon },
      { t: "Which video should I put money behind?", I: BarChart3 },
      { t: "Read my ads by cost per install", I: MetaIcon },
      { t: "Three Instagram ad versions of my best video", I: InstagramIcon },
      { t: "Which audience saw the winner first?", I: Users },
      { t: "When should I stop an ad?", I: MetaIcon },
    ],
  },
];


/**
 * The /v16 hero: the chat box itself. Pick a tab, ask anything, or paste your
 * app's website. Every answer starts from your own category, so a question first
 * gets asked for the link (that's the honest order), and the link gets read right
 * here. The question rides along into the run, as the first thing to answer
 * after the sign-up.
 */
export default function ChatHero() {
  const [text, setText] = useState("");
  const [question, setQuestion] = useState("");
  const [mode, setMode] = useState(0);
  const [shuffle, setShuffle] = useState(0);
  const { phase, read, asked, elapsed, start, reset } = useSiteRead();
  const top = useRef<HTMLElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const box = useRef<HTMLTextAreaElement>(null);
  const wasIdle = useRef(true);

  useEffect(() => {
    if (phase !== "idle" && wasIdle.current) heading.current?.focus({ preventScroll: true });
    if (phase === "idle" && !wasIdle.current) box.current?.focus({ preventScroll: true });
    wasIdle.current = phase === "idle";
  }, [phase]);

  useEffect(() => {
    const onStart = (e: Event) => {
      const url = (e as CustomEvent<string>).detail;
      scrollToTop(top.current);
      void start(url);
      // From a run already on screen the focus effect doesn't fire, so move focus here.
      requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
    };
    window.addEventListener(START_EVENT, onStart);
    return () => window.removeEventListener(START_EVENT, onStart);
  }, [start]);

  const send = () => {
    const t = text.trim();
    if (!t) return;
    const link = trimLink(t);
    if (looksLikeLink(link)) {
      void start(link);
      setText("");
    } else {
      setQuestion(t);
      setText("");
      box.current?.focus();
    }
  };

  const m = MODES[mode];
  const ideas = Array.from({ length: 4 }, (_, i) => m.ideas[(shuffle * 4 + i) % m.ideas.length]);
  const where = hostOf(read?.website ?? asked);

  return (
    <section ref={top} className="relative isolate min-h-[800px] overflow-hidden px-5 pb-28 pt-[176px] md:min-h-[960px] md:pb-40 md:pt-[184px]">
      <Sky quiet={phase !== "idle"} icons={JOBS} spots={SPOTS_V16} base={960} />
      <RunAnnouncer phase={phase} read={read} asked={asked} />
      {/* The reply to a question, announced: a region that is always there, filled when it changes. */}
      <p role="status" className="sr-only">
        {question && phase === "idle" ? m.reply : ""}
      </p>

      {phase === "idle" ? (
        <div className="relative mx-auto max-w-[1000px] text-center">
          <p className="bd-chip bd-rise mx-auto inline-flex items-center rounded-full px-4 py-1.5 text-[12.5px] font-medium text-[var(--bd-text)]">
            For consumer app teams · early access open
          </p>

          <h1 className="serif bd-rise mx-auto mt-6 max-w-[16ch] text-balance text-[40px] leading-[1.05] text-[var(--bd-ink)] sm:text-[52px] lg:max-w-none lg:text-[58px] xl:text-[64px]">
            Run your entire marketing operation <br className="hidden lg:block" />
            from a single chat box
          </h1>

          <div className="bd-rise mx-auto mt-10 max-w-[680px] text-left">
            {/* tabs, sitting on the box like folder tabs */}
            <div
              role="tablist"
              aria-label="What to work on"
              className="relative z-10 -mb-px flex gap-1 overflow-x-auto px-3 [mask-image:linear-gradient(to_right,#000_82%,transparent)] [scrollbar-width:none] sm:px-5 sm:[mask-image:none]"
            >
              {MODES.map((x, i) => {
                const on = i === mode;
                return (
                  <button
                    key={x.key}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="v16-composer"
                    onClick={() => {
                      setMode(i);
                      setShuffle(0);
                      box.current?.focus();
                    }}
                    className={`flex shrink-0 items-center gap-2 rounded-t-[14px] border px-3.5 py-2.5 text-[13.5px] transition-colors sm:px-4 ${
                      on
                        ? "border-black/[0.08] border-b-white bg-white font-medium text-[var(--bd-ink)]"
                        : "border-transparent bg-white/45 text-[var(--bd-muted)] backdrop-blur-sm hover:bg-white/75 hover:text-[var(--bd-ink)]"
                    }`}
                  >
                    <x.Icon className="h-4 w-4" aria-hidden />
                    {x.label}
                    {x.badge ? (
                      <span className={`rounded-full px-1.5 py-0.5 text-[10.5px] font-semibold ${x.badge === "Soon" ? "bg-[#111] text-white" : "bg-[#e3f5ea] text-[#17784b]"}`}>
                        {x.badge}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <form
              id="v16-composer"
              role="tabpanel"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
              className="bd-field rounded-[24px] p-2"
            >
              {question ? (
                <div className="space-y-2.5 px-2.5 pb-1 pt-2.5">
                  <div className="flex justify-end">
                    <p className="max-w-[86%] rounded-[18px] rounded-br-md bg-[#111] px-4 py-2 text-[14px] text-white">{question}</p>
                  </div>
                  <div className="flex gap-2.5">
                    <LogoMark className="mt-0.5 h-5 w-5 shrink-0" />
                    <p className="text-[14px] leading-relaxed text-[var(--bd-text)]">{m.reply}</p>
                  </div>
                </div>
              ) : null}
              <label htmlFor="v16-box" className="sr-only">
                {question ? "Your app's website or store link" : `${m.label}: ask anything, or paste your app's website`}
              </label>
              <textarea
                id="v16-box"
                ref={box}
                rows={question ? 2 : 3}
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing && e.keyCode !== 229) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder={question ? "yourapp.com" : m.placeholder}
                className="block w-full resize-none bg-transparent px-3.5 pb-1 pt-3 text-[16px] leading-relaxed text-[var(--bd-ink)] outline-none placeholder:text-[#767676]"
              />
              <div className="flex items-center justify-between gap-3 px-1.5 pb-0.5">
                <button
                  type="button"
                  onClick={() => {
                    if (!text.trim()) setText("https://");
                    box.current?.focus();
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-[13px] text-[var(--bd-muted)] transition-colors hover:bg-[var(--bd-soft)] hover:text-[var(--bd-ink)]"
                >
                  <Plus className="h-4 w-4" aria-hidden />
                  Add your app&rsquo;s link
                </button>
                <button
                  type="submit"
                  aria-label="Send"
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#111] text-white transition-transform hover:-translate-y-px disabled:bg-[#d4d6d9] disabled:hover:translate-y-0"
                  disabled={!text.trim()}
                >
                  <ArrowUp className="h-[18px] w-[18px]" />
                </button>
              </div>
            </form>
          </div>

          {!question ? (
            <div className="mx-auto mt-7 max-w-[680px]">
              <p className="flex items-center justify-center gap-1.5 text-[12.5px] text-[var(--bd-muted)]">
                Not sure where to start? Try these
                <button
                  type="button"
                  onClick={() => setShuffle((n) => n + 1)}
                  aria-label="Show other suggestions"
                  className="grid h-6 w-6 place-items-center rounded-full text-[var(--bd-muted)] transition-colors hover:bg-white/70 hover:text-[var(--bd-ink)]"
                >
                  <Shuffle className="h-3.5 w-3.5" aria-hidden />
                </button>
              </p>
              <ul key={`${mode}-${shuffle}`} className="mt-3 flex flex-wrap justify-center gap-2" aria-label="Suggestions">
                {ideas.map((idea, i) => (
                  <li key={idea.t} className="bd-rise" style={{ animationDelay: `${i * 0.05}s` }}>
                    <button
                      type="button"
                      onClick={() => {
                        setText(idea.t);
                        box.current?.focus();
                      }}
                      className="bd-chip inline-flex items-center gap-2 rounded-full py-1.5 pl-1.5 pr-3.5 text-[13.5px] text-[var(--bd-text)] transition-colors hover:bg-white"
                    >
                      <span className="grid h-6 w-6 place-items-center rounded-full bg-white text-[var(--bd-ink)] shadow-[0_0_0_1px_rgb(17_17_17/0.07)]" aria-hidden>
                        <idea.I className="h-3.5 w-3.5" />
                      </span>
                      {idea.t}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => {
                setQuestion("");
                box.current?.focus();
              }}
              className="mt-5 text-[13px] text-[var(--bd-muted)] underline-offset-4 hover:underline"
            >
              Ask something else
            </button>
          )}

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {["Research live today", "Done with the founders", "Nothing goes out without your OK"].map((t) => (
              <li key={t} className="bd-chip inline-flex items-center gap-1.5 rounded-full py-1 pl-1 pr-3 text-[13px] font-medium text-[var(--bd-text)]">
                <span className="grid h-[18px] w-[18px] place-items-center rounded-full bg-[var(--bd-green)] text-white" aria-hidden>
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
                {t}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[13px] text-[var(--bd-muted)]">
            A creator, not an app?{" "}
            <Link href={CREATOR_HREF} className="text-[var(--bd-ink)] underline decoration-black/25 underline-offset-4 hover:decoration-black/60">
              See HitRate for creators
            </Link>
          </p>
        </div>
      ) : (
        <RunView
          phase={phase}
          read={read}
          asked={asked}
          elapsed={elapsed}
          onReset={reset}
          headingRef={heading}
          question={question}
          steps={(href) => (
            <StepList>
              <StepRow
                icon={<Globe className="h-[18px] w-[18px]" />}
                title="Reading your app"
                note={
                  phase === "reading"
                    ? `Reading ${where}`
                    : phase === "error"
                      ? `Couldn't open ${where}`
                      : read?.store
                        ? "Store link noted for the sign-up"
                        : read?.category
                          ? `Looks like: ${read.category}`
                          : `Read ${where}`
                }
                state={phase === "reading" ? "active" : phase === "done" ? "done" : "failed"}
              />
              <StepRow
                icon={<MessageSquare className="h-[18px] w-[18px]" />}
                title="Your first answer"
                note={question ? `“${question}”, answered by a founder` : "Who you compete with and what's winning for them, by email"}
                state={phase === "done" ? "ready" : "waiting"}
                action={
                  phase === "done" ? (
                    <a
                      href={href}
                      className="hidden shrink-0 items-center gap-1 rounded-full bg-[#111] px-3.5 py-2 text-[13px] font-medium text-white transition-transform hover:-translate-y-px sm:inline-flex"
                    >
                      Continue <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </a>
                  ) : undefined
                }
              />
              <StepRow
                icon={<PenLine className="h-[18px] w-[18px]" />}
                title="Then the rest, done with the founders"
                note="Scripts and a calendar · test videos and posting in early access"
                state="waiting"
              />
            </StepList>
          )}
        />
      )}
    </section>
  );
}
