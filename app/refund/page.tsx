import type { Metadata } from "next";
import LegalPage, { LEGAL_EMAIL } from "@/components/legal/LegalPage";
import { PRO_PRICE_USD } from "@/lib/planPhases";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy · HitRate",
  description: "How to cancel a HitRate subscription and when you can get your money back.",
};

const li = "list-disc space-y-2 pl-5";
const a = "text-accent underline-offset-4 hover:underline";

export default function RefundPage() {
  return (
    <LegalPage
      title="Refund & Cancellation Policy"
      intro={
        <>
          <p>
            This policy covers HitRate Pro for creators (${PRO_PRICE_USD} a month). Pro is paid by card through Dodo
            Payments, our merchant of record, so your card statement and receipt show Dodo Payments. See{" "}
            <a className={a} href="/pricing">pricing</a> for what Pro includes.
          </p>
          <p>Brand plans, such as the Founding Pilot, are billed under an order form, and the refund terms in that order form apply to them instead.</p>
        </>
      }
      sections={[
        {
          h: "Cancel any time",
          body: (
            <>
              <p>
                In the HitRate app, open one of your reports and press <b className="text-ink">Billing</b> next to your email
                at the top. It opens Dodo Payments’ billing page, where you can cancel, change your card and see your
                invoices.
              </p>
              <p>
                You can also email <a className={a} href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> from the address on your
                account. If your email reaches us before your renewal date and that renewal is still charged, we refund it
                in full.
              </p>
              <p>Cancelling stops all future charges. There is no cancellation fee.</p>
            </>
          ),
        },
        {
          h: "Refunds",
          body: (
            <ul className={li}>
              <li>
                <b className="text-ink">First payment:</b> if Pro isn’t for you, ask within 7 days of your first
                payment and we’ll refund it in full. No questions asked.
              </li>
              <li>
                <b className="text-ink">Renewals:</b> monthly renewals aren’t refunded for unused days. Cancel before
                your renewal date to avoid the next charge.
              </li>
              <li>
                <b className="text-ink">Our mistakes:</b> if you were charged twice, charged after you cancelled, or a paid
                feature didn’t work and we couldn’t fix it, we refund the affected payment in full.
              </li>
              <li>
                <b className="text-ink">Brand plans:</b> refunded only as their order form says.
              </li>
            </ul>
          ),
        },
        {
          h: "How to ask for a refund",
          body: (
            <p>
              Email <a className={a} href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> with the email address on your account
              and the date of the charge. We reply within 2 business days. Approved Pro refunds go back to the original payment
              method through Dodo Payments and usually arrive in 5–10 business days, depending on your bank.
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
      ]}
    />
  );
}
