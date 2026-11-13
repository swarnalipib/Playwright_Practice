async function selectDateTime(page, date,time) {
    const dateinput = await page.locator('#dateAndTimePickerInput');
    await dateinput.click();

  // Select date dynamically
  const days = page.locator('.react-datepicker__day:not(.react-datepicker__day--outside-month)');

  for (const d of await days.all()) {
    if ((await d.getAttribute('aria-label'))?.includes(date)) {
      await d.click();
      break;
    }
  }

  // Select time dynamically
  const times = page.locator('.react-datepicker__time-list-item');

  for (const t of await times.all()) {
    if ((await t.textContent())?.trim() === time) {
      await t.click();
      break;
    }
  }
};
module.exports = { selectDateTime };