const {test,expect} = require("@playwright/test");

test('Assertions',async({page}) => {

await page.goto("https://demoblaze.com/");
//1.expect().toHaveURL - page has url

await expect(page).toHaveURL("https://demoblaze.com/");

//2.expect().toHaveTitle - page has title

await expect(page).toHaveTitle("STORE");

//3.expect().tobeVisble() -- Element is visible

await expect(page.locator("#nava")).toBeVisible();//logo
//4.expect().toHaveId() - Element having a id
await expect (page.locator("#nava")).toHaveId('nava');

//5.expect().toHaveClass() -Element has specified CSS class property
await expect (page.locator("#nava")).toHaveClass('navbar-brand');

//6.//5.expect().toContainClass() -Element has specified CSS classes
await expect (page.locator("#nava")).toContainClass('navbar-brand');

await page.locator("#login2").click();
await page.fill('#loginusername','pavanol');

//7.expect().toBeEnabled()-  Element is active
//8.expect().toBeEditable() - Element is editable

await expect(page.locator('#loginusername')).toBeVisible();
await expect(page.locator('#loginusername')).toBeEnabled();
await expect(page.locator('#loginusername')).toBeEditable();

await page.locator('#loginpassword').click();
//9.expect().toBeEmpty() - Element is empty
await expect(page.locator('#loginpassword')).toBeEmpty();
await page.fill('#loginpassword','test@123');
//10.expect().toHaveValue() - Element haveing same value as passed(Input having a value)
await expect(page.locator('#loginpassword')).toHaveValue('test@123');

//11.expect().toBeHidden() - Element is hidden
await expect(page.locator('#logout2')).toBeHidden(); //logout is hidden
//12 expect().toBeHidden() - Element is focused
await page.locator("button[onclick='logIn()']").focus(); //locator.focus() purely shifts the browser's active cursor/attention to an element without clicking it.
await expect(page.locator("button[onclick='logIn()']")).toBeFocused();

await page.locator("button[onclick='logIn()']").click();


//13.expect().toHaveAttribute()- Element having attributes to be verified

await expect(page.locator("button[onclick='logIn()']")).toHaveAttribute('type','button');

//14.expect().toHavetext() -Element matches the text(exact adding same matching text)
await expect(page.locator("button[onclick='logIn()']")).toHaveText('Log in');

//15.expect().toContainText()-Element contains the text(pass a partial text)

await expect(page.locator("button[onclick='logIn()']")).toContainText('Log');

//16.expect().toHaveCount() -List of elements have given length
const element = await page.locator("//div[@class='col-lg-4 col-md-6 mb-4']");
await expect(element).toHaveCount(9);

//await expect(element).toHaveClass('card-title')

});