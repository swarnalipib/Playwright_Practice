const { test, expect } = require('@playwright/test');

test('check responsive layout on mobile', async ({ browser }) => {
  const context = await browser.newContext({
   locale: 'en-GB',
   timezoneId: 'Europe/London',
    colorScheme: 'dark',
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });

  const page = await context.newPage();

  await page.goto('https://example.com');

  await expect(page.locator('body')).toBeVisible();

const browserLocale = await page.evaluate(() => navigator.language);
  expect(browserLocale).toBe('en-GB');//to check the locale

  const size = page.viewportSize();
 console.log(size.width);
 console.log(size.height);

  await context.close();
});