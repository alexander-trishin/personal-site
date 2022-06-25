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
        headers: async () => {
            if (isDev) return [];

            return [
                {
                    source: '/:path*',
                    headers: securityHeaders
                }
            ];
        },
        i18n: {
            locales: ['ru', 'en'],
            defaultLocale: isDev ? 'en' : 'ru'
        },
        productionBrowserSourceMaps: process.env.ANALYZE === 'true',
        reactStrictMode: true,
        swcMinify: true
    };
};

module.exports = config;
