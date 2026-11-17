import {
  ArrowRight,
  BarChart3,
  CalendarDays,
  Clapperboard,
  Megaphone,
  PenLine,
  Search,
  Send,
  Users,
  Video,
} from "lucide-react";
import ChatBox from "./ChatBox";
import WebsiteStart from "./WebsiteStart";

/** The pill row okara puts under its hero — one chip per job the box can do. */
const PILLS = [
  { icon: Search, label: "Competitors" },
  { icon: Video, label: "Winning videos" },
  { icon: Megaphone, label: "Markets" },
  { icon: PenLine, label: "Scripts" },
  { icon: CalendarDays, label: "Calendar" },
  { icon: Clapperboard, label: "AI UGC" },
  { icon: Send, label: "Posting" },
  { icon: Users, label: "Creators" },
  { icon: BarChart3, label: "Results" },
];

export default function ChatHero() {
  return (
    <section id="top" className="relative isolate overflow-hidden border-b border-ok-hair px-5 pb-20 pt-16 sm:pt-24">
      <div className="v10-grid pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(55%_60%_at_50%_0%,rgb(92_207_152/0.10),transparent_75%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[1100px] text-center">
        <a
          href="#how"
          className="inline-flex items-center gap-2.5 rounded-full border border-ok-line bg-ok-card py-1 pl-1 pr-3 text-[13px] text-ok-muted transition-colors hover:border-ok-faint"
        >
          <span className="ok-label rounded-full bg-ok-bg px-2.5 py-1 text-ok-text">New</span>
          Run your marketing from one chat box
          <ArrowRight className="h-3.5 w-3.5" />
        </a>

        <h1 className="ok-h mx-auto mt-7 max-w-[17ch] text-[44px] text-white sm:text-[62px] md:text-[70px]">
          Meet HitRate, the AI growth team.
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-[17px] leading-relaxed text-ok-muted">
          One chat box that finds what&rsquo;s already winning in your category, writes it, makes it and tests it —
          before you pay a single creator.
        </p>

        <div className="mt-9">
          <WebsiteStart />
        </div>

        <p className="ok-label mt-14 text-ok-faint">One box runs nine jobs for you</p>
        <div className="mx-auto mt-5 flex max-w-3xl flex-wrap justify-center gap-2">
          {PILLS.map((p) => {
            const Icon = p.icon;
            return (
              <span
                key={p.label}
                className="inline-flex items-center gap-2 rounded-[9px] border border-ok-line bg-ok-card px-3 py-1.5 text-[13.5px] text-ok-text"
              >
                <Icon className="h-3.5 w-3.5 text-ok-green" strokeWidth={1.9} />
                {p.label}
              </span>
            );
          })}
        </div>

        {/* the product itself, the way okara drops a dashboard under the fold line */}
        <div className="mx-auto mt-16 max-w-[620px]">
          <ChatBox />
          <p className="mt-3 text-[12.5px] text-ok-faint">An example thread. The statuses are HitRate&rsquo;s today.</p>
        </div>
      </div>
    </section>
  );
}
