import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Breed APIs use varying CDN subdomains (cdn2, cdn3, cdn4, …)
      {
        protocol: 'https',
        hostname: '*.thedogapi.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.thecatapi.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/dog-api-uploads-prod/**',
      },
    ],
  },
};

export default nextConfig;
