import { test, expect } from '@playwright/test';

test('should have correct title', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle('Alexander Trishin');
});

test('should switch language to "ru" (Russian)', async ({ page }) => {
    await page.goto('/');

    await page.click('button[title="Select a language"]');
    await page.click('a[lang="ru"]');

    await expect(page).toHaveTitle('Александр Тришин');
});
