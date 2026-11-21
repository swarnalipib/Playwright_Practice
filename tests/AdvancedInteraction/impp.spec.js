const { test, expect } = require('@playwright/test');
 
//const {selectDate, selectTime, selectCustomDate}=  require('./calender');
 
test('datepicker test', async ({page})=>{
   
    await page.goto("https://demoqa.com/date-picker");
 
    await selectDate(page,"05/13/2024");
 
    await page.waitForTimeout(3000);    
 
    await expect(page.locator('#datePickerMonthYearInput'))
        .toHaveValue('05/13/2024');
 
});
 
 
test('DateTime test', async ({page})=>{
 
    await page.goto("https://demoqa.com/date-picker");
 
    await selectTime(page,"May 13,2024 02:30");    
   
    await expect(page.locator('#dateAndTimePickerInput'))
        .toHaveValue('May 13, 2024 2:30 AM');  
 
});