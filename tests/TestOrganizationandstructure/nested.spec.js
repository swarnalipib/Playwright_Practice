//Nested describe blocks-You can create a describe block inside another describe block.


import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Application', () => {

    test.describe('Login Module', () => {

        test('Valid login', async ({ page }) => {
            await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

            await page.fill('input[name="username"]', 'Admin');
            await page.fill('input[name="password"]', 'admin123');
            await page.click('button[type="submit"]');

            await expect(page).toHaveURL(/dashboard/);
        });

        test('Invalid login', async ({ page }) => {
            await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

            await page.fill('input[name="username"]', 'WrongUser');
            await page.fill('input[name="password"]', 'WrongPass');
            await page.click('button[type="submit"]');

            await expect(page.getByText('Invalid credentials')).toBeVisible();
        });

    });

    test.describe('Login Page UI', () => {

        test('Verify username placeholder', async ({ page }) => {
            await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

            await expect(page.locator('input[name="username"]'))
                .toHaveAttribute('placeholder', 'Username');
        });

    });

});