"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Loader2, Sparkles } from "lucide-react";
import { BRAND_STEPS, type BrandField } from "@/lib/brandForm";
import { submitBrandApplication } from "@/lib/publicSupabase";
import { DEMO_HREF } from "./ui";

type Answers = Record<string, string | string[]>;

export default function BrandJoinForm() {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>({});
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "reading" | "sending" | "done">("idle");
  const [prefilled, setPrefilled] = useState<Set<string>>(new Set());
  const [found, setFound] = useState<string | null>(null);
  const [readSite, setReadSite] = useState("");

  const total = BRAND_STEPS.length;
  const s = BRAND_STEPS[step];
  const inr = a.country === "India";

  const set = (id: string, v: string | string[]) => {
    setError("");
    setA((x) => ({ ...x, [id]: v }));
  };

  const validate = (): string => {
    for (const f of s.fields) {
      if (!f.required) continue;
      const v = a[f.id];
      if (!v || (Array.isArray(v) && v.length === 0) || (typeof v === "string" && !v.trim())) return `Please answer: ${f.label}`;
      if (f.type === "email" && typeof v === "string" && !/^\S+@\S+\.\S+$/.test(v)) return "That email doesn't look right.";
      if (f.type === "url" && typeof v === "string" && !/^(https?:\/\/)?[^\s.]+\.[^\s]{2,}$/i.test(v.trim())) return "That website doesn't look right.";
    }
    return "";
  };

  // Read the brand's website and prefill the next steps. Only fills empty answers.
  const readWebsite = async () => {
    const site = String(a.website ?? "").trim();
    if (!site || site === readSite) return;
    setReadSite(site);
    setStatus("reading");
    try {
      const r = await fetch(`/api/brand-lookup?url=${encodeURIComponent(site)}`).then((x) => (x.ok ? x.json() : null)).catch(() => null);
      if (!r?.ok) return;
      const fill: Answers = {};
      if (r.brand_name && !a.brand_name) fill.brand_name = r.brand_name;
      if (r.category && !a.category) fill.category = r.category;
      if (r.country && !a.country) fill.country = r.country;
      for (const k of ["instagram", "tiktok", "youtube", "x"]) {
        if (r.socials?.[k] && !a[`social_${k}`]) fill[`social_${k}`] = r.socials[k];
      }
      setA((x) => ({ ...x, ...fill }));
      setPrefilled((cur) => new Set([...cur, ...Object.keys(fill)]));
      setFound(r.description ?? null);
    } finally {
      setStatus("idle");
    }
  };

  const next = async () => {
    const e = validate();
    if (e) return setError(e);
    if (s.id === "website") await readWebsite();
    if (step < total - 1) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setStatus("sending");
    try {
      await submitBrandApplication({
        email: String(a.email).trim(),
        brand_name: a.brand_name ?? null,
        website: a.website ?? null,
        country: a.country ?? null,
        answers: a,
      });
      setStatus("done");
    } catch {
      setStatus("idle");
      setError("Something went wrong sending your details. Please try again.");
    }
  };

  if (status === "done") {
    return (
      <div className="pop mx-auto max-w-xl text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-mint text-accent">
          <Check className="h-7 w-7" strokeWidth={2.5} />
        </span>
        <h2 className="display mt-6 text-[32px] text-ink">Thanks, {String(a.name ?? "").split(" ")[0] || "you're in"}.</h2>
        <p className="mt-3 text-[15.5px] leading-relaxed text-muted">
          We&rsquo;ll look at what&rsquo;s already working in your niche and reply to{" "}
          <span className="font-medium text-ink">{String(a.email)}</span> within one working day.
        </p>
        <a href={DEMO_HREF} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-accent px-6 py-3 text-[15px] font-semibold text-white hover:bg-accent-hover">
          <CalendarDays className="h-4 w-4" /> Skip the wait, book a 30-min call
        </a>
      </div>
    );
  }

  const renderField = (f: BrandField) => {
    const v = a[f.id];
    const base = "w-full rounded-2xl border border-line bg-surface px-4 py-3.5 text-[15px] text-ink outline-none transition-colors placeholder:text-faint focus:border-accent";
    switch (f.type) {
      case "text":
      case "email":
      case "url":
        return (
          <input
            type={f.type === "url" ? "text" : f.type}
            inputMode={f.type === "url" ? "url" : undefined}
            value={(v as string) ?? ""}
            placeholder={f.placeholder}
            onChange={(e) => set(f.id, e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && next()}
            className={base}
            autoComplete={f.type === "email" ? "email" : f.id === "name" ? "name" : f.type === "url" ? "url" : "off"}
          />
        );
      case "textarea":
        return <textarea value={(v as string) ?? ""} placeholder={f.placeholder} rows={4} onChange={(e) => set(f.id, e.target.value)} className={`${base} resize-none`} />;
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
      case "chips": {
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
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
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

        {s.fields.some((f) => prefilled.has(f.id)) ? (
          <div className="mt-5 rounded-2xl bg-mint px-4 py-3 text-[13.5px] text-accent">
            <p className="flex items-center gap-2 font-medium">
              <Sparkles className="h-3.5 w-3.5" /> Filled from your website. Check it and edit anything that&rsquo;s off.
            </p>
            {s.id === "brand" && found ? <p className="mt-1.5 text-ink/70">We read: &ldquo;{found}&rdquo;</p> : null}
          </div>
        ) : null}

        <div className="mt-8 space-y-7">
          {s.fields.map((f) => (
            <div key={f.id}>
              <p className="mb-2.5 text-[14px] font-medium text-ink">
                {f.label}
                {f.required ? null : <span className="font-normal text-faint"> · optional</span>}
              </p>
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
            <span />
          )}
          <button type="button" onClick={next} disabled={status !== "idle"} className="inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-accent-hover disabled:opacity-70">
            {status === "reading" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Reading your website
              </>
            ) : status === "sending" ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending
              </>
            ) : step === total - 1 ? (
              <>
                Submit <Check className="h-4 w-4" />
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
