const {test,expect} = require("@playwright/test");

test('Alert test1',async({page}) => {

 await page.goto("https://demoqa.com/alerts");
 await expect(page).toHaveTitle("demosite");

 //By adding the below code we enable the alert handling/ dialog window handler.whena particular alert window is clicked this dialog handler will be triggered
 page.on('dialog', async dialog =>{

    expect(dialog.type()).toContain('alert');//dialog.type will return what type of alert .This is alert type validation
    expect(dialog.message()).toContain('You clicked a button');
    await dialog.accept();

    await page.locator("//button[@id='alertButton']").click();//we can use directly locator without declaring dialog above but we cannot do validation on it
    await page.waitForTimeout(5000);
 })
 
});

test('Alert 5 second test',async({page}) => {

 await page.goto("https://demoqa.com/alerts");
 await expect(page).toHaveTitle("demosite");

 //By adding the below code we enable the alert handling/ dialog window handler.whena particular alert window is clicked this dialog handler will be triggered
 page.on('dialog', async dialog =>{

    expect(dialog.type()).toContain('alert');//dialog.type will return what type of alert .This is alert type validation
    expect(dialog.message()).toContain('This alert appeared after 5 seconds');
    await dialog.accept();

    await page.locator("//button[@id='timerAlertButton']").click();//we can use directly locator without declaring dialog above but we cannot do validation on it
    //await page.waitForSelector("//button[@id='timerAlertButton']",{ timeout: 5000 })
    await page.waitForTimeout(5000);
 })
 
});

test('Confirmation Dialog-Alert',async({page}) => {

 await page.goto("https://demoqa.com/alerts");
 await expect(page).toHaveTitle("demosite");


 //By adding the below code we enable the alert handling/ dialog window handler.whena particular alert window is clicked this dialog handler will be triggered
 page.on('dialog', async dialog =>{

    expect(dialog.type()).toContain('confirm');//dialog.type will return what type of alert .This is alert type validation
    expect(dialog.message()).toContain('Do you confirm action?');
    await dialog.accept();

    await page.locator("//span[@id='confirmResult']").click();//we can use directly locator without declaring dialog above but we cannot do validation on it
     await  page.waitForTimeout(5000);
 })
 
});

test('Prompt Dialog-test1',async({page}) => {

  await page.goto("https://demoqa.com/alerts");
 await expect(page).toHaveTitle("demosite");

 //By adding the below code we enable the alert handling/ dialog window handler.whena particular alert window is clicked this dialog handler will be triggered
 page.on('dialog', async dialog =>{

    expect(dialog.type()).toContain('prompt');//dialog.type will return what type of alert .This is alert type validation
    expect(dialog.message()).toContain('Please enter your name');
    await dialog.accept('john');


    await page.locator("//button[@id='promtButton']").click();//we can use directly locator without declaring dialog above but we cannot do validation on it
    await  page.waitForTimeout(5000);
    await expect(page.locator("//span[@id='promptResult']")).toHaveText('You entered john');

    await  page.waitForTimeout(5000);
 })
 
});

