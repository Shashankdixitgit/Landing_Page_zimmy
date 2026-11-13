import type { Metadata } from "next";
import LegalPage, { LEGAL_EMAIL } from "@/components/legal/LegalPage";
import { FREE_DAYS, PRO_PRICE_USD } from "@/lib/planPhases";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy · HitRate",
  description: "How to cancel HitRate Pro, when you can get a refund, and who processes payments.",
};

const li = "list-disc space-y-2 pl-5";
const a = "text-accent underline-offset-4 hover:underline";

// The founder's decided policy (13 Nov 2026), written for Dodo Payments' merchant
// verification, which asks for a public refund and cancellation page.
export default function RefundPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      intro={
        <p>
          This covers paid HitRate plans, such as Pro in the HitRate creator app (${PRO_PRICE_USD} a month). The report and the first {FREE_DAYS} days of your plan are free and need no card, so there is nothing to pay or refund for those.
        </p>
      }
      sections={[
        {
          h: "Cancel any time",
          id: "cancel",
          body: (
            <ul className={li}>
              <li>Cancel from <b className="text-ink">Billing</b> in the app. It opens the payment page where you can cancel, change your card and see your invoices.</li>
              <li>After you cancel, you keep Pro until the end of the month you have already paid for. You are not charged again.</li>
              <li>If you can&rsquo;t get to Billing, email <a className={a} href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> and we will cancel it for you.</li>
            </ul>
          ),
        },
        {
          h: "Refunds",
          id: "refunds",
          body: (
            <ul className={li}>
              <li>
                <b className="text-ink">Your first payment:</b> if you are not happy, email <a className={a} href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> within 7 days of your first payment and we will refund it in full. Send it from, or mention, the email you signed in with.
              </li>
              <li>
                <b className="text-ink">Renewals:</b> the monthly payments after your first are not refunded. You can cancel any time before the next one and you won&rsquo;t be charged again.
              </li>
              <li>
                <b className="text-ink">Mistakes:</b> if you were charged in error, for example twice or after you cancelled, email us and we will refund the wrong charge.
              </li>
              <li>Refunds go back to the card or payment method you paid with. How long they take to show up depends on your bank.</li>
            </ul>
          ),
        },
        {
          h: "Who processes payments",
          id: "payments",
          body: (
            <p>
              Payments are processed by <b className="text-ink">Dodo Payments</b>, our merchant of record. A merchant of record is the company that takes the payment and handles sales tax on our behalf, so Dodo Payments may be the name you see on your card statement. Dodo Payments holds your card details; HitRate does not store them.
            </p>
          ),
        },
        {
          h: "Contact",
          body: (
            <p>
              Questions about a charge, a refund or cancelling: <a className={a} href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>. Our <a className={a} href="/terms">Terms of Service</a> and <a className={a} href="/privacy">Privacy Policy</a> also apply.
            </p>
          ),
        },
      ]}
    />
  );
}
