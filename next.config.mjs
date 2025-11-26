/** @type {import('next').NextConfig} */
const nextConfig = {
// <CHANGE> Added static export configuration
  output: 'export',
  distDir: 'docs',
  experimental: {
    turbopack: false,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: { unoptimized: true }, // if you're using next/image
  trailingSlash: true,     // optional but recommended for static hosting
}

export default nextConfig
