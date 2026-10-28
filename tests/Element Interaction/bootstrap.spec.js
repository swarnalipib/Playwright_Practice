const {test,expect} = require("@playwright/test");

test('Boot strap test',async({page}) => {

await page.goto("https://demoqa.com/select-menu");
//await page.locator("#withOptGroup").click();
//await page.locator("//div[contains(@class, 'css-1dimb5e-singleValue') and normalize-space()='Group 1, option 1']").click();
//await page.selectOption('#cars',['Volvo','Audi','Opel']);
await page.locator("input[id='react-select-3-input']").click();
//await page.locator("//div[@id='react-select-3-placeholder' and normalize-space()='Select Title']").click();
//await expect(page.locator("div.css-10wo9uf-option, .css-tr4s17-option")).toHaveCount(6);
//await expect(page.locator('//div[contains(@class, "css-10wo9uf-option")] | //*[contains(@class, "css-tr4s17-option")]')).toHaveCount(6);
await expect(page.locator("//div[contains(@id, 'react-select-3') and @role='option']")).toHaveCount(6);

const options = await page.$$("//div[contains(@id, 'react-select-3') and @role='option']");

for(let op of options)
{
    const content = await op.textContent();
    console.log(content);
}

});

test('Boot strap test2',async({page}) => {

await page.goto("https://demoqa.com/select-menu");
await page.locator("#withOptGroup").click();

await expect(page.locator("//div[contains(@id, 'react-select-2') and @role='option']")).toHaveCount(6);

const options = await page.$$("//div[contains(@id, 'react-select-2') and @role='option']");

for(let op of options)
{
    const content = await op.textContent();
    console.log(content);
}

});

test('Boot strap test3',async({page}) => {

await page.goto("https://demoqa.com/select-menu");
await page.locator("//input[@id='react-select-4-input']").click();

await expect(page.locator("//div[contains(@id, 'react-select-4') and @role='option']")).toHaveCount(4);

const options = await page.$$("//div[contains(@id, 'react-select-4') and @role='option']");

for(let op of options)
{
    const content = await op.textContent();
    console.log(content);
}

});