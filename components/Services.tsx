import { Search, MessagesSquare, PenLine, LineChart, Link2 } from "lucide-react";
import Reveal from "./Reveal";
import { SectionHead } from "./ui";

// Mock-up data for the illustrations below. Illustrative only.
const SHORTLIST = [
  { h: "@noor.cooks", n: "Food · 212K", fit: 94 },
  { h: "@devwithjay", n: "Tech · 84K", fit: 91 },
  { h: "@sana.skin", n: "Beauty · 560K", fit: 87 },
];

const BARS = [38, 52, 44, 70, 62, 88, 96];

function Discovery() {
  return (
    <div className="space-y-2.5">
      {SHORTLIST.map((r) => (
        <div key={r.h} className="flex items-center gap-3 rounded-xl border border-line bg-slate px-3 py-2.5">
          <span className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-accent to-violet" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13.5px] font-semibold text-snow">{r.h}</p>
            <p className="text-[11.5px] text-muted">{r.n}</p>
          </div>
          <div className="w-20">
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-lime" style={{ width: `${r.fit}%` }} />
            </div>
            <p className="mt-1 text-right text-[11px] font-semibold text-lime">{r.fit}% fit</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Outreach() {
  return (
    <div className="space-y-2.5 text-[13px]">
      <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-slate px-3.5 py-2.5 text-snow/85">
        Love the brief! My rate for one Reel is $1,400.
      </div>
      <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-accent px-3.5 py-2.5 text-white">
        Could we do $1,100 with 30 days of paid usage included?
      </div>
      <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-slate px-3.5 py-2.5 text-snow/85">
        Deal. Going live on the 14th.
      </div>
    </div>
  );
}

function Scripts() {
  return (
    <div className="rounded-xl border border-line bg-slate p-4 text-[13px] leading-relaxed">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Hook · 0–3s</p>
      <p className="mt-1 font-medium text-snow">
        &ldquo;I didn&rsquo;t believe it either, until <mark className="rounded bg-accent/25 px-1 text-snow">day three</mark>.&rdquo;
      </p>
      <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Talking points</p>
      <p className="mt-1 text-snow/70">Show the unboxing, the first use, and one honest downside.</p>
      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white/[0.06] px-2.5 py-1 text-[11.5px] text-snow/80">
        <Link2 className="h-3 w-3" /> yourbrand.com/?utm=noor_cooks
      </span>
    </div>
  );
}

function Attribution() {
  return (
    <div className="rounded-xl border border-line bg-slate p-4">
      <div className="flex items-baseline justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Revenue by week</p>
        <p className="text-[11.5px] font-semibold text-lime">from BigQuery</p>
      </div>
      <div className="mt-4 flex h-24 items-end gap-2">
        {BARS.map((b, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-md ${i === BARS.length - 1 ? "bg-accent" : "bg-white/15"}`}
            style={{ height: `${b}%` }}
          />
        ))}
      </div>
    </div>
  );
}

const SERVICES = [
  {
    icon: Search,
    title: "Creator discovery",
    body: "Tell Zimmy your audience, budget and brand voice. It searches the Modash creator database and hands you a vetted shortlist, ranked by how likely each creator is to perform for you. You approve who makes the cut.",
    visual: <Discovery />,
  },
  {
    icon: MessagesSquare,
    title: "Outreach & negotiation",
    body: "Zimmy reaches out over email and DM, negotiates rates and usage rights, and locks go-live dates. No inbox juggling, no chasing.",
    visual: <Outreach />,
  },
  {
    icon: PenLine,
    title: "Scripts & hooks",
    body: "Every creator gets a brief and script written in their own voice, plus a unique tracking link. You sign off before anything goes out.",
    visual: <Scripts />,
  },
  {
    icon: LineChart,
    title: "Revenue attribution",
    body: "Connect BigQuery and every link is tied to the clicks and sales it drove. See which creators actually move revenue, not just views.",
    visual: <Attribution />,
  },
];

export default function Services() {
  return (
    <section id="what" className="py-24 sm:py-36">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <SectionHead
            eyebrow="What Zimmy does"
            title={
              <>
                Everything an influencer team does,{" "}
                <span className="serif text-accent-soft">without the team.</span>
              </>
            }
            sub="Four jobs that usually take an agency or three hires. Zimmy runs all of them as one connected workflow, so nothing falls between the cracks."
          />
        </Reveal>

        <Reveal stagger={0.1} className="mt-14 grid gap-5 md:grid-cols-2">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <article key={s.title} className="card group flex flex-col overflow-hidden p-7 transition-colors hover:border-line-strong">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-accent/15 text-accent">
                    <Icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <h3 className="font-display text-[22px] font-bold tracking-tight text-snow">{s.title}</h3>
                </div>
                <p className="mt-4 text-[15.5px] leading-relaxed text-muted">{s.body}</p>
                <div className="mt-7 flex-1">{s.visual}</div>
              </article>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
