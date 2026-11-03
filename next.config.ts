import type { NextConfig } from "next";

// The old addresses forward to the new one, keeping the path and query.
const nextConfig: NextConfig = {
  async redirects() {
    return ["zimmy.art", "www.zimmy.art"].map((host) => ({
      source: "/:path*",
      has: [{ type: "host" as const, value: host }],
      destination: "https://hitrate.sh/:path*",
      permanent: true,
    }));
  },
};

export default nextConfig;
