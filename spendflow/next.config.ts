import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // @ts-ignore - Explicitly requested by Next.js dev server warning
    allowedDevOrigins: ["26.42.225.100", "localhost:3000"],
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;