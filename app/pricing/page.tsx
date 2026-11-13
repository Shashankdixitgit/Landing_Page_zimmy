import type { Metadata } from "next";
import { Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { DEMO_HREF, HITRATE_APP_PATH, OutlineButton, PrimaryButton } from "@/components/ui";
import { FREE_DAYS, PRO_PRICE_USD, PRO_SALES_PAUSED, WRITTEN_DAYS } from "@/lib/planPhases";

const TITLE = "Pricing · HitRate";
const DESCRIPTION = `HitRate for creators is free to start. Pro is $${PRO_PRICE_USD} a month. Brands start with a 4-week pilot.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, type: "website" },
};

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-");

type Plan = {
  name: string;
  who: string;
  price: string;
  per?: string;
  note: string;
  features: string[];
  cta: { label: string; href: string; primary?: boolean };
};

// List only what ships today. Days 16-60, the day-15 re-read and weekly re-scans
// do not run yet, so they are not sold here.
const PLANS: Plan[] = [
  {
    name: "Free",
    who: "For creators",
    price: "$0",
    note: "No card needed.",
    features: [
      "A report on your recent posts, each read against your own median",
      "What works for you, and what costs you reach",
      `Days 1–${FREE_DAYS} of your plan, written in your voice`,
    ],
    cta: { label: "Get my first 7 days free", href: "/creators" },
  },
  {
    name: "Pro",
    who: "For creators",
    price: `$${PRO_PRICE_USD}`,
    per: "/month",
    // Follows the app's emergency stop (landing lib/planPhases.ts), so this page never sells what the app won't.
    note: PRO_SALES_PAUSED
      ? `Sales are paused for now: signed-in owners get days ${FREE_DAYS + 1}–${WRITTEN_DAYS} of their own plan free.`
      : "Billed monthly. Cancel any time.",
    features: [
      "Everything in Free",
      `Days ${FREE_DAYS + 1}–${WRITTEN_DAYS} of your plan, written in your voice`,
      "The Brainstorm chat, which has read every post in your report",
      "40 Brainstorm messages a day",
    ],
    cta: { label: "Start with a free report", href: HITRATE_APP_PATH, primary: true },
  },
  {
    name: "Founding Pilot",
    who: "For brands",
    price: "$1,500",
    per: "/4 weeks",
    note: "Paid as $750 at signing and $750 after week 1. Then $500/month plus 5% of creator spend if you continue.",
    features: [
      "Research on what works for your closest competitors",
      "Scripts and creative briefs for your brand",
      "Done with you by the founders",
      "Exact scope agreed on a call and written into your order form",
    ],
    cta: { label: "Book a call", href: DEMO_HREF },
  },
];

export default function PricingPage() {
  return (
    <>
      <Navbar overHero={false} />
      <main className="px-5 pb-20 pt-32 sm:pt-40">
        <div className="mx-auto max-w-[1100px]">
          <div className="mx-auto max-w-[640px] text-center">
            <span className="inline-flex rounded-full bg-mint px-3.5 py-1.5 text-[12.5px] font-medium text-accent">Pricing</span>
            <h1 className="display mt-5 text-[38px] text-ink sm:text-[52px]">
              Start free. <span className="text-accent">Pay when it helps.</span>
            </h1>
            <p className="mt-5 text-[16px] leading-relaxed text-muted">
              Prices are in US dollars. For Pro, any tax is shown at checkout before you pay.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {PLANS.map((p) => (
              <section
                key={p.name}
                aria-labelledby={`plan-${slug(p.name)}`}
                className={`flex flex-col rounded-[22px] border bg-surface p-6 sm:p-7 ${p.cta.primary ? "border-accent" : "border-line"}`}
              >
                <p className="text-[13px] text-faint">{p.who}</p>
                <h2 id={`plan-${slug(p.name)}`} className="mt-1 text-[19px] font-medium text-ink">{p.name}</h2>
                <p className="mt-5 flex items-baseline gap-1">
                  <span className="display text-[40px] text-ink">{p.price}</span>
                  {p.per ? <span className="text-[14px] text-muted">{p.per}</span> : null}
                </p>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted">{p.note}</p>
                <ul className="mt-6 flex-1 space-y-3">
                  {p.features.map((f) => (
                    <li key={f} className="flex gap-2.5 text-[14.5px] leading-relaxed text-muted">
                      <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  {p.cta.primary ? (
                    <PrimaryButton href={p.cta.href} wide>{p.cta.label}</PrimaryButton>
                  ) : (
                    <OutlineButton href={p.cta.href} wide>{p.cta.label}</OutlineButton>
                  )}
                </div>
              </section>
            ))}
          </div>

          <div className="mx-auto mt-14 max-w-[720px] space-y-3 text-center text-[14px] leading-relaxed text-muted">
            <p>
              Pro is paid by card through Dodo Payments, our merchant of record. You can cancel Pro any time, and your
              first Pro payment is refundable within 7 days. Details are in our{" "}
              <a className="text-accent underline-offset-4 hover:underline" href="/refund">refund &amp; cancellation policy</a>.
            </p>
            <p>
              Brand plans are billed under an order form. Creator videos on brand campaigns come from a separate creator
              budget, at the creator’s fee plus HitRate’s 5%, and are not charged through the Pro checkout.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
