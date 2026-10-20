//Playwright is a JavaScript automation framework for testing websites in browsers. You can use it to simulate mobile devices, different screen sizes, touch interactions, and browser environments without needing a physical phone.
//if globally set then it applied to all modules 
//if test.use/test.describr in the top declared then applied to all tests 
//if test.only or declared only in context then for single test
//if globally set but als set in test.use then preference 1st is test.use 
//if globally set and test.use declared and and set for single testcase then prefrence 1st is single test

const {test, expect,chromium,devices} = require("@playwright/test");

test.use({ ...devices['iPhone 13'], }); //applied emulation to all testd

test('Home Page', async ({page}) => {
   // const browser = await chromium.launch({headless:false});
   // const context = await browser.newContext();
   // const page = await context.newPage();

    await page.goto("https://www.amazon.in/");
    
    await expect(page).toHaveTitle("Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in");
    await expect(page).toHaveURL("https://www.amazon.in/");
    const size = page.viewportSize();
 console.log(size.width);
 console.log(size.height);

});

test('Click on Amazon logo', async ({page}) => {
  
  await page.goto('https://www.amazon.in/');
 await page.getByRole('link', { name: /Amazon/i }).first().click();
await page.locator('#nav-logo-sprites').click();

const size = page.viewportSize();
 console.log(size.width);
 console.log(size.height);

});