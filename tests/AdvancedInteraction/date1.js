async function selectDateTime(page, date, time) {

    await page.locator('#dateAndTimePickerInput').click();

    // Select date
    const dateLocator = page.locator(
      `.react-datepicker__day:not(.react-datepicker__day--outside-month)[aria-label*="${date}"]`
    );
    await expect(dateLocator).toHaveValue(date);

    await dateLocator.click();

    // Select time
    await page.locator('.react-datepicker__time-list-item')
      .filter({ hasText: new RegExp(`^${time}$`) })
      .click();

    console.log("Selected Date:", date);
    console.log("Selected Time:", time);
}

module.exports = { selectDateTime };