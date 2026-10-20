const { chromium,firefox,webkit } = require('playwright');
(async () => {
  const cbrowser = await chromium.launch({headless:false});
  const page = await cbrowser.newPage();
  await page.goto('https://google.com');
  await cbrowser.close();
})();

(async () => {
  const fbrowser = await firefox.launch({headless:false});
  const page = await fbrowser.newPage();
  await page.goto('https://google.com');
  await fbrowser.close();
})();

(async () => {
  const wbrowser = await webkit.launch({headless:false});
  const page = await wbrowser.newPage();
  await page.goto('https://google.com');
  await wbrowser.close();
})();