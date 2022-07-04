type Messages = typeof import('./src/client/i18n/translations/en.json');

declare interface IntlMessage extends Messages {}

declare namespace NodeJS {
    export interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';

        readonly BASE_URL: string;

        readonly EMAIL_TRANSPORT_USER: string;
        readonly EMAIL_TRANSPORT_PASSWORD: string;

        readonly LOGFLARE_API_KEY: string;
        readonly LOGFLARE_SOURCE_TOKEN: string;

        readonly NEXT_PUBLIC_ANALYTICS_UMAMI_ID: string;
        readonly NEXT_PUBLIC_ANALYTICS_UMAMI_URL: string;
        readonly NEXT_PUBLIC_AUTHOR_EMAIL: string;
        readonly NEXT_PUBLIC_PACKAGE_VERSION: string;

        readonly SECURE_ENCRYPTION: string;
        readonly SECURE_INTEGRITY: string;

        readonly VERCEL_ENV?: string;
        readonly VERCEL_URL?: string;
        readonly VERCEL_GITHUB_COMMIT_SHA?: string;
    }
}
