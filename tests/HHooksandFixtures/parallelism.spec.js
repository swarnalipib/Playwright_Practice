// hooks behaviour in parallel execution in playwright

/*

In Playwright, understanding hook behavior during parallel execution depends entirely on how your tests are distributed across worker processes. Because parallel tests run in separate, isolated worker processes, they cannot share in-memory state or global variables.


1. beforeAll and afterAll Hooks
------------------------------------

The most common point of confusion is that beforeAll and afterAll do not run exactly once per test suite if parallel execution is enabled. Instead, they run once per worker process.
• File-level Parallelism (Default): If Playwright assigns an entire file to a single worker, beforeAll runs once before any tests in that file start, and afterAll runs once after they finish.
• Fully Parallel Mode (fullyParallel: true): If tests within the same file are split across multiple workers, every worker executes the beforeAll and afterAll hooks independently for itself. If you have 5 tests in a file running across 5 separate workers, your beforeAll will run 5 times.

2. beforeEach and afterEach Hooks
--------------------------------------

These hooks remain unaffected by the parallelism model. They always execute immediately before and after every individual test case, inside the specific worker process assigned to that test.

Behavior Matrix by Configuration


Configuration Mode	                               Hook Behavior	                                   Use Case / Consequence
Default Mode 
(Files in parallel, tests inside files sequential)	beforeAll runs once per file                    	Safe for heavy setup tasks
                                                    (since one worker handles the whole file).          (like seeding data or logging in) that apply to the whole file.
Fully Parallel Mode 
(Tests inside the same file run in parallel)	beforeAll runs once per worker. If 3 workers 
                                                pick up tests from File A, beforeAll runs 3 times.	     If beforeAll contains a heavy, time-consuming operation, fully parallel execution might actually slow down your suite.



Limit workers
-------------
You can control the maximum number of parallel worker processes via command line or in the configuration file.

From the command line:

npx playwright test --workers 4

Disable parallelism
---------------------------
You can disable any parallelism by allowing just a single worker at any time. Either set workers: 1 option in the configuration file or pass --workers=1 to the command line.

npx playwright test --workers=1


Parallelize tests in a single file
By default, tests in a single file are run in order. If you have many independent tests in a single file, you might want to run them in parallel with test.describe.configure().

Note that parallel tests are executed in separate worker processes and cannot share any state or global variables. Each test executes all relevant hooks just for itself, including beforeAll and afterAll.

import { test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('runs in parallel 1', async ({ page }) => { ...  });
test('runs in parallel 2', async ({ page }) => {  ...  });

Alternatively, you can opt-in all tests into this fully-parallel mode in the configuration file:

playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  fullyParallel: true,
});

You can also opt in for fully-parallel mode for just a few projects:

playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // runs all tests in all files of a specific project in parallel
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      fullyParallel: true,
    },
  ]
});


Serial mode
----------------
You can annotate inter-dependent tests as serial. If one of the serial tests fails, all subsequent tests are skipped. All tests in a group are retried together.

note
Using serial is not recommended. It is usually better to make your tests isolated, so they can be run independently.

import { test, type Page } from '@playwright/test';

// Annotate entire file as serial.
test.describe.configure({ mode: 'serial' });



Opt out of fully parallel mode
--------------------------------------
If your configuration applies parallel mode to all tests using testConfig.fullyParallel, you might still want to run some tests with default settings. You can override the mode per describe:

test.describe('runs in parallel with other describes', () => {
  test.describe.configure({ mode: 'default' });
  test('in order 1', async ({ page }) => {});
  test('in order 2', async ({ page }) => {});
});


Keep tests independent
Above all, keep your tests isolated from one another. A test that leaks state through a module-level variable or depends on another test's side effects works when tests run in order, but breaks the moment they run in parallel or in a different order. Set up everything a test needs in that test or in a fixture, and never rely on another test having run first.

Avoiding shared state in parallel tests
Playwright runs tests in separate worker processes, each with its own isolated BrowserContext, so cookies, storage and in-memory globals are already isolated. Flakiness comes from state that lives outside a single test. Here are recipes for the common cases.

Give each test its own backend data
Two tests that create or edit the same record race with each other. Derive a unique identifier from testInfo.testId so parallel tests never collide:

• In a CI (Continuous Integration) environment (process.env.CI is truthy):
	• It sets workers: 1.
	• Tests run sequentially (one file or test after another) rather than in parallel. This helps prevent resource exhaustion, flakiness, or database/port conflicts on shared or constrained CI runners.
• Locally / Outside CI (process.env.CI is falsy or undefined):
	• It sets workers: 3.
	• Up to 3 test files or tasks run in parallel simultaneously on your local machine, speeding up feedback during development



//parallel ,default/fullyparrallel

/* In Playwright, default mode runs test files in parallel while executing tests inside a single file sequentially, whereas parallel mode runs every individual test simultaneously across multiple workers.

Key Differences: Default vs. Parallel Mode

    
Feature	                     Default Mode (mode: 'default')	                        Parallel Mode (mode: 'parallel' / fullyParallel: true)
File Execution	            Multiple test files run simultaneously.	               Multiple test files run simultaneously.
In-File Test Execution	    Tests run one after another in order.	                 Individual tests run at the same time.
Worker Allocation	          One worker process handles an entire file.	           Tests are distributed across all available workers.
beforeAll / afterAll Hooks	Runs once per worker for that file.	                   Runs once in every worker that picks up a test from that file.
Best Use Case	              Tests that share a setup or logically flow together.	 Completely independent tests where maximum speed is needed.
*/

//1.Default Mode Example (default.spec.js):
//In this example, Worker 1 runs Test 1, finishes it, and then runs Test 2. If Test 1 fails, Test 2 still runs independently.

const { test, expect } = require('@playwright/test');

// Explicitly sets default mode (useful to override global fullyParallel: true)
test.describe.configure({ mode: 'default' });

test('Test 1 - Runs first', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});

test('Test 2 - Runs second in the same worker', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page.locator('h1')).toBeVisible();
});

/*
//2.Parallel Mode Example (parallel.spec.js):
//In this example, Worker 1 picks up Test A and Worker 2 picks up Test B at the exact same time.
//By default, Playwright runs different test files in parallel, while tests inside a single file run sequentially. 
To force tests inside a single file to run in parallel, use test.describe.configure({ mode: 'parallel' })

const { test, expect } = require('@playwright/test');

// Forces all tests in this block/file to run simultaneously across workers
test.describe.configure({ mode: 'parallel' });

test('Test A - Runs in Worker 1', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle(/Example/);
});

test('Test B - Runs simultaneously in Worker 2', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page.locator('h1')).toBeVisible();
});

/*

3.Configuring Globally in playwright.config.js
------------------------------------------------

Instead of configuring individual files, you can set the behavior for your entire test suite in playwright.config.js.
// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  // true = Parallel mode for all tests in all files
  // false = Default mode (files run in parallel, tests inside files run in order)
  fullyParallel: true,

  // Optional: Limit the maximum number of parallel worker processes
  workers: 4, 
});

Important 
• Heavy beforeAll hooks: In parallel mode, if 4 workers pick up 4 tests from the same file, your beforeAll hook will execute 4 separate times. If your beforeAll performs slow database seeding or API logins, default mode can actually finish faster

//3.serial mode :When tests depend on each other (e.g., step 2 requires the login or data created in step 1), 
 you lock them into serial mode using test.describe.configure({ mode: 'serial' }):

// If you have tests inside a file that strictly depend on each other (where Test 2 must be skipped if Test 1 fails), 
 use test.describe.configure({ mode: 'serial' }) instead of default



import { test, expect } from '@playwright/test';

// Force tests in this block to run strictly in order on a single worker
test.describe('User Checkout Flow', () => {
  test.describe.configure({ mode: 'serial' });

  test('1. login to account', async ({ page }) => {
    await page.goto('https://example.com');
    // perform login
  });

  test('2. add item to cart', async ({ page }) => {
    // relies on the session from test 1
    await page.click('#add-to-cart');
  });

  test('3. complete payment', async ({ page }) => {
    // relies on cart state from test 2
    await page.click('#checkout');
  });
});
*/