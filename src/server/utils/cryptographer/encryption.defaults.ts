import type { DefaultOptions } from './encryption.types';

export const defaults: DefaultOptions = {
    algorithms: {
        'aes-128-gcm': { keyBytes: 16, ivBytes: 16 },
        'aes-256-gcm': { keyBytes: 32, ivBytes: 16 },
        sha256: { keyBytes: 32 },
        sha512: { keyBytes: 64 }
    },

    divider: '*',

    encryption: {
        algorithm: 'aes-256-gcm',
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

    macPrefix: 'AT.0'
};
