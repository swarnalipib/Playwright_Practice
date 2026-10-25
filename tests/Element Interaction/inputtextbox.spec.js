const {test,expect} = require("@playwright/test");

test('input Interaction',async({page}) => {

await page.goto("https://demoblaze.com/");
await page.locator('#login2').click(); //property is used 
//can also be written as await page.click('id="login2"'); //attribute/property is used

await page.locator('#loginusername').fill('pavanol'); //id selector used
//await page.fill('#loginusername','pavanol');
await expect(page.locator('#loginusername')).toBeVisible();
//await expect(page.locator('#loginusername')).toBeEmpty();//It throws error as we have already filled input pavanol to the field so its not empty
await expect(page.locator('#loginusername')).toBeEnabled();
await expect(page.locator('#loginusername')).toBeEditable();
//await expect(page.locator('#loginusername')).toBeHidden(); it throws error as login box is not hidden its visible
await expect(page.locator('#loginpassword')).toBeEmpty();//Now the password field is empty

//await page.locator('input#loginpassword').fill('test@123');
//await page.locator('input#loginpassword').type('test@123');
//await page.fill('input#loginpassword','test@123');
await page.type('input#loginpassword','test@123');

await expect(page.locator('#loginpassword')).toBeVisible();
await expect(page.locator('#loginpassword')).toBeEnabled();
await expect(page.locator('#loginpassword')).toBeEditable();

//to check tobehidden as logout is  hidden , it appears after login
await expect(page.locator('#logout2')).toBeHidden(); 


await page.click("button[onclick='logIn()']");

});

/* you can fill any kind of data like

// Date input
await page.getByLabel('Birth date').fill('2020-02-02');

// Time input
await page.getByLabel('Appointment time').fill('13:15');

// Local datetime input
await page.getByLabel('Local time').fill('2020-03-02T05:15');

note:
Use type() When you need to simulate real user typing behavior.Itit appends text to the existing content unless input field is cleared manually. It type key one by one character having delay keystrokesso it is slow
Use fill() When you want to quickly and efficiently set a value in an input field.It replaces if any existing text in input field.Itis faster as it doesn't simulate user typing.

*/
