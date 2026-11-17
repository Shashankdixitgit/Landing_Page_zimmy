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
import { Chip, SplitHead } from "../ui";

/**
 * The nine things a visitor would otherwise hire for, each shown as the sentence
 * you type instead. Statuses match the main site: find and plan are live,
 * testing is early access, scaling is coming soon. Nothing is overstated here.
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
    <section id="asks" className="px-5 py-24 sm:py-32">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <SplitHead
            title={
              <>
                Nine jobs you&rsquo;d hire for.
                <br />
                One box to ask.
              </>
            }
            sub="Each of these is a sentence, not a tool to learn, a login to keep or a brief to write."
          />
        </Reveal>

        <Reveal stagger={0.06} className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {ASKS.map((a) => {
            const Icon = a.icon;
            return (
              <article
                key={a.ask}
                className="flex flex-col rounded-[22px] border border-line bg-surface p-6 transition-colors duration-300 hover:border-ink/15"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-soft text-ink">
                    <Icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <Chip tone={a.status === "Live" ? "mint" : "soft"}>{a.status}</Chip>
                </div>
                <p className="mt-5 text-[16.5px] font-medium tracking-[-0.015em] text-ink">&ldquo;{a.ask}&rdquo;</p>
                <p className="mt-2.5 text-[14px] leading-relaxed text-muted">{a.back}</p>
              </article>
            );
          })}
        </Reveal>

        <p className="mt-6 text-center text-[12.5px] text-muted">
          Live today: finding the winners, the scripts and the calendar. Testing is in early access. Scaling is coming
          soon.
        </p>
      </div>
    </section>
  );
}
