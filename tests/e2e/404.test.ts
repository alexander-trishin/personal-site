import { test, expect } from '@playwright/test';

test('should navigate to home page when GoHome button pressed', async ({ page }) => {
    await page.goto('/page/that/does/not/exist');
    await page.click('text=back to home page');

    await expect(page).toHaveURL('/');
});
