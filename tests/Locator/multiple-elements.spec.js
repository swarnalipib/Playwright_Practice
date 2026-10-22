const {test,expect} = require("@playwright/test");

test ('Locating multiple elements',async({page}) => {

await page.goto("https://demoblaze.com/index.html");

//const keys =await page.$$("a"); 
//or
const keys =await page.$$("//div[@id='tbodyid']//h4/a"); 
/* $$ used for locating multiple elements in place of locator */

for (const k of keys )
{
    const productname = await k.textContent();
    console.log(productname);
}


});
