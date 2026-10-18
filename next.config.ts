import type { NextConfig } from "next";

// Saved landing-page versions are static exports in public/v1, public/v2, ...
// These rewrites serve their folders' index.html at /vN and /vN/page.
const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/v:n(\\d+)", destination: "/v:n/index.html" },
      { source: "/v:n(\\d+)/:path*", destination: "/v:n/:path*/index.html" },
    ];
  },
  async headers() {
    return [{ source: "/v:n(\\d+)/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex" }] }];
  },
};

export default nextConfig;
