import type { DefaultOptions } from './encryption.types';

export const defaults: DefaultOptions = {
    algorithms: {
        'aes-128-ctr': { keyBytes: 16, ivBytes: 16 },
        'aes-256-cbc': { keyBytes: 32, ivBytes: 16 },
        sha256: { keyBytes: 32 },
        sha512: { keyBytes: 64 }
    },

    divider: '*',

    encryption: {
        algorithm: 'aes-256-cbc',
        saltBytes: 32,
        iterations: 10000,
        minPasswordLength: 32
    },
    integrity: {
        algorithm: 'sha256',
        saltBytes: 32,
        iterations: 10000,
        minPasswordLength: 32
    },

    macPrefix: 'AT0'
};
