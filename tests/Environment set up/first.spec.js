const {test, expect} = require("@playwright/test")

test('Home Page', async ({page})=>{
    await page.goto("https://www.amazon.in/");
    
    const pageTitle = page.title();
    const pageURL = page.url();
    
    await expect(page).toHaveTitle("Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in");
    await expect(page).toHaveURL("https://www.amazon.in/");
    

});

test('Click on Amazon logo', async ({ page }) => {
  await page.goto('https://www.amazon.in/');
 await page.getByRole('link', { name: /Amazon/i }).first().click();
await page.locator('#nav-logo-sprites').click();


});

test('Click on Search box', async ({ page }) => {
  await page.goto('https://www.amazon.in/');

  const searchBox = page.locator('input#twotabsearchtextbox');
  await page.locator('#twotabsearchtextbox').click();
  await searchBox.fill('phones');
  await searchBox.press('Enter');
  await page.waitForSelector('.a-aui_72554-c.a-aui_template_weblab_cache_333406-c.a-bw_aui_dark_mode_mshop_ios_1390013-c.a-meter-animate');
  await page.close();

});