const { test, expect } = require("@playwright/test");

test('dynamic table', async ({ page }) => {

    await page.goto("https://testautomationpractice.blogspot.com/");

    const table = page.locator("table#taskTable");

    // Count columns
    const columns = table.locator("thead tr th");
    console.log("No of columns:", await columns.count());

    await expect(columns).toHaveCount(5);

    // Count rows
    const rows = table.locator("tbody tr");
    console.log("No of rows:", await rows.count());

    await expect(rows).toHaveCount(4);

    //Print cpu data for chrome

    // Find CPU column dynamically
    const headers = await columns.allTextContents();
    console.log("All the contents are:",headers);

    const cpuIndex = headers.findIndex(
        header => header.trim() === "CPU (%)"
    );

    expect(cpuIndex).not.toBe(-1);

    // Find Chrome row
    const selectedrow = rows.filter({
        hasText: "Chrome"
    });

    await expect(selectedrow).toHaveCount(1);

    // Get Chrome CPU value
    const cpuValue = await selectedrow.locator("td")
        .nth(cpuIndex)
        .textContent();

        await page.waitForTimeout(5000)

    console.log("CPU load of Chrome process:", cpuValue.trim());
    const formattedcpuValue = cpuValue.trim();
    console.log("Expected text:", `Chrome CPU: ${formattedcpuValue}`);


const dynamicMatchText = await page.locator("//strong[@class='chrome-cpu' and contains(text(), '%')]").textContent();

console.log("Actual page text:",dynamicMatchText);
await expect(dynamicMatchText).toBe(formattedcpuValue);
//await expect(dynamicMatchText).toContain(formattedcpuValue);
console.log("CPU value successfully verified!");

// //to print memory of firefox 


// const memoryIndex = headers.findIndex(
//         header => header.trim() === "Memory (MB)"
//     );

//     expect(memoryIndex).not.toBe(-1);

//     // Find Chrome row
//    const srow = rows.filter({
//         hasText: "Firefox"
//     });

//     await expect(srow).toHaveCount(1);

//     // Get Chrome CPU value
//     const memoryValue = await srow.locator("td")
//         .nth(memoryIndex)
//         .textContent();

//         await page.waitForTimeout(5000)

//     console.log("Memory Size of Firefox process::", memoryValue.trim());

// //to print Network speed of chrome


// const networkIndex = headers.findIndex(
//         header => header.trim() === "Network (Mbps)"
//     );

//     expect(networkIndex).not.toBe(-1);

//     // Find Chrome row
//    const nrow = rows.filter({
//         hasText: "chrome"
//     });

//     await expect(nrow).toHaveCount(1);

//     // Get Chrome CPU value
//     const networkValue = await nrow.locator("td")
//         .nth(networkIndex)
//         .textContent();

//         await page.waitForTimeout(5000)

//     console.log("Network speed of Chrome process:", networkValue.trim());

// // to print Disk space of Firefox process


// const diskIndex = headers.findIndex(
//         header => header.trim() === "Disk (MB/s)"
//     );

//     expect(networkIndex).not.toBe(-1);

//     // Find Chrome row
//    const frow = rows.filter({
//         hasText: "firefox"
//     });

//     await expect(frow).toHaveCount(1);

//     // Get Chrome CPU value
//     const diskValue = await frow.locator("td")
//         .nth(diskIndex)
//         .textContent();

//         await page.waitForTimeout(5000)

//     console.log("Disk space of Firefox process:", diskValue.trim());

// //---------------------------------------------------------------------
// console.log('\n');
// //
// //to print cpu data for all browsers 


//  for (let i = 0; i < await rows.count(); i++) {

//         const row = rows.nth(i);

//         // Get browser name
//         const name = await row.locator("td").nth(0).textContent();

//         // Get CPU value
//         const cpu = await row.locator("td")
//             .nth(cpuIndex)
//             .textContent();

//         console.log(
//             "Browser:", name.trim(),
//             "| CPU:", cpu.trim()
//         );
//     }


});