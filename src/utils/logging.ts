import pino from 'pino';
import { logflarePinoVercel } from 'pino-logflare';

const { send, stream } = logflarePinoVercel({
    apiKey: process.env.LOGFLARE_API_KEY,
    sourceToken: process.env.LOGFLARE_SOURCE_TOKEN
});

export const logger = pino(
    {
        browser: { transmit: { send } },
        level: 'error',
        base: {
            env: process.env.VERCEL_ENV,
            revision: process.env.VERCEL_GITHUB_COMMIT_SHA
        }
    },
    stream
);
