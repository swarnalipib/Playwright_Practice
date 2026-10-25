const {test,expect} = require("@playwright/test");

test('Single File upload',async({page}) => {

 await page.goto("https://practice.expandtesting.com/upload");
//await page.locator("//input[@id='filesToUpload']").setInputFiles('tests/samplefiles/images.jpg');
 await page.setInputFiles("//input[@id='fileInput']",'tests/samplefiles/images.jpg');
 await page.waitForTimeout(5000);

 await page.click("//button[@id='fileSubmit']");
});

test.only('Multiple File upload',async({page}) => {

 await page.goto("https://davidwalsh.name/demo/multiple-file-upload.php");

 //await page.locator("//input[@id='filesToUpload']").setInputFiles(['tests/samplefiles/images.jpg','tests/samplefiles/fgh.pdf']);
 await page.setInputFiles("//input[@id='filesToUpload']",['tests/samplefiles/images.jpg','tests/samplefiles/fgh.pdf']);
 
 await page.waitForTimeout(5000);


});
