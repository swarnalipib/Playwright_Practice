const { test, expect } = require('@playwright/test');
const { selectDateTime } = require('./date.js'); // assuming you saved the function above here

test.only('Select a specific date and time on DemoQA', async ({ page }) => {
  // Navigate to the correct date picker page
await page.goto("https://demoqa.com/date-picker/", {
  waitUntil: 'domcontentloaded',
  timeout: 60000
});
  
  // Define the target date string
  //const targetDate = 'November 12, 2026 12:55 PM';
  
  // Execute the custom function
  await selectDateTime(page, 'November 10, 2026','15:00');
  
  // Verify that the field correctly holds the chosen value
  //await expect(page.locator('#dateAndTimePickerInput')).toHaveValue(targetDate);
});
