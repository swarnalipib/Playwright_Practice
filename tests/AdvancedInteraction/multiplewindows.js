const { test,chromium } = require('@playwright/test');

test('Different windows',async () => {
  // Launch the browser
  const browser = await chromium.launch({ headless: false });

  // 1. Open the Home Page window
  const context1 = await browser.newContext();
  const page1 = await context1.newPage();
  await page1.goto('https://demoblaze.com/');
  console.log('Window 1: Home page opened.');

  // 2. Open the Log In window (Opens home page and clicks the Log In modal)
  const context2 = await browser.newContext();
  const page2 = await context2.newPage();
  await page2.goto('https://demoblaze.com/');
  await page2.click('#login2'); // Clicks the "Log in" nav item to open the modal
  console.log('Window 2: Login modal opened.');

  // 3. Open the Cart window
  const context3 = await browser.newContext();
  const page3 = await context3.newPage();
  await page3.goto('https://demoblaze.com/cart.html');
  console.log('Window 3: Cart page opened.');

  // Keep the windows open for a few seconds to visually verify
  await page1.waitForTimeout(5000);


    
  // Collect all pages from each context
  const allContexts = [context1, context2, context3];

  console.log('Total Windows:', allContexts.length);
  let windowCount = 1;

  for (const ctx of allContexts) {
    const pages = ctx.pages();
    for (const p of pages) {
      console.log(`Window: ${windowCount++}`);
      console.log('URL:', p.url());
      console.log('Title:', await p.title());
    }
  }
  // Clean up and close the browser
  await browser.close();
});