/** @type {import('next').NextConfig} */
const { withContentlayer } = require('next-contentlayer');

const nextConfig = withContentlayer({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'user-images.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        port: '',
        pathname: '/woongsnote/**',
      },
      {
        protocol: 'https',
        hostname: 'www.woongsnote.dev',
      },
    ],
  },
});

module.exports = nextConfig;
