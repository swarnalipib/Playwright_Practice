const {test,expect,chromium} = require("@playwright/test");

test('New tab',(async() => {

const chromiumBrowser = await chromium.launch({headless:false});
const Context = await chromiumBrowser.newContext();
const page1 =await Context.newPage();
await page1.goto('https://testautomationpractice.blogspot.com/');
await expect(page1).toHaveTitle('Automation Testing Practice');

const [allPopup] =await (Promise.all([Context.waitForEvent('page'),page1.locator('#PopUp').click()]));

const pages=Context.pages();
console.log("No of pop up",pages.length);

console.log(await pages[0].url());
console.log(await pages[1].url());

await chromiumBrowser.close();
}));