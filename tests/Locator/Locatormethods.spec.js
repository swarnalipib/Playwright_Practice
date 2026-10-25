//LOcators -When building automation tests, one of the most crucial steps is identifying web elements buttons, fields, and links to interact with. This process is called locating, and the expressions used are locators.
//A locator tells Playwright which element to interact with.
//A locator in Playwright is an object that represents a specific element (or group of elements) on a webpage, allowing you to perform actions such as click, type, or assert.

/*
How Locators Work in Playwright
Playwright doesn’t immediately query the DOM when you define a locator. Instead, it resolves only when an action is performed.

This lazy evaluation provides key advantages:

Faster execution - fewer DOM lookups

Stability - automatic retries for delayed elements

Synchronization - handles dynamic content gracefully

Playwright’s auto-wait mechanism ensures elements are:

Present in the DOM

Visible and ready for interaction

Free from transitions or animations

//Types of Locators in Playwright

1.Generic locator - CSS,Xpath locators
2.Build-in locators
3.Data and state extraction locator methods
4.Chaining locators
5.Locator Combinations -and,or
6.Indexing locators
7.Locator Actions
8.Locator Assertions
9.Locators in Frames and Shadow DOM

1.Generic locator - CSS,Xpath locators
-------------------------------------------

Playwright's generic locator method is page.locator(), which allows you to find elements using CSS selectors or XPath expressions

// Using a CSS selector
const button = page.locator('button.submit-btn');

// Using an XPath selector
const input = page.locator('//input[@name="email"]');

2.Build-in locators
----------------------------
1.page.getByRole() to locate by explicit and implicit accessibility attributes.

await page.getByRole('button', { name: 'Sign in' }).click();

await expect(page.getByText('Welcome, John!')).toBeVisible();

2.page.getByText() to locate by text content.

await expect(page.getByText('Welcome, John!')).toBeVisible();

3.page.getByLabel() to locate a form control by associated label's text.

await page.getByLabel('User Name').fill('John');

await page.getByLabel('Password').fill('secret-password');

4.page.getByPlaceholder() to locate an input by placeholder.
await page.getByPlaceholder('name@example.com').fill('playwright@microsoft.com');

5.page.getByAltText() to locate an element, usually image, by its text alternative.

await page.getByAltText('playwright logo').click();

6.page.getByTitle() to locate an element by its title attribute.
await expect(page.getByTitle('Issues count')).toHaveText('25 issues');

7.page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
await page.getByTestId('directions').click();


3.Data and state extraction locator methods
-----------------------------------------------

Method	Purpose	Example
1.textContent()-	Gets all text content, including hidden text	
  await locator.textContent()
2.innerText()-	Gets rendered, visible text
  await locator.innerText()
3.inputValue()	Gets the current value of an input	
  await locator.inputValue()
4.getAttribute()	Gets an HTML attribute	
  await locator.getAttribute('href')
5.getAttribute('value')	Gets the value attribute	
  await locator.getAttribute('value')
6.allTextContents()	Gets text from all matched elements	
  await locator.allTextContents()
7.allInnerTexts()	Gets visible text from all matched elements	
  await locator.allInnerTexts()
8.count()	Returns the number of matched elements	
  await locator.count()

4.Methods to check element state
These methods return Boolean values (true or false).

Method	        What it checks
isVisible()  	Is the element visible?
isHidden()	    Is the element hidden or detached?
isEnabled()   	Can the element be interacted with?
isDisabled()	Is the element disabled?
isChecked()	    Is a checkbox or radio button checked?
isEditable()	Can the element be edited?

5.LOcators methods used for action
Method           Purpose
click()	         Click an element
fill()	         Enter text into an input
clear()	         Clear an input
check()	         Check a checkbox
uncheck()	     Uncheck a checkbox
selectOption()	 Select a dropdown option
hover()	         Hover over an element
focus()	         Focus an element
press()        	 Press a keyboard key

6.Locator assertions
// locator assertions require the await keyword because they asynchronously verify live web elements
//"Web-First Assertions" that automatically poll and retry the DOM until a specific condition is met or a timeout expires. 
// By default, Playwright will wait up to 5 seconds for locator assertions to pass, which drastically eliminates test flakiness caused by slow API calls or late hydration


Matcher	                                                  Description
await expect(locator).toBeVisible()	                    Validates the element is present and visible to the user.
await expect(locator).toBeHidden()	                    Validates the element is either detached or hidden from the page.
await expect(locator).toBeEnabled()                     Confirms form controls (buttons, inputs) are clickable/active.
await expect(locator).toBeChecked()	                    Checks if checkboxes or radio buttons are toggled on.
await expect(locator).toHaveText('text')	            Verifies the element text exactly matches a string or Regex.
await expect(locator).toContainText('sub')              Verifies the element text contains a specific substring.
await expect(locator).toHaveValue('value')	            Confirms form inputs have the specified textual value.
await expect(locator).toHaveAttribute('name', 'val')	Checks if a DOM attribute is present and matches the value.
await expect(locator).toHaveCount(number)	            Validates the precise number of elements returned by a list.

//7.Locator Combinations -and,or

1.locator.and(): Matches an element that satisfies both locator conditions simultaneously.
const button = page.getByRole('button').and(page.getByTitle('Subscribe'));
2.locator.or(): Matches an element if either locator condition is met (useful for handling non-deterministic UI flows or fallback elements)
const button = page.getByRole('button').and(page.getByTitle('Subscribe'));


//8.Chaining Locators (.locator())
-Parent-to-Child Chaining: Scope a search by calling a locator on top of an existing locator to look inside a specific container or parent DOM node.
Examples:
const submitBtn = page.locator('app-form').getByRole('button', { name: 'Submit' });

await page.locator('form#signup').locator('button[type="submit"]').click();

await page.getByRole('form').locator('input[type="email"]').fill('user@example.com');

-chaining with filter 
const rowLocator = page.getByRole('listitem');
await rowLocator
    .filter({ hasText: 'Mary' })
    .filter({ has: page.getByRole('button', { name: 'Say goodbye' }) })
    .screenshot({ path: 'screenshot.png' });

//9.Filtering Locators
.filter(): Narrows down an existing locator by looking for matching child text or structural descendants.

• hasText / hasNotText: Narrow down a list of elements based on visible text content.javascript
const item = page.getByRole('listitem').filter({ hasText: 'Buy milk' });

• has / hasNot: Filter parent elements based on whether they contain a specific child or descendant locator.javascript
const cardWithButton = page.locator('.card').filter({ has: page.getByRole('button')

• hasNoText- Find list items that do NOT contain the text "Blocked"
const items = page.getByRole('listitem').filter({ hasNotText: 'Blocked' });

• hasNot Find cards that do NOT contain a "disabled" class or specific button inside them
const activeCards = page.locator('.card').filter({ 
  hasNot: page.locator('.disabled-badge') 
});


10.Indexing locators 

• .nth(index): Selects a specific element from a matching list by its zero-based position (e.g., page.locator('input[type="checkbox"]').nth(2) selects the third checkbox).
• .first(): A shortcut equivalent to .nth(0) that picks the first matching element.
• .last(): A shortcut that picks the final matching element in the collection

Example
// Select the first matching button
await page.locator('button').nth(0).click();

// Select the third matching button
await page.locator('button').nth(2).click();

// Select the first matching button
await page.locator('button').first().click();

// Select the last matching button
await page.locator('button').last().click();

11.Not locator
If you want to verify that a specific element does not exist or is hidden on the webpage, use Playwright's expect assertions combined with .not

// Alternative: explicitly assert it is not visible
await expect(page.locator('.error-message')).not.toBeVisible();

// Assert an element is attached to the DOM but not visible
await expect(page.locator('#secret-menu')).not.toBeAttached();

12.Custom message locator 

await expect(locator, 'Your custom failure message here').toBeVisible();

const submitButton = page.getByRole('button', { name: 'Submit' });

// Add a custom message that appears in the report if the assertion fails
await expect(
  submitButton, 
  'The submit button should be visible after filling the form'
).toBeVisible();

*/

