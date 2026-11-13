import { test, expect } from '@playwright/test';

test.describe('OrangeHRM1 Login Tests', async() => {

    test('Verify login page URL', async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        await expect(page).toHaveURL(/auth\/login/);
    });

    test('Verify login page heading', async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        await expect(page.locator('.orangehrm-login-title'))
            .toHaveText('Login');
    });

});

test.describe('OrangeHRM2 Dashboard Tests', async() => { //only is used to execute a particular test

    test.beforeEach(async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

        await page.fill('input[name="username"]', 'Admin');
        await page.fill('input[name="password"]', 'admin123');
        await page.click('button[type="submit"]');

        await expect(page).toHaveURL(/dashboard/);
    });

    test('Verify dashboard heading', async ({ page }) => {
        await expect(page.locator('h6')).toHaveText('Dashboard');
    });

    test('Verify dashboard widgets', async ({ page }) => {
        await expect(page.getByText('Time at Work')).toBeVisible();
    });

});