/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ncsmusic.s3.eu-west-1.amazonaws.com',
        port: '',
        pathname: '/tracks/**',
      },
    ],
  },
}

module.exports = nextConfig
