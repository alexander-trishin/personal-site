import { compare, hash } from 'bcrypt';

export const compareHash = async (plain: string, hashed: string) => {
    return await compare(plain, hashed);
};

export const createHash = async (plain: string) => {
    const saltRounds = 12;

    return await hash(plain, saltRounds);
};
