const {test,expect} = require("@playwright/test");

test('web table',async({page}) => {

 await page.goto("https://testautomationpractice.blogspot.com/");

 const table = await page.locator("#productTable");

 //to find no of rows/columns

 const columns =await table.locator("thead tr th");
 console.log("No of columns:",await columns.count());
 expect(await columns.count()).toBe(4);

 const rows =await table.locator("tbody tr");
 console.log("No of rowss:",await rows.count());
  expect(await rows.count()).toBe(5);

//to select single product from the table 
//   const selectedrow = rows.filter({has: page.locator('td'), hasText:'Smartwatch'});
//   await selectedrow.locator("input[type='checkbox']").check();
//   await expect(selectedrow.locator("input[type='checkbox']")).toBeChecked();


//to select multiple products from the table


async function selectproduct(rows,page,name)
{
  const selectedrow = rows.filter({has: page.locator('td'), hasText:name});
    await selectedrow.locator("input[type='checkbox']").check();

}

await selectproduct(rows,page,'Laptop');
await selectproduct(rows,page,'Tablet');
await selectproduct(rows,page,'Smartwatch');


  await page.waitForTimeout(5000);

//to print all rows data 

for(let i=0;i<await rows.count();i++)
{
    const row=rows.nth(i);
    const tds = row.locator('td');

 for(let j=0;j<await tds.count()-1;j++)

    console.log(await tds.nth(j).textContent());
}
  
//to print data from all pagination

const pages = page.locator(".pagination li a")
console.log("No of pages:",await pages.count());

for(let p=0;p<await pages.count();p++)
{
    if(p>0)
    {
        await pages.nth(p).click();
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