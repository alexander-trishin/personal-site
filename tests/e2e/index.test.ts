import { test, expect } from '@playwright/test';

test('basic', async ({ page }) => {
    await page.goto('/en');

    await expect(page).toHaveTitle('Alexander Trishin');
});
