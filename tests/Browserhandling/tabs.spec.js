const {test,expect,chromium} = require("@playwright/test");

test('To check new tab',(async() => {

    const chromiumBrowser = await chromium.launch({headless:false});
    const Context = await chromiumBrowser.newContext();
    const parentpage =await Context.newPage();
   
    console.log("no of pages",Context.pages().length);//1
    
    await parentpage.goto('https://testautomationpractice.blogspot.com/');
    const [childpage] = await (Promise.all([Context.waitForEvent('page'),parentpage.locator("button:has-text('New tab')").click()]));
    
    const pages =Context.pages();
    console.log("No of pages:", pages.length)//2
   console.log(await parentpage.title());
    console.log(await childpage.title());

   //  console.log(await pages[0].title());
    // console.log(await pages[1].title());
}));

test('New tab',(async() => {

const chromiumBrowser = await chromium.launch({headless:false});
const Context = await chromiumBrowser.newContext();
const page1 =await Context.newPage();
await page1.goto('https://testautomationpractice.blogspot.com/');
//await expect(page1).toHaveTitle("Automation Testing Practice");

//const allpages=Context.pages();
const newpage = await Context.waitForEvent('page');
await page1.locator("button:has-text('New tab')").click();//it capture new page
await expect(newpage).toHaveTitle("SDET-QA Blog");

await parentpage.waitforTimeout(5000);
await newpage.waitforTimeout(5000);



}));