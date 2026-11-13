"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Loader2, MessageCircle, RotateCcw, Search } from "lucide-react";
import { Chip } from "./ui";
import { PLATFORMS } from "@/lib/creatorForm";
import { signinHref } from "@/lib/creatorAuth";
import { lookupProfile, readHandle, type LookupPlatform, type ProfilePreview } from "@/lib/profilePreview";

const fmt = (n: number) =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1)}M` : n >= 10_000 ? `${Math.round(n / 1000)}K` : n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
const money = (n: number) => `$${n.toLocaleString("en-US")}`;
const pct = (r: number) => `${(r * 100).toFixed(r < 0.1 ? 1 : 0)}%`;

type Stage = "ask" | "loading" | "result" | "error";

/**
 * Step zero of the creator sign-up: pick a platform, type a username or paste a
 * link, and see what HitRate reads from the public profile before any form.
 */
export default function ProfileLookup({
  initial,
  auto,
  onContinue,
  onManual,
}: {
  initial: string;
  /** Read `initial` straight away (a link carried from /creators). */
  auto: boolean;
  onContinue: (preview: ProfilePreview) => void;
  onManual: (picked: { platform: LookupPlatform; handle: string } | null) => void;
}) {
  // A link pasted on /creators arrives as ?u= and is read straight away.
  const [first] = useState(() => (auto ? readHandle(initial, "instagram") : null));
  const [platform, setPlatform] = useState<LookupPlatform>(first?.platform ?? "instagram");
  const [input, setInput] = useState(initial);
  const [stage, setStage] = useState<Stage>(first ? "loading" : "ask");
  const [preview, setPreview] = useState<ProfilePreview | null>(null);
  const [message, setMessage] = useState("");
  const [hint, setHint] = useState("");
  const started = useRef(false);

  const target = readHandle(input, platform);

  function land(r: Awaited<ReturnType<typeof lookupProfile>>) {
    if (r.ok) {
      setPreview(r.preview);
      setStage("result");
    } else if (r.signedOut) {
      // The session ran out on this page: sign in again and come back to it.
      window.location.assign(signinHref(`${window.location.pathname}${window.location.search}`));
    } else {
      setMessage(r.message);
      setStage("error");
    }
  }

  useEffect(() => {
    if (started.current || !first) return;
    started.current = true;
    lookupProfile(first.platform, first.handle).then(land);
  }, [first]);

  async function run(p: LookupPlatform, handle: string) {
    setStage("loading");
    setHint("");
    land(await lookupProfile(p, handle));
  }

  function submit() {
    if (!target) return setHint("Enter your username, like @yourname, or paste your profile link.");
    setPlatform(target.platform);
    void run(target.platform, target.handle);
  }

  if (stage === "loading") {
    return (
      <div className="pop py-6 text-center" role="status" aria-live="polite">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-mint text-accent">
          <Loader2 className="h-6 w-6 animate-spin" />
        </span>
        <h1 className="display mt-6 text-[30px] text-ink sm:text-[38px]">Reading @{target?.handle ?? ""}</h1>
        <p className="mx-auto mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
          Your recent posts, your numbers and the comments people leave. This can take up to a minute.
        </p>
        <div className="mx-auto mt-8 max-w-sm space-y-2.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-3 animate-pulse rounded-full bg-soft" style={{ width: `${92 - i * 18}%`, animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>
    );
  }

  if (stage === "error") {
    return (
      <div className="pop">
        <h1 className="display text-[30px] text-ink sm:text-[38px]">We couldn&rsquo;t read that profile.</h1>
        <p className="mt-3 rounded-xl bg-[#fdecea] px-4 py-3 text-[14px] text-[#a1302a]" role="alert">
          {message}
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <button type="button" onClick={() => onManual(target)} className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white hover:bg-accent-hover">
            Fill in by hand <ArrowRight className="h-4 w-4" />
          </button>
          <button type="button" onClick={() => setStage("ask")} className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[15px] font-medium text-muted hover:text-ink">
            <RotateCcw className="h-4 w-4" /> Try another username
          </button>
        </div>
      </div>
    );
  }

  if (stage === "result" && preview) return <ResultCard p={preview} onContinue={() => onContinue(preview)} onBack={() => setStage("ask")} />;

  return (
    <div className="pop">
      <p className="text-[13px] font-medium text-accent">Start here</p>
      <h1 className="display mt-2 text-[32px] text-ink sm:text-[42px]">Where do you post most?</h1>
      <p className="mt-2 text-[15px] text-muted">Enter your username or paste your profile link, and we&rsquo;ll read your public profile: your numbers, your top posts and who comments.</p>

      <div className="mt-8 flex flex-wrap gap-2" role="radiogroup" aria-label="Platform">
        {PLATFORMS.map((p) => {
          const on = platform === p.id;
          return (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => setPlatform(p.id)}
              className={`rounded-full border px-4 py-2.5 text-[14px] font-medium transition-colors ${on ? "border-accent bg-mint text-accent" : "border-line bg-surface text-ink hover:border-ink/25"}`}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <form
        className="mt-5 flex flex-col gap-2 sm:flex-row"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-2xl border border-line bg-surface px-4 focus-within:border-accent">
          <Search className="h-4 w-4 shrink-0 text-faint" />
          <input
            value={input}
            onChange={(e) => {
              setHint("");
              setInput(e.target.value);
            }}
            placeholder="@yourname or your profile link"
            autoComplete="off"
            spellCheck={false}
            aria-label="Your username or profile link"
            className="min-w-0 flex-1 bg-transparent py-3.5 text-[15px] text-ink outline-none placeholder:text-faint"
          />
        </label>
        <button className="inline-flex items-center justify-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-accent-hover">
          Read my profile <ArrowRight className="h-4 w-4" />
        </button>
      </form>
      {hint ? <p className="mt-3 text-[13.5px] text-[#a1302a]" role="alert">{hint}</p> : null}
      <p className="mt-4 text-[12.5px] text-faint">Public posts only. No password, no account connection.</p>

      <button type="button" onClick={() => onManual(target)} className="mt-8 text-[14px] font-medium text-muted underline-offset-4 hover:text-ink hover:underline">
        Skip and fill in by hand
      </button>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="rounded-2xl bg-paper px-4 py-3.5">
      <p className="text-[12.5px] text-muted">{label}</p>
      <p className="display mt-1 text-[26px] text-ink">{value}</p>
      {sub ? <p className="text-[12px] text-faint">{sub}</p> : null}
    </div>
  );
}

function ResultCard({ p, onContinue, onBack }: { p: ProfilePreview; onContinue: () => void; onBack: () => void }) {
  const label = PLATFORMS.find((x) => x.id === p.platform)?.label ?? p.platform;
  return (
    <div className="pop">
      <p className="text-[13px] font-medium text-accent">Here&rsquo;s what we read</p>
      <div className="mt-3 flex items-center gap-3.5">
        {p.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={p.avatar} alt="" className="h-14 w-14 shrink-0 rounded-full border border-line object-cover" />
        ) : (
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-mint text-[20px] font-semibold text-accent">{(p.name || p.handle).charAt(0).toUpperCase()}</span>
        )}
        <div className="min-w-0">
          <h1 className="display truncate text-[28px] text-ink sm:text-[34px]">{p.name || `@${p.handle}`}</h1>
          <p className="text-[14px] text-muted">
            @{p.handle} · {label}
          </p>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-2 gap-2.5">
        <Stat label="Followers" value={fmt(p.followers)} />
        <Stat
          label="Average views"
          value={p.avgViews != null ? fmt(p.avgViews) : "Hidden"}
          sub={p.avgViews != null && p.medianViews != null ? `Typical post: ${fmt(p.medianViews)}` : p.avgViews == null ? `${label} doesn't publish views here` : undefined}
        />
        <Stat
          label="Engagement rate"
          value={p.engagementRate != null ? pct(p.engagementRate) : "–"}
          sub={p.engagementBasis === "views" ? "Of views, typical post" : "Of followers, typical post"}
        />
        <Stat label="Posts read" value={String(p.postsRead)} sub={`Over the last ${p.spanDays} days`} />
      </div>

      {p.estimate ? (
        <div className="mt-2.5 rounded-2xl bg-mint px-4 py-4">
          <div className="flex items-center gap-2">
            <p className="text-[13px] font-medium text-accent">Estimated price per post</p>
            <Chip>Estimate</Chip>
          </div>
          <p className="display mt-1 text-[30px] text-ink">
            {money(p.estimate.priceLow)}–{money(p.estimate.priceHigh)}
          </p>
          <p className="text-[13.5px] text-ink/80">
            Estimated CPM {money(p.estimate.cpmLow)}–{money(p.estimate.cpmHigh)} per 1,000 views
          </p>
          <p className="mt-2 text-[12.5px] leading-relaxed text-muted">{p.estimate.note}</p>
        </div>
      ) : (
        <p className="mt-2.5 rounded-2xl bg-soft px-4 py-3 text-[13px] text-muted">
          No price estimate: it&rsquo;s worked out from views, and we couldn&rsquo;t see views for this account.
        </p>
      )}

      {p.topPosts.length ? (
        <div className="mt-7">
          <h2 className="text-[14px] font-medium text-ink">Top posts</h2>
          <ul className="mt-2.5 space-y-2">
            {p.topPosts.map((t) => (
              <li key={t.url || t.text}>
                <a href={t.url?.startsWith("https://") ? t.url : undefined} target="_blank" rel="noreferrer" className="block rounded-2xl border border-line px-4 py-3 transition-colors hover:border-ink/25">
                  <p className="line-clamp-2 text-[14px] leading-snug text-ink">{t.text || "Untitled post"}</p>
                  <p className="mt-1 text-[12.5px] text-muted">
                    {p.hasViews ? `${fmt(t.views)} views · ` : ""}
                    {fmt(t.likes)} likes · {fmt(t.comments)} comments
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-7 rounded-2xl border border-line px-4 py-4">
        <h2 className="flex items-center gap-2 text-[14px] font-medium text-ink">
          <MessageCircle className="h-4 w-4 text-accent" /> Your audience
        </h2>
        {p.audience ? (
          <>
            {p.audience.demographics ? (
              <dl className="mt-3 space-y-2.5">
                {[
                  ["Country", p.audience.demographics.countries.map((c) => `${c.label} ${c.pct}%`).join(" · ")],
                  ["Age group", p.audience.demographics.age.map((c) => `${c.label} ${c.pct}%`).join(" · ")],
                  ["Gender", p.audience.demographics.gender ? `${p.audience.demographics.gender.women}% women · ${p.audience.demographics.gender.men}% men` : ""],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line pb-2.5 last:border-0 last:pb-0">
                    <dt className="text-[13px] text-muted">{k}</dt>
                    <dd className="text-right text-[14.5px] font-medium text-ink">{v || "Not clear from comments"}</dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink">{p.audience.who}</p>
            )}
            {p.audience.asks.length ? (
              <>
                <p className="mt-3.5 text-[12.5px] font-medium text-muted">What they ask for</p>
                <ul className="mt-1 space-y-1">
                  {p.audience.asks.map((a) => (
                    <li key={a} className="text-[14px] text-ink">&ldquo;{a}&rdquo;</li>
                  ))}
                </ul>
              </>
            ) : null}
            <p className="mt-3 text-[12px] text-faint">
              Estimated from {p.audience.commentsRead} recent comments: names, language and what people wrote
              {p.audience.demographics ? `. Confidence: ${p.audience.demographics.confidence}.` : "."} Your platform analytics are more exact.
            </p>
          </>
        ) : (
          <p className="mt-2 text-[14px] text-muted">We couldn&rsquo;t read comments for this account, so you can tell us about your audience in the form.</p>
        )}
      </div>

      <div className="mt-9 flex flex-wrap items-center justify-between gap-3">
        <button type="button" onClick={onBack} className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[15px] font-medium text-muted hover:text-ink">
          <RotateCcw className="h-4 w-4" /> Not you?
        </button>
        <button type="button" onClick={onContinue} className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-accent-hover">
          Looks right, continue <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
