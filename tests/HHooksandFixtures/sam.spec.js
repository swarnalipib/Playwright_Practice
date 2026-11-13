const {test,expect} = require("@playwright/test");

test ('Test1:Verify url',async({page}) => {

await page.goto("https://www.amazon.in/");
await expect(page).toHaveURL("https://www.amazon.in/");

});

test ('Test2:Verify searchbox is visible',async({page}) => {

await page.goto("https://www.amazon.in/");
await page.locator('#twotabsearchtextbox').click();
await expect(page.locator('#twotabsearchtextbox')).toBeVisible();

});

test ('Test3:Search laptop',async({page}) => {

await page.goto("https://www.amazon.in/");
await page.locator('#twotabsearchtextbox').fill('laptop');
await page.click('#nav-search-submit-button');
await expect(page).toHaveURL(/.*search.*laptop/);

});

test ('Test4:verify logo',async({page}) => {

await page.goto("https://www.amazon.in/");
await page.locator('#nav-logo-sprites').click();
await expect(page.locator('#nav-logo-sprites')).toHaveId('nav-logo-sprites');

});

test ('Test5:verify icon',async({page}) => {

await page.goto("https://www.amazon.in/");
await page.locator("//span[@class='hm-icon-label']").click();
await expect(page.locator("//span[@class='hm-icon-label']")).toBeVisible();

});

test ('Test6:verify icon close',async({page}) => {

await page.goto("https://www.amazon.in/");
await page.locator("//span[@class='hm-icon-label']").click();
const menubutton = await page.getByLabel('Close menu').first();
await menubutton.click();
await expect(menubutton).toBeHidden();

});