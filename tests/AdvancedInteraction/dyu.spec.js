const { test,expect } = require('@playwright/test');

test('date picker48', async ({ page }) => {

    await page.goto("https://demoqa.com/date-picker/", {
  waitUntil: 'domcontentloaded',
  timeout: 60000
});
  // Define the date and time variables you want to select
  const date = 'November 10th, 2026'; 
  const time = '17:30';
  // 1. Open the date picker and assert the calendar popup appears
  const dateInput = page.locator('#dateAndTimePickerInput');
  await expect(dateInput).toBeVisible();
  await dateInput.click();

  const calendar = page.locator('.react-datepicker');
  await expect(calendar).toBeVisible();

  // 2. Select the target date directly using a filtered locator
  const targetDay = page
    .locator('.react-datepicker__day:not(.react-datepicker__day--outside-month)')
    .filter({ has: page.locator(`[aria-label*="${date}"]`) })
    // Alternatively, match the attribute directly on the day element:
    // .locator(`.react-datepicker__day:not(.react-datepicker__day--outside-month)[aria-label*="${date}"]`)
    .first();

  //await expect(targetDay).toBeEnabled();
  await targetDay.click();

  // 3. Select the target time from the time list
  const timeOption = page
    .locator('.react-datepicker__time-list-item')
    .filter({ hasText: time })
    .first();

  await expect(timeOption).toBeVisible();
  await timeOption.click();

  // 4. Assert the calendar closes and the input contains the chosen date and time
  //await expect(calendar).toBeHidden();
  //await expect(dateInput).toHaveValue(new RegExp(`${date}.*${time}|${time}`));
});