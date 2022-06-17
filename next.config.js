const { PHASE_PRODUCTION_BUILD } = require('next/constants');

/**
 * @type {{key: string; value: string;}[]}
 */
const securityHeaders = [{ key: 'X-DNS-Prefetch-Control', value: 'on' }];

module.exports = phase => {
    const isDev = phase !== PHASE_PRODUCTION_BUILD;

    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
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
        reactStrictMode: true,
        swcMinify: true
    };

    return nextConfig;
};
