import { ArrowRight, TrendingUp, CalendarDays, BadgeDollarSign, Flame, UserPlus } from "lucide-react";
import Reveal from "./Reveal";
import CardVideo from "./CardVideo";
import { CREATOR_JOIN_HREF } from "./ui";

const PERKS = [
  { icon: TrendingUp, title: "See what’s taking off in your niche", status: "Coming soon" },
  { icon: CalendarDays, title: "Get a weekly posting plan built from it", status: "Coming soon" },
  { icon: BadgeDollarSign, title: "Get paid by brands that fit your audience", status: "Live" },
];

// Notifications that pop in around the phone. Illustrative.
const PINGS = [
  { icon: Flame, text: "Before/after hooks are up 6× in Fitness", cls: "left-0 top-10 -rotate-2 sm:-left-8" },
  { icon: BadgeDollarSign, text: "Brand deal approved · $400", cls: "right-0 top-[44%] rotate-2 sm:-right-10" },
  { icon: UserPlus, text: "+2.1K followers this week", cls: "top-[62%] left-0 -rotate-1 sm:-left-10" },
];

export default function Creators({ asHero = false }: { asHero?: boolean }) {
  return (
    <section id="creators" className={`px-2 sm:px-3 ${asHero ? "pt-24 sm:pt-28" : "py-10"}`}>
      <div className="relative overflow-hidden text-ink">
        <div className="relative mx-auto grid max-w-[1100px] items-center gap-14 px-6 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_1fr]">
          {/* message */}
          <Reveal>
            <span className="inline-flex rounded-full bg-mint px-3.5 py-1.5 text-[12.5px] font-medium text-accent">
              For creators
            </span>
            <h2 className="display mt-6 text-[44px] sm:text-[64px]">
              Your next post,
              <br />
              <span className="text-accent">already proven.</span>
            </h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-muted">
              Stop guessing what to post. Make what&rsquo;s already working, and get paid by brands
              for it.
            </p>

            <ul className="mt-9 space-y-3">
              {PERKS.map((p) => {
                const Icon = p.icon;
                return (
                  <li key={p.title} className="flex items-center gap-4 rounded-2xl border border-line bg-surface px-4 py-3.5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-mint text-accent">
                      <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </span>
                    <span className="flex-1 text-[15px] font-medium">{p.title}</span>
                    <span
                      className={`shrink-0 rounded-md px-2 py-0.5 text-[11px] font-medium ${
                        p.status === "Live" ? "bg-mint text-accent" : "bg-soft text-muted"
                      }`}
                    >
                      {p.status}
                    </span>
                  </li>
                );
              })}
            </ul>

            <a
              href={CREATOR_JOIN_HREF}
              className="group mt-9 inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-[15.5px] font-semibold text-white hover:bg-accent-hover transition-transform duration-300 hover:-translate-y-0.5"
            >
              Join as a creator
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </Reveal>

          {/* phone with live creator clip and popping notifications */}
          <Reveal delay={0.1} className="relative mx-auto w-full max-w-[340px]">
            <div className="relative mx-auto aspect-[9/16] w-[250px] overflow-hidden rounded-[34px] border-[6px] border-ink bg-black shadow-[0_40px_80px_-24px_rgb(25_41_45/0.45)] sm:w-[270px]">
              <CardVideo name="mira" />
              <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/0.35)_0%,transparent_25%,transparent_60%,rgb(0_0_0/0.65)_100%)]" />
              <p className="absolute left-4 top-5 text-[12px] font-semibold text-white">@mira.moves</p>
              <p className="absolute inset-x-5 bottom-6 text-center text-[14px] font-bold leading-snug text-white [text-shadow:0_2px_8px_rgb(0_0_0/0.7)]">
                day 14 and I&rsquo;m genuinely shocked
              </p>
            </div>

            {PINGS.map((n, i) => {
              const Icon = n.icon;
              return (
                <div
                  key={n.text}
                  className={`ping absolute z-10 flex items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 text-[12.5px] font-medium text-ink border border-line shadow-[0_18px_40px_-14px_rgb(25_41_45/0.35)] ${n.cls}`}
                  style={{ animationDelay: `${i * 1.6}s` }}
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-mint text-accent">
                    <Icon className="h-3.5 w-3.5" strokeWidth={2} />
                  </span>
                  {n.text}
                </div>
              );
            })}
            <p className="mt-6 text-center text-[11.5px] text-faint">Illustrative example</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
