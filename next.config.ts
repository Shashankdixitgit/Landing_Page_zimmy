import type { NextConfig } from "next";

// The HitRate creator app is a separate Next.js app (its own Vercel project) that
// lives at hitrate.sh/creators/app: this site proxies that path to it (Next.js
// multi-zones). The app is built with basePath "/creators/app", so its pages,
// API routes and /_next assets all sit under the prefix and pass straight through.
// HITRATE_APP_ORIGIN is only the address the proxy talks to; visitors never see it.
const HITRATE_APP_ORIGIN = (process.env.HITRATE_APP_ORIGIN || "https://hitrate-rosy.vercel.app").replace(/\/+$/, "");

const nextConfig: NextConfig = {
  // The old addresses forward to the new one, keeping the path and query.
  async redirects() {
    return ["zimmy.art", "www.zimmy.art"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://hitrate.sh/:path*",
      permanent: true,
    }));
  },
  async rewrites() {
    return {
      // beforeFiles so nothing on this site (e.g. a future /creators/[slug] page)
      // can shadow the app. /creators and /creators/join stay this site's pages.
      beforeFiles: [
        { source: "/creators/app", destination: `${HITRATE_APP_ORIGIN}/creators/app` },
        { source: "/creators/app/:path+", destination: `${HITRATE_APP_ORIGIN}/creators/app/:path+` },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
