/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}
const nextImage = {
  images: {
    domains: ['links.papareact.com','accountabilitylab.org','cdn.sanity.io'],
  },
}
module.exports = nextConfig
module.exports = nextImage