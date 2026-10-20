//Use forboth global and Mobile emulation
const{test,expect,chromium,firefox,webkit} =  require('@playwright/test');
test('For chrome view port',async() => {
   const browser = await chromium.launch({headless:false});
   const context = await browser.newContext();
   const page = await context.newPage();

  const viewport = await page.viewportSize();

  await page.goto('https://testautomationpractice.blogspot.com/');
  await expect(page).toHaveTitle('Automation Testing Practice');
  
  await page.locator('#Wikipedia1_wikipedia-search-input').click();
  await page.locator('#Wikipedia1_wikipedia-search-input').fill('phones');
  await page.locator('input[type="submit"]').click();

  console.log(viewport.height);
  console.log(viewport.width);
 
  await page.close();

});

test('For Firefox view port',async() => {
   const browser = await firefox.launch({headless:false});
   const context = await browser.newContext();
   const page = await context.newPage();

  const viewport = await page.viewportSize();

  await page.goto('https://testautomationpractice.blogspot.com/');
  await expect(page).toHaveTitle('Automation Testing Practice');
  
  await page.locator('#Wikipedia1_wikipedia-search-input').click();
  await page.locator('#Wikipedia1_wikipedia-search-input').fill('laptop');
  await page.locator('input[type="submit"]').click();

  console.log(viewport.height);
  console.log(viewport.width);
 
  await page.close();

});

test('For webkit view port',async() => {
   const browser = await webkit.launch({headless:false});
   const context = await browser.newContext();
   const page = await context.newPage();

  const viewport = await page.viewportSize();

  await page.goto('https://testautomationpractice.blogspot.com/');
  await expect(page).toHaveTitle('Automation Testing Practice');
  
  await page.locator('#Wikipedia1_wikipedia-search-input').click();
  await page.locator('#Wikipedia1_wikipedia-search-input').fill('fridge');
  await page.locator('input[type="submit"]').click();

  console.log(viewport.height);
  console.log(viewport.width);
 
  await page.close();

});