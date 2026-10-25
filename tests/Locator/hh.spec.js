const {test,expect} = require("@playwright/test");

test ('xpath axes',async({page}) => {


    await page.goto("https://www.w3schools.com/html/html_tables.asp");

    const text=await page.locator("//th[normalize-space()='Company']").innerText();
    console.log(text);


});