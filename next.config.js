/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'flagcdn.com', 'via.placeholder.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Configure experimental options properly
  experimental: {
    serverActions: {
      allowedOrigins: ['*'],
    },
  },
  // Add configuration for handling hydration errors
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 4,
  },
  // Allow all domains for development server cross-origin requests
  allowedDevOrigins: ['*'],
}

module.exports = nextConfig 