/*
//Playwright fixtures are reusable setup and teardown mechanisms that prepare isolated environments and resources for your tests before 
 they run. Instead of repeating boilerplate code in beforeEach or afterEach hooks, you pass fixtures as parameters directly into your test functions

//Playwright Test is based on the concept of test fixtures. Test fixtures are used to establish the environment for each test, giving the test everything it needs and nothing else.
 Test fixtures are isolated between tests. With fixtures, you can group tests based on their meaning, instead of their common setup.

//Build in fixture
------------------------
1.page	
----
Type:Page
Isolated page for this test run.
-Automatically launches an isolated browser context and opens a fresh tab for each test, closing it when the test finishes

2.context
Type: BrowserContext	
Isolated context for this test run. The page fixture belongs to this context as well. Learn how to configure context.
- Allows multiple pages to share cookies and session data within a single test.

3.browser	
Type:Browser	
Browsers are shared across tests to optimize resources. Learn how to configure browsers.
 Gives you direct control to launch multiple isolated browser contexts, which is useful for testing multi-user interactions

4.browserName	
Type:string	
The name of the browser currently running the test. Either chromium, firefox or webkit.
-Returns the name of the browser currently executing the test (chromium, firefox, or webkit) so you can run conditional logic.

5.request	
Type:APIRequestContext	
 Provides an APIRequestContext instance to make standalone HTTP requests for API testing or data setupIsolated APIRequestContext
  instance for this test run.

*/

const { test, expect } = require('@playwright/test');
test('Fixtures demo:page fixture', async({page}) => {

    await page.goto("https://training.rcvacademy.com/")
    await expect(page).toHaveTitle("RCV Academy | Turning QA Testers into AI Era SDETs");

});

test('Fixtures demo:browser fixture', async({browser}) => {
    const context = await browser.newContext({baseURL: "https://www.google.com", colorSchema:"dark"});
    const page = await context.newPage();
    await page.goto("/search?q=test");
    console.log(await page.title());

});

test('Fixtures demo:context fixture', async({context}) => {
    const page = await context.newPage();
    await page.goto("https://playwright.dev/")
    await page.screenshot({path:'playwright.png'});
})

test('Fixtures demo:browsername fixture', async({browserName}) => {
    console.log(`This is browser name : ${browserName}`);

});

test('Fixtures demo:request fixture', async({request}) => {
    const response = await request.get('https://api.restful-api.dev/objects?id=1');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    console.log(data);

});

//multiple fixture
test('Multiple fixture', async({context,browserName,request}) => {

    console.log(`Running test on:${browserName}`);

    const page =await context.newPage();
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright');

    const response = await request.get('https://api.restful-api.dev/objects?id=1');
    expect(response.ok()).toBeTruthy();
    const data = await response.json();
    console.log(`Fetched post title:${data.title}`);

});


//worker fixture , how to change scope,file scoped