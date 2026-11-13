const {test,expect} = require("@playwright/test");

test('dynamic-table2',async({page}) => {

 await page.goto("https://automationpracticehubapp.netlify.app/advanced");

 await page.fill("#login-username","Admin");
 await expect(page.locator("#login-username")).toBeVisible();
 await page.fill("#login-password","Hello@123");
 await expect(page.locator("#login-password")).toBeVisible();
 await page.locator("button[id='login-submit'] span").click();
 await expect(page.locator("button[id='login-submit'] span")).toBeVisible();

 await page.locator("#load-data-btn").click();

 const table = page.locator("#dynamic-table");

 await page.waitForTimeout(5000);

    // Count columns
    const columns = table.locator("thead tr th");
    console.log("No of columns:", await columns.count());

    await expect(columns).toHaveCount(4);

    // Count rows
    const rows = table.locator("tbody tr");
    console.log("No of rows:", await rows.count());

    await expect(rows).toHaveCount(5);

    // Find department and salary column dynamically
    // Dynamically find the index for BOTH columns

      const headers = await columns.allTextContents();
       console.log("All the contents are:",headers);

    const deptIndex = headers.findIndex(header => header.trim() === "Department");
    const salaryIndex = headers.findIndex(header => header.trim() === "Salary");

    // Verify both columns exist in the DOM
    expect(deptIndex).not.toBe(-1);
    expect(salaryIndex).not.toBe(-1);

    // Find the row containing "3"
    const selectedrow = rows.filter({
        hasText: "3"
    });
    await expect(selectedrow).toHaveCount(1);

    // Get Department and Salary values dynamically using their respective indexes
    const cells = selectedrow.locator("td");
    const deptValue = await cells.nth(deptIndex).textContent();
    const salaryValue = await cells.nth(salaryIndex).textContent();

    // Print the dynamic results
    console.log("For Id 3, Department is:", deptValue.trim()," and Salary is:", salaryValue.trim());


});