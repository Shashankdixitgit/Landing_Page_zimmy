import type { Metadata } from "next";
import ChatHome, { HOME_DESCRIPTION, HOME_TITLE } from "@/components/v16/ChatHome";

/**
 * /v16: the chat-box version of the site (components/v16/ChatHome.tsx). Its chat
 * box hands the visitor to the app's research workspace (app.hitrate.sh/research).
 * hitrate.sh/ and every other page keep their own content; nothing outside /v16
 * links here.
 *
 * robots: noindex, so it never competes with the real home page.
 *
 * openGraph: set here so a shared /v16 link carries this page's own title and
 * description; the picture comes from app/v16/opengraph-image.tsx (a file there
 * wins over the root's share image for this route only).
 */
const OG_DESCRIPTION =
  "One chat box for an app team's marketing. Start with Meta ads or creator marketing: research, a script or brief, a test video and the launch, with your OK at every step.";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  robots: { index: false, follow: false },
  openGraph: {
    title: HOME_TITLE,
    description: OG_DESCRIPTION,
    url: "/v16",
    siteName: "HitRate",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: HOME_TITLE, description: OG_DESCRIPTION },
};

export default function V16() {
  return <ChatHome home="/v16" />;
}
