const { test, expect } = require('@playwright/test');

test('date picker46', async ({ page }) => {
  // Define the date and time variables you want to select
  const date = 'November 10th, 2026'; 
  const time = '17:30';

  await page.goto('https://demoqa.com/date-picker/', { 
    waitUntil: 'domcontentloaded', 
    timeout: 60000 
  });

  // Note: DemoQA's actual page title is 'demosite'
  await expect(page).toHaveTitle('demosite');

  const dateInput = page.locator('#dateAndTimePickerInput');
  await dateInput.click();

  // Use backticks (`) for template literals so ${date} and ${time} work
  await page.locator(`.react-datepicker__day:not(.react-datepicker__day--outside-month)[aria-label*="${date}"]`).click();
 await page.waitForTimeout(5000);
  // Select time directly using exact text match
  await page.locator('.react-datepicker__time-list-item')
    .filter({ hasText: new RegExp(`^${time}$`) })
    .click();
    await page.waitForTimeout(5000);
});

