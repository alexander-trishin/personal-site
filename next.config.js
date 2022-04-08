const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, { defaultConfig }) => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;

    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        ...defaultConfig,
        compiler: {
            ...defaultConfig.compiler,
            reactRemoveProperties: !isDev,
            removeConsole: !isDev
        },
        reactStrictMode: true,
        swcMinify: true
    };
    return nextConfig;
};
