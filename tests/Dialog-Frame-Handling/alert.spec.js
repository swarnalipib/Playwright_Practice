const {test,expect} = require("@playwright/test");

test('Drop down test',async({page}) => {

 await page.goto("https://testautomationpractice.blogspot.com/");

 //By adding the below code we enable the alert handling/ dialog window handler
 page.on('dialog',async() dialog =>{

    expect(dialog.type()).toContain('alert');
    expect(dialog.message()).toContain('I am an alert box!')
    await dialog.accept();

    await page.locator("//button[normalize-space()='Simple Alert'])[1]")//we can use directly locator without declaring dialog above but we cannot do validation on it
      page.waitForTimeout(5000);
 })
 
});