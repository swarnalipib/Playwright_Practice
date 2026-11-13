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

*/

//parallel ,default/fullyparrallel