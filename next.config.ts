import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  // Requires basePath for GitHub Pages sub-path hosting matching the repo name
  basePath: '/health-monitor',
  // Disable image optimization API since it doesn't work in static exports
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
