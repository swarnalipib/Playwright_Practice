/*

How Playwright Evaluates the Viewport Scope

1. Global/Project Level (playwright.config.js): Provides the fallback baseline for all tests in the project.
2. File Top-Level (test.use()): Overrides the global configuration for every test inside that specific file.
3. Single Test Level (test.use() inside a block or test-level configuration): Overrides both the global and top-level file declarations, applying only to that specific test


*/





const{test,expect,firefox,chromium} =  require('@playwright/test');

test.use({viewport:{width:800,height:600}}); //All tests in this file will use this viewport size


test('view port',async() =>{
   const browser = await firefox.launch({headless:false});
   const context = await browser.newContext();
   const page = await context.newPage();

  await page.goto('https://testautomationpractice.blogspot.com/');
  await expect(page).toHaveTitle('Automation Testing Practice');

  await page.locator('#apple').click();
  await expect(page).toHaveURL('https://www.apple.com/'); 

 const size = page.viewportSize();
 console.log(size.width);
 console.log(size.height);

  browser.close();

});

test.only('new view port ',async() => {
   const browser = await chromium.launch({headless:false});
   const context = await browser.newContext();
   const page = await context.newPage();

  await page.setViewportSize({width:1980,height:1080}); //setting viewport dynamically in a particular test

  await page.goto('https://testautomationpractice.blogspot.com/');
  await expect(page).toHaveTitle('Automation Testing Practice');
  
  await page.locator('#Wikipedia1_wikipedia-search-input').click();
  await page.locator('#Wikipedia1_wikipedia-search-input').fill('phones');
  await page.locator('input[type="submit"]').click();

const size = page.viewportSize();
 console.log(size.width);
 console.log(size.height);
 
  await page.close();

});

test('New view port2 ',async() => {

  
   const browser = await chromium.launch({headless:false});
   const context = await browser.newContext();
   const page = await context.newPage();
  await page.goto('https://testautomationpractice.blogspot.com/');
  await expect(page).toHaveTitle('Automation Testing Practice');
  
  await page.locator('#Wikipedia1_wikipedia-search-input').click();
  await page.locator('#Wikipedia1_wikipedia-search-input').fill('laptop');
  await page.locator('input[type="submit"]').click();

const size = page.viewportSize();
 console.log(size.width);
 console.log(size.height);
 
  await page.close();

});