import type { NextConfig } from "next";

import { SERVER_URL } from "./src/lib/constants";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${SERVER_URL}/api/:path*`,
      },
    ];
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
