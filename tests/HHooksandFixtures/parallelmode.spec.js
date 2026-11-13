import { test,expect } from '@playwright/test';

test.describe('Demoglaze site', () => {
  // Configure all tests inside this describe block to run in parallel
  //test.describe.configure({ mode: 'parallel' });
  // BEFORE ALL - Executes once
    test.beforeAll(async () => {

        console.log('============= BEFORE ALL =============');
        console.log('Test Suite Started');
      
    });

 // BEFORE EACH - Executes before every test
    test.beforeEach(async () => {

        console.log('============= BEFORE EACH =============');
        console.log('Opening Demoblaze and logging in');


       

    });

// TEST CASE 1
    test('test1:Verify homepage logo', async () => {
     console.log("homepage verified for test1");
    });

     // TEST CASE 2
    test('test2:Verify url', async () => {
     
 console.log("url verified for test2");

    });

    
     // TEST CASE 3
   test('test3:Verify category link', async () => {
      console.log("category verified for test3");

    });


        // TEST CASE 4
    test('test4:Verify contact link', async () => {
       console.log("contact verified for test4");

    });

    // TEST CASE 5
    test('test5:Verify homepage test', async () => {
       
      console.log("homepage verified for test5");

    });

    // TEST CASE 6
    test('test6:Verify product to cart', async () => {
         console.log("product in cart verified for test6");
    });
});





    // AFTER EACH - Executes after every test
    test.afterEach(async ({ page }) => {

        console.log('============= AFTER EACH =============');
        console.log('Logging out from Demoblaze');

       

    });


    // AFTER ALL - Executes once
    test.afterAll(async () => {

        console.log('============= AFTER ALL =============');
        console.log('All test cases completed');
        console.log('Test Suite Finished');

    
    });

/*

Playwright runs your 12 total test instances (6 tests × 2 browsers) by placing them in a central queue and feeding them to 3 independent worker processes as they become free.

Playwright Execution Workflow Diagram

text
                       [ TEST QUEUE: 12 Total Runs ]
            (6 Chromium Tests + 6 Firefox Tests in Parallel)
                                     │
         ┌───────────────────────────┼───────────────────────────┐
         ▼                           ▼                           ▼
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│    WORKER 0     │         │    WORKER 1     │         │    WORKER 2     │
└────────┬────────┘         └────────┬────────┘         └────────┬────────┘
         │                           │                           │
         ▼                           ▼                           ▼
   [beforeAll()]               [beforeAll()]               [beforeAll()]
         │                           │                           │
         ├─► beforeEach()            ├─► beforeEach()            ├─► beforeEach()
         ├─► Test 1 (Chrome)         ├─► Test 2 (Chrome)         ├─► Test 3 (Chrome)
         ├─► afterEach()             ├─► afterEach()             ├─► afterEach()
         │                           │                           │
         ├─► beforeEach()            ├─► beforeEach()            ├─► beforeEach()
         ├─► Test 4 (Chrome)         ├─► Test 5 (Chrome)         ├─► Test 6 (Chrome)
         ├─► afterEach()             ├─► afterEach()             ├─► afterEach()
         │                           │                           │
         ▼                           ▼                           ▼
   [afterAll()]                [afterAll()]                [afterAll()]
         │                           │                           │
         ▼                           ▼                           ▼
 (Restarts for Firefox)      (Restarts for Firefox)      (Restarts for Firefox)
         │                           │                           │
         ▼                           ▼                           ▼
   [beforeAll()]               [beforeAll()]               [beforeAll()]
         │                           │                           │
         ├─► beforeEach()            ├─► beforeEach()            ├─► beforeEach()
         ├─► Test 1 (Firefox)        ├─► Test 2 (Firefox)        ├─► Test 3 (Firefox)
         ├─► afterEach()             ├─► afterEach()             ├─► afterEach()
         │                           │                           │
         ├─► beforeEach()            ├─► beforeEach()            ├─► beforeEach()
         ├─► Test 4 (Firefox)        ├─► Test 5 (Firefox)        ├─► Test 6 (Firefox)
         ├─► afterEach()             ├─► afterEach()             ├─► afterEach()
         │                           │                           │
         ▼                           ▼                           ▼
   [afterAll()]                [afterAll()]                [afterAll()]

   */