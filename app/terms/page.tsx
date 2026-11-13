import type { Metadata } from "next";
import LegalPage, { LEGAL_EMAIL } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service · HitRate",
  description: "The terms for using HitRate.",
};

const li = "list-disc space-y-2 pl-5";

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      intro={<p>These terms cover your use of HitRate (hitrate.sh and app.hitrate.sh). By using HitRate you agree to them. If you use HitRate for a company, you confirm you can accept these terms for it.</p>}
      sections={[
        {
          h: "What HitRate does",
          body: <p>HitRate reads public content about your brand and your competitors, scores what is working, writes scripts, makes AI videos you approve, and helps you post them or run them as ads. Insights and scores are estimates to help you decide, not guarantees of views, sales or results.</p>,
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
          body: <p>HitRate relies on third parties such as Google, Meta, TikTok, Composio, Apify, Higgsfield, Supabase and Vercel. Their terms also apply when you use features that depend on them, and their availability can change.</p>,
        },
        {
          h: "Fees",
          body: (
            <>
              <p>Some features are paid. Current prices are on our <a className="text-accent underline-offset-4 hover:underline" href="/pricing">pricing page</a> and are shown again before you buy. Subscriptions renew each month until you cancel, and you can cancel any time.</p>
              <p>Online card purchases, such as HitRate Pro, are processed by Dodo Payments, which acts as our merchant of record and handles payment, tax and receipts. Brand plans are billed under an order form. Cancellations and refunds follow our <a className="text-accent underline-offset-4 hover:underline" href="/refund">refund &amp; cancellation policy</a> or, for brand plans, the order form. During the early preview, features may change and limits may apply.</p>
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
