//w3school-html table

const {test,expect} = require("@playwright/test");

test ('xpath axes',async({page}) => {


    await page.goto("https://www.w3schools.com/html/html_tables.asp");

    
    //1.self axis - selects <td> element that contain 'Germany'
    const germanycell =page.locator("//td[normalize-space()='Germany']/self::td");
    await expect(germanycell).toHaveText("Germany");

    //2.parent -Get parent <tr> of Germany cell
    const parentrow = page.locator("//td[normalize-space()='Germany']/parent::tr");
    await expect(parentrow).toContainText("Maria Anders");
    await expect(parentrow).toContainText("Alfreds Futterkiste	Maria Anders Germany");
    console.log(await parentrow.textContent());


   //3.child -child axis -Get <td>children of second <tr> in the table
   const child=page.locator("//table[@id='customers']//tr[2]/child::td")
   await expect(child).toHaveCount(3);
  
   //4.Ancestor axis - get ancestor<table> of the cell Germany

   const table = page.locator("//td[normalize-space()='Germany']/ancestor::table")
   await expect(table).toHaveAttribute("id","customers");

   //5.descendant axis -Get all<td> elements under the table

   const desctable = page.locator("//table[@id='customers']/descendant::td");
   await expect(desctable).toHaveCount(18);

   //6.following axis-Get the <td> that comes after Germany in document order

   const followingcell = page.locator("//td[normalize-space()='Germany']/following::td[1]")
   await expect(followingcell).toHaveText('Centro comercial Moctezuma');

   //7.following-sibling axis - get <td> to the right of Germany
   const followingsiblings = page.locator("//td[normalize-space()='Germany']/following-sibling::td")
   await expect(followingsiblings).toHaveCount(0);

   //8.preceding axis -Get the <td> that comes before Germany in document order
   const precedingcell = page.locator("//td[normalize-space()='Germany']/preceding::td[1]")
   await expect(precedingcell).toHaveText('Maria Anders');

   //9.preceding-siblings axis -Get the <td> to the left of Germany 
   const precedingsiblings = page.locator("//td[normalize-space()='Germany']/preceding-sibling::td")
   await expect(precedingsiblings).toHaveCount(2);

});

test.only('Extra methods',async({page}) => {

    //  await page.goto("https://www.w3schools.com/html/html_tables.asp");

    //  const row2= await page.locator('//table[@class="ws-table-all"]/tbody/tr[2]');
    // console.log(await row2.allInnerTexts());
    // console.log(await row2.allTextContents());

    await page.goto("https://demoblaze.com/");

   await page.locator("//a[@id='login2']").click();
   await expect (page.locator("//a[@id='login2']")).toHaveText('Log in');

   const value=await page.locator("//input[@id='loginusername']").fill('admin');
   await expect(page.locator("//input[@id='loginusername']")).toHaveValue('admin');
   console.log((page.locator("//input[@id='loginusername']")).inputValue());

    const row2= await page.locator('//div[@class="navbar-collapse"]');
     console.log(await row2.allInnerTexts());
     console.log(await row2.allTextContents());

     const rowelement1 =await page.locator("//a[@id='login2']");

    console.log(await rowelement1.innerText());
    console.log(await rowelement1.textContent());



});