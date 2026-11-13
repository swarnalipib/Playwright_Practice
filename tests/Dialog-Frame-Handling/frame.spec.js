/*
//frame -In Playwright, a Frame represents a distinct HTML document embedded inside a webpage, typically loaded via the <iframe> or <frame> tags.
frame is html tage which will allow you to embed another application

The Playwright Frame Architecture

Every webpage in Playwright is organized as a tree of frames:
• The Main Frame: Every page has exactly one main frame (page.mainFrame()). When you perform page-level actions like page.click(), Playwright assumes you are interacting with this main frame.
• Child Frames: Any <iframe> element inside the main page forms a child frame. These can even be nested inside one another (a frame inside a frame)


How to Interact with Frames in Playwright
----------------------------------------------

//Because frames act as isolated mini-pages, standard locators (like page.locator()) cannot see or interact with elements inside them
so Playwright allows you to target the frame directly using two main approaches:

1. The Recommended Way: page.frameLocator()
---------------------------------------------

This is the modern and preferred approach. It returns a FrameLocator that lets you write seamless, chaining locators that automatically wait for the frame to appear.

// Locate the frame using a CSS selector, then find the element inside it
const usernameInput = page.frameLocator('.login-iframe').getByLabel('User Name');

// Interact with the element directly
await usernameInput.fill('John');

2.The Traditional Way: page.frame()
----------------------------------------

This returns a literal Frame object based on the frame's name attribute or its URL. It is useful if you need to inspect the frame's lifecycle or URL properties.
javascript
// Get the frame by its name attribute
const signupFrame = page.frame('signup-frame-name');

// Interact using the frame context
if (signupFrame) {
  await signupFrame.fill('#email', 'john@example.com');
}



Key Differences
----------------


Feature          	page.frameLocator()                 	page.frame()
------------------------------------------------------------------------------
Return Type	         FrameLocator object	                Frame object

Strict Web First	 Yes, supports auto-waiting and         No, returns null if 
                     locator assertions	                    the frame isn't loaded yet

Best Used For	     Performing actions (clicks, typing)     Frame navigation, API monitoring, or lifecycle events
                     inside a frame	                  


*/



const {test} = require("@playwright/test");

test('Simple frame',async({page}) => {

 await page.goto("https://demoqa.com/frames");

const allframes = await page.frames();
console.log("No of frames", allframes.length);

page.frameLocator("#frame1']").locator("#sampleHeading");
//  await frame.click();
// await page.waitForTimeout(5000);


});


test('Another frame',async({page}) => {

 await page.goto("https://docs.oracle.com/javase/8/docs/api/");

const allframes = await page.frames();
console.log("No of frames", allframes.length);

//1st approach frame locator
// const frameobj = await page.frameLocator("//frame[@name='packageListFrame']");
// await frameobj.locator("//a[normalize-space()='java.applet']").click();
////can also be wriiten as  -> await page.frameLocator("//frame[@name='packageListFrame']").locator("//a[normalize-space()='java.applet']").click();

//2nd approach  using name and url

//using name
// const frameobj2 = await page.frame('packageListFrame');
// await frameobj2.click("//a[normalize-space()='java.applet']");

// or using url
const frameobj3 = await page.frame({url:'https://docs.oracle.com/javase/8/docs/api/overview-frame.html'});
await frameobj3.locator("//a[normalize-space()='java.applet']").click()


////can also be wriiten as  -> await page.frameLocator("//frame[@name='packageListFrame']").locator("//a[normalize-space()='java.applet']").click();
 await page.waitForTimeout(5000);


});