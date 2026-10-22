/*

Indexing Methods in Playwright

• .nth(index): Selects a specific element from a matching list by its zero-based position (e.g., page.locator('input[type="checkbox"]').nth(2) selects the third checkbox).
• .first(): A shortcut equivalent to .nth(0) that picks the first matching element.
• .last(): A shortcut that picks the final matching element in the collection
*/



const {test,expect} = require("@playwright/test");

test ('indexinglocators',async({page}) => {

await page.goto("https://www.amazon.in/");
await expect(page).toHaveURL("https://www.amazon.in/");
    

//const element = await page.locator('div[class="navFooterLinkCol navAccessibility"]').first();
const element = await page.locator('div[class="navFooterLinkCol navAccessibility"]').last();
//const element = await page.locator('div[class="navFooterLinkCol navAccessibility"]').nth(1);

//  const linkcount=await element.count();
// console.log("No of links",linkcount);
 await expect(element).toBeVisible();

//console.log("Name of the element:",element.allTextContent());

console.log("Name of the element:",await element.textContent());

});