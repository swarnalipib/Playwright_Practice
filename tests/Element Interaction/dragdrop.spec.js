const {test,expect} = require("@playwright/test");

test('Drag and Drop test',async({page}) => {

 await page.goto("https://testautomationpractice.blogspot.com/");
 
 const dragobj = page.locator("//p[normalize-space()='Drag me to my target']");
 const dropobj = page.locator("//div[@id='droppable']");

//  await dragobj.hover();
//  await page.mouse.down();

//  await dropobj.hover();
//  await page.mouse.up();

//or simple command using dragTo()

await dragobj.dragTo(dropobj);

 await page.waitForTimeout(5000);


});