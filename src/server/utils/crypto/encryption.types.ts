type EncryptionAlgorithm = 'aes-128-ctr' | 'aes-256-cbc';
type IntegrityAlgorithm = 'sha256' | 'sha512';
type Algorithm = EncryptionAlgorithm | IntegrityAlgorithm;

export type KeyOptions = { keyBytes: number };
export type IvOptions = { ivBytes: number };

type AlgorithmOptions<T extends Algorithm> = T extends EncryptionAlgorithm
    ? KeyOptions & IvOptions
    : T extends IntegrityAlgorithm
    ? KeyOptions
    : never;

type AlgorithmRecord<T extends Algorithm = Algorithm> = { [K in T]: AlgorithmOptions<K> };

type CryptoRecord<TAlgorithm = Algorithm> = {
    algorithm: TAlgorithm;
    saltBytes: number;
    iterations: number;
    minPasswordLength: number;
};

export type DefaultOptions = {
    algorithms: AlgorithmRecord;
    divider: string;
    encryption: CryptoRecord<EncryptionAlgorithm>;
    integrity: CryptoRecord<IntegrityAlgorithm>;
    macPrefix: string;
};

type CipherRecord = {
    salt: string;
    iv: Buffer;
};

type KeyRecord = { key: Buffer };

type Password = string | Buffer;

type CryptographerOptions = CryptoRecord & Partial<CipherRecord>;
type CryptographerParameters<TData> = [
    data: TData,
    password: Password,
    options: CryptographerOptions
];

export type GeneratedKey = KeyRecord & CipherRecord;

export type GenerateKeyFunction = (
    password: Password,
    options: CryptographerOptions
) => Promise<GeneratedKey>;

type EncryptedRecord = {
    encrypted: Buffer;
    key: GeneratedKey;
};

export type EncryptFunction = (
    ...parameters: CryptographerParameters<string>
) => Promise<EncryptedRecord>;

export type DecryptFunction = (...parameters: CryptographerParameters<Buffer>) => Promise<string>;

type HmacRecord = {
    digest: string;
    salt: string;
};

export type HmacFunction = (...parameters: CryptographerParameters<string>) => Promise<HmacRecord>;

export type Passwords = {
    encryption: string;
    integrity: string;
};

export type SealFunction = (data: unknown, passwords: Passwords) => Promise<string>;

export type UnsealFunction = <TProject = unknown>(
    data: string,
    passwords: Passwords
) => Promise<TProject>;
