import {test, expect} from '@playwright/test';

test.describe("Search Results", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://zero.webappsecurity.com/index.html');
    });

    test('Search for "bank"', async ({ page }) => {
        await page.fill('#searchTerm', 'bank');
        await page.keyboard.press('Enter');
        const numberOfResults = page.locator('li > a');
        await expect(numberOfResults).toHaveCount(2);
    });
});