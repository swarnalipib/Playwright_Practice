async function selectDateAndTime(page, day, month, year, time) {

    // Select Date
    await page.locator('#datePickerMonthYearInput').click();

    await page.locator('.react-datepicker__month-select')
        .selectOption(String(month - 1));

    await page.locator('.react-datepicker__year-select')
        .selectOption(String(year));

    await page.locator(
        `.react-datepicker__day--${String(day).padStart(3, '0')}:not(.react-datepicker__day--outside-month)`
    ).click();


    // Select Date and Time
    await page.locator('#dateAndTimePickerInput').click();

    // Navigate to required month and year
    const targetDate = new Date(year, month - 1, day);

    while (true) {

        const currentMonth = await page.locator(
            '.react-datepicker__current-month'
        ).innerText();

        const currentDate = new Date(currentMonth + ' 1');

        if (
            currentDate.getMonth() === targetDate.getMonth() &&
            currentDate.getFullYear() === targetDate.getFullYear()
        ) {
            break;
        }

        if (currentDate < new Date(year, month - 1, 1)) {
            await page.locator('.react-datepicker__month-container')
                .locator('..')
                .locator('.react-datepicker__navigation--next')
                .click();
        } else {
            await page.locator('.react-datepicker__navigation--previous')
                .click();
        }
    }

    // Select date
    await page.locator(
        `.react-datepicker__day--${String(day).padStart(3, '0')}:not(.react-datepicker__day--outside-month)`
    ).click();

    // Select time
    await page.locator('.react-datepicker__time-list-item')
        .filter({ hasText: new RegExp(`^${time}$`) })
        .click();

}

module.exports = { selectDateAndTime };