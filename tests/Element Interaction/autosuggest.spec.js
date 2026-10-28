const {test,expect} = require("@playwright/test");

test('Autosuggestion test',async({page}) => {

await page.goto("https://www.google.com/");
//await page.waitForSelector(5000);
await page.locator("//textarea[@name='q']").type('software');
await page.waitForSelector("//li[@role='presentation']");

// await page.keyboard.press("ArrowDown");
// await page.keyboard.press("ArrowDown");
// await page.keyboard.press("ArrowDown");
// await page.keyboard.press("Enter");


const elements = await page.$$("//li[@role='presentation']");

await page.waitForTimeout(5000);

// for(let el of elements)
// {
//     let value =await el.textContent();
//     console.log(value);
// }


// for(let el of elements)
// {
//     let value =await el.textContent();
//     if(value.includes('engineer'))
//     {  
//          console.log(elements[value]);
//         await elements[value].click();
       

//         break;
//     }
// }


for(let i=0;i<elements.length;i++)
{
    const text = await elements[i].textContent();
    {
        if(text.includes('engineer'))
        {
            await elements[i].click();
            break;
        }
    }
}

});