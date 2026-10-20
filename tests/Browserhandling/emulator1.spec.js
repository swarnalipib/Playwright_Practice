const {test, expect,chromium,devices} = require("@playwright/test");
// const iphone15 = devices['iPhone 15'];

//   const context = await browser.newContext({
//     ...iphone15,

test('Home Page', async ()=>{
   const browser = await chromium.launch({headless:false});
   const context = await browser.newContext({...devices['iPhone 15']}); //Applied emulation to this test only
   const page = await context.newPage();

    await page.goto("https://www.amazon.in/");
    
    await expect(page).toHaveTitle("Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in");
    await expect(page).toHaveURL("https://www.amazon.in/");
    const size = page.viewportSize();
 console.log(size.width);
 console.log(size.height);
 browser.close();

});