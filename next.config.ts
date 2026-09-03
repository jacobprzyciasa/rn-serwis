import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  redirects() {
    return [
      { source: "/sterowniki", destination: "/przemysl", permanent: true },
      { source: "/sterowniki/:slug", destination: "/przemysl/:slug", permanent: true },
    ];
  },
};

export default nextConfig;
