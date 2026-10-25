const {test,expect} = require("@playwright/test");

test('Double click test',async({page}) => {

 await page.goto("https://testautomationpractice.blogspot.com/");
 const doublebtn = await page.locator("//button[normalize-space()='Copy Text']");

 await doublebtn.dblclick();

 const f2 = await page.locator("//input[@id='field2']");
 await expect(f2).toHaveValue("Hello World!");



});