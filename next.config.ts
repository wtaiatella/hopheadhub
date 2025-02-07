import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    env: {
        MONGO_URI: process.env.MONGO_URI,
        MONGO_DB: process.env.MONGO_DB,
    },
};

export default nextConfig;
