import type {
    DecryptFunction,
    EncryptFunction,
    GeneratedKey,
    GenerateKeyFunction,
    HmacFunction,
    IvOptions,
    SealFunction,
    UnsealFunction
} from './encryption.types';

import {
    createCipheriv,
    createDecipheriv,
    createHmac as cryptoCreateHmac,
    pbkdf2 as cryptoPbkdf2,
    pbkdf2Sync,
    randomBytes
} from 'crypto';

import { defaults } from './encryption.defaults';

const pbkdf2 = (...parameters: Parameters<typeof pbkdf2Sync>): Promise<Buffer> => {
    return new Promise((resolve, reject) => {
        cryptoPbkdf2(...parameters, (error: Error | null, key: Buffer) =>
            error ? reject(error) : resolve(key)
        );
    });
};

const generateKey: GenerateKeyFunction = async (password, options) => {
    if (!password) {
        throw new Error('Invalid password.');
    }

    if (typeof options !== 'object') {
        throw new Error('Invalid options.');
    }

    const algorithm = defaults.algorithms[options.algorithm];

    if (!algorithm) {
        throw new Error(`Unknown algorithm: ${options.algorithm}`);
    }

    const result: Partial<GeneratedKey> = {};

    if (Buffer.isBuffer(password)) {
        if (password.length < algorithm.keyBytes) {
            throw new Error('Key buffer is too small.');
        }

        result.key = password;
        result.salt = '';
    } else {
        if (password.length < options.minPasswordLength) {
            throw new Error(`Password is too short (required: ${options.minPasswordLength}).`);
        }

        const salt = options.salt ?? randomBytes(options.saltBytes).toString('hex');
        const key = await pbkdf2(password, salt, options.iterations, algorithm.keyBytes, 'sha1');

        result.key = key;
        result.salt = salt;
    }

    if (options.iv) {
        result.iv = options.iv;
    } else if (('ivBytes' as keyof IvOptions) in algorithm) {
        result.iv = randomBytes(algorithm.ivBytes);
    }

    return result as GeneratedKey;
};

const encrypt: EncryptFunction = async (data, password, options) => {
    const key = await generateKey(password, options);

    const cipher = createCipheriv(options.algorithm, key.key, key.iv);
    const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);

    return { encrypted, key };
};

const decrypt: DecryptFunction = async (data, password, options) => {
    const key = await exports.generateKey(password, options);
    const decipher = createDecipheriv(options.algorithm, key.key, key.iv);

    return decipher.update(data, undefined, 'utf8') + decipher.final('utf8');
};

const createHmac: HmacFunction = async (data, password, options) => {
    const { key, salt } = await exports.generateKey(password, options);

    const hmac = cryptoCreateHmac(options.algorithm, key).update(data);
    const digest = hmac.digest('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/\=/g, '');

    return {
        digest,
        salt
    };
};

export const seal: SealFunction = async (data, passwords) => {
    const { divider, encryption, integrity, macPrefix } = defaults;

    const dataJson = JSON.stringify(data);

    const { encrypted, key } = await encrypt(dataJson, passwords.encryption, encryption);

    const encryptedB64 = Buffer.from(encrypted).toString('base64url');
    const ivB64 = key.iv.toString('base64url');

    const macBase = `${macPrefix}${divider}${key.salt}${divider}${ivB64}${divider}${encryptedB64}`;
    const mac = await createHmac(macBase, passwords.integrity, integrity);

    return `${macBase}${divider}${mac.salt}${divider}${mac.digest}`;
};

export const unseal: UnsealFunction = async (data, passwords) => {
    const { divider, encryption, integrity } = defaults;

    const parts = data.split(divider);

    if (parts.length !== 6) {
        throw new Error('Incorrect number of sealed components.');
    }

    const [macPrefix, encryptedSalt, encryptedIvB64, encryptedB64, macSalt, macDigest] = parts;

    if (macPrefix !== defaults.macPrefix) {
        throw new Error('Invalid mac prefix.');
    }

    const macBase = `${macPrefix}${divider}${encryptedSalt}${divider}${encryptedB64}${divider}${encryptedB64}`;
    const mac = await createHmac(macBase, passwords.integrity, { ...integrity, salt: macSalt });

    if (mac.digest !== macDigest) {
        throw new Error('Invalid mac value.');
    }

    const encrypted = Buffer.from(encryptedB64, 'base64url');
    const iv = Buffer.from(encryptedIvB64, 'base64url');

    const decrypted = await decrypt(encrypted, passwords.encryption, { ...encryption, iv });

    return JSON.parse(decrypted);
};
