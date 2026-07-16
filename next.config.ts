import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Short, memorable link for Simon to share on Instagram / LinkedIn. Next
  // forwards the query string automatically, so /score?utm_source=instagram
  // still lands on the scorecard with its UTM tags intact.
  async redirects() {
    return [
      { source: "/score", destination: "/scorecard", permanent: true },
    ];
  },
};

export default nextConfig;
