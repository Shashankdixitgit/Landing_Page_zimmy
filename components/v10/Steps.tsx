import { ArrowRight, Check, FileText, ShieldCheck } from "lucide-react";
import Reveal from "../Reveal";

/**
 * Okara's three-beat spine — research, execution, publish — told with HitRate's
 * actual order: it reads your category first, every job runs off that one read,
 * and nothing leaves without your yes.
 */

function Card({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div className="rounded-xl border border-ok-line bg-ok-card p-4">
      <p className="ok-label mb-3 text-ok-faint">{label}</p>
      {children}
    </div>
  );
}

function ResearchMock() {
  const docs = ["What your app is, from its store page", "Your reviews, summed up", "The apps your users also watch", "Their winning videos and ads", "The formats that repeat"];
  return (
    <Card label="Read before anything is written">
      <ul className="space-y-1.5">
        {docs.map((d) => (
          <li key={d} className="flex items-center gap-2.5 rounded-lg border border-ok-hair bg-ok-raise px-3 py-2.5">
            <FileText className="h-3.5 w-3.5 shrink-0 text-ok-faint" />
            <span className="flex-1 text-[13px] text-ok-text">{d}</span>
            <span className="ok-label text-ok-faint">Ready</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function ExecutionMock() {
  const jobs: [string, string][] = [
    ["01", "Scripts written from the winners"],
    ["02", "A calendar with one on every slot"],
    ["03", "AI UGC videos cut from the scripts"],
    ["04", "Posted to the accounts you pick"],
    ["05", "Read back as installs per format"],
  ];
  return (
    <Card label="Everything runs off that one read">
      <ul className="space-y-1.5">
        {jobs.map(([n, t]) => (
          <li key={n} className="flex items-center gap-3 rounded-lg border border-ok-hair bg-ok-raise px-3 py-2.5">
            <span className="ok-label text-ok-faint">{n}</span>
            <span className="flex-1 text-[13px] text-ok-text">{t}</span>
            <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ok-faint" />
          </li>
        ))}
      </ul>
    </Card>
  );
}

function PublishMock() {
  return (
    <Card label="Waiting on you">
      <div className="rounded-lg border border-ok-hair bg-ok-raise p-3.5">
        <p className="text-[13px] text-ok-text">Tuesday · Before / after · 30 days in</p>
        <p className="mt-1 text-[12.5px] text-ok-muted">15s · captions on · your TikTok account</p>
        <div className="mt-3 flex gap-1.5">
          <span className="rounded-[9px] bg-ok-green px-3 py-1.5 text-[12.5px] font-medium text-ok-bg">Approve</span>
          <span className="rounded-[9px] border border-ok-line px-3 py-1.5 text-[12.5px] font-medium text-ok-muted">Redo the hook</span>
          <span className="rounded-[9px] border border-ok-line px-3 py-1.5 text-[12.5px] font-medium text-ok-muted">Skip</span>
        </div>
      </div>
      <p className="mt-3 flex items-center gap-2 text-[12.5px] text-ok-muted">
        <ShieldCheck className="h-3.5 w-3.5 text-ok-green" /> Nothing goes out in your name without this.
      </p>
    </Card>
  );
}

const STEPS = [
  {
    n: "Step 1",
    title: "It reads your category before it writes a word.",
    body: "Paste your link and HitRate reads your app, sums up your store reviews, finds the apps your users also watch, and pulls the videos and ads winning for them — market by market. Every later answer comes from that read, not from a blank page.",
    status: "Live today",
    mock: <ResearchMock />,
  },
  {
    n: "Step 2",
    title: "Every job runs from that same read.",
    body: "Scripts, a calendar, AI UGC versions of the ones you like, posted to the accounts you choose. Ask in the thread and the next piece comes back built on what already works in your category.",
    status: "Scripts and calendar live · videos and posting in early access",
    mock: <ExecutionMock />,
  },
  {
    n: "Step 3",
    title: "Nothing publishes without your yes.",
    body: "Every script, video and post waits for you. Approve it, ask for another hook, or skip it. You also choose whether it goes out from your own accounts or from warmed-up AI UGC accounts.",
    status: "Early access",
    mock: <PublishMock />,
  },
];

export default function Steps() {
  return (
    <section id="how" className="border-b border-ok-hair px-5 py-24 sm:py-28">
      <div className="mx-auto max-w-[1100px]">
        <Reveal>
          <p className="ok-label text-ok-faint">How it works</p>
          <h2 className="ok-h mt-4 max-w-2xl text-[36px] text-white sm:text-[48px]">
            Research first. Then everything else.
          </h2>
        </Reveal>

        <div className="mt-16 space-y-20">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
              <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                <p className="ok-label text-ok-green">{s.n}</p>
                <h3 className="ok-h mt-4 text-[28px] text-white sm:text-[34px]">{s.title}</h3>
                <p className="mt-5 max-w-md text-[15.5px] leading-relaxed text-ok-muted">{s.body}</p>
                <p className="mt-5 inline-flex items-center gap-2 rounded-md border border-ok-line px-2.5 py-1 text-[12.5px] text-ok-muted">
                  <Check className="h-3.5 w-3.5 text-ok-green" /> {s.status}
                </p>
              </div>
              <div className={i % 2 === 1 ? "lg:order-1" : ""}>{s.mock}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
