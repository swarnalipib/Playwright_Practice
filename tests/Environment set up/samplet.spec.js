import{test,expect} from '@playwright/test'

test.only('sample test', async({page}) =>{

await page.goto("https://testautomationpractice.blogspot.com/");
await expect(page).toHaveTitle('Automation Testing Practice');

const list = page.locator("//input[@type='checkbox']").nth(0);
console.log(await list.getAttribute('value'));
//await page.waitForTimeout(5000);

});