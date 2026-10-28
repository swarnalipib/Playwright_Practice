
/*

Feature             Auto-Retrying                           	Non-Retrying
Syntax	       await expect(locator).toBeVisible()	         expect(value).toBe(...)
Input	         Locator or Page object                        Plain value (string, number, boolean)
Retries?	     Yes -- polls until pass or timeout	           No -- checks once, pass or fail
Needs await?   Yes -- it is async	                           No -- it is sync
Flaky?	       Rarely -- handles timing naturally	           Often -- race conditions with async UI
Use when?	     Checking element/page state	                 Checking already-resolved values


//What is the difference between auto-retrying and non-retrying assertions in Playwright?

A: *Auto-retrying assertions take a locator or page object as input. Playwright re-queries
    the DOM repeatedly -- every 100ms -- until the condition is met or the timeout expires 
    (default 5 seconds). Examples: expect(locator).toBeVisible(), expect(locator).toHaveText().
  *Non-retrying assertions take a plain value -- string, number, boolean. They check once 
  and either pass or fail immediately. Example: expect(someString).toBe("hello"). 
  The rule is simple: for anything on the page, always use the auto-retrying version. 
  Only use non-retrying when you have already extracted a value and need to check it.

*/

import { test, expect } from '@playwright/test';

test('Non-retrying assertion on DemoBlaze', async ({ page }) => {
  await page.goto('https://demoblaze.com/index.html');

  // Capture the page title once
  const actualTitle = await page.title();

  // Non-retrying assertion
  expect(actualTitle).toBe('STORE'); //- it will fail without retrying
  //xpect(actualTitle).toBe('STOR123E');
});


test('auto-retrying assertion on DemoBlaze', async ({ page }) => {
  await page.goto('https://demoblaze.com/index.html');

  // Auto-retrying assertion
 // await expect(page).toHaveTitle('STORE123');
  await expect(page).toHaveTitle('STORE');
});

/*
//These methods return the current state or value of a locator. They are useful when you 
want to capture a value and assert it with a generic expect() matcher. Playwright
 recommends retrying web assertions instead when testing conditions that may change 
 asynchronously.

Complete list of generic non-retrying assertions
These are standard JavaScript Playwright Test matchers that check values immediately. They can be used with values obtained from OrangeHRM or any other application. 
Playwright

Assertion	What it checks	OrangeHRM example
toBe()	            Strict equality	                    expect(title).toBe('OrangeHRM')
toEqual()	          Deep equality	                      expect(labels).toEqual(['Username', 'Password'])
toStrictEqual()	    Strict deep equality	              expect(data).toStrictEqual(expectedData)
toBeTruthy()	      Value is truthy         	          expect(isVisible).toBeTruthy()
toBeFalsy()	        Value is falsy	                    expect(isHidden).toBeFalsy()
toBeNull()	        Value is null	                      expect(attribute).toBeNull()
toBeUndefined()	    Value is undefined	                expect(missingValue).toBeUndefined()
toBeDefined()	      Value isn't undefined	              expect(username).toBeDefined()
toContain()	        Array or string contains a value	  expect(text).toContain('Login')
toContainEqual()	  Array contains a deeply equal item	expect(items).toContainEqual({ name: 'Username' })
toMatch()	         String matches a regular expression	expect(title).toMatch(/OrangeHRM/)
toMatchObject()	   Object contains expected properties	expect(user).toMatchObject({ role: 'Admin' })
toHaveLength()	   Array or string length	              expect(labels).toHaveLength(2)
toBeGreaterThan()	 Greater than	                        expect(count).toBeGreaterThan(0)
toBeGreaterThanOrEqual()	Greater than or equal	        expect(count).toBeGreaterThanOrEqual(1)
toBeLessThan()	       Less than	                      expect(count).toBeLessThan(10)
toBeLessThanOrEqual()	Less than or equal	              expect(count).toBeLessThanOrEqual(5)
toBeCloseTo()	     Approximate numeric equality	        expect(ratio).toBeCloseTo(0.5)
toBeInstanceOf()	Object belongs to a class	            expect(response).toBeInstanceOf(Object)
toThrow()       	Function throws an error	            expect(() => { throw new Error('Test'); }).toThrow('Test')

You can also use .not to negate an assertion, for example expect(title).not.toBe('Dashboard').



*/

//Example 1 — isVisible()
//Checks whether the login button is visible at the moment of the check.


test('check username visibility', async ({ page }) => {
  await page.goto(
    'https://parabank.parasoft.com/parabank/index.htm'
  );

  const username = page.getByRole('button', {
    name: 'Log In'
  });

  const visible = await username.isVisible();

  expect(visible).toBe(true);
});

//Example 2 Login is enabled

test.only('check login button enabled state', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://parabank.parasoft.com/parabank/index.htm');

  // Locate and fill the username field
  const usernameInput = page.locator('input[name="username"]');
  await usernameInput.fill('admin');

  // Locate the login button
  const loginButton = page.locator('input[value="Log In"]');

  // Assert that the login button is enabled
  await expect(loginButton).toBeEnabled();
});

//Example 3

test('check username field count', async ({ page }) => {
  await page.goto(
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
  );

  const username = page.locator('input[name="username"]');

  const count = await username.count();

  expect(count).toBe(0);
});

//Example 4

test('check entered username', async ({ page }) => {
  await page.goto(
    'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
  );

  const username = page.locator('input[name="username"]');

  await username.fill('Admin');

  const value = await username.inputValue();

  expect(value).toBe('Admin');
});