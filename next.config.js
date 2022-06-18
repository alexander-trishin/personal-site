const { PHASE_PRODUCTION_BUILD } = require('next/constants');

/**
 * @type {{key: string; value: string;}[]}
 */
const securityHeaders = [{ key: 'X-DNS-Prefetch-Control', value: 'on' }];

/**
 * @type {(phase: string) => import('next').NextConfig}
 */
const config = phase => {
    const isDev = phase !== PHASE_PRODUCTION_BUILD;

    return {
        compiler: {
            reactRemoveProperties: !isDev,
            removeConsole: !isDev
        },
        async headers() {
            if (isDev) return [];

            return [
                {
                    source: '/:path*',
                    headers: securityHeaders
                }
            ];
        },
        i18n: {
            locales: ['ru-ru', 'en-us'],
            defaultLocale: isDev ? 'en-us' : 'ru-ru'
        },
        productionBrowserSourceMaps: process.env.ANALYZE === 'true',
        reactStrictMode: true,
        swcMinify: true
    };
};

module.exports = config;
