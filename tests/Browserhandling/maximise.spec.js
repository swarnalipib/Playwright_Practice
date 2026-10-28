import { test, expect,chromium } from '@playwright/test';

test('test', async () => {
 const browser = await chromium.launch({headless:false,args: ['--start-maximized']});//without adding in config
   const context = await browser.newContext({ viewport: null });
   const page = await context.newPage();
 
  await page.goto('https://testautomationpractice.blogspot.com/');
  await expect(page.getByLabel('Sorted List:')).toBeVisible();
  await page.locator('#Wikipedia1_wikipedia-search-input').click();
  await page.locator('#Wikipedia1_wikipedia-search-input').fill('phones');
  await page.locator('input[type="submit"]').click();


});

test('test1', async () => {
 const browser = await chromium.launch({headless:false});//adding in config
   const context = await browser.newContext();
   const page = await context.newPage();
 
  await page.goto('https://testautomationpractice.blogspot.com/');
  await expect(page.getByLabel('Sorted List:')).toBeVisible();
  await page.locator('#Wikipedia1_wikipedia-search-input').click();
  await page.locator('#Wikipedia1_wikipedia-search-input').fill('phones');
  await page.locator('input[type="submit"]').click();


  
});