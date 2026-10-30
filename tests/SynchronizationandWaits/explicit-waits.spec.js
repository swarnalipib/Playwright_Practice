//An explicit wait tells Playwright to wait for a particular condition before continuing the test

/*
list of explicit waits

//Locator-Based State Waits
--------------------------
1.locator.waitFor() - Element state - this method targets a specific locator and pauses execution until that single element transitions into a designated state
Available States: 'visible', 'hidden', 'attached', or 'detached' 

 state            Meaning
1.attached       Element exists in the DOM
2.detached       Element is removed from the DOM
3.visible        Element is visible
4.hidden         Element is hidden or detached

*/

//Example-


import { test, expect,chromium } from '@playwright/test';

test('Wait for -Attached', async ({ page }) => {
  await page.goto('https://www.amazon.in/');

  const searchBox = page.locator('#twotabsearchtextbox');

  await searchBox.waitFor({
    state: 'attached',
    timeout: 10000
  });

  await expect(searchBox).toBeAttached();

});

/*
//Page Web-First Assertions -Expected UI condition -Best use for assertion with auto retrying.
2.expect(locator)... - wait through an assertion
expect(locator).toBeVisible() 
await expect(locator).toBeAttached();
await expect(locator).toBeHidden();
await expect(locator).toBeEnabled();
await expect(locator).toHaveText('Expected text');
await expect(locator).toHaveCount(5);

*/

//Example

test('assert search box visibility', async ({ page }) => {

await page.goto('https://www.amazon.in/');
  await expect(page.locator('#twotabsearchtextbox')).toBeVisible({ timeout: 10000 });
});

/*
//Navigation and URL Waits -URL matching a pattern - best use for Navigation or search
----------------------------
3.page.waitForURL() -Used when a form submission or a button click changes the application
 route asynchronously, and you want to ensure the target URL is fully loaded before continuing

*/

//Example 

test('wait for search URL', async ({ page }) => {
  await page.goto('https://www.amazon.in/');

  const searchBox = page.locator('#twotabsearchtextbox');

  await searchBox.fill('laptop');

  const navigation = page.waitForURL('**/s?k=laptop*');

  await searchBox.press('Enter');

  await navigation;

  await expect(
    page.locator('[data-component-type="s-search-result"]').first()
  ).toBeVisible();
}); 


//note: 
// **is a glob pattern wildcard that matches any directory or character sequence, including slashes (/).
//**:     Matches everything before the search path, regardless of the domain, protocol (http/https), or subdirectories. For example, it will match https://amazon.com or http://localhost:3000/shop.
// /s?k=laptop*: Matches the specific URL path and query parameter for a laptop search.
// * (at the end): Matches any characters that come after "laptop" (like laptop+i7 or laptops&ref=nav).


/*


//Page Load State Waits -Page load event -Navigation lifecycle
--------------------------
4.page.waitForLoadState() -forces the script to wait until a lifecycle milestone of the page occurs

Supported states:
domcontentloaded — initial HTML has been parsed.

load — the page's load event has fired.

networkidle — no network connections for at least 500 ms.

*/

test('wait for DOM content', async ({ page }) => {
  await page.goto('https://www.amazon.in/', {
    waitUntil: 'domcontentloaded'
  });

  await page.waitForLoadState('domcontentloaded');

  await expect(
    page.locator('#twotabsearchtextbox')
  ).toBeVisible();
});

//5.page.waitForSelector()- to ensure the product grid or a specific element has loaded successfully before interacting with it.
//---------------------------
//Example:

test('wait for search box selector', async ({ page }) => {

  await page.goto('https://www.amazon.in/');

  await page.locator('#twotabsearchtextbox');
  await page.waitForSelector('#twotabsearchtextbox', {
    state: 'visible',
    timeout: 5000
  });

  
});
// Event-Based Waits
//6.page.waitForEvent() -wait for a browser event(Popup, download, dialog)
//-------------------------
/* When an application interactions depends on asynchronous operations like REST API responses, downloads, web workers, or
 popup browser windows, you can wait for that specific event loop to resolve

 --Example: wait for a popup opened from Amazon's page
*/

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

//Network based wait- Matching network response Matching network response-API response
//--------------------
//7.page.waitForResponse() — wait for a network response
//best used for : API data tables/API response and reporting charts.

test('wait for a search response', async ({ page }) => {
  await page.goto('https://www.amazon.in/');

  const responsePromise = page.waitForResponse(response =>
    response.url().includes('/s?') &&
    response.status() === 200
  );

  await page.fill('#twotabsearchtextbox','laptop');
  //await page.locator('#twotabsearchtextbox').press('Enter');
  await page.locator('#nav-search-submit-button').click();

  const response = await responsePromise;

  console.log('Status:', response.status());
});


 //  Network wait -Matching outgoing request -Network activity
//8. page.waitForRequest() — wait for a network request

test('wait for a search request', async ({ page }) => {
  await page.goto('https://www.amazon.in/');

  const requestPromise = page.waitForRequest(request =>
    request.url().includes('laptop')
  );

  await page.locator('#twotabsearchtextbox').fill('laptop');
  await page.locator('#twotabsearchtextbox').press('Enter');

  const request = await requestPromise;

  console.log('Request URL:', request.url());
});


//9.page.waitForTimeout() — wait for a fixed duration
//Fixed elapsed time and used for Temporary debugging

test.only('fixed delay example', async ({ page }) => {
  await page.goto('https://www.amazon.in/');

  await page.waitForTimeout(3000);

  await expect(
    page.locator('#twotabsearchtextbox')
  ).toBeVisible();
});

//page.waitForEvent('download') — wait for a download

test('wait for download', async ({ page }) => {
  await page.goto('https://www.amazon.in/');

  const downloadPromise = page.waitForEvent('download');

  // Replace with a real control that starts a download.
  await page.getByRole('button', {
    name: 'Download file'
  }).click();

  const download = await downloadPromise;

  console.log('Downloaded file:', download.suggestedFilename());
});

//page.waitForEvent('filechooser') — wait for a file chooser

test('wait for file chooser', async ({ page }) => {
  await page.goto('https://www.amazon.in/');

  const chooserPromise = page.waitForEvent('filechooser');

  // Replace with an actual upload control.
  await page.getByText('Upload file').click();

  const chooser = await chooserPromise;

  console.log('Multiple files allowed:', chooser.isMultiple());
});