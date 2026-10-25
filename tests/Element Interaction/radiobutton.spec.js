const {test,expect} = require("@playwright/test");

test('Radio button test',async({page}) => {

await page.goto("https://testautomationpractice.blogspot.com/");

await page.locator("#male").check();
//await page.check("#male");
await expect(await page.locator("#male")).toBeChecked();
await expect((await page.locator("#male")).isChecked()).toBeTruthy();//if checked then give truth value else false

//await expect((await page.locator("#female")).isChecked()).toBeFalsy();//if notchecked then gives falsy value else true

await page.waitForTimeout(5000);//pause the code for 5 sec

});