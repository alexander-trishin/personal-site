import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] }
        },
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] }
        },
        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] }
        }
    ],
    webServer: {
        cwd: '..',
        command: 'yarn next start -p 4000',
        port: 4000,
        timeout: 15 * 1000,
        reuseExistingServer: !process.env.CI
    },
    use: {
        baseURL: 'http://localhost:4000',
        locale: 'en'
    },
    testDir: './e2e'
};

export default config;
