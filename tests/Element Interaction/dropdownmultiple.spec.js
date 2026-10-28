const {test,expect} = require("@playwright/test");

test('Multiple Drop down test',async({page}) => {

 await page.goto("https://testautomationpractice.blogspot.com/");

await page.selectOption("#colors",['Red','Blue','Green']);

await page.waitForTimeout(5000);

//Assertions to check

//1.check no of options in list 
// const options = await page.locator('#colors option');
// await expect(options).toHaveCount(7);

//2.check no of options in the dropdown
// const options = await page.$$('#colors option');
// console.log("No of options:",options)
// await expect(options.length).toBe(7);


//3.Check the presence of the value
const content = await page.locator('#colors').textContent();
await expect(content.includes('Blue')).toBeTruthy();
await expect(content.includes('Black')).toBeFalsy();
});