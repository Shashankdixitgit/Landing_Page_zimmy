"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Check, ImagePlus, Loader2, LogIn, Sparkles, X } from "lucide-react";
import { PLATFORMS, STEPS, TIERS, tierFor, type Field, type Tier } from "@/lib/creatorForm";
import { submitApplication, uploadScreenshot } from "@/lib/publicSupabase";
import ProfileLookup from "./ProfileLookup";
import { fetchMe, signinHref } from "@/lib/creatorAuth";
import { ageGroupFor, audienceCountries, frequencyFor, genderFor, planHref, viewsBucket, type LookupPlatform, type ProfilePreview } from "@/lib/profilePreview";

type Answers = Record<string, string | string[]>;

const MAX_MB = 8;

export default function CreatorJoinForm({ initialLink = "" }: { initialLink?: string }) {
  // Reading a profile costs money, so it needs a signed-in creator. Checked once, on arrival.
  const [auth, setAuth] = useState<"checking" | "in" | "out">("checking");
  // The profile lookup comes first; the eight form steps follow it.
  const [lookingUp, setLookingUp] = useState(true);
  // A link carried from /creators is read once, on arrival; coming back here does not re-read it.
  const [autoLookup, setAutoLookup] = useState(Boolean(initialLink));
  const [previewed, setPreviewed] = useState<ProfilePreview | null>(null);
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({});
  const [followers, setFollowers] = useState<Record<string, string>>({});
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "reading" | "sending" | "done">("idle");
  const [prefilled, setPrefilled] = useState<Set<string>>(new Set());
  const [lookedUp, setLookedUp] = useState("");
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let live = true;
    fetchMe().then((me) => {
      if (!live) return;
      if (me.signedIn && me.email) {
        // The account's email is the one we reply to; the creator can still change it.
        const email = me.email;
        setA((x) => (x.email ? x : { ...x, email }));
        setPrefilled((cur) => new Set([...cur, "email"]));
      }
      setAuth(me.signedIn ? "in" : "out");
    });
    return () => {
      live = false;
    };
  }, []);

  const total = STEPS.length;
  const s = STEPS[step];

  const platforms = PLATFORMS.filter((p) => String(a[`handle_${p.id}`] ?? "").trim());
  const maxFollowers = Math.max(0, ...platforms.map((p) => Number(followers[p.id] || 0)));
  const tier: Tier = tierFor(maxFollowers);
  const tierInfo = TIERS.find((t) => t.id === tier)!;
  const inr = a.country === "India";

  const visible = useMemo(() => s.fields.filter((f) => !f.showFor || f.showFor.includes(tier)), [s, tier]);

  const set = (id: string, v: string | string[]) => {
    setError("");
    setA((x) => ({ ...x, [id]: v }));
  };

  const validate = (): string => {
    if (s.id === "handles" && platforms.length === 0) return "Add at least one handle.";
    for (const f of visible) {
      if (!f.required) continue;
      if (f.type === "followers") {
        const missing = platforms.filter((p) => !Number(followers[p.id]));
        if (missing.length) return `Add your ${missing[0].label} follower count.`;
        continue;
      }
      const v = a[f.id];
      if (!v || (Array.isArray(v) && v.length === 0) || (typeof v === "string" && !v.trim())) return `Please answer: ${f.label}`;
      if (f.type === "email" && typeof v === "string" && !/^\S+@\S+\.\S+$/.test(v)) return "That email doesn't look right.";
    }
    return "";
  };

  const next = async () => {
    const e = validate();
    if (e) return setError(e);
    if (s.id === "handles") await readProfiles();
    if (step < total - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    // submit
    setStatus("sending");
    try {
      const folder = crypto.randomUUID();
      const paths: string[] = [];
      for (let i = 0; i < files.length; i++) paths.push(await uploadScreenshot(folder, files[i], i));
      // keep only answers for fields this tier actually saw
      const seen = new Set(STEPS.flatMap((st) => st.fields.filter((f) => !f.showFor || f.showFor.includes(tier)).map((f) => f.id)));
      const answers: Answers = {};
      for (const [k, v] of Object.entries(a)) if (seen.has(k)) answers[k] = v;
      await submitApplication({
        email: String(a.email).trim(),
        country: a.country ?? null,
        tier,
        max_followers: maxFollowers,
        answers: { ...answers, followers: Object.fromEntries(platforms.map((p) => [p.id, Number(followers[p.id] || 0)])) },
        screenshots: paths,
      });
      setStatus("done");
    } catch {
      setStatus("idle");
      setError("Something went wrong sending your details. Please try again.");
    }
  };

  // Read public profiles (Instagram, TikTok, YouTube) and prefill steps 3-5. Only fills empty answers.
  const readProfiles = async () => {
    const targets = platforms.filter((p) => p.id !== "x" && p.id !== previewed?.platform).map((p) => [p.id, String(a[`handle_${p.id}`]).trim()] as const);
    const sig = targets.map((t) => t.join(":")).join("|");
    if (!targets.length || sig === lookedUp) return;
    setLookedUp(sig);
    setStatus("reading");
    try {
      // Any request to the app refreshes an expiring sign-in, so the lookups below don't 401.
      await fetch("/creators/app/api/auth/me", { cache: "no-store" }).catch(() => null);
      const results = (
        await Promise.all(
          targets.map(([platform, handle]) =>
            fetch(`/api/creator-lookup?platform=${platform}&handle=${encodeURIComponent(handle)}`)
              .then((r) => (r.ok ? r.json() : null))
              .catch(() => null)
          )
        )
      ).filter((r) => r && r.ok) as {
        platform: string;
        followers: number | null;
        avg_views: string | null;
        niches: string[];
        audience_countries: string[];
        audience_age: string | null;
        audience_gender: string | null;
      }[];
      if (!results.length) return;
      const filled = new Set<string>();
      const nextFollowers = { ...followers };
      for (const r of results) {
        if (r.followers && !followers[r.platform]) {
          nextFollowers[r.platform] = String(r.followers);
          filled.add("followers");
        }
      }
      setFollowers(nextFollowers);
      // the biggest account speaks for the audience
      const main = [...results].sort((x, y) => (y.followers ?? 0) - (x.followers ?? 0))[0];
      const niches = [...new Set(results.flatMap((r) => r.niches))].slice(0, 3);
      const fill: Answers = {};
      if (main.avg_views && !a.avg_views) fill.avg_views = main.avg_views;
      if (niches.length && !(a.niches as string[] | undefined)?.length) fill.niches = niches;
      if (main.audience_countries.length && !(a.audience_countries as string[] | undefined)?.length) fill.audience_countries = main.audience_countries;
      if (main.audience_age && !a.audience_age) fill.audience_age = main.audience_age;
      if (main.audience_gender && !a.audience_gender) fill.audience_gender = main.audience_gender;
      Object.keys(fill).forEach((k) => filled.add(k));
      setA((x) => ({ ...x, ...fill }));
      setPrefilled((cur) => new Set([...cur, ...filled]));
    } finally {
      setStatus("idle");
    }
  };

  // Fill the form from the profile lookup. The creator can still change all of it.
  const applyPreview = (pv: ProfilePreview) => {
    setAutoLookup(false);
    setPreviewed(pv);
    const id = pv.platform as LookupPlatform;
    const fill: Answers = { [`handle_${id}`]: `@${pv.handle}` };
    const filled = new Set<string>([`handle_${id}`]);
    if (pv.followers > 0) {
      setFollowers((x) => ({ ...x, [id]: String(pv.followers) }));
      filled.add("followers");
    }
    const views = viewsBucket(pv.medianViews ?? pv.avgViews);
    if (views) fill.avg_views = views;
    if (pv.niches.length) fill.niches = pv.niches.slice(0, 3);
    const demo = pv.audience?.demographics;
    const countries = pv.audience ? audienceCountries(demo?.countries.length ? demo.countries.map((c) => c.label) : pv.audience.countries) : [];
    if (countries.length) fill.audience_countries = countries;
    const age = ageGroupFor(demo?.age);
    if (age) fill.audience_age = age;
    const gender = genderFor(demo?.gender);
    if (gender) fill.audience_gender = gender;
    const freq = frequencyFor(pv.postsPerWeek);
    if (freq) fill.posting_frequency = freq;
    Object.keys(fill).forEach((k) => filled.add(k));
    setA((x) => ({ ...x, ...fill }));
    setPrefilled((cur) => new Set([...cur, ...filled]));
    setLookingUp(false);
  };

  const manual = (picked: { platform: LookupPlatform; handle: string } | null) => {
    setAutoLookup(false);
    if (picked) setA((x) => ({ ...x, [`handle_${picked.platform}`]: `@${picked.handle}` }));
    setLookingUp(false);
  };

  // The profile the 60-day plan starts from: the one we read, else the biggest one entered.
  const planFor = (): string | null => {
    if (previewed && previewed.platform !== "linkedin") return planHref(previewed.platform, previewed.handle);
    const main = [...platforms].sort((x, y) => Number(followers[y.id] || 0) - Number(followers[x.id] || 0))[0];
    const handle = main ? String(a[`handle_${main.id}`] ?? "").trim().replace(/^@/, "") : "";
    return main && handle ? planHref(main.id, handle) : null;
  };

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    const imgs = Array.from(list).filter((f) => f.type.startsWith("image/"));
    const big = imgs.find((f) => f.size > MAX_MB * 1024 * 1024);
    if (big) setError(`${big.name} is over ${MAX_MB} MB.`);
    setFiles((cur) => [...cur, ...imgs.filter((f) => f.size <= MAX_MB * 1024 * 1024)].slice(0, 5));
  };

  if (auth === "checking") {
    return (
      <div className="mx-auto max-w-2xl py-10 text-center" role="status" aria-live="polite">
        <Loader2 className="mx-auto h-6 w-6 animate-spin text-accent" />
      </div>
    );
  }

  if (auth === "out") {
    const back = `/creators/join${initialLink ? `?u=${encodeURIComponent(initialLink)}` : ""}`;
    return (
      <div className="pop mx-auto max-w-xl text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-mint text-accent">
          <LogIn className="h-7 w-7" strokeWidth={2} />
        </span>
        <h1 className="display mt-6 text-[32px] text-ink sm:text-[40px]">Sign in to read your profile.</h1>
        <p className="mx-auto mt-4 max-w-md text-[15.5px] leading-relaxed text-muted">
          We read your public posts, your numbers and who comments. Sign in first, with Google or a code sent to your email, and we&rsquo;ll bring you straight back here.
        </p>
        <a href={signinHref(back)} className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-[15.5px] font-semibold text-white transition-colors hover:bg-accent-hover">
          Sign in to continue
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </a>
        <p className="mt-5 text-[13.5px] text-muted">No password. Free.</p>
      </div>
    );
  }

  if (lookingUp) {
    return (
      <div className="mx-auto max-w-2xl">
        <ProfileLookup initial={previewed ? `@${previewed.handle}` : initialLink} auto={autoLookup} onContinue={applyPreview} onManual={manual} />
      </div>
    );
  }

  if (status === "done") {
    const plan = planFor();
    return (
      <div className="pop mx-auto max-w-xl text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-mint text-accent">
          <CalendarDays className="h-7 w-7" strokeWidth={2} />
        </span>
        <h2 className="display mt-6 text-[32px] text-ink sm:text-[40px]">Let&rsquo;s schedule your next 60 days of content.</h2>
        <p className="mx-auto mt-4 inline-flex rounded-full bg-mint px-4 py-1.5 text-[14px] font-medium text-accent">We&rsquo;ll reach out within 48 hours.</p>
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
          You&rsquo;re in as a <span className="font-medium text-ink">{tierInfo.label} creator</span>. Next, HitRate reads your last 60 days
          against your own median and writes your first 7 days of posts, free.
        </p>
        {plan ? (
          <a href={plan} className="group mt-8 inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-[15.5px] font-semibold text-white transition-colors hover:bg-accent-hover">
            Plan my next 60 days
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        ) : null}
        <p className="mt-6 text-[13.5px] text-muted">
          We&rsquo;ll also email you at <span className="font-medium text-ink">{String(a.email)}</span> once brand deals open and one fits your audience.
        </p>
        <a href="/creators" className="mt-4 inline-block py-2 text-[14px] font-medium text-muted hover:text-ink">
          Back to HitRate for creators
        </a>
      </div>
    );
  }

  const renderField = (f: Field) => {
    const v = a[f.id];
    const base = "w-full rounded-2xl border border-line bg-surface px-4 py-3.5 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-accent";
    switch (f.type) {
      case "text":
      case "email":
      case "tel":
        return <input type={f.type} value={(v as string) ?? ""} placeholder={f.placeholder} onChange={(e) => set(f.id, e.target.value)} onKeyDown={(e) => e.key === "Enter" && next()} className={base} autoComplete={f.type === "email" ? "email" : f.type === "tel" ? "tel" : "off"} />;
      case "textarea":
        return <textarea value={(v as string) ?? ""} placeholder={f.placeholder} rows={3} onChange={(e) => set(f.id, e.target.value)} className={`${base} resize-none`} />;
      case "select":
        return (
          <div className="flex flex-wrap gap-2">
            {f.options!.map((o) => {
              const label = o.includes(" | ") ? (inr ? o.split(" | ")[0] : o.split(" | ")[1]) : o;
              const on = v === o;
              return (
                <button key={o} type="button" onClick={() => set(f.id, o)} className={`rounded-full border px-4 py-2.5 text-[14px] font-medium transition-colors ${on ? "border-accent bg-mint text-accent" : "border-line bg-surface text-ink hover:border-ink/25"}`}>
                  {label}
                </button>
              );
            })}
          </div>
        );
      case "chips":
      case "multiselect": {
        const cur = (v as string[]) ?? [];
        return (
          <div className="flex flex-wrap gap-2">
            {f.options!.map((o) => {
              const on = cur.includes(o);
              const full = !on && f.max !== undefined && cur.length >= f.max;
              return (
                <button key={o} type="button" disabled={full} onClick={() => set(f.id, on ? cur.filter((x) => x !== o) : [...cur, o])} className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2.5 text-[14px] font-medium transition-colors disabled:opacity-40 ${on ? "border-accent bg-mint text-accent" : "border-line bg-surface text-ink hover:border-ink/25"}`}>
                  {on ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : null}
                  {o}
                </button>
              );
            })}
          </div>
        );
      }
      case "followers":
        return (
          <div className="space-y-2.5">
            {platforms.map((p) => (
              <label key={p.id} className="flex min-w-0 items-center gap-3 rounded-2xl border border-line bg-surface px-4 py-2 focus-within:border-accent">
                <span className="w-20 shrink-0 text-[14px] font-medium text-ink sm:w-24">{p.label}</span>
                <input inputMode="numeric" value={followers[p.id] ?? ""} placeholder={f.placeholder} onChange={(e) => { setError(""); setFollowers((x) => ({ ...x, [p.id]: e.target.value.replace(/[^0-9]/g, "") })); }} className="min-w-0 flex-1 bg-transparent py-1.5 text-[15px] text-ink outline-none placeholder:text-faint" />
                <span className="hidden text-[12.5px] text-muted sm:inline">followers</span>
              </label>
            ))}
            {maxFollowers > 0 ? (
              <p className="pop inline-flex items-center gap-2 rounded-full bg-sky px-3.5 py-1.5 text-[13px] font-medium text-[#235a80]">
                You&rsquo;re a {tierInfo.label} creator · {tierInfo.range}
              </p>
            ) : null}
          </div>
        );
      case "files":
        return (
          <div>
            <button type="button" onClick={() => fileInput.current?.click()} disabled={files.length >= 5} className="flex w-full flex-col items-center justify-center gap-2 rounded-[20px] border-2 border-dashed border-line bg-surface px-6 py-10 text-center transition-colors hover:border-accent disabled:opacity-50" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-mint text-accent">
                <ImagePlus className="h-6 w-6" strokeWidth={1.8} />
              </span>
              <span className="text-[15px] font-medium text-ink">{files.length >= 5 ? "5 of 5 added" : "Tap to add screenshots"}</span>
              <span className="text-[12.5px] text-muted">PNG, JPG or HEIC · up to {MAX_MB} MB each · {files.length}/5</span>
            </button>
            <input ref={fileInput} type="file" accept="image/*" multiple className="hidden" onChange={(e) => { addFiles(e.target.files); e.target.value = ""; }} />
            {files.length ? (
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-5">
                {files.map((file, i) => (
                  <div key={i} className="relative aspect-[9/16] overflow-hidden rounded-xl border border-line bg-soft">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={URL.createObjectURL(file)} alt={file.name} className="h-full w-full object-cover" />
                    <button type="button" aria-label={`Remove ${file.name}`} onClick={() => setFiles((x) => x.filter((_, k) => k !== i))} className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-ink/70 text-white">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : null}
            <p className="mt-3 text-[12.5px] text-muted">Only the HitRate team can see these. You can skip this step. Verified numbers will help you get better offers when brand deals open.</p>
          </div>
        );
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* progress */}
      <div className="flex items-center justify-between text-[13px] font-medium">
        <span className="text-accent">
          {step + 1} / {total}
        </span>
        <span className="text-muted">{total - step - 1 === 0 ? "Last step" : `${total - step - 1} to go`}</span>
      </div>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-soft">
        <div className="h-full rounded-full bg-accent transition-all duration-500" style={{ width: `${((step + 1) / total) * 100}%` }} />
      </div>

      <div key={step} className="pop mt-10">
        <h1 className="display text-[32px] text-ink sm:text-[42px]">{s.title}</h1>
        <p className="mt-2 text-[15px] text-muted">{s.help}</p>

        {visible.some((f) => prefilled.has(f.id)) ? (
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-mint px-3.5 py-1.5 text-[13px] font-medium text-accent">
            <Sparkles className="h-3.5 w-3.5" /> Filled from your public profile. Check it and edit anything that&rsquo;s off.
          </p>
        ) : null}

        <div className="mt-8 space-y-7">
          {visible.map((f) => (
            <div key={f.id}>
              {f.type !== "files" ? (
                <p className="mb-2.5 text-[14px] font-medium text-ink">
                  {f.label}
                  {f.required ? null : f.label.includes("optional") ? null : <span className="font-normal text-faint"> · optional</span>}
                  {f.max && f.type === "chips" ? <span className="font-normal text-faint"> · up to {f.max}</span> : null}
                </p>
              ) : null}
              {renderField(f)}
            </div>
          ))}
        </div>

        {error ? <p className="mt-6 rounded-xl bg-[#fdecea] px-4 py-3 text-[14px] text-[#a1302a]" role="alert">{error}</p> : null}

        <div className="mt-10 flex items-center justify-between gap-3">
          {step > 0 ? (
            <button type="button" onClick={() => { setError(""); setStep(step - 1); }} className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[15px] font-medium text-muted hover:text-ink">
              <ArrowLeft className="h-4 w-4" /> Back
            </button>
          ) : (
            <button type="button" onClick={() => { setError(""); setLookingUp(true); }} className="inline-flex items-center gap-2 rounded-full px-4 py-3 text-[15px] font-medium text-muted hover:text-ink">
              <ArrowLeft className="h-4 w-4" /> Profile
            </button>
          )}
          <button type="button" onClick={next} disabled={status === "sending" || status === "reading"} className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-70">
            {status === "reading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Reading your profiles
              </>
            ) : status === "sending" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending
              </>
            ) : step === total - 1 ? (
              <>
                {files.length ? "Submit" : "Submit without screenshots"} <Check className="h-4 w-4" />
              </>
            ) : (
              <>
                Continue <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
