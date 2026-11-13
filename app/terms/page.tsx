import type { Metadata } from "next";
import LegalPage, { LEGAL_EMAIL } from "@/components/legal/LegalPage";
import { FREE_DAYS, PRO_PRICE_USD, PRO_SALES_PAUSED, WRITTEN_DAYS } from "@/lib/planPhases";

export const metadata: Metadata = {
  title: "Terms of Service · HitRate",
  description: "The terms for using HitRate.",
};

const li = "list-disc space-y-2 pl-5";
const a = "text-accent underline-offset-4 hover:underline";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro={<p>These terms cover your use of HitRate (hitrate.sh, app.hitrate.sh and the creator app at hitrate.sh/creators/app). By using HitRate you agree to them. If you use HitRate for a company, you confirm you can accept these terms for it.</p>}
      sections={[
        {
          h: "What HitRate does",
          body: <p>HitRate reads public content about your brand and your competitors, scores what is working, writes scripts, makes AI videos you approve, and helps you post them or run them as ads. Insights and scores are estimates to help you decide, not guarantees of views, sales or results.</p>,
        },
        {
          h: "HitRate for creators",
          id: "creators",
          body: (
            <ul className={li}>
              <li>The creator app reads the public posts of the profile link you give us (X, TikTok, Instagram, LinkedIn or YouTube), rates each post against that account&rsquo;s own median, and writes a content plan. It does not connect to your accounts and cannot post for you. Scores and plans are estimates, not promises of views or growth.</li>
              <li>You sign in with Google or with a one-time code sent to your email.</li>
              <li>Private notes you give us during onboarding are used only to write your plan and draft posts, to keep topics you asked us to avoid out of your report, and to answer you in the Brainstorm chat on your own report. They are never shown on a shared report link.</li>
              <li>Each report has its own link. Anyone you share it with can open it.</li>
              <li>You can ask us to delete a report at any time by emailing <a className={a} href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.</li>
              <li>The report and days 1&ndash;{FREE_DAYS} of the plan are free, with no card. Pro costs ${PRO_PRICE_USD} a month and adds days {FREE_DAYS + 1}&ndash;{WRITTEN_DAYS} and the Brainstorm chat.{PRO_SALES_PAUSED && <> While Pro sales are paused, signed-in owners get days {FREE_DAYS + 1}&ndash;{WRITTEN_DAYS} of their own plan free, and the Brainstorm chat opens with Pro.</>} Payments are processed by Dodo Payments, our merchant of record.</li>
            </ul>
          ),
        },
        {
          h: "Your account",
          body: <p>You must be 18 or older and give accurate information. Keep your login safe; you are responsible for activity on your account. We may limit or close accounts that misuse the service.</p>,
        },
        {
          h: "Acceptable use",
          body: (
            <ul className={li}>
              <li>Only connect social or ad accounts you own or are allowed to manage.</li>
              <li>Don&rsquo;t use HitRate to copy someone else&rsquo;s video directly, impersonate a person or brand, mislead viewers, or break any platform&rsquo;s rules (Instagram, TikTok, YouTube, Facebook, Meta Ads, Google).</li>
              <li>Disclose paid partnerships and AI-generated content where the platform or the law requires it.</li>
              <li>Don&rsquo;t scrape, overload, reverse engineer or resell the service.</li>
            </ul>
          ),
        },
        {
          h: "Your content",
          body: <p>You own the scripts, videos and brand material you create with HitRate, subject to the terms of the AI and platform providers involved. You give us permission to process it only to provide the service. You are responsible for what you publish, including making sure it does not infringe anyone&rsquo;s rights.</p>,
        },
        {
          h: "Posting and ads",
          body: <p>HitRate posts or creates ads only after you click to do so. Ads are created paused and start only after you confirm the daily budget. Ad spend is charged by Meta to your own ad account; HitRate is not responsible for platform charges, ad approvals or account decisions made by the platforms.</p>,
        },
        {
          h: "Third-party services",
          body: <p>HitRate relies on third parties such as Google, Meta, TikTok, Composio, Apify, Higgsfield, Dodo Payments, Supabase and Vercel. Their terms also apply when you use features that depend on them, and their availability can change.</p>,
        },
        {
          h: "Fees",
          id: "fees",
          body: (
            <>
              <p>Some features are paid. Current prices are on our <a className={a} href="/pricing">pricing page</a> and are shown again before you pay. Online card purchases, such as HitRate Pro, are processed by Dodo Payments, our merchant of record, which handles payment, tax and receipts. Brand plans are billed under an order form, and its terms apply to them.</p>
              <p>You can cancel Pro any time from Billing in the app and keep it until the end of the month you paid for. If you are not happy, email <a className={a} href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> within 7 days of your first payment for a full refund, which ends Pro straight away. Renewals are not refunded, but you can cancel before the next one. The full details are in our <a className={a} href="/refund">Refund &amp; Cancellation Policy</a>.</p>
              <p>During the early preview, features may change and limits may apply.</p>
            </>
          ),
        },
        {
          h: "No warranty and limits of liability",
          body: <p>HitRate is provided &ldquo;as is&rdquo;. To the fullest extent the law allows, we are not liable for indirect or lost-profit damages, and our total liability is limited to the amount you paid us in the 12 months before the claim.</p>,
        },
        {
          h: "Ending use",
          body: <p>You can stop using HitRate and ask us to delete your account at any time. We may suspend access for misuse or to protect the service.</p>,
        },
        {
          h: "Changes and contact",
          body: <p>We may update these terms and will change the date above when we do. Questions: <a className="text-accent underline-offset-4 hover:underline" href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a>.</p>,
        },
      ]}
    />
  );
}
