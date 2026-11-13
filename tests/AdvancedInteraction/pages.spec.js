const {test,expect,chromium} = require("@playwright/test");

test('To check new tab1',(async() => {

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
}));