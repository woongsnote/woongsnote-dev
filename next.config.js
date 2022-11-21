/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = withPWA({
  reactStrictMode: true,
  experimental: { appDir: true },
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ["images.unsplash.com", "thrangra.sirv.com"],
  },
});

module.exports = nextConfig;
