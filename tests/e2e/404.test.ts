import { test, expect } from '@playwright/test';

test('should navigate to home page when GoHome button pressed', async ({ page }) => {
    await page.goto('/page/that/does/not/exist');
    await page.click('a');

    const actual = new URL(page.url());

    expect(actual.pathname).toBe('/');
});
