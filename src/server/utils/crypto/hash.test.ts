import { compareHash, createHash } from './hash';

describe('hash', () => {
    describe('compareHash', () => {
        it('should return true for the same value', async () => {
            const value = 'insecure data';
            const hash = await createHash(value);

            const actual = await compareHash(value, hash);

            expect(actual).toBeTruthy();
        });

        it('should return false for different values', async () => {
            const first = 'one value';
            const second = 'another value';

            const firstHash = await createHash(first);

            const actual = await compareHash(second, firstHash);

            expect(actual).toBeFalsy();
        });
    });

    describe('createHash', () => {
        it('should create unique hash for the same value', async () => {
            const value = 'super secret password';

            const first = await createHash(value);
            const second = await createHash(value);

            expect(first).not.toEqual(second);
        });
    });
});
