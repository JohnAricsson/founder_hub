import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    //Giving permission
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
};

export default nextConfig;
