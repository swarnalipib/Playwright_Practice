import { test, expect} from '@playwright/test';
import path from 'path';

test('Download a file', async ({ page }) => {

    await page.goto('https://demoqa.com/upload-download');

    // Wait for download and click Download
    const downloadPromise = page.waitForEvent('download');

    await page.locator('#downloadButton').click();
    await page.waitForTimeout(5000);

    const download = await downloadPromise;

    // Save downloaded file
    await download.saveAs('downloads/' + download.suggestedFilename());

    console.log('File downloaded successfully');

});

// test('Download a file2', async ({ page }) => {

//     await page.goto('https://testautomationpractice.blogspot.com/');

//      await page.locator("//a[normalize-space()='Download Files']").click();
//      await expect(page.locator("//a[normalize-space()='Download Files']")).toHaveText('Download Files');

//     // Wait for download and click Download
//     const downloadPromise = page.waitForEvent('download');

//     const download = await downloadPromise;

//     // Save downloaded file
//     await download.saveAs('downloads/' + download.suggestedFilename());

//     console.log('File downloaded successfully');

// });

test('Download a file3', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/download');

    // Wait for download and click Download
    const downloadPromise = page.waitForEvent('download');

    await page.locator("a[href='download/Images.txt']").click();
    await page.waitForTimeout(5000);

    const download = await downloadPromise;

    // Save downloaded file
     await download.saveAs(path.join(__dirname,"../../","downloads","abc.txt"));
    //await download.saveAs('downloads/' + download.suggestedFilename());

    console.log('File downloaded successfully');

});


test('Download a file4', async ({ page }) => {

    const downloaded = new Promise(resolve  => { 

    page.on("download",async(download) => {

    await download.saveAs(path.join(__dirname,"../../","downloads", download.suggestedFilename())); //We have enclosed the page.on into a promise , as soon as download is completed it resolve it to true and resturn the promise 
    });
            
    });

    await page.goto('https://the-internet.herokuapp.com/download');

    await page.locator("a[href='download/Images.txt']").click();// when it is clicked download event will triggered page on
    await downloaded;//we are waiting for the download to be completed


    console.log('File downloaded successfully');

});

//c  folder-> downloads absolute path

test('Download a file5', async ({ page }) => {

    await page.goto('https://the-internet.herokuapp.com/download');

    // Wait for download and click Download
    const downloadPromise = page.waitForEvent('download');

    await page.locator("a[href='download/Images.txt']").click();
    await page.waitForTimeout(5000);

    const download = await downloadPromise;

    // Save downloaded file
    //await download.saveAs(path.join('C:\\Users\\Mindfire\\Downloads' + download.suggestedFilename()));
      const targetPath = path.join('C:', 'Users', 'Mindfire', 'Downloads', download.suggestedFilename());

    // Save the downloaded file to the target path
    await download.saveAs(targetPath);

    console.log(`File downloaded successfully to: ${targetPath}`);  

    console.log('File downloaded successfully');

});