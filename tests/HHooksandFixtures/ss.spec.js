const { test, expect } = require('@playwright/test');

 // TEST CASE 1
    test('Verify homepage logo', async ({ page }) => {
        await page.goto('https://demoblaze.com/');

        await page.locator("#nava").click()

        await expect(page.locator("#nava")).toContainText('PRODUCT STORE');
    });

     // TEST CASE 2
    test('Verify url', async ({ page }) => {
        await page.goto('https://demoblaze.com/');
        await expect(page).toHaveTitle('STORE');


    });

    
     // TEST CASE 3
   test('Verify category link', async ({ page }) => {
        await page.goto('https://demoblaze.com/');
        await page.locator("//a[@id='cat']").click();
        await expect(page.locator("//a[@id='cat']")).toHaveText('CATEGORIES');

    });


        // TEST CASE 4
    test('Verify contact link', async ({ page }) => {
        await page.goto('https://demoblaze.com/');
        await page.locator("//a[normalize-space()='Contact']").click();
        await expect(page.locator("//a[normalize-space()='Contact']")).toBeVisible();

    });

    // TEST CASE 5
    test('Verify homepage test', async ({ page }) => {
        await page.goto('https://demoblaze.com/');
        const products = await page.locator('.hrefch');
        await expect(products).toHaveCount(9);


    });

    // TEST CASE 6
    test('Verify product to cart', async ({ page }) => {
        await page.goto('https://demoblaze.com/');

        await page.locator("//a[normalize-space()='Samsung galaxy s6']").click()

       await page.locator("//a[normalize-space()='Add to cart']").click();
       await expect(page.locator("//a[normalize-space()='Add to cart']")).toContainText('Add to cart');

        page.on('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Product added');
    await dialog.accept();
  });
});