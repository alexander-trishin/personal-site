const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = phase => {
    const isDev = phase === PHASE_DEVELOPMENT_SERVER;

    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
        compiler: {
            reactRemoveProperties: !isDev,
            removeConsole: isDev ? false : { exclude: ['error'] }
        },
        i18n: {
            locales: ['ru-ru', 'en-us'],
            defaultLocale: 'ru-ru'
        },
        reactStrictMode: true,
        swcMinify: true
    };
    return nextConfig;
};
