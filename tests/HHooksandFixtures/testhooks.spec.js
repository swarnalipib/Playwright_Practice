const { test, expect } = require('@playwright/test');

test.describe('Demoblaze Login Test Suite', () => {

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

        // Close temporary page and context
        //await context.close();

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

        await page.locator("#nava").click()

        await expect(page.locator("#nava")).toContainText('PRODUCT STORE');
    });

    // TEST CASE 2
    test('Verify homepage test', async ({ page }) => {
    
        const products = await page.locator('.hrefch');
        await expect(products).toHaveCount(9);


    });

    // TEST CASE 3
    test('Verify product to cart', async ({ page }) => {
        

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

        await page.close();
        await context.close();

    });

});

/*

Understand the execution flow
For your four test cases, the execution will be:
beforeAll()

Open homepage and verify title once


Test 1
beforeEach()

Open website → Login

Test case 1

Execute your test scenario

afterEach()

Logout from application


Test 2
beforeEach()

Open website → Login

Test case 2

Execute your test scenario

afterEach()

Logout from application


Test 3
beforeEach()

Open website → Login

Test case 3

Execute your test scenario

afterEach()

Logout from application


Test 4
beforeEach()

Open website → Login

Test case 4

Execute your test scenario

afterEach()

Logout from application

*/