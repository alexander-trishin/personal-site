/** @type {import('next').NextConfig} */

const nextConfig = {
    compiler: {
        reactRemoveProperties: true,
        removeConsole: true
    },
    reactStrictMode: true,
    swcMinify: true
};

module.exports = nextConfig;
