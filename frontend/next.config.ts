import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "infiheal-chatbot.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;
