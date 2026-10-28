/*

Playwright assertions are verification checkpoints written with the expect() API to check if actual web application behavior matches your expected conditions.


1. Locator Assertions (Auto-Retrying)

These assertions expect a locator object and must be awaited.

Assertion	                                      Description
await expect(locator).toBeAttached()	       Element is attached to the DOM.
await expect(locator).toBeChecked()	           Checkbox or radio button is checked.
await expect(locator).toBeDisabled()	       Element is disabled.
await expect(locator).toBeEditable()	       Element is editable.
await expect(locator).toBeEmpty()	           Container or input field is empty.
await expect(locator).toBeEnabled()	           Element is enabled.
await expect(locator).toBeFocused()	           Element has focus.
await expect(locator).toBeHidden()             Element is either hidden or non-existent in DOM.
await expect(locator).toBeInViewport()	       Element intersects the visible viewport.
await expect(locator).toBeVisible()	           Element is visible on the page.
await expect(locator).toContainText()	       Element text contains a substring.
await expect(locator).toContainClass()	       Element contains specified CSS class names.
await expect(locator).toHaveAttribute()	       Element has a specific DOM attribute and value.
await expect(locator).toHaveClass()	           Element matches the exact class string or RegExp.
await expect(locator).toHaveCount()	           List contains the exact number of matching elements.
await expect(locator).toHaveCSS()	           Element matches a specific CSS property value.
await expect(locator).toHaveId()	           Element has a specific DOM ID.
await expect(locator).toHaveJSProperty()	   Element has a specific JavaScript object property.
await expect(locator).toHaveRole()	           Element has a specific ARIA role.
await expect(locator).toHaveText()	           Element matches text exactly.
await expect(locator).toHaveValue()	           Input element has a specific value.
await expect(locator).toHaveValues()       	   <select> element has specified options multi-selected.
await expect(locator).toMatchAriaSnapshot()	   Validates the element structure against an ARIA snapshot.


2. Page Assertions (Auto-Retrying)

Used to validate high-level page states like URLs and titles.
• await expect(page).toHaveTitle(expected)  — Page text matches a string or regular expression.
• await expect(page).toHaveURL(expected)    — Current URL matches a string or regular expression.
• await expect(page).toHaveScreenshot()     — Validates visual appearance against stored baseline screenshots.

3. API Response & Generic Assertions (Non-Retrying)

These run a single time without waiting. They are used for primitive values, data types, and API responses.
• expect(response).toBeOK() —     Validates an API status code is between 200 and 299.
• expect(value).toBe(expected) —  Strict equality checking (===).
• expect(value).toEqual(expected) — Deep equality checking (objects/arrays).
• expect(value).toBeTruthy() / expect(value).toBeFalsy() — Checks truthiness/falsiness.
• expect(value).toContain(expected) — Checks if an array or string contains an item



1. Web-First Assertions (Auto-Retrying)

These are the most critical assertions for web automation. They accept a Locator or a Page object, auto-retry for up to 5 seconds (by default) to combat UI lag and flakiness, and require the await keyword.

Page Matchers

• await expect(page).toHaveTitle('Home Page') – Validates the window title.
• await expect(page).toHaveURL(/.*dashboard/) – Validates the current URL (supports string or RegEx).

Element State Matchers

• await expect(locator).toBeVisible() – Checks if an element is rendered and visible.
• await expect(locator).toBeHidden() – Confirms an element is either not in the DOM or invisible.
• await expect(locator).toBeEnabled() – Checks if a button or input is clickable.
• await expect(locator).toBeDisabled() – Verifies the element has a disabled attribute.
• await expect(locator).toBeEditable() – Confirms an input is editable.
• await expect(locator).toBeEmpty() – Asserts that a container or input field has no content.
• await expect(locator).toBeChecked() – Verifies if a checkbox or radio button is selected.

Content and Attribute Matchers

• await expect(locator).toHaveText('Welcome') – Checks for an exact text match (ignoring whitespace).
• await expect(locator).toContainText('Welcome') – Checks if the element contains a substring.
• await expect(locator).toHaveValue('John Doe') – Checks the current input value of a form field.
• await expect(locator).toHaveAttribute('href', '/login') – Verifies an HTML attribute value.
• await expect(locator).toHaveClass('active btn') – Checks the CSS class string.
• await expect(locator).toHaveCount(3) – Validates the exact number of elements returned by a locator.

2. Generic Assertions (Immediate)

Generic assertions evaluate standard JavaScript variables, strings, objects, or numbers immediately without waiting or retrying. They do not use await.
• expect(value).toBe(true) – Strict equality (===).
• expect(object).toEqual({ id: 1 }) – Deep equality check for objects/arrays.
• expect(value).toBeTruthy() / expect(value).toBeFalsy() – Evaluates boolean values.
• expect(string).toContain('substring') – Checks string contents.
• expect(array).toContain(item) – Verifies an item exists inside an array.
• expect(value).toBeNull() – Explicitly checks for null.

3. Assertion Modifiers and Options


Negation (.not)

You can chain .not before any matcher to assert the opposite condition.
typescript
await expect(page.locator('.error-banner')).not.toBeVisible();
Use code with caution.

Custom Timeouts and Error Messages

You can pass custom timeouts per assertion or provide clear custom error messages for better reporting failure context.
typescript
// Custom timeout (in milliseconds)
await expect(page.locator('.loading-spinner')).toBeHidden({ timeout: 10000 });

// Custom error message
expect(status, 'The server response code was invalid').toBe(200);














*/