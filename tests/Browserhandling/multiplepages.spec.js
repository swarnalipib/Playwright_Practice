const {test,expect,chromium} = require("@playwright/test");

test('chrome browser',(async() => {

    const chromiumBrowser = await chromium.launch({headless:false});
    const chromiumContext = await chromiumBrowser.newContext();
    const page1 =await chromiumContext.newPage();
    const page2 =await chromiumContext.newPage();
    console.log("no of pages",chromiumContext.pages().length);
    
    await page1.goto('https://demoqa.com/');
    await expect(page1).toHaveTitle('demosite');

    await page1.waitForTimeout(5000);
    await page2.goto('https://google.com/');
    await expect(page2).toHaveTitle('Google');

  
     await page2.waitForTimeout(5000);

    await chromiumContext.close();
    await chromiumBrowser.close();


}));