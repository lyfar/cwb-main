import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.logo.dev",
        pathname: "/**",
      },
    ],
  },
  // Set basePath for GitHub Pages subdirectory deployment
  basePath: "/cwb-main",
  trailingSlash: true,
};

export default nextConfig;
