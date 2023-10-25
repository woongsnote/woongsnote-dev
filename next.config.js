/** @type {import('next').NextConfig} */

const nextConfig = {
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
        hostname: 'woongsnote.dev',
        port: '',
        pathname: '/og/**',
      },
    ],
  },
};

module.exports = nextConfig;
