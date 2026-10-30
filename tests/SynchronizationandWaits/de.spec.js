import { test,expect } from '@playwright/test';
test('wait for search suggestions to detach', async ({ page }) => {  
  
  await page.goto('https://www.amazon.in/');

  await page.locator('.hm-icon.nav-sprite').click();


  const menuBox = page.locator('#nav-hamburger-menu');
  await menuBox.waitFor({ state: 'attached', timeout: 10000 });

  await page.locator("(//div[@id='hmenu-close-icon'])[1]").click();

//   await menuBox.waitFor({
//     state: 'detached',
//     timeout: 5000
//   });

});

test.only('wait for to detach', async ({ page }) => {
  await page.goto('https://www.amazon.in/');

  const searchBox = page.locator('#twotabsearchtextbox');

  await searchBox.fill('iphone');

  const suggestions = page.locator(
    '.s-suggestion-container'
  );

  // Continue only if suggestions actually appear.
  await suggestions.waitFor({
    state: 'attached',
    timeout: 10000
  });

  await page.keyboard.press('Escape');

  await suggestions.waitFor({
    state: 'detached',
    timeout: 5000
  });
});