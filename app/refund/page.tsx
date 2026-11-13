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
// verification, which asks for a public refund and cancellation page. Literal ’ and –
// on purpose: in a multi-line JSX sentence an entity made the compiler drop the space
// after a closing </b> or </a>.
export default function RefundPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      intro={
        <>
          <p>
            This policy covers HitRate Pro for creators (${PRO_PRICE_USD} a month). The report and the first {FREE_DAYS} days
            of your plan are free and need no card, so there is nothing to pay or refund for those. See{" "}
            <a className={a} href="/pricing">pricing</a> for what Pro includes.
          </p>
          <p>Brand plans, such as the Founding Pilot, are billed under an order form, and the refund terms in that order form apply to them instead.</p>
        </>
      }
      sections={[
        {
          h: "Cancel any time",
          id: "cancel",
          body: (
            <ul className={li}>
              <li>
                In the HitRate app, press <b className="text-ink">Billing</b>. It opens Dodo Payments’ billing page, where you
                can cancel, change your card and see your invoices.
              </li>
              <li>After you cancel, you keep Pro until the end of the month you have already paid for. You are not charged again. There is no cancellation fee.</li>
              <li>
                If you can’t get to Billing, email <a className={a} href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> from the
                address on your account and we will cancel it for you. If your email reaches us before your renewal date and
                that renewal is still charged, we refund it in full.
              </li>
            </ul>
          ),
        },
        {
          h: "Refunds",
          id: "refunds",
          body: (
            <ul className={li}>
              <li>
                <b className="text-ink">Your first payment:</b> if you are not happy, email <a className={a} href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> within
                7 days of your first payment and we will refund it in full. Send it from, or mention, the email you signed in
                with. Refunding your first payment ends Pro straight away and cancels the subscription, so you are not
                charged again.
              </li>
              <li>
                <b className="text-ink">Renewals:</b> the monthly payments after your first are not refunded for unused
                days. You can cancel any time before the next one and you won’t be charged again.
              </li>
              <li>
                <b className="text-ink">Mistakes:</b> if you were charged in error, for example twice or after you
                cancelled, email us and we will refund the wrong charge. If another payment covers the month you are in,
                refunding the wrong one leaves Pro on until the end of that month.
              </li>
              <li>
                Refunds go back to the card or payment method you paid with, through Dodo Payments. They usually arrive in
                5–10 business days, depending on your bank.
              </li>
            </ul>
          ),
        },
        {
          h: "Who processes payments",
          id: "payments",
          body: (
            <p>
              Payments are processed by <b className="text-ink">Dodo Payments</b>, our merchant of record. A merchant of
              record is the company that takes the payment and handles sales tax on our behalf, so Dodo Payments is the name
              you see on your card statement and receipt. Dodo Payments holds your card details; HitRate does not store them.
            </p>
          ),
        },
        {
          h: "Before you dispute a charge",
          body: (
            <p>
              Please email us first. Most problems are fixed faster that way, and a dispute through your bank can pause your
              account while it is reviewed.
            </p>
          ),
        },
        {
          h: "Your legal rights",
          body: (
            <p>
              Nothing in this policy limits rights you have under the consumer law where you live. If your local law gives
              you more, that applies.
            </p>
          ),
        },
        {
          h: "Contact",
          body: (
            <p>
              Questions about a charge, a refund or cancelling: <a className={a} href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.
              Our <a className={a} href="/terms">Terms of Service</a> and <a className={a} href="/privacy">Privacy Policy</a> also
              apply.
            </p>
          ),
        },
      ]}
    />
  );
}
