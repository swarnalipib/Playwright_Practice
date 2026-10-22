const {test,expect} = require("@playwright/test");

test ('test-one',async({page}) => {

    const input ={
        username : '#loginusername',
        password : '#loginpassword',
        buttonname: '#name'

    }

await page.goto("https://demoblaze.com/");
await page.locator('#login2').click(); //property is used 
//can also be written as await page.click('id="login2"'); //attribute/property is used

await page.locator(input.username).fill('pavanol'); //id selector used
//await page.fill('#loginusername','pavanol');

await page.locator(input.password).fill('test@123');
//await page.locator('input#loginpassword').type('test@123');
//await page.fill('input#loginpassword','test@123');
//await page.typr('input#loginpassword','test@123');

await page.click("button[onclick='logIn()']");//Tag+attribute selector used

const logoutlink = await page.locator('#logout2');
await expect(logoutlink).toBeVisible();

await page.click('#logout2');


//await page.click('#cartur');
await page.click('.nav-link[id="cartur"]'); //class with attribute
//await page.click('.nav-link');//class only 
await expect(page).toHaveURL('https://demoblaze.com/cart.html');

//await page.click('button.btn.btn-success');

await page.click('button[class="btn btn-success"]')
await page.fill(input.buttonname,'swarna');

page.close();



});