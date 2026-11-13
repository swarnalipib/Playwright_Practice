const {test,expect,chromium} = require("@playwright/test");

   test('page11', async () => {

    const browser = await chromium.launch({
        headless: false
    });

    const page = await browser.newPage();

     page.on('popup', async popup => {
        //await popup.waitForLoadState();

        console.log('Popup URL:', popup.url());
        console.log('Popup Title:', await popup.title());
        await popup.close();
    });

      await page.goto('https://testautomationpractice.blogspot.com/');
      const popupPromise = page.waitForEvent('popup');
      await page.click("//button[@id='PopUp']");
      const popup = await popupPromise;

      console.log('Popup URL:', popup.url());


    await page.waitForTimeout(3000);

    await browser.close();

});