
const { test,chromium, devices } = require("@playwright/test");

test('Multiple devices',async () => {
  const browser = await chromium.launch({headless:false});

  const deviceNames = [
    'iPhone 13',
    'iPhone 13 Pro',
    'Pixel 7'
  ];

  for (const name of deviceNames) {
    const device = devices[name];

    if (!device) {
      console.log(`Device not found: ${name}`);
      continue;
    }

    const context = await browser.newContext({
      ...device
    });

    const page = await context.newPage();
    await page.goto('https://example.com');

    console.log(name, await page.title());
    await context.close();
}

  await browser.close();
});