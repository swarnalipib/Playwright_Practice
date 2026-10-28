const {test,expect} = require("@playwright/test");

// test('Mouse hover test',async({page}) => {

// await page.goto("https://demo.opencart.com/");
// await page.locator("//a[normalize-space()='Desktops']");
// await expect(page.locator("//a[normalize-space()='Desktops']")).toHaveText("Desktops");
// await page.locator("//a[normalize-space()='Mac (1)']");
// await expect(page.locator("//a[normalize-space()='Mac (1)']")).toHaveText("Mac (1)");

// //mouse hover
// await page.locator("//a[normalize-space()='Desktops']").hover();
// await page.locator("//a[normalize-space()='Mac (1)']").hover();

// //await page.waitForTimeout(5000);

// });


test('Mouse hover test',async({page}) => {

 await page.goto("https://memglobal.org/");

const program =await page.locator("//span[normalize-space()='Programs']");
await expect(program).toHaveText('Programs');

const elementone = await page.locator("(//span[@class='wp-block-navigation-item__label'][normalize-space()='Moishe House'])[1]");
await expect(elementone).toHaveText('Moishe House');

 await program.hover();
// await elementone.hover();

await page.waitForTimeout(5000);

});

//focus vs hover