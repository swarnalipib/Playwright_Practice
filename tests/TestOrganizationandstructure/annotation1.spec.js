import { test, expect } from '@playwright/test';
// test.only('Test1', async () => {
//     console.log("This is test1");

// });

test.skip('Test2', async () => {
    console.log("This is test2");

});
    //or

test('Test3', async ({browserName}) => {
            
    console.log("This is test3");
        if(browserName === 'chromium') //can be condition based
        {
          test.skip()
        }
    });

test.fixme('Test4', async () => { //it will skip the testcase
    console.log("This is test");
});
    //or 
test('Test5', async ({browserName}) => {
    //test.fixme()
            
    console.log("This is test5");
        if(browserName === 'chromium') //can be condition based
        {
          test.fixme()
        }

});
test('Test6', async () => { //it will skip the testcase
    test.fail() 
    console.log("This is test6");
    expect(1).toBe(2);//here it will pass as it expect to be failed if it will toBe(1) then it will fail and throws error 

});

//In playwright config ,Set Timeout as 1000 as bydefault it has 30000 sec and then run it headed mode it gets slow and throws timeout error 
test('Test7', async ({page}) => { 
    test.slow() //it will increase the time limit 3 times of timeout set

    //test.setTimeout(5000); //This can also be used to increase the time 
    await page.goto('https://demoblaze.com/');
      console.log("This is test7");

});

//difference between fixme and skip annotation

/*

 When to use test.skip()
 --------------------------

Use skip when a test shouldn't run because of environmental constraints or because it simply doesn't apply to the current context. It implies the test itself is perfectly fine, but shouldn't execute right now.
• Conditional testing: Skipping a mobile-only test when running the suite on a desktop browser.
• Feature flags: Skipping tests for a feature that is disabled in a specific environment.

// Example of conditional skipping
test('Download desktop app', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', 'Downloads not supported on WebKit mobile emulation');
  // Test code here...
});

When to use test.fixme()
---------------------------

Use fixme as an intentional "Todo" flag. It tells your team: "This test is supposed to pass, but the app has a bug or the test is broken/flaky, so we are bypassing it until someone fixes it".
• Known Bugs: Bypassing a test that crashes the test runner or causes major timeouts until the developers deploy a patch.
• Outdated Tests: Bypassing a test that failed because the UI changed, and the locators need to be updated.

// Example of marking a broken test
test.fixme('Checkout with PayPal', async ({ page }) => {
  // Bypassed because the payment gateway sandbox is currently down
});




Feature       	test.skip()	                                    test.fixme()
Execution	    Does not run the test.	                        Does not run the test.
Primary Intent	The test is irrelevant or non-applicable        The test is broken, flaky, or outdated and
                in the current environment or configuration.	requires code changes to fix.
Report Status	 Marked as Skipped.	                            Marked as Fixme (or explicitly tagged under a fixme bucket depending on the reporter).*/