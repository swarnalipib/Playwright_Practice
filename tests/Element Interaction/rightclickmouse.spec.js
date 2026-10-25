const {test,expect} = require("@playwright/test");

test('Right and Left click test',async({page}) => {

 await page.goto("https://swisnl.github.io/jQuery-contextMenu/demo.html");
 const button= await page.locator("//span[@class='context-menu-one btn btn-neutral']");

//
await button.click({button:'right'})

//await button.click({button:'left'})

await page.waitForTimeout(5000);


});