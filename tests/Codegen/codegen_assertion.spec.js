import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await expect(page.locator('div').filter({ hasText: /^Username$/ }).nth(2)).toBeVisible();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeVisible();
  await expect(page.locator('form')).toContainText('Password');
  await expect(page.getByRole('textbox', { name: 'Password' })).toBeEmpty();
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('link', { name: 'Leave' })).toBeVisible();
});

/*
assertion is a Boolean expression that validates whether the actual outcome of a test matches the expected outcome. 
It acts as a checkpoint; if the condition evaluates to True, the test continues, but if it evaluates to False, the test immediately fails,
 signaling a bug or defect in the application.

 Assertions by clicking a toolbar icon, then clicking a page element to assert against. You can choose:
'assert visibility' to assert that an element is visible
'assert text' to assert that an element contains specific text
'assert value' to assert that an element has a specific value

Generating locators
Click the 'Pick Locator' button and hover over elements in the browser window to see the locator highlighted underneath each element
Click the element you want to locate and the code for that locator will appear in the locator playground next to the Pick Locator 
button */