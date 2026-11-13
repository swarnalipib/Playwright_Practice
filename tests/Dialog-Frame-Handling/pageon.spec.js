/*

In Playwright, page.on() is used to listen to browser events on a page.

It allows you to capture events such as:

    -Page navigation

    -Console messages

    -JavaScript errors

    -Network requests and responses

    -Page crashes

    -Dialogs (alerts, confirms, prompts)

    -Popup windows

//
    page.on(event, handler);

    event: Name of the event to listen for.

    handler: Callback function executed when the event occurs.

Common Events Handled by page.on()
----------------------------------------

Event Name          	Description	                                                                Common Use Case
'console'	     Fires when JavaScript in the page calls a console method (log, error, warn).	-Catching frontend runtime logs or warnings.
'pageerror'	     Fires when an uncaught exception happens inside the page.	                    -Detecting hidden JavaScript crashes or broken scripts.
'request'	     Fires when the page issues a network request.	                                -Logging outgoing API calls or tracking asset loading.
'response'	     Fires when a network request receives its response.	                        -Monitoring HTTP status codes (e.g., checking for 404s or 500s).
'dialog'	     Fires when a browser dialog appears (alert, accept, prompt, confirm).	        -Intercepting, reading, and dismissing native popups.
'requestfailed'	 Fires when a network request fails (e.g., due to a timeout or aborted status). -Debugging flaky endpoints or CDN failures

//Example 1: Listen to console messages

Captures messages printed using console.log(), console.error(), etc.


page.on('console', message => {
    console.log('Console message:', message.text());
});

//Example 2: Listen to page errors

Captures uncaught JavaScript exceptions on the page.
javascript

page.on('pageerror', error => {
    console.log('Page error:', error.message);
});

Useful for detecting JavaScript errors during automation testing.

//Example 3: Listen to network requests

Captures every outgoing network request.
javascript

page.on('request', request => {
    console.log('Request URL:', request.url());
    console.log('Request Method:', request.method());
});

Example output:

Request URL: https://example.com/
Request Method: GET

//Example 4: Listen to network responses

Captures responses received from the server.
javascript

page.on('response', response => {
    console.log('Response URL:', response.url());
    console.log('Status:', response.status());
});

Example output:

Response URL: https://example.com/
Status: 200

//Example 5: Listen to failed requests
-Useful for identifying network failures.
    

    page.on('requestfailed', request => {
        console.log('Failed URL:', request.url());
        console.log('Failure:', request.failure()?.errorText);
    });

//Example 6: Handle JavaScript alerts

    page.on('dialog', async dialog => {
        console.log('Dialog type:', dialog.type());
        console.log('Dialog message:', dialog.message());

        await dialog.accept();
    });

----> You can also dismiss a dialog:


    page.on('dialog', async dialog => {
        await dialog.dismiss();
    });

//Example 7: Listen to popup windows

    Captures new pages opened through links or JavaScript.

    page.on('popup', async popup => {
        await popup.waitForLoadState();

        console.log('Popup URL:', popup.url());
    });

//Example 8: Listen to page close event

    page.on('close', () => {
        console.log('Page was closed');
    });

// Example 9: Listen to page crash


    page.on('crash', () => {
        console.log('Page crashed!');
    });

    
    */

  //Playwright script demonstrating multiple page.on() events  

  const {test,expect,chromium} = require("@playwright/test");

   test('page on test', async () => {

    const browser = await chromium.launch({
        headless: false
    });

    const page = await browser.newPage();

// Console event
    page.on('console', message => {
        console.log('Console:', message.text());
    });
    // JavaScript error event
    page.on('pageerror', error => {
        console.log('Page Error:', error.message);
    });

    // Network request event
    page.on('request', request => {
        console.log('Request:', request.url());
    });

    // Network response event
    page.on('response', response => {
        console.log('Response:', response.status(), response.url());
    });

    // Failed request event
    page.on('requestfailed', request => {
        console.log('Failed:', request.url());
    });


    // Navigate to website
    await page.goto('https://amazon.in/');

    await page.waitForTimeout(3000);

    await browser.close();
});

/* Note

Difference between page.on() and page.once()
-------------------------------------------------

page.on() listens every time an event occurs.
----------

page.on('request', request => {
    console.log(request.url());
});

page.once() listens only for the first occurrence of an event.
------------

page.once('load', () => {
    console.log('Page loaded for the first time');
});

Differnece betwen page.on() and page.waitForevent()
---------------------------------------------------------

Feature     	page.on()	                                                   page.waitForEvent()
Type	        Persistent event listener                               One-time asynchronous waiter(waits for specific event)
                can listen multiple times	                            Resolves when the event occurs

Execution	    Does not block script execution;                        Returns a Promise that pauses execution until
                runs a callback every time the event fires	            the specific event occurs.

Lifecycle	    Stays active until explicitly removed via               Automatically resolves and removes itself
                page.off() or page.removeListener()	                    after the first matching event

Best Used For   Ongoing monitoring (e.g., logging all                   Synchronization (e.g., waiting for a popup, download,
                console errors or network requests)	                    or dialog before proceeding)

 */




