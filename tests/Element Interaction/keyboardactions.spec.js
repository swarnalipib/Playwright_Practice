const {test,expect} = require("@playwright/test");

test('Keyboard action',async({page}) => {

 await page.goto("https://gotranscript.com/text-compare");
// await page.locator('[name="text1"]').fill('swarnalipi');
await page.type('[name="text1"]','swarnalipi'); //Type the text in the inputbox

await page.keyboard.press('Control+A'); //select all text so ctrl+A
await page.keyboard.press('Control+C'); //copy text so ctrl+C
await page.keyboard.down('Tab');//pressing the tab key to move to next input box for paste 
await page.keyboard.up('Tab');//releasing the tab key 
await page.keyboard.press('Control+V'); //paste text so ctrl+V


await page.waitForTimeout(5000);

});

//Note: Press is used for combination of 2 keys and tab is single key so use keyboard down and up for pressing and releasing
 /*
await page.keyboard.press('Shift+KeyA');
// or
await page.keyboard.press('Shift+A');

An example to trigger select-all with the keyboard

await page.keyboard.press('ControlOrMeta+A'); //control for windows and linux. Meta for mac

 */