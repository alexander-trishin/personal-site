import { test, expect } from '@playwright/test';

test('should navigate to home page when GoHome button pressed', async ({ page }) => {
    await page.goto('http://localhost:3000/page-that-does-not-exist');

    await page.click('a[data-test-id=go-home]');

    const actual = page.locator('data-test-id=Index');

    expect(actual).toBeDefined();
});
