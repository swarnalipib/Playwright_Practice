const {test,expect} = require("@playwright/test");

test('pagination table',async({page}) => {

 await page.goto("https://automationpracticehubapp.netlify.app/advanced");

 await page.fill("#login-username","Admin");
 await expect(page.locator("#login-username")).toBeVisible();
 await page.fill("#login-password","Hello@123");
 await expect(page.locator("#login-password")).toBeVisible();
 await page.locator("button[id='login-submit'] span").click();
 await expect(page.locator("button[id='login-submit'] span")).toBeVisible();

 const table = await page.locator("#pagination-table");
 await expect(table).toBeVisible();
 await expect(table).toHaveId('pagination-table');

 //to find no of rows/columns

 const columns =await table.locator("thead tr th");
 console.log("No of columns:",await columns.count());
 expect(await columns.count()).toBe(4);

 const rows =await table.locator("tbody tr");
 console.log("No of rowss:",await rows.count());
  await expect(await rows.count()).toBe(10);


//to print all rows data 

for(let i=0;i<await rows.count();i++)
{
    const row=rows.nth(i);
    const tds = row.locator('td');

 for(let j=0;j<await columns.count();j++)

    console.log(await tds.nth(j).textContent());
}
  
//to print data from all pagination

const pages = page.locator("//nav[@aria-label='Table pagination']/button")
//await expect(pages).toBeVisible();
console.log("No of pages:",await pages.count());

for(let p=0;p<await pages.count();p++)
{
    if(p>0 || p==7)
    {
        await pages.nth(p).click();
        await expect(pages.nth(p)).toBeVisible();

    }
   

for(let i=0;i<await rows.count();i++)
{
    const row=rows.nth(i);
    const tds = row.locator('td');

 for(let j=0;j<await tds.count()-1;j++)

    console.log(await tds.nth(j).textContent());
}

await page.waitForTimeout(5000);

}
await page.waitForTimeout(5000);

});
