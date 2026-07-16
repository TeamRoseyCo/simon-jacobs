import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Short, memorable links for Simon to share. /score is the generic one and
  // forwards any query string automatically. /ig and /li are pre-tagged per
  // channel so Simon can paste a clean, tiny link into his Instagram bio /
  // LinkedIn profile and still get the UTM attribution in his lead email.
  // The channel links are temporary (307) on purpose: the campaign tags may
  // change, and a permanent redirect would be cached hard in browsers.
  async redirects() {
    return [
      { source: "/score", destination: "/scorecard", permanent: true },
      {
        source: "/ig",
        destination:
          "/scorecard?utm_source=instagram&utm_medium=social&utm_campaign=bio",
        permanent: false,
      },
      {
        source: "/li",
        destination:
          "/scorecard?utm_source=linkedin&utm_medium=social&utm_campaign=profile",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
