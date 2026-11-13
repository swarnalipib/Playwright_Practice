const {test,expect} = require("@playwright/test");

test('Alert test',async({page}) => {

 await page.goto("https://testautomationpractice.blogspot.com/");

 //By adding the below code we enable the alert handling/ dialog window handler.when particular alert window is clicked this dialog handler will be triggered
 page.on('dialog', async dialog =>{

    expect(dialog.type()).toContain('alert');//dialog.type will return what type of alert .This is alert type validation
    expect(dialog.message()).toContain('I am an alert box!');
    await dialog.accept();

    await page.locator("//button[normalize-space()='Alert'])").click();//we can use directly locator without declaring dialog above but we cannot do validation on it
    await page.waitForTimeout(5000);
 })
 
});

test('Confirmation Dialog-Alert test',async({page}) => {

 await page.goto("https://testautomationpractice.blogspot.com/");

 //By adding the below code we enable the alert handling/ dialog window handler.whena particular alert window is clicked this dialog handler will be triggered
 page.on('dialog', async dialog =>{

    expect(dialog.type()).toContain('confirm');//dialog.type will return what type of alert .This is alert type validation
    expect(dialog.message()).toContain('Press a button!');
    await dialog.accept();

    await page.locator("//button[normalize-space()='Confirm Box']").click();//we can use directly locator without declaring dialog above but we cannot do validation on it
     await  page.waitForTimeout(5000);
 })
 
});

test('Prompt Dialog-test',async({page}) => {

 await page.goto("https://testautomationpractice.blogspot.com/");

 //By adding the below code we enable the alert handling/ dialog window handler.whena particular alert window is clicked this dialog handler will be triggered
 page.on('dialog', async dialog =>{

    expect(dialog.type()).toContain('prompt');//dialog.type will return what type of alert .This is alert type validation
    expect(dialog.message()).toContain('Please enter your name:');
    execPath(dialog.defaultValue()).toContain('Harry Potter')
    await dialog.accept('john');


    await page.locator("//button[normalize-space()='Prompt']").click();//we can use directly locator without declaring dialog above but we cannot do validation on it
    await  page.waitForTimeout(5000);
    await expect(page.locator("//p[@id='demo']")).toHaveText('Hello john! How are you today?');

    await  page.waitForTimeout(5000);
 })
 
});

