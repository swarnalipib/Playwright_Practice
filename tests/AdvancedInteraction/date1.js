async function selectDateTime(page, expect,date, time) {

  const dateInput = page.locator('#dateAndTimePickerInput');
  await dateInput.click();

   
  // Use backticks (`) for template literals so ${date} and ${time} work

  const dated = page.locator(`.react-datepicker__day:not(.react-datepicker__day--outside-month)[aria-label*="${date}"]`);
  
  await dated.click();
 //await page.waitForTimeout(5000);
  // Select time directly using exact text match
  await page.locator('.react-datepicker__time-list-item')
    .filter({ hasText: new RegExp(`^${time}$`) })
    .click();
    

    console.log("Selected Date:", date);
    console.log("Selected Time:", time);
    console.log(await page.locator('#dateAndTimePickerInput').inputValue());
    
}

module.exports = { selectDateTime };