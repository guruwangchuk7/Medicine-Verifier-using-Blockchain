
import { test, expect } from '@playwright/test';

test('homepage has verify title', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/MedSure/);

    // Check for main CTA
    await expect(page.getByRole('link', { name: 'Scan Now' })).toBeVisible();
});

test('verification page loads correct status', async ({ page }) => {
    // Navigate to the dynamic route for a known valid batch
    await page.goto('http://localhost:3000/v/valid-batch');

    // Should show "Verified Authentic"
    await expect(page.getByText('Verified Authentic')).toBeVisible();
});

test('recalled batch shows warning', async ({ page }) => {
    // Navigate to the dynamic route for a recalled batch
    await page.goto('http://localhost:3000/v/recalled-batch');

    // Should show "WARNING: RECALLED"
    await expect(page.getByText('WARNING: RECALLED')).toBeVisible();
});
