//Custom assertion means 

import { test, expect } from '@playwright/test';

/*
function assertValidUsername(username) {
  if (username.length < 3) {
    throw new Error('Username must have at least 3 characters');
  }
}

test('validate username', async () => {
  const username = 'john';

  assertValidUsername(username);

  expect(username).toBe('john');
});

async function assertUserLoggedIn(page) {
  await expect(page.getByText('Welcome')).toBeVisible();
  await expect(page.getByRole('button', {
    name: 'Logout'
  })).toBeVisible();
}

test('verify successful login', async ({ page }) => {
  await page.goto('https://example.com');

  // Your login steps go here

  await assertUserLoggedIn(page);
});

*/

async function assertUserLogIn(page) 
{

await expect(page).toHaveTitle('STORE');
await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible(); 
}

test('verify successful login', async ({ page }) => { 
  await page.goto('https://demoblaze.com/index.html'); 
  
  // 1. Click the Login navigation link
  await page.getByRole('link', { name: 'Log in' }).click();
  
  // 2. Fill in the login credentials (DemoBlaze uses standard text inputs in a modal)
  await page.locator('#loginusername').fill('pavanol');
  await page.locator('#loginpassword').fill('test@123');
  
  // 3. Click the 'Log in' button inside the modal
  await page.getByRole('button', { name: 'Log in' }).click();
  
  // 4. Assert the user logged in successfully
  await assertUserLogIn(page); 
});

//except.extend
/*
expect.extend is a method used in modern JavaScript testing frameworks (like Jest, Playwright,
 and Vitest) to create custom test assertions.
Instead of writing repetitive logic inside your tests, expect.extend lets you bundle that 
logic into a brand-new "matcher" function (e.g., .toBeWithinRange() or .toBeValidEmail()) 
that fits seamlessly alongside built-in assertions like .toBe() or .toEqual().

Why use it?

• Readability: It turns complex validation blocks into a single, clean line of descriptive code.
• Reusability: You write the logic once and use it across dozens of test files.
• Better Error Messages: You can format highly specific failure messages to save time during debugging.
• Support for Negation: It automatically handles the .not modifier if configured correctly.

*/


expect.extend({
  toBeEven(num) {
    const pass = num % 2 === 0;

    return {
      pass,
      message: () => `Expected ${num} to be even`
    };
  }
});

test('check even number', async () => {
  expect(10).toBeEven();
   expect(2).toBeEven();
    expect(12).toBeEven();
});

//num is the actual value passed to the assertion.
//pass is true if the number is even and false otherwise.
//message() provides a helpful error message if the assertion fail


//Example: Check whether a number is positive


expect.extend({
  toBePositive(received) {
    const pass = received > 0;

    return {
      pass,
      message: () =>
        `Expected ${received} to be a positive number`
    };
  }
});

test('positive number validation', async () => {
  expect(10).toBePositive();  // PASS
  expect(25).toBePositive();  // PASS

});

//Example 1: Custom assertion to check whether the username field is visible

expect.extend({
  async toBeVisibleOnPage(locator) {
    const pass = await locator.isVisible();

    return {
      pass,
      message: () =>
        'Expected the element to be visible on the page'
    };
  }
});

test.only('username field should be visible', async ({ page }) => {
  await page.goto(
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
  );

  const usernameField = await page.locator("//input[@placeholder='Username']");

  await expect(usernameField).toBeVisibleOnPage();
});

//Check whether the password field exists

expect.extend({
  async toExistOnPage(locator) {
    const count = await locator.count();
    const pass = count > 0;

    return {
      pass,
      message: () =>
        `Expected element to exist, but found ${count} elements`
    };
  }
});

test('password field should exist', async ({ page }) => {
  await page.goto(
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
  );

  const passwordField = page.locator('input[name="password"]');

  await expect(passwordField).toExistOnPage();
});