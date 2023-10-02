/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["pbs.twimg.com"],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
