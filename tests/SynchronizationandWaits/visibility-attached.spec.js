/*
• Attached: The element exists in the HTML document (the DOM tree or ShadowRoot).
• Visible: The element is attached and satisfies strict visual criteria (it is rendered on screen, has dimensions, is not hidden via CSS, and is in the viewport)

//Playwright’s Auto-waiting mechanism heavily relies on visibility.
Before performing a pointer action (like .click(), .fill(), or .hover()), Playwright automatically waits for the element to become visible. It will fail with a TimeoutError if the element remains only attached but never becomes visible


Criteria	          Attached (toBeAttached())        	    Visible (toBeVisible())
DOM Status	          Exists in the HTML.	                Exists in the HTML.
CSS Impact	          Evaluates true even if display: none  Evaluates false if display: none
                       or visibility: hidden.	             or visibility: hidden.
Bounding Box	      Can have a width and height of 0px.	Must have a non-empty bounding box (width and height > 0).
Viewport Requirement  Does not have to be in the viewport.	Must be inside the visible viewport.
Opacity	              Works with any opacity.              	opacity: 0 is still considered visible by Playwright.


*/



import { test, expect } from '@playwright/test';

test.use({ timeout: 120000  }); 

test('Element attached and visible',async ({ page }) => {

  await page.goto('https://www.amazon.in/');
  const searchBox = page.locator('#twotabsearchtextbox');

  await expect(searchBox).toBeAttached();
  await expect(searchBox).toBeVisible();

 const link = page.locator('.nav-cart-icon.nav-sprite');
 await expect(link).toBeAttached();
 await expect(link).toBeVisible();

});

test('Element is attached but not visible', async ({ page }) => {
  await page.goto('https://www.amazon.in/');

  // Find an element that exists in the DOM
  // but is hidden
  const element = page.locator('#nav-flyout-ya-signin');

  await expect(element).toBeAttached();
  await expect(element).toBeHidden();
  //await expect(element).toBeVisible();//error
});