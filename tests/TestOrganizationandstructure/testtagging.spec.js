import { test, expect } from '@playwright/test';


  test('Verify login page title',{ tag: '@smoke' }, async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(page).toHaveTitle(/OrangeHRM/);
  });

  test('Verify username and password fields',{ tag: ['@regression', '@critical'] }, async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await expect(page.locator('input[name="username"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });

  test('Verify login with valid credentials@smoke', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('h6')).toContainText('Dashboard');
  });

  test('Verify login with invalid credentials@regression', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.fill('input[name="username"]', 'InvalidUser');
    await page.fill('input[name="password"]', 'WrongPassword');
    await page.click('button[type="submit"]');

    await expect(page.locator("//p[@class='oxd-text oxd-text--p oxd-alert-content-text']"))
      .toContainText('Invalid credentials');
  });

  test('Verify login with valid username but invalid password credentials @smoke @regression @critical', async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.fill('input[name="username"]', 'Admin');
    await page.fill('input[name="password"]', 'WrongPassword');
    await page.click('button[type="submit"]');

    await expect(page.locator("//p[@class='oxd-text oxd-text--p oxd-alert-content-text']"))
      .toContainText('Invalid credentials');
  });

  test('Verify login with Invalid username but valid password credentials @critical', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.fill('input[name="username"]', 'wrongusername');
    await page.fill('input[name="password"]', 'admin123');
    await page.click('button[type="submit"]');

    await expect(page.locator("//p[@class='oxd-text oxd-text--p oxd-alert-content-text']"))
      .toContainText('Invalid credentials');
  });

  /* commands used

  npx playwright test --grep  '@smoke'
  npx playwright test --grep  '@regression'
  npx playwright test --grep  '@critical'
  npx playwright test --grep  '(@regression) (@critical)'
  npx playwright test --grep  '(@smoke) (@regression) (@critical)'
  npx playwright test --grep  '@regression' --grep-invert '@smoke'
   npx playwright test --grep '@smoke' --grep-invert '@regression' 
   npx playwright test -g  '@smoke'  //can be used with -g inplace of --grep
   npx playwright test --grep "@smoke|@regression" 




  */