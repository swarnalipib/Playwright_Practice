/*
//Hard Assertion --When you use hard assertions, if any assertion fails, the rest of the code will not be 
executed. Essentially, if a hard assertion fails, it will terminate the code. This means 
that any statements written after the failed assertion will not be executed. To avoid this, 
you can use soft assertions instead of hard assertions.hard assertion is the default behavior when using the regular expect() function. If a hard assertion fails, the test runner throws an error, terminates execution instantly, and marks the test as failed.
 Any test steps written after the failed assertion are completely skipped 
 
 when to use: Use hard assertions for critical checkpoints where subsequent steps depend entirely on the current step succeeding 
 (e.g., verifying a user successfully logs in before trying to click profile settings).
 */


const {test,expect} = require("@playwright/test");

test('Assertions hard',async({page}) => {

await page.goto("https://demoblaze.com/");

await expect(page).toHaveURL("https://demoblaze.com/");

await expect(page).toHaveTitle("STORE");
//await expect(page).toHaveTitle("STORE123"); //if add incorrect title it failed and it terminate the program immediately and rest code is not excuted 

await page.locator("#nava").click();
await expect(page.locator("#nava")).toBeVisible();


});


/*
//A soft assertion is invoked using expect.soft(). If a soft assertion fails, Playwright logs the failure but allows the test to keep running. The runner continues evaluating subsequent assertions and interactions, 
then marks the entire test case as failed at the very end
when to use: Use soft assertions when you are verifying multiple independent elements on a 
single page, such as inspecting the visibility of footer links, checking various metadata 
points, or ensuring several field validations display correctly at once

*/

test('Assertions soft',async({page}) => {

await page.goto("https://demoblaze.com/");
await expect.soft(page).toHaveURL("https://demoblaze.com/");
//await expect.soft(page).toHaveURL("https://demoblaze.com/reg");

await expect.soft(page).toHaveTitle("STORE");
//await expect(page).toHaveTitle("STORE12345"); //->if add incorrect title it failed and it terminate the program immediately and rest code is not excuted 

await page.locator("#nava").click();
await expect.soft(page.locator("#nava")).toBeVisible();


});