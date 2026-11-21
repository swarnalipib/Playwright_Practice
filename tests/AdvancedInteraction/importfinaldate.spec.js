const { test, expect } = require('@playwright/test');

// Import function
const { selectDateAndTime } = require('./finaldatepicker');

test('Dynamic Date and Time Picker', async ({ page }) => {

    await page.goto('https://demoqa.com/date-picker');

    let day = 25;
    let month = 4;
    let year = 2023;
    let time = '19:00';

    await selectDateAndTime(page, day, month, year, time);
    const p = await page.locator('#datePickerMonthYearInput').inputValue();
     console.log("date :",p);
    await expect(page.locator('#datePickerMonthYearInput'))
        .toHaveValue('04/25/2023');

    await expect(page.locator('#dateAndTimePickerInput'))
        .toHaveValue('April 25, 2023 7:00 PM');

});