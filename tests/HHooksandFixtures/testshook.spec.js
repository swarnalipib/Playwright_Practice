
const { test, expect } = require('@playwright/test');

// Variables accessible to both beforeAll and afterAll
let context;
let setupPage;

test.describe('Demoblaze Login Test Suite', () => {

    // BEFORE ALL - Executes once
    test.beforeAll(async ({ browser }) => {

        console.log('============= BEFORE ALL =============');
        console.log('BEFORE ALL: Test Started');

        // Create browser context and page
        context = await browser.newContext();
        setupPage = await context.newPage();

        await setupPage.goto('https://demoblaze.com/');

        await expect(setupPage).toHaveTitle('STORE');

        console.log('Homepage title verified');

    });


    // BEFORE EACH - Executes before every test
    test.beforeEach(async ({ page }) => {

        test.setTimeout(90000);

        console.log('============= BEFORE EACH =============');
        console.log('Opening Demoblaze and logging in');

        // Open homepage
        await page.goto('https://demoblaze.com/');

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


    // TEST CASE 1 - Verify homepage logo
    test('TC01 - Verify homepage logo', async ({ page }) => {

        await page.locator('#nava').click();

        await expect(page.locator('#nava'))
            .toContainText('PRODUCT STORE');

    });


    // TEST CASE 2 - Verify homepage products
    test('TC02 - Verify homepage products', async ({ page }) => {

        const products = page.locator('.hrefch');

        await expect(products).toHaveCount(9);

    });


    // TEST CASE 3 - Verify product to cart
    test('TC03 - Verify product to cart', async ({ page }) => {

        // Select Samsung Galaxy S6
        await page.locator(
            "//a[normalize-space()='Samsung galaxy s6']"
        ).click();

        // Register alert handler BEFORE clicking Add to Cart
        page.once('dialog', async (dialog) => {

            console.log('Alert message:', dialog.message());

            expect(dialog.message()).toContain('Product added');

            await dialog.accept();

        });

        // Click Add to Cart
        await page.locator(
            "//a[normalize-space()='Add to cart']"
        ).click();

        // Navigate to Cart
        await page.locator('#cartur').click();

        // Verify product in cart
        await expect(
            page.locator('#tbodyid')
        ).toContainText('Samsung galaxy s6');

    });


    // AFTER EACH - Executes after every test
    test.afterEach(async ({ page }) => {

        console.log('============= AFTER EACH =============');
        console.log('AFTER EACH: Logout');

        const logoutButton = page.locator('#logout2');

        // Logout only if user is logged in
        if (await logoutButton.isVisible()) {

            await logoutButton.click();

            await expect(logoutButton).toBeHidden();

            console.log('Logout successful');

        }

    });


    // AFTER ALL - Executes once
    test.afterAll(async () => {

        console.log('============= AFTER ALL =============');
        console.log('All test cases completed');

        // Close beforeAll browser context
        await context.close();

        console.log('Browser context closed');
        console.log('Test Suite Finished');

    });

});