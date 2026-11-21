const {test,expect} = require("@playwright/test");

test('date picker1',async({page}) => {

 await page.goto("https://testautomationpractice.blogspot.com/");


 const year = "2024";
 const month = "March";
 const date = "25";

  await page.locator("#datepicker").click();
 await expect(page.locator("#datepicker")).toBeVisible();

 while(true)
 {
    const currentyear = await page.locator(".ui-datepicker-year").textContent();
    const currentmonth = await page.locator(".ui-datepicker-month").textContent();

  if(currentyear == year && currentmonth == month)
  {
    break;
  }

  await page.locator("[title='Prev']").click();
  await expect(page.locator("[title='Prev']")).toHaveText("Prev");

 }

 const currentdate =await page.$$(".ui-state-default");

 for(const d of currentdate)
 {
    if(await d.textContent() == date)

    {
       await d.click();
       break;
    }
 }

 //await page.waitForTimeout(5000);

});



// test.only('date picker2', async ({ page }) => {

//     await page.goto("https://testautomationpractice.blogspot.com/");

//     const year = "2024";
//     const month = "Mar";
//     const date = "25";

//     await page.locator("#txtDate").click();

//     await expect(await page.locator("#txtDate")).toBeVisible();

//     // Select year and month directly
//     await page.locator(".ui-datepicker-year").selectOption({ label: year });
//     await expect(await page.locator(".ui-datepicker-year")).toHaveValue(year);
//      await page.waitForTimeout(5000);
//     await page.locator(".ui-datepicker-month").selectOption({ label: month });
//     await expect(await page.locator(".ui-datepicker-month")).toBeVisible();
//      await page.waitForTimeout(5000);

//     // Select the required date
//     const dates = await page.$$(".ui-datepicker-calendar td a");


//     for (let d of dates) {

//         if(d.textContent() ==date)
//         {
//             await d.click();
//             break;
//         }

//     }

//     //or
//     //await page.click("//a[class="ui-state-default"][text()='25']");
//     //await page.click(`//a[class="ui-state-default"][text()='${date}']`);

//     await page.waitForTimeout(6000);

// });

test('Handle Date Picker 2', async ({ page }) => {

    // Open website
    await page.goto('https://testautomationpractice.blogspot.com/');

    // Click on Date Picker 2
    await page.locator('#txtDate').click();

    // Select month
    await page.locator('.ui-datepicker-month').selectOption('4');
    await page.waitForTimeout(5000);

    // Select year
    await page.locator('.ui-datepicker-year').selectOption('2026');
    await page.waitForTimeout(5000);

    // Select date 15
    await page.locator('//td//a[text()="15"]').click();
    await page.waitForTimeout(5000);

    // Verify selected date
    const date = await page.locator('#txtDate').inputValue();

    console.log('Selected Date:', date);



});


test('date picker3-Select Date Range', async ({ page }) => {

    await page.goto('https://testautomationpractice.blogspot.com/');

    const startDate = '2026-04-13';
    const endDate = '2026-03-25';

    // Enter Start Date
    await page.locator('#start-date').fill(startDate);

    // Enter End Date
    await page.locator('#end-date').fill(endDate);

    // Click Submit
   await page.locator('button.submit-btn').click();

    // Verify date values
    await expect(page.locator('#start-date')).toHaveValue(startDate);
    await expect(page.locator('#end-date')).toHaveValue(endDate);

});