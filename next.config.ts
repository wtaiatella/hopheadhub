import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
   /* config options here */
   env: {
      MONGO_URI: process.env.MONGO_URI,
      MONGO_DB: process.env.MONGO_DB,
   },
   experimental: {
      optimizePackageImports: ['lucide-react', 'antd'],
   },
   images: {
      domains: ['hhh.com'],
   },
   compiler: {
      removeConsole: process.env.NODE_ENV === 'production',
   },
}

export default nextConfig
