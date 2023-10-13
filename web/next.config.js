/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['storage.googleapis.com'],
    },
    experimental: {
        serverActions: true
    }
}

module.exports = nextConfig
