const {test,expect} = require("@playwright/test");

test('Drop down test',async({page}) => {

 await page.goto("https://testautomationpractice.blogspot.com/");
 await page.locator("#country").selectOption({label:'Canada'}); //by using label

// await page.waitForTimeout(5000);

 await page.locator("#country").selectOption('India');//by directly using
// await page.waitForTimeout(5000);

 await page.locator("#country").selectOption({value:'japan'});//by using value
// await page.waitForTimeout(5000);

 await page.locator("#country").selectOption({index: 0});//by using index
// await page.waitForTimeout(5000);

 await page.selectOption("#country",{value: 'china'});//by using directli inside selectoption both locator and value

//here country have another csslocator used #country which same as "label[for='country']"

//check with assertions

// const options = await page.locator("#country option") //creates a locator that points to all the <option> elements inside the #country dropdown, but it does not perform any action on its own.
 //await expect(options).toHaveCount(10);
//console.log(await page.locator("#country option").allTextContents());

const options =await page.$$("#country option") //for multiple locators we can use $$
await expect(options.length).toBe(10);

//print all values  in the dropdown

for(const op of options)
{
    console.log(await op.textContent());
}

//to check presence of value in dropdown


const content = await page.locator("#country").textContent();
await expect(content.includes('India')).toBeTruthy();

//to selection option by loop statement



for(const op of options){
    let value = await op.textContent();
    if(value.includes('France'))
    {
        await page.selectOption("#country",value)
        break;
    }
}

});
