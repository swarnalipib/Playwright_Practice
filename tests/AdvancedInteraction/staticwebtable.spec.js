const {test,expect} = require("@playwright/test");

test('static webtable',async({page}) => {

 await page.goto("https://testautomationpractice.blogspot.com/");

 const table = await page.locator("table[name='BookTable']");

 //to find no of rows/columns

 const columns =await table.locator("tbody tr th");
 console.log("No of columns:",await columns.count());
 await expect(await columns.count()).toBe(4);

 const rows =await table.locator("tbody tr");
 console.log("No of rowss:",await rows.count());
  await expect(await rows.count()).toBe(7);

  //printing single row data 

  const selectedrows = rows.filter({has:page.locator('td'),hasText:('Learn Selenium')});
  console.log(await selectedrows.textContent());


//printing multiple selected row data 

async function sdata(rows,page,name)
{
const selectedrows = rows.filter({has:page.locator('td'),hasText:name});
  console.log(await selectedrows.textContent());
}

await sdata(rows,page,'Learn Java');
await sdata(rows,page,'Learn JS');
await sdata(rows,page,'Master In JS');

  //printing all row data

  for(let i=0;i<await rows.count();i++)
  {
    const row =rows.nth(i);
    const tds = row.locator('td');

    for(let j=0;j<await tds.count()-1;j++)
    {
        console.log(await tds.nth(j).textContent());
    }
  }




});