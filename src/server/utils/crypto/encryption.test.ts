import type { Passwords } from './encryption.types';

import { randomBytes } from 'crypto';

import { seal, unseal } from './encryption';

describe('encryption', () => {
    const passwords: Passwords = {
        encryption: randomBytes(32).toString('hex'),
        integrity: randomBytes(16).toString('hex')
    };

    it('should seal and unseal objects', async () => {
        const value = {
            number: 13,
            string: 'text',
            boolean: true
        };

        const sealed = await seal(value, passwords);
        const actual = await unseal<typeof value>(sealed, passwords);

        expect(actual).toStrictEqual(value);
    });
});
