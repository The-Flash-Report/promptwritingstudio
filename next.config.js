/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/chatgpt-templates',
        destination: '/chatgpt-prompt-templates',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
