/*
test.use() in Playwright overrides global configuration options for a specific test file or test.describe block. It accepts the same options 
available under use in playwright.config.ts, allowing you to customize browser context settings, device emulation, or authentication state 
per test suite. 


Common Use Cases

• Device and Viewport Emulation. You can simulate mobile devices, specific screen resolutions, or color schemes (such as dark mode) for responsive testing.
• Locale, Timezone, and Geolocation. You can test localization features by overriding locale, timezoneId, or geolocation permissions for a specific group of tests.
• Authentication State (storageState). You can load saved cookies and localStorage data to run tests as an already logged-in user, or pass { cookies: [], origins: [] } to force an unauthenticated state for login tests.
• Network and Base URL Overrides. You can set a different baseURL, custom extraHTTPHeaders, or HTTP credentials for specific API or subdomain tests.
• Custom Fixture Options. If you create parameterized fixtures with test.extend(), test.use() lets you pass custom values into those fixtures for a specific suite

*/

const {test, expect,devices} = require("@playwright/test");

test.use({ 
    ...devices['iPhone 13'],
    viewport: { width: 390 , height: 844  },
    colorScheme: 'dark', 
    baseURL: 'https://www.amazon.in/',
    locale: 'de-DE',
    timezoneId: 'Europe/Berlin'

}); //at top level to be followed by all block or test level

test.describe('Test suit for Amazon site logo',async() => {

test ('Test1:Verify url',async({page}) => {
await page.goto("/");
await expect(page).toHaveURL("https://www.amazon.in/");

});


test ('Test2:verify logo',async({page}) => {

await page.goto("/");
await page.locator('#nav-logo-sprites').click();
await expect(page.locator('#nav-logo-sprites')).toHaveId('nav-logo-sprites');

});

});

test.describe('Test suit for Amazon site sidebarlogo',async() => {

  test.use({ 
    viewport: { width: 1200, height: 1080 },  //at block level
    colorScheme: 'light', 
    locale: 'fr-FR' 

});  

  test('Test3:verify logo',async({page}) => {

await page.goto("https://www.amazon.in/");
await page.locator('#nav-logo-sprites').click();
await expect(page.locator('#nav-logo-sprites')).toHaveId('nav-logo-sprites');

});
test ('Test4:verify icon',async({page}) => {

await page.goto("https://www.amazon.in/");
await page.locator("//span[@class='hm-icon-label']").click();
await expect(page.locator("//span[@class='hm-icon-label']")).toBeVisible();

});

});