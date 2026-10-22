const {test,expect} = require("@playwright/test");

test ('xpath demo',async({page}) => {


    await page.goto("https://demowebshop.tricentis.com/");
    //Absolute xpath -logo
    const absolutelogo = page.locator("xpath=/html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]");
    await expect(absolutelogo).toBeVisible();

    //Relative xpath -logo
    const relativelogo = page.locator("//img[@alt='Tricentis Demo Web Shop']");
    await expect(relativelogo).toBeVisible();

    //contains
    const products = page.locator("//a[contains(@href,'computer')]")
    const productscount = await products.count();
    console.log("No of products:",productscount);
    await expect(productscount).toBeGreaterThan(0);

    console.log("First product:",await products.first().textContent());
    console.log("Last product:",await products.last().textContent());
    console.log("Nth product:",await products.nth(3).textContent());

 const listofproducts = await products.allTextContents();
 console.log("List of products:", listofproducts);

 for(let p of listofproducts)
 {
    console.log(p);
 }

 // start-with()

 const buildingproducts = await page.locator("//h2/a[starts-with(@href,'/build')]");
 const count = await buildingproducts.count();
 await expect(count).toBeGreaterThan(0);

 console.log("Total count:",count);

 // text()-

 const reglink = await page.locator("//a[text() = 'Register']");
 await expect(reglink).toBeVisible();

 //normalize-space - ignore the space before an after the text

  const categorylink = await page.locator("(//a[normalize-space()='Electronics'])[3]"); //Electronics text have a space 
 await expect(categorylink).toBeVisible();
 console.log("name of the category:", await categorylink.textContent());


 //last()-
 const lastitem = await page.locator("//div[@class = 'column follow-us']//li[last()]");
 await expect(lastitem).toBeVisible();
 console.log("last item :",await lastitem.textContent());

 //postition()

const positionitem = await page.locator("//div[@class = 'column follow-us']//li[position()=2]");
 await expect(positionitem).toBeVisible();
 console.log("second position item :",await positionitem.textContent());


});
