
import { test, expect } from '@playwright/test';

expect.extend({
  async toBeEnabledOnPage(locator) {
    const pass = await locator.isEnabled();

    return {
      pass,
      message: () =>
        'Expected the element to be enabled'
    };
  }
});

test('login button should be enabled', async ({ page }) => {
  await page.goto(
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
  );

  const loginButton = page.getByRole('button', {
    name: 'Login'
  });

  await expect(loginButton).toBeEnabledOnPage();
});

//Check the login error message

expect.extend({
  async toShowErrorMessage(locator, expectedMessage) {
    const actualText = await locator.textContent();
    const pass = actualText?.includes(expectedMessage) ?? false;

    return {
      pass,
      message: () =>
        `Expected error "${expectedMessage}", ` +
        `but received "${actualText}"`
    };
  }
});

test('invalid login should show an error', async ({ page }) => {
  await page.goto(
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
  );

  await page.locator('input[name="username"]').fill('wrongUser');
  await page.locator('input[name="password"]').fill('wrongPassword');

  await page.getByRole('button', { name: 'Login' }).click();

  const errorMessage = page.getByText('Invalid credentials');

  await expect(errorMessage).toShowErrorMessage('Invalid credentials');
});