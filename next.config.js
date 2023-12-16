/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        SOCKET: process.env.SOCKET
    }
}

module.exports = nextConfig
