import type { Metadata } from "next";
import LegalPage, { LEGAL_EMAIL } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy · HitRate",
  description: "What HitRate collects, why, who processes it, and how to delete it.",
};

const li = "list-disc space-y-2 pl-5";
const a = "text-accent underline-offset-4 hover:underline";

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      intro={<p>HitRate (hitrate.sh, app.hitrate.sh) helps brands find which short-form videos work for their competitors, recreate their own versions with AI, and post them. HitRate for creators (hitrate.sh/creators) reads a creator&rsquo;s public posts and writes a content plan; the &ldquo;HitRate for creators&rdquo; section below covers it. This page explains what we collect, why, who helps us process it, and how to have it deleted.</p>}
      sections={[
        {
          h: "What we collect",
          body: (
            <ul className={li}>
              <li><b className="text-ink">Account details:</b> your email address and login, including your name and profile picture if you sign in with Google.</li>
              <li><b className="text-ink">What you give us:</b> your website or app link, the social accounts you confirm, the competitors you pick, the brand details you verify, scripts you edit or approve, and your choices in the product.</li>
              <li><b className="text-ink">Public social content:</b> public posts, captions, view and engagement counts and public comments from the accounts you or your competitors run, plus public ads from the Meta Ad Library. We read only public information.</li>
              <li><b className="text-ink">Connected accounts:</b> if you connect Instagram, TikTok, YouTube, Facebook or a Meta ad account, we receive access to that account through our integration partner so we can post or create ads when you ask us to.</li>
              <li><b className="text-ink">Creator sign-ups:</b> handles, audience estimates and contact details you submit on hitrate.sh/creators/join.</li>
              <li><b className="text-ink">Technical data:</b> IP address (stored as a one-way hash for rate limits), browser type and basic usage logs.</li>
            </ul>
          ),
        },
        {
          h: "How we use it",
          body: (
            <ul className={li}>
              <li>To run the product: read your site and content, suggest competitors, score posts, write scripts, make videos and post them when you tell us to.</li>
              <li>To improve results for future brands in the same market (for example, which competitors and formats performed). We never share your private data with other customers.</li>
              <li>To keep the service safe and within fair-use limits, and to contact you about your account.</li>
              <li>We do not sell personal data and we do not use it for third-party advertising.</li>
            </ul>
          ),
        },
        {
          h: "HitRate for creators",
          id: "creators",
          body: (
            <ul className={li}>
              <li><b className="text-ink">What we read:</b> the public posts of the profile link you give us on X, TikTok, Instagram, LinkedIn or YouTube, with their captions, view and engagement counts and some public comments. We read only what is public. We never ask for your password and never connect to your accounts.</li>
              <li><b className="text-ink">Signing in:</b> you sign in with Google or with a one-time code we send to your email. We keep your email address so your reports are saved to it.</li>
              <li><b className="text-ink">Private notes:</b> during onboarding you can tell us things that aren&rsquo;t public, such as news you plan to announce or topics to avoid. We use these notes to write your plan and your draft posts, to keep topics you asked us to avoid out of your report, and, if you use the Brainstorm chat on your own report, to brief it. They are sent to our AI provider for that, are shown only to the account that ran the report (never on a shared report link), and are used for nothing else.</li>
              <li><b className="text-ink">Report links:</b> each report has its own link that can&rsquo;t be guessed. Anyone you give that link to can open the report, so share it only with people you choose.</li>
              <li><b className="text-ink">Deleting a report:</b> email <a className={a} href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> with the report link or the email you signed in with, and we will delete the report, and your account if you ask, within 30 days.</li>
              <li><b className="text-ink">Payments:</b> if you buy Pro, Dodo Payments processes the payment as our merchant of record and holds your card details. We keep only your Dodo customer and subscription IDs and your plan status, so we know you are on Pro. See our <a className={a} href="/refund">Refund &amp; Cancellation Policy</a>.</li>
            </ul>
          ),
        },
        {
          h: "Connected accounts and Google data",
          body: (
            <>
              <p>We only post, upload or create ads on a connected account after you click to do so. Ads are created paused and only start after you confirm the spend. You can disconnect any account at any time, in HitRate or in that platform&rsquo;s settings.</p>
              <p>HitRate&rsquo;s use and transfer of information received from Google APIs follows the <a className="text-accent underline-offset-4 hover:underline" href="https://developers.google.com/terms/api-services-user-data-policy">Google API Services User Data Policy</a>, including the Limited Use requirements. We use Google sign-in only to identify you, and the Google Ads API only to look up keyword ideas for public competitor websites.</p>
            </>
          ),
        },
        {
          h: "Who processes data for us",
          body: (
            <ul className={li}>
              <li>Vercel (hosting) and Supabase (database and sign-in)</li>
              <li>Google (Gemini AI, sign-in, Google Ads API keyword ideas)</li>
              <li>Apify (reading public social content and the Meta Ad Library)</li>
              <li>Composio (connecting and posting to your social and ad accounts)</li>
              <li>Higgsfield (AI video generation)</li>
              <li>Resend (sign-in and service emails)</li>
              <li>Dodo Payments (payments for Pro, as our merchant of record)</li>
            </ul>
          ),
        },
        {
          h: "How long we keep it",
          body: <p>We keep account data while your account is open. Cached public social content is refreshed or removed regularly. When you ask us to delete your account, we delete your personal data within 30 days, except where the law requires us to keep it.</p>,
        },
        {
          h: "Your choices and rights",
          body: <p>You can ask for a copy of your data, a correction, or deletion, and you can withdraw a connected account at any time. Email <a className="text-accent underline-offset-4 hover:underline" href={`mailto:${LEGAL_EMAIL}`}>{LEGAL_EMAIL}</a> and we will reply within 30 days. Depending on where you live (for example the EU, UK, India or California), you may have further rights under local law.</p>,
        },
        {
          h: "Security",
          body: <p>Data is encrypted in transit, access to production systems is limited, and secrets for connected accounts are held by our integration partner, not in your browser. No system is perfectly secure, so please tell us at once if you notice anything wrong.</p>,
        },
        {
          h: "Children",
          body: <p>HitRate is for businesses and creators aged 18 and over. We do not knowingly collect data from children.</p>,
        },
        {
          h: "Changes",
          body: <p>If we change this policy, we will update the date above and, for important changes, tell you by email or in the product.</p>,
        },
      ]}
    />
  );
}
