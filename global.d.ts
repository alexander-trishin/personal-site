type Messages = typeof import('./src/client/i18n/translations/en-us.json');

declare interface IntlMessage extends Messages {}

declare namespace NodeJS {
    export interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';

        readonly BASE_URL: string;

        readonly EMAIL_USER: string;
        readonly EMAIL_PASSWORD: string;

        readonly LOGFLARE_API_KEY: string;
        readonly LOGFLARE_SOURCE_TOKEN: string;

        readonly NEXT_PUBLIC_PACKAGE_VERSION: string;

        readonly SECURE_ENCRYPTION: string;
        readonly SECURE_INTEGRITY: string;

        readonly VERCEL_ENV?: string;
        readonly VERCEL_URL?: string;
        readonly VERCEL_GITHUB_COMMIT_SHA?: string;
    }
}
