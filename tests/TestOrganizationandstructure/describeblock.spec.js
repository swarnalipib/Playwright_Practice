//test.describe() to group related test cases into a single logical test suite. For example, in OrangeHRM, we can create separate describe blocks for
// -- Login, Dashboard, Employee Management, and Admin functionality. This improves code readability, reusability, and maintainability.
//. It helps you organize your test code, make HTML test reports cleaner to read, and apply specific setups or configurations to a sub-section of tests.

import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Login Test Suite', () => {

  // Runs before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  test('Verify login page title', async ({ page }) => {
    await expect(page).toHaveTitle(/OrangeHRM/);
  });

  test('Verify username and password fields', async ({ page }) => {
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test('Verify login with valid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('h6')).toContainText('Dashboard');
  });

  test('Verify login with invalid credentials', async ({ page }) => {
    await page.fill('input[name="username"]', 'InvalidUser');
    await page.fill('input[name="password"]', 'WrongPassword');
    await page.click('button[type="submit"]');

    await expect(page.locator('.oxd-alert-content-text'))
      .toContainText('Invalid credentials');
  });

});

/*
beforeEach() executes.

Test Case 1 executes.

beforeEach() executes again.

Test Case 2 executes.*/