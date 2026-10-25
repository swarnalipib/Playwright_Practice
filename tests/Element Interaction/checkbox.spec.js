const {test,expect} = require("@playwright/test");

test('checkbox test',async({page}) => {

await page.goto("https://testautomationpractice.blogspot.com/");

//Single Checkbox
await page.locator("//label[normalize-space()='Sunday']").check();
//await page.check("//label[normalize-space()='Sunday']");
await expect(await page.locator("//label[normalize-space()='Sunday']")).toBeChecked();
await expect((await page.locator("//label[normalize-space()='Sunday']")).isChecked()).toBeTruthy();

await page.locator("//label[normalize-space()='Sunday']").uncheck();
//await expect((await page.locator("//label[normalize-space()='Monday']")).isChecked()).toBeFalsy();
await expect(await page.locator("//label[normalize-space()='Sunday']")).not.toBeChecked();

//Multiple Checkbox

const multiplecheck = [
        "//label[normalize-space()='Tuesday']",
        "//label[normalize-space()='Wednesday']",
        "//label[normalize-space()='Thursday']"

]

for (const cb of multiplecheck)
{
    await page.locator(cb).check()
}


for (const cb of multiplecheck)
{
  if( await page.locator(cb).isChecked())
  {
    await page.locator(cb).uncheck();
  }
}


await page.waitForTimeout(5000);

});