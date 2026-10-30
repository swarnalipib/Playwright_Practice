/*

The locator.waitFor() method in Playwright pauses test execution until a target element reaches a specified element state.

How locator.waitFor() Works

• Auto-default: By default, locator.waitFor() waits for the element to become visible (state: 'visible').
• No Assertions: It only waits for a condition; it does not make assertions about the element's content or properties. Always follow it with a web-first assertion (e.g., expect(locator).toBeVisible()).
• Immediate Return: If the element is already in the target state, the method returns right away.
• Timeout: It throws a TimeoutError if the condition is not met within the default timeout (usually 30 seconds) or a custom timeout option.

Supported 4 States (state option)

You can pass different states into the options object: await locator.waitFor({ state: '...' }):
• visible (Default): Waits until the element is present in the DOM and visible on the page (has non-zero box dimensions and no display: none or visibility: hidden).
• hidden: Waits until the element is either removed from the DOM or hidden (e.g., a loading spinner disappears).Element is detached, has an empty bounding box, or is visibility: hidden
• attached: Waits until the element is present in the DOM, regardless of whether it is visible to the user.
• detached: Waits until the element is completely removed from the DOM. */

import { test, expect } from '@playwright/test';


test('Wait for -Attached', async ({ page }) => {
  await page.goto('https://www.amazon.in/');

  const searchBox = page.locator('#twotabsearchtextbox');

  await searchBox.waitFor({
    state: 'attached',
    timeout: 10000
  });

  await expect(searchBox).toBeAttached();

});

test('wait for search box to become visible', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  const searchBox = page.locator('#twotabsearchtextbox');

  await searchBox.waitFor({
    state: 'visible',
    timeout: 10000
  });

  await expect(searchBox).toBeVisible();
});

test('wait for account flyout to hide', async ({ page }) => {
  const flyout = page.locator('#nav-flyout-ya-signin');

  await flyout.waitFor({
    state: 'hidden',
    timeout: 14000
  });
});

test('wait for search suggestions to detach', async ({ page }) => {  
  
  await page.goto('https://www.amazon.in/');

  const searchBox = page.locator('#twotabsearchtextbox');

  await searchBox.fill('iphone');

  const suggestions = page.locator(
    '.left-pane-results-container'
  );

  // Continue only if suggestions actually appear.
  await suggestions.waitFor({
    state: 'attached',
    timeout: 10000
  });

  await page.keyboard.press('Escape');

  await suggestions.waitFor({
     state: 'detached',
    timeout: 10000
  });
});
