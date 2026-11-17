import {
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
import Reveal from "../Reveal";

/**
 * Okara lists nine agents. HitRate has no agents to name, so the same nine-card
 * wall lists the nine jobs you'd otherwise hire for, each written as the
 * sentence you type. Statuses match the live site — nothing is overstated.
 */
const ASKS: { icon: typeof Search; ask: string; back: string; status: "Live" | "Early access" | "Coming soon" }[] = [
  {
    icon: Search,
    ask: "Who am I really competing with?",
    back: "Your app read from its store page and reviews, then the apps your users also watch.",
    status: "Live",
  },
  {
    icon: Video,
    ask: "What video is winning for them?",
    back: "Their videos and ads from the last 30 days, with the formats that repeat across them.",
    status: "Live",
  },
  {
    icon: Megaphone,
    ask: "Which market should I start in?",
    back: "The same read-out market by market, so you pick where the hook already lands.",
    status: "Live",
  },
  {
    icon: PenLine,
    ask: "Write me the scripts.",
    back: "Scripts built from the winners, beat by beat, in your product’s words.",
    status: "Live",
  },
  {
    icon: CalendarDays,
    ask: "Lay out my week.",
    back: "A content calendar with a script on every slot, so nothing starts from a blank page.",
    status: "Live",
  },
  {
    icon: Clapperboard,
    ask: "Make it as an AI UGC video.",
    back: "Your version shot with an AI creator, 15 seconds, captions on, before you pay anyone.",
    status: "Early access",
  },
  {
    icon: Send,
    ask: "Post it and watch it.",
    back: "Goes out from your accounts, or warmed-up AI UGC accounts, once you approve it.",
    status: "Early access",
  },
  {
    icon: Users,
    ask: "Get real creators on the winner.",
    back: "The format that proved itself briefed out to real creators from the HitRate pool.",
    status: "Coming soon",
  },
  {
    icon: BarChart3,
    ask: "What actually brought users?",
    back: "Installs and cost per install by format, so the next week starts from the answer.",
    status: "Coming soon",
  },
];

export default function AskAnything() {
  return (
    <section id="jobs" className="border-b border-ok-hair px-5 py-24 sm:py-28">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <p className="ok-label text-ok-faint">What you can ask</p>
          <h2 className="ok-h mt-4 max-w-2xl text-[36px] text-white sm:text-[48px]">
            Nine jobs you&rsquo;d hire for. One box to ask.
          </h2>
          <p className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-ok-muted">
            Each of these is a sentence, not a tool to learn, a login to keep or a brief to write.
          </p>
        </Reveal>

        <Reveal stagger={0.05} className="mt-12 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {ASKS.map((a, i) => {
            const Icon = a.icon;
            return (
              <article
                key={a.ask}
                className="flex flex-col rounded-xl border border-ok-line bg-ok-card p-5 transition-colors duration-300 hover:border-ok-faint"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="ok-label text-ok-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className={`ok-label rounded px-1.5 py-1 ${
                      a.status === "Live" ? "bg-ok-green/15 text-ok-green" : "border border-ok-line text-ok-faint"
                    }`}
                  >
                    {a.status}
                  </span>
                </div>
                <span className="mt-5 grid h-8 w-8 place-items-center rounded-lg border border-ok-line bg-ok-raise text-ok-text">
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </span>
                <p className="mt-4 text-[16.5px] font-medium tracking-[-0.02em] text-ok-text">&ldquo;{a.ask}&rdquo;</p>
                <p className="mt-2.5 text-[14px] leading-relaxed text-ok-muted">{a.back}</p>
              </article>
            );
          })}
        </Reveal>

        <p className="ok-label mt-8 text-center text-ok-faint">
          Live today: the winners, the scripts, the calendar · Early access: testing · Coming soon: scaling
        </p>
      </div>
    </section>
  );
}
