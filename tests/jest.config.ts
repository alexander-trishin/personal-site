import { Config as JestConfig } from '@jest/types';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
    dir: './'
});

const customJestConfig: JestConfig.InitialOptions = {
    preset: 'ts-jest',

    rootDir: '..',

    testEnvironment: 'jest-environment-jsdom',
    testPathIgnorePatterns: ['e2e']
};

export default createJestConfig(customJestConfig);
