//Element States (Locator State Assertions)
//In Playwright, "states" usually refer to either Element States (used for checking or waiting on UI conditions) or Storage State (used for saving and restoring browser authentication or session data)

//Playwright provides web-first assertions that automatically wait and retry until an element matches the target state.

/*List of Element States & Matchers

• toBeAttached() – Element is present in the DOM.
• toBeVisible() – Element is visible in the viewport.
• toBeHidden() – Element is not visible (hidden or removed).
• toBeEnabled() – Interactive element (like a button or input) is enabled.
• toBeDisabled() – Interactive element is disabled.
• toBeEditable() – Input element can be edited.
• toBeChecked() – Checkbox or radio button is checked.
• toBeFocused() – Element currently has focus.
• toBeEmpty() – Container or input has no children/text.
• toBeInViewport() – Element intersects the current viewport. 

*/

import { test, expect } from '@playwright/test';

test('Amazon Site',async ({ page }) => {

  await page.goto('https://www.amazon.in/');
  const searchBox = page.locator('#twotabsearchtextbox');

  await expect(searchBox).toBeAttached();
  await expect(searchBox).toBeVisible();
  await expect(searchBox).toBeEnabled();
  await expect(searchBox).toBeEditable();
  await expect(searchBox).toBeEmpty();
  await expect(searchBox).toBeInViewport();

  await searchBox.click();
  await expect(searchBox).toBeFocused();

  const signIn = await page.locator('.nav-action-inner');
  await expect(signIn).toBeHidden();
  //await expect(signIn).toBeDisabled();

//     const checkbox = page.locator(
//     'input[type="checkbox"]'
//   ).first();

//   await expect(checkbox).toBeChecked();

});

