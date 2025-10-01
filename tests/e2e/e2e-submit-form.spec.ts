import { test, expect } from '@playwright/test';

test.describe("Feedback Form", () => {
  
  // Before Hook
  test.beforeEach(async ({ page }) => {
    await page.goto('http://zero.webappsecurity.com/index.html');
    await page.click('#feedback');
  });

  test('Reset Feedback Form', async ({ page }) => {
    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'a@gmail.com');
    await page.fill('#subject', 'Test Subject');
    await page.fill('#comment', 'This is a test comment.');
    await page.click('input[name="clear"]');

    const nameInput = page.locator('#name');
    const emailInput = page.locator('#email');
    const subjectInput = page.locator('#subject');
    const commentInput = page.locator('#comment');  

    await expect(nameInput).toBeEmpty();
    await expect(emailInput).toBeEmpty();
    await expect(subjectInput).toBeEmpty();
    await expect(commentInput).toBeEmpty();
  });

  test('Submit Feedback Form', async ({ page }) => {
    await page.fill('#name', 'John Doe');
    await page.fill('#email', 'a@gmail.com');
    await page.fill('#subject', 'Test Subject');
    await page.fill('#comment', 'This is a test comment.');
    await page.click('input[name="submit"]');

    const successMessage = page.locator('h3');
    await expect(successMessage).toBeVisible();
  });

});
