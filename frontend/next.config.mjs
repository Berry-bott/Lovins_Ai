/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async rewrites() {
    // In development, proxy /api/* requests to the backend to avoid CORS.
    // BACKEND_API_URL is server-side only (not exposed to browser).
    // It must be the full backend URL (with or without /api suffix).
    if (process.env.NODE_ENV === 'development') {
      const target = (process.env.BACKEND_API_URL || 'http://localhost:4000/api').replace(/\/+$/, '')
      return [
        {
          source: '/api/:path*',
          destination: `${target}/:path*`,
        },
      ]
    }
    return []
  },
}

export default nextConfig