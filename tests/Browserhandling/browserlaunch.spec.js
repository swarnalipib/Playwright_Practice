const {test,chromium,firefox,webkit} = require("@playwright/test");

test.only('chrome browser',(async() => {

    const chromiumBrowser = await chromium.launch({headless:false});
    const chromiumContext = await chromiumBrowser.newContext();
    const chromepage =await chromiumContext.newPage();
    
    await chromepage.goto('https://demoqa.com/');
    await chromiumContext.close();
    await chromiumBrowser.close();


}));

test('Firefox browser',(async() => {

    const firefoxBrowser = await firefox.launch({headless:false});
    const firefoxContext = await firefoxBrowser.newContext();
    const firefoxpage =    await firefoxContext.newPage();
    
    await firefoxpage.goto('https://amazon.in/');
    await firefoxContext.close();
    await firefoxBrowser.close();


}));



test('webkit browser',(async() => {

    const webkitBrowser = await webkit.launch({headless:false});
    const webkitContext = await webkitBrowser.newContext();
    const webkitpage =await webkitContext.newPage();
    
    await webkitpage.goto('https://www.google.com/');
    await webkitContext.close();
    await webkitBrowser.close();


}));



