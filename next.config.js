/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/link-saver',
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: '/link-saver',
  },
}

module.exports = nextConfig