import { test as baseTest,Page } from '@playwright/test';

export const test = baseTest.extend({

    workerDetails: [
        async ({}, use) => {

            console.log('Worker fixture started');

            const data = {
                username: 'admin',
                password: 'admin123'
            };

            await use(data);

            console.log('Worker fixture ended');

        },
        { scope: 'worker' }
    ],



workerData: [
        async ({}, use, workerInfo) => {

            console.log('Worker setup started');

            const data = {
                workerId: workerInfo.workerIndex,
                employeeId: `EMP${workerInfo.workerIndex}001`,
                username: 'Admin'
            };

            console.log('Worker ID:', data.workerId);
            console.log('Employee ID:', data.employeeId);

            await use(data);

            console.log('Worker teardown completed');

        },
        { scope: 'worker' }
    ],




    loggedinpage: [async({page},use) => {
console.log("Before part of text fixture");

   await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
   await page.fill("//input[@placeholder='Username']",'Admin');
   await page.fill("//input[@placeholder='Password']",'admin123');
   await page.click("//button[normalize-space()='Login']");
   await use(page);
console.log("After part of text fixture");


await page.click('i.oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon');
await page.getByRole('menuitem', {name:'Logout'}).click();


    },{scope:'test'}//if you don't add this it bydefault take test as scope also
]

});


/*

Property	Meaning
workerIndex	Unique index assigned to a worker
employeeId	Employee ID generated using worker index
username	Username stored in fixture


For example: when you run with 2 workers 
- Worker 0 → EMP0001
- Worker 1 → EMP1001
- Worker 2 → EMP2001
This is useful when multiple workers need different test data.
Remember: Worker-scoped does not mean one instance for the entire project. It means one instance per worker process.

This fixture has three important parts:
Code	Purpose
Before use(page)	Setup: Login
await use(page)	Passes logged-in page to test
After use(page)	Teardown: Logout

Important: Since you haven't specified a scope, loggedinpage is test-scoped by default.

That means:
- Every test gets a fresh page.
- Login happens before every test.
- Logout happens after every test.

Understand execution flow
Suppose you execute two tests using one worker.
Execution lifecycle
Worker starts

workerDetails initialized

workerData initialized


Test 1 starts
- Create fresh page
- Login to OrangeHRM
- Execute Test 1
- Logout
- Destroy test-scoped page


Test 2 starts
- Create another fresh page
- Login to OrangeHRM
- Execute Test 2
- Logout
- Destroy test-scoped page


Worker shuts down

workerDetails teardown

workerData teardown


The worker-scoped fixtures are initialized only when requested. Their relative setup order should not be relied upon when they are independent fixtures.


*/