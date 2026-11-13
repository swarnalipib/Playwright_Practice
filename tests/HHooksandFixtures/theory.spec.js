/*

//In Playwright, hooks are special functions that run at specific times in the test lifecycle to handle setup and teardown tasks. They help eliminate duplicate code by consolidating common operations like logging in, seeding a database, or clearing cookies.
//Hooks are lifecycle methods that execute automatically before or after tests to perform common setup and cleanup operations.
Instead of repeating setup code inside every test, you centralize common operations in lifecycle hooks.


The 4 Core Playwright Hooks

Playwright provides four main hooks, categorized by how often they run:

Hook	                 When it Runs	                                    Common Use Case
test.beforeAll()	Once per worker process before any tests start.	      Global setups like launching a database connection or starting a local server.
test.beforeEach()	Before every individual test case.                    Navigating to a base URL or authenticating a session.
test.afterEach()	After every individual test case.	                  Resetting state, clearing cookies, or taking screenshots on failure.
test.afterAll()	    Once per worker process after all tests finish.	      Closing global resources, tearing down environments, or uploading logs.




A typical execution flow looks like this:

Worker Starts

↓
BeforeAll

↓

BeforeEach

↓

Test

↓

AfterEach

↓

BeforeEach

↓

Test

↓

AfterEach

↓

AfterAll

↓

Worker Ends

---------------------------------
When to Use beforeEach()
------------------------------
Ideal scenarios include:

Logging into the application
Opening the application homepage
Resetting UI state
Creating lightweight test data
Configuring feature flags
Setting cookies
Applying network mocks

afterEach:
--------------
Typical responsibilities include:

Cleaning temporary data
Removing uploaded files
Clearing caches
Closing external connections
Collecting diagnostics
Accessing Test Information Test title-Status,Duration,Retry count,Output directory,Attachments


The beforeAll() Hook
--------------------
Examples:

Connecting to a database
Creating shared reference data
Starting a mock server
Initializing external services

When Not to Use beforeAll()
Avoid placing test-specific setup inside beforeAll().
test.beforeAll(async ({ page }) => {

    await page.goto('/dashboard');

});

The afterAll() Hook
---------------------
Common tasks include:

Closing database connections
Stopping mock servers
Deleting temporary directories
Removing shared resources
Generating summary logs


Hook Scope
---------------
Hooks apply to the scope in which they are declared.

Example:

test.describe('Admin', () => {

    test.beforeEach(async () => {

        // Admin setup

    });

    test('Create user', async () => {

    });

});
The hook only affects tests inside the describe block.

This allows different modules to maintain independent setup logic.


Nested Hooks
------------------
Playwright supports nested describe() blocks.

Execution order:

Outer beforeEach

↓

Inner beforeEach

↓

Test

↓

Inner afterEach

↓

Outer afterEach


Combining Hooks with Fixtures
----------------------------------
Hooks and fixtures serve different purposes.

Fixtures:

Provide reusable dependencies.
Manage resource lifecycles.
Promote modularity.
Hooks:

Perform lifecycle operations.
Execute setup and cleanup logic.
Coordinate test flow.
Example:

test.beforeEach(async ({ authenticatedPage }) => {

    await authenticatedPage.goto('/dashboard');

});


------

*/