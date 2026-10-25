const heading = page.locator('h1');

// Extract text
console.log(await heading.innerText());

// Extract input value
const username = page.locator('#username');
console.log(await username.inputValue());

// Extract an attribute
const link = page.locator('a');
console.log(await link.getAttribute('href'));

// Extract text from multiple elements
const items = page.locator('.item');
console.log(await items.allTextContents());

// Count matching elements
console.log(await items.count());

//-------------------
const button = page.getByRole('button', { name: 'Submit' });

console.log(await button.isVisible());
console.log(await button.isEnabled());

const checkbox = page.getByRole('checkbox', { name: 'Remember me' });
console.log(await checkbox.isChecked());

const input = page.locator('#email');
console.log(await input.isEditable());


//---------------------
await page.locator('#email').fill('test@example.com');
await page.locator('#password').fill('Password123');
await page.getByRole('button', { name: 'Login' }).click();

//

import { test, expect } from '@playwright/test';

test('verify login button', async ({ page }) => {
  await page.goto('https://example.com');

  const button = page.getByRole('button', { name: 'Login' });

  await expect(button).toBeVisible();
  await expect(button).toBeEnabled();
});


await expect(locator).toHaveText('Welcome');
await expect(locator).toContainText('Welcome');
await expect(locator).toHaveValue('admin');
await expect(locator).toBeChecked();
await expect(locator).toBeDisabled();
await expect(locator).toHaveAttribute('type', 'email');
await expect(locator).toHaveCount(3);