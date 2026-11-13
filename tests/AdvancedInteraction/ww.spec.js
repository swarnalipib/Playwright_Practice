const {test,expect} = require("@playwright/test");



test('date picker45',async({page}) => {

await page.goto("https://demoqa.com/date-picker/", {
  waitUntil: 'domcontentloaded',
  timeout: 60000
});

  await expect(page).toHaveTitle('demosite');

  const date = "November 12, 2026";
  const time = "03:00 PM";

  await page.locator('#dateAndTimePickerInput').click();

  // Select date dynamically

  await page
    .locator('.react-datepicker__day:not(.react-datepicker__day--outside-month)')
    .filter({ has: page.locator(`[aria-label*="${date}"]`) }) // Or use CSS attribute selector directly below
    .first()
    .click();

  // Select time dynamically
  const times = page.locator('.react-datepicker__time-list-item');

  for (const t of await times.all()) {
    if ((await t.textContent())?.trim() === time) {
      await t.click();
      break;
    }
  }

  // Print selected date and time
  console.log("Selected Date:", date);
  console.log("Selected Time:", time);

  //await expect(page.locator('#dateAndTimePickerInput'))
   // .toHaveValue(/November 12, 2026 4:40 PM/);

});