/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static exports for Netlify
  output: 'export', // CRITICAL for Netlify
  images: {
    unoptimized: true, // Required for static export
  },
  // If using App Router
  trailingSlash: true, // Helps with routing
}

module.exports = nextConfig