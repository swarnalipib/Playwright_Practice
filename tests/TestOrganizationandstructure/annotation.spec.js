/*
Playwright supports tags and annotations that are displayed in the test report.

You can add your own tags and annotations at any moment, but Playwright comes with a few built-in ones:
test.only() -When there are focused tests, only these tests run .when a particular test need to be run
test.skip() marks the test as irrelevant. Playwright does not run such a test. Use this annotation when the test is not applicable in some configuration.
test.fail() marks the test as failing. Playwright will run this test and ensure it does indeed fail. If the test does not fail, Playwright will complain.
test.fixme() marks the test as failing. Playwright will not run this test, as opposed to the fail annotation. Use fixme when running the test is slow or crashes.
test.slow() marks the test as slow and triples the test timeout.
Annotations can be added to a single test or a group of tests.

// Built-in Annotations (Execution Modifiers)

Annotation	                   Behavior	                                                                         Use Case Example
test.skip()	    Aborts execution immediately; marks the test as skipped.	               Avoid running a test on an environment or browser where a feature isn't supported.
test.fail()	    Expects the test to fail. If it passes, Playwright reports an error.	   Acknowledging a known bug without breaking your green CI pipeline.
test.fixme()	Skips the test entirely and marks it as broken.	                           Temporarily turning off a flaky or severely broken test until someone fixes it.
test.slow()	    Triples the standard timeout duration for that specific test.	           Long workflows like data generation or multipart multi-page checkouts.
test.only()	    Focuses execution only on this test, skipping all others.	               Isolate and debug a single failure locally without waiting for the whole suite.



*/
import { test, expect } from '@playwright/test';

// test.only('Annotation-only', async ({ page }) => {
//   await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
//   await expect(page).toHaveTitle(/OrangeHRM/);
// console.log("Test1 done successfully");
// }); //It runs this specific test only

// test.skip('Verify username and password fields', async ({ page }) => {
//   await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
//   await expect(page.locator('input[name="username"]')).toBeVisible();
//   await expect(page.locator('input[name="password"]')).toBeVisible();
//   console.log("Test2 done successfully");
// }); //it will skip this test or abort excuting this test 

//or
// test('Verify username and password fields', async ({ page }) => {
//    test.skip();
//   await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
//   await expect(page.locator('input[name="username"]')).toBeVisible();
//   await expect(page.locator('input[name="password"]')).toBeVisible();
//   console.log("Test2 done successfully");
// });
//or

test('Verify username and password fields', async ({ page,browserName }) => {

  if(browserName === 'chromium') //can be condition based
  {
  test.skip()
  }

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await expect(page.locator('input[name="username"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  console.log("Test2 done successfully");
});




test('Verify login with valid credentials', async ({ page }) => {
   test.slow() //it will increase time limit to 3 times of timeout configured
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/dashboard/);
  await expect(page.locator('h6')).toContainText('Dashboard');
  console.log("Test3 done successfully");
});

test('Verify login with invalid credentials', async ({ page }) => {
  test.fixme()//it mostly work as skipped if a test contains issues r error you can skip it
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.fill('input[name="username"]', 'InvalidUser');
  await page.fill('input[name="password"]', 'WrongPassword');
  await page.click('button[type="submit"]');
  await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials11');//here Invalid credentials11 is wrong correct is 'Invalid credentials'
  console.log("Test4 done successfully");
});

  test('Verify login with invalid credentials2', async ({ page }) => {
   test.fail() //it will pass as actual outcome match with expected outcome as fail
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.fill('input[name="username"]', 'admin');
  await page.fill('input[name="password"]', 'WrongPassword');
  await page.click('button[type="submit"]');
  await expect(page.locator('.oxd-alert-content-text')).toContainText('Invalid credentials11');//here Invalid credentials11 is wrong correct is 'Invalid credentials'
  console.log("Test5 done successfully");
});

//can be used with describe block and hooks level

/*
Import { test } from '@playwright/test';

// Annotating an entire suite group
test.describe('Admin Panel Tests', () => {
  // Skip the entire group if running in a mobile view environment
  test.beforeEach(async ({ isMobile }) => {
    test.skip(isMobile, 'Admin configurations are not optimized for mobile layouts');
  });

  test('create user profile', async ({ page }) => { ... });
  test('delete user profile', async ({ page }) => { ... });
});  */


/* or 

test.describe.skip('Admin Panel Tests', () => {
  // Skip the entire group if running in a mobile view environment
  test.beforeEach(async ({ isMobile }) => {
  await page.goto('https://demoblaze.com/');
  });

  test('create user profile', async ({ page }) => { ... });
  test('delete user profile', async ({ page }) => { ... });
});  */