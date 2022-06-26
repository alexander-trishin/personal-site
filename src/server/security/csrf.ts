import { randomBytes } from 'crypto';

import { seal, unseal } from 'server/utils/crypto';

const getPasswords = () => ({
    encryption: process.env.SECURE_ENCRYPTION,
    integrity: process.env.SECURE_INTEGRITY
});

export const createCsrfToken = async () => {
    const csrfToken = randomBytes(32).toString('hex');
    const csrfTokenCookie = await seal(csrfToken, getPasswords());

    return { csrfToken, csrfTokenCookie };
};

export function decodeCsrfTokenCookie<T extends string | null | undefined>(
    csrfTokenCookie: T
): Promise<T extends '' | null | undefined ? null : string>;

export async function decodeCsrfTokenCookie(csrfTokenCookie: string) {
    return csrfTokenCookie ? await unseal<string>(csrfTokenCookie, getPasswords()) : null;
}

export const validateCsrfToken = async (
    csrfTokenFromBody: string | null | undefined,
    csrfTokenFromCookie: string | null | undefined
) => {
    if (!csrfTokenFromBody || !csrfTokenFromCookie) {
        return false;
    }

    const csrfTokenCookie = await decodeCsrfTokenCookie(csrfTokenFromCookie);

    return csrfTokenCookie === csrfTokenFromBody;
};
