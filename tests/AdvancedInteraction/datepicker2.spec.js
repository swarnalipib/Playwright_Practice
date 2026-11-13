const {test,expect} = require("@playwright/test");

test('date picker dynamic',async({page}) => {

 await page.goto("https://demoqa.com/date-picker");

 await page.locator("#dateAndTimePickerInput").click();

 // Select month dynamically
    await page.locator('.react-datepicker__month-read-view--selected-month')
        .selectOption({ label: 'April' });

    // Select year dynamically
    await page.locator('.react-datepicker__year-read-view--selected-year')
        .selectOption(year);

// Format date with leading zeros
    const formattedDate = date.padStart(3, '0');

    // Select date dynamically
    await page.locator(
        `.react-datepicker__day--${formattedDate}:not(.react-datepicker__day--outside-month)`
    ).click();

    // Verify selected date
    await expect(page.locator('#datePickerMonthYearInput'))
        .toHaveValue('04/13/2026');

});

//different file need to function .selectdate(argument should date)
//.selectdate("November 5, 2026 12:55 PM")
