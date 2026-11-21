/*
A fixture’s scope controls two things:

When is the fixture set up — the code before await use(...)
When is it torn down — the code after await use(...)



custom fixture :
use test.extend()

Fixture scope in Playwright
----------------------------------
Playwright supports two main fixture scopes:
1. Test scope
2. Worker scope
Feature	            Test scope	                Worker scope
Created	            Before each test	        Once per worker
Destroyed	        After each test	            After all tests in worker
Reusability      	Within one test	            Across tests in same worker
Use case	        Page, test data	            Database connection, shared setup
Default scope	    Yes	                         No


1.Test-scoped fixture 
--------------------------
-A test-scoped fixture is created separately for every test.
-its a default scope
-Created and torn down for every single test
-syntax 
myFixture: async ({}, use) => { ... }
-Best use : Mutable UI state, fresh page instances, isolated test data.

-Playwright calls your setup code before every test that requests the fixture. Once the test finishes — pass or fail — everything after await use(...) runs as teardown. The next test gets a brand-new instance.

Example:

Create a file named fixtures.js.
import { test as base, expect } from '@playwright/test';

export const test = base.extend({
    loginUser: [async ({ page }, use) => {

        console.log('Before test: Login');

        await page.goto('https://example.com');

        // Provide fixture to test
        await use(page);

        console.log('After test: Logout');
    },{ scope: 'test' }]
});

export { expect };


Test file:
import { test, expect } from './fixtures';

test('Test Case 1', async ({ loginUser }) => {
    console.log('Executing Test Case 1');
});

test('Test Case 2', async ({ loginUser }) => {
    console.log('Executing Test Case 2');
});


Execution flow:
Test 1
1. Create fixture
2. Login
3. Execute Test Case 1
4. Logout
5. Destroy fixture

Test 2
1. Create fixture again
2. Login
3. Execute Test Case 2
4. Logout
5. Destroy fixture


Important: Each test gets a fresh instance of the test-scoped fixture. 

2.worker Scope — One Instance per Worker Process
================

-A worker-scoped fixture is created once when a Playwright worker process starts, shared by every test that worker runs, and torn down only when the worker shuts down.
-playwright runs tests in parallel using multiple worker processes (controlled by --workers). A worker-scoped fixture is not shared across workers — it is shared within a single worker.
-syntax 
myFixture: [async ({}, use) => { ... }, { scope: 'worker' }]
-When to reach for worker scope(Best use)
-------------------------------
Database connection pooling. Opening and closing a DB connection per-test is often the #1 source of suite slowness.
Auth tokens / sessions. Log in via API once to get a JWT. If the token is valid for an hour, create it once per worker — not once per test.
Static seed data. Configuration tables and lookup lists that never mutate during the test run.
External SDK clients. AWS S3, Stripe, and third-party API wrappers rarely need per-test instantiation.


 workerfixtureone: [async({},use) =>{

   console.log("Before part of text fixturew");
   await use("");
   console.log("After part of text fixturew");

    },{scope:"worker"}]


    3.file Scope — One Instance per Spec File
-file scope sits between test and worker. The fixture is created when the first test in a file runs, shared by all tests in that file, and torn down after the last test in the file finishes.
-Runs once per spec file (if fullyParallel is off).
syntax : test.beforeAll / test.afterAll
-Best use :Sharing a single browser tab or setup data across sequential tests in one file.

const test = base.extend<{}, { fileServer: HttpServer }>({
  fileServer: [
    async ({}, use) => {
      const server = await startMockServer({ port: 0 });
      await use(server);
      await server.stop();
    },
    { scope: 'file' },
  ],
});

// All tests in THIS FILE share the same mock server.
// Tests in other files get their own instance.
test('GET /users returns 200', async ({ fileServer, request }) => {
  const res = await request.get(`${fileServer.url}/users`);
  expect(res.status()).toBe(200);
});
test('POST /users creates a record', async ({ fileServer, request }) => {
  const res = await request.post(`${fileServer.url}/users`, {
    data: { name: 'Bob' }
  });
  expect(res.status()).toBe(201);
});



1. What is the default scope of a fixture in Playwright?

Answer: Test scope.

Q2. What is the difference between test scope and worker scope?

Answer:
- Test scope: A new instance is created for every test.
- Worker scope: One instance is shared by tests running in the same worker.
Q3. What is use() in fixtures?

Answer: It passes the fixture value to the test. Code before await use() is setup, and code after it is teardown.

Q4. What is auto: true?

Answer: It makes a fixture execute automatically without explicitly requesting it in the test.

Q5. What is test.extend()?

Answer: It is used to create custom fixtures, configure fixtures, and override existing fixtures.

Q6. Can worker-scoped fixtures depend on test-scoped fixtures?

Answer: No. A worker-scoped fixture cannot depend on a test-scoped fixture because the worker fixture has a longer lifetime.because the worker outlives individual tests

Q7. Can test-scoped fixtures depend on worker-scoped fixtures?

Answer : Yes a test-scoped fixture can directly depend on a worker-scoped fixture in Playwright  because the worker fixture has a longer lifespan, allowing short-lived tests to safely consume shared, expensive resources without sacrificing test isolation

*/