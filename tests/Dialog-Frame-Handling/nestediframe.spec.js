//nestediframe = inside parent iframe /main page ->child frames are there

const {test} = require("@playwright/test");

test('Nested frame',async({page}) => {

 await page.goto("https://www.dezlearn.com/nested-iframes-example/");

const allframes = await page.frames();
console.log("No of frames", allframes.length);

const mainframe = page.frame({name:'demo_parent_iframe'});
await mainframe.locator("#u_5_5").click();
//await expect(mainframe1).toText("Hooray..! You clicked the button from iframe 1");

const child_frames = mainframe.childFrames();
console.log("No of childframes are:" ,child_frames.length);
await child_frames[0].locator("#u_5_6").click();
await page.waitForTimeout(5000);

});

test('Child frames',async({page}) => {

 await page.goto("https://ui.vision/demo/webtest/frames/");

const allframes = await page.frames();
console.log("No of frames", allframes.length);

const parentframe3 = await page.frame({url:'https://ui.vision/demo/webtest/frames/frame_3'});
parentframe3.locator("//input[@name='mytext3']").fill("frame3");
await page.waitForTimeout(5000);

const childframes = parentframe3.childFrames();
console.log("No of childframes are:" ,childframes.length);
await childframes[0].locator("//*[@id='i6']/div[3]/div").check();
//await page.waitForTimeout(5000);  

await childframes[0].locator("//*[@id='i21']/div[2]").check();
//await page.waitForTimeout(5000);  

const parentframe1 = await page.frame({url:'https://ui.vision/demo/webtest/frames/frame_1'});
parentframe1.locator("//input[@name='mytext1']").fill("frame1");
await page.waitForTimeout(5000);

const parentframe2 = await page.frame({url:'https://ui.vision/demo/webtest/frames/frame_2'});
parentframe2.locator("//input[@name='mytext2']").fill("frame2");
await page.waitForTimeout(5000);


const parentframe4 = await page.frame({url:'https://ui.vision/demo/webtest/frames/frame_4'});
parentframe4.locator("//input[@name='mytext4']").fill("frame4");
await page.waitForTimeout(5000);

const parentframe5 = await page.frame({url:'https://ui.vision/demo/webtest/frames/frame_5'});
parentframe5.locator("//input[@name='mytext5']").fill("frame5");
await page.waitForTimeout(5000);

});

test('Inner child',async({page}) => {

 await page.goto("https://letcode.in/frame");

const allframes = await page.frames();
console.log("No of frames", allframes.length);


const pframe = await  page.frameLocator("#firstFr");
await pframe.locator("//input[@placeholder='Enter name']").fill("swarna");
await pframe.locator("input[placeholder='Enter email']").fill("behera");

// const cframe = pframe.frameLocator("iframe[src='innerFrame']");
const cframe = await pframe.childFrames();
 await cframe[0].locator("input[name='email']").fill("swarna@gmail.com");
await page.waitForTimeout(5000);

});