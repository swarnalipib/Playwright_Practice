import { test,expect } from '@playwright/test';

test.describe('Demoglaze site', () => {
  // Configure all tests inside this describe block to run in parallel
  test.describe.configure({ mode: 'parallel' });
  // BEFORE ALL - Executes once
    test.beforeAll(async ({ browser }) => {

        console.log('============= BEFORE ALL =============');
        console.log('Test Suite Started');
        test.setTimeout(90000);
        // Create separate browser context and page
        const context = await browser.newContext();
        const page = await context.newPage();

        await page.goto('https://demoblaze.com/');

        await expect(page).toHaveTitle('STORE');

        console.log('Homepage title verified');
    });

 // BEFORE EACH - Executes before every test
    test.beforeEach(async ({ page }) => {

        console.log('============= BEFORE EACH =============');
        console.log('Opening Demoblaze and logging in');


        // Click Login
        await page.locator('#login2').click();

        // Enter username
        await page.locator('#loginusername').fill('pavanol');

        // Enter password
        await page.locator('#loginpassword').fill('test@123');

        // Click Login button
        await page.locator(
            "//button[normalize-space()='Log in']"
        ).click();

        // Verify successful login
        await expect(page.locator('#logout2')).toBeVisible();

        console.log('Login successful');

    });

// TEST CASE 1
    test('Verify homepage logo', async ({ page }) => {
      //  await page.goto('https://demoblaze.com/');

        await page.locator("#nava").click()

        await expect(page.locator("#nava")).toContainText('PRODUCT STORE');
    });

     // TEST CASE 2
    test('Verify url', async ({ page }) => {
      //  await page.goto('https://demoblaze.com/');
        await expect(page).toHaveTitle('STORE');


    });

    
     // TEST CASE 3
   test('Verify category link', async ({ page }) => {
       // await page.goto('https://demoblaze.com/');
        await page.locator("//a[@id='cat']").click();
        await expect(page.locator("//a[@id='cat']")).toHaveText('CATEGORIES');

    });


        // TEST CASE 4
    test('Verify contact link', async ({ page }) => {
       // await page.goto('https://demoblaze.com/');
        await page.locator("//a[normalize-space()='Contact']").click();
        await expect(page.locator("//a[normalize-space()='Contact']")).toBeVisible();

    });

    // TEST CASE 5
    test('Verify homepage test', async ({ page }) => {
        //await page.goto('https://demoblaze.com/');
        const products = await page.locator('.hrefch');
        await expect(products).toHaveCount(9);


    });

    // TEST CASE 6
    test('Verify product to cart', async ({ page }) => {
        //await page.goto('https://demoblaze.com/');

        await page.locator("//a[normalize-space()='Samsung galaxy s6']").click()

       await page.locator("//a[normalize-space()='Add to cart']").click();
       await expect(page.locator("//a[normalize-space()='Add to cart']")).toContainText('Add to cart');

        page.on('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Product added');
    await dialog.accept();
  });
});





    // AFTER EACH - Executes after every test
    test.afterEach(async ({ page }) => {

        console.log('============= AFTER EACH =============');
        console.log('Logging out from Demoblaze');

        // Logout
        const logoutButton = page.locator('#logout2');

            await expect(logoutButton).toBeHidden();

            console.log('Logout successful');

    });


    // AFTER ALL - Executes once
    test.afterAll(async () => {

        console.log('============= AFTER ALL =============');
        console.log('All test cases completed');
        console.log('Test Suite Finished');

    
    });

});