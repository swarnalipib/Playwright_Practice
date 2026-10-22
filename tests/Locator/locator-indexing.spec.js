/*

Indexing Methods in Playwright

• .nth(index): Selects a specific element from a matching list by its zero-based position (e.g., page.locator('input[type="checkbox"]').nth(2) selects the third checkbox).
• .first(): A shortcut equivalent to .nth(0) that picks the first matching element.
• .last(): A shortcut that picks the final matching element in the collection
*/



const {test,expect} = require("@playwright/test");

test ('indexinglocators',async({page}) => {

await page.goto("https://www.flipkart.com/");
await expect(page).toHaveURL("https://www.flipkart.com/");
    

//const element = await page.locator("div[class='css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1b1g84l r-tuq35u r-u8s1d r-q4m81j r-1r0gou5']").first();
//const element = await page.locator("div[class='css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1b1g84l r-tuq35u r-u8s1d r-q4m81j r-1r0gou5']").nth(3);
//const element = await page.locator("div[class='css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1b1g84l r-tuq35u r-u8s1d r-q4m81j r-1r0gou5']").last();
const element = await page.locator("div[class='css-146c3p1 r-dnmrzs r-1udh08x r-1udbk01 r-3s2u2q r-1iln25a r-1b1g84l r-tuq35u r-u8s1d r-q4m81j r-1r0gou5']");

 const linkcount=await element.count();
 console.log("No of links",linkcount);
 await expect(linkcount).toBeGreaterThan(0);
 //await expect(element).toBeVisible(); -when using to print for single element

 const Total = await element.allTextContents();//return array of elements

console.log("Name of the element:",Total);

//console.log("Name of the element:",await element.textContent());

});