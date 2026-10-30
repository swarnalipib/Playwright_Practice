//In Playwright, timeouts act as a safety net to prevent your automation scripts from hanging forever when a webpage fails to respond or load
/*
Types of timeout
--------------------
1. Test Timeout (Default: 30 seconds)

• What it means: The maximum time allowed for the entire test to complete. If the test takes longer than this budget, Playwright kills it completely.
• Amazon.in Analogy: Your overall patience limit. You give yourself exactly 30 seconds to open Amazon, search for a product, and verify the checkout page. If it takes 31 seconds, you give up completely.


2. Navigation Timeout (Default: No limit / falls back to Test Timeout)

• What it means: The maximum time allowed for a page to load or transition after an action like page.goto().
• Amazon.in Analogy: Waiting for the homepage to load. If the Amazon India server is down or your internet is crawling, this stops the script from waiting indefinitely for the page to render.

3. Action Timeout (Default: No limit / falls back to Test Timeout)

• What it means: The maximum time Playwright will spend executing a single interaction, such as .click() or .fill(). Playwright automatically waits for elements to be visible and clickable before acting.
• Amazon.in Analogy: Waiting for the "Add to Cart" button to become clickable after clicking a product.

4. Expect / Assertion Timeout (Default: 5 seconds)

• What it means: The maximum time Playwright will spend retrying an assertion (like checking if an element exists or has text) before failing the test.
• Amazon.in Analogy: Looking at your cart icon. You expect the cart count to change to "1". Playwright will keep checking the cart badge for up to 5 seconds before giving up

5.Global timeout configuration
-----------------------------------
You can define all base timeouts inside your central config file.

Configure default timeouts in playwright.config.ts.


import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000, // Maximum test execution time: 60 seconds

  use: {
    baseURL: 'https://www.amazon.in',
    actionTimeout: 15000,    // Click, fill, etc.
    navigationTimeout: 30000 // Page navigation
  },
});

7.Page-level timeout configuration
You can configure default action and navigation timeouts in your test.
Example:
*/

import { test, expect } from '@playwright/test';

test('Search product on Amazon India', async ({ page }) => {

  page.setDefaultTimeout(15000);
  page.setDefaultNavigationTimeout(30000);

  await page.goto('https://www.amazon.in');

  await page.locator('#twotabsearchtextbox')
    .fill('iPhone 16');

  await page.locator('#nav-search-submit-button').click();

  await expect(page.locator('[data-component-type="s-search-result"]')
    .first()).toBeVisible();
});



//Complete Amazon.in example with timeout handling


test('Amazon product search with timeout handling', async ({ page }) => {

  test.setTimeout(120000);

  try {
    // Navigate to Amazon
    await page.goto('https://www.amazon.in', {
      waitUntil: 'domcontentloaded',
      timeout: 60000
    });

    // Wait for search box
    const searchBox = page.locator('#twotabsearchtextbox');

    await searchBox.waitFor({
      state: 'visible',
      timeout: 30000
    });

    // Search for a product
    await searchBox.fill('Samsung Galaxy S25');

    await page.locator('#nav-search-submit-button').click({
      timeout: 15000
    });

    // Verify search results
    await expect(
      page.locator('[data-component-type="s-search-result"]').first()
    ).toBeVisible({ timeout: 30000 });

    console.log('Amazon product search successful');

  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  }
});

//Example -
//Timeout for individual operations

//You can override the timeout for a specific operation.


// Page navigation timeout: 60 seconds

test('Amazon product search with timeout handling individually', async ({ page }) => {

await page.goto('https://www.amazon.in', { timeout: 60000});

// Search box wait timeout: 20 seconds
await page.locator('#twotabsearchtextbox').waitFor({state: 'visible',timeout: 20000});

// Click timeout: 10 seconds
await page.locator('#nav-search-submit-button').click({timeout: 10000});

// Assertion timeout: 15 seconds
await expect(page.locator('#nav-search-submit-button')).toBeVisible({timeout: 15000});

});