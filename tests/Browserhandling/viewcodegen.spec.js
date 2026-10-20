//npx playwright codegen https://testautomationpractice.blogspot.com/ -o  ./tests/Browserhandling/viewd.spec.js --viewport-size 1080,1080 

import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 1080,
    width: 1080
  }
});

test('test', async ({ page }) => {
  await page.goto('https://testautomationpractice.blogspot.com/');
  await expect(page.getByLabel('Sorted List:')).toBeVisible();
  await page.locator('#Wikipedia1_wikipedia-search-input').click();
  await page.locator('#Wikipedia1_wikipedia-search-input').fill('phones');
  await page.locator('input[type="submit"]').click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Phones', exact: true }).click();
  const page1 = await page1Promise;
});