/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image optimization for external domains
  images: {
    domains: [
      'promptwritingstudio.com',
      'courses.becomeawritertoday.com',
      'images.unsplash.com',
    ],
    formats: ['image/avif', 'image/webp'],
  },

  // SEO-friendly trailing slash behavior (consistent URLs)
  trailingSlash: false,

  // Security and performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        // Allow AI crawlers to discover llms.txt
        source: '/llms.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
      {
        source: '/llms-full.txt',
        headers: [
          { key: 'Content-Type', value: 'text/plain; charset=utf-8' },
          { key: 'Cache-Control', value: 'public, max-age=86400' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      {
        source: '/chatgpt-templates',
        destination: '/chatgpt-prompt-templates',
        permanent: true,
      },
    ]
  },

  // /sitemap.xml is served by the dynamic generator. A stale static
  // public/sitemap.xml shadowed it for a month (removed 2026-07-02) — do not
  // re-add one; public/ files win over rewrites.
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },
}

module.exports = nextConfig
