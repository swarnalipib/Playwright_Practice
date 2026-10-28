const {test,expect} = require("@playwright/test");

test('Autosuggestion1 test',async({page}) => {

await page.goto("https://demo.automationtesting.in/AutoComplete.html");
await page.locator("//input[@id='searchbox']").type("ind");
await page.waitForSelector("//input[@id='searchbox']")

await page.waitForTimeout(5000);

let elements = await page.$$("//input[@id='searchbox']");

for(let el of elements)
{
    let value =await el.textContent();
    console.log(value);
}

});