/*

Test timeout
Playwright Test enforces a timeout for each test, 30 seconds by default. Time spent by the test function, fixture setups, and beforeEach hooks is included in the test timeout.

Timed out test produces the following error:

example.spec.ts:3:1 › basic test ===========================

Timeout of 30000ms exceeded.

//1.Timeout globally

import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 120_000,
});

or

import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    actionTimeout: 10000
  }
});

//2.Set timeout for a single test

test.setTimeout(120_000); 

Example: */ 
//Here this test will take 12 sec for the element to be visible ,if not visible then Playwright reports a timeout error and the assertion fails.
import { test, expect } from '@playwright/test';

test('Amazon homepage loads', async ({ page }) => {
    test.setTimeout(120_000); 
  await page.goto('https://www.amazon.in/');

  await expect(page.locator('#twotabsearchtextbox')).toBeVisible();

});

//or 
//Controls the maximum time allowed for an individual test to complete. The default is 30 seconds.

test('Amazon home loads', async ({ page }) => {
  await page.goto('https://www.amazon.in/');

  await expect(
    page.locator('#twotabsearchtextbox')
  ).toBeVisible();
}, { timeout: 60000 });

//3.test.use timeout used for all tests inside a file example in visibility-attached.spec.js

test.use({ timeout: 60000  }); 



