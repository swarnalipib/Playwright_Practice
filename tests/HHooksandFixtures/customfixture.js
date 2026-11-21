/*
//to create your own fixture use test.extend () to create a new test object that will include it
custom created fixture can be used with POM and over before/after hooks.

types of fixture 
1.text fixture -text fixture gets requested by test and gets rerun per test
2.worker fixture -- worker fixture only runs once per worker

*/

import { test as baseTest } from '@playwright/test';

//Single fixture

// export const test = baseTest.extend({

//     fixtureA: async ({},use) => {

//    const a = "I am fixtureA";
//    console.log("Before part of text fixtureA");
//    await use(a);
//    console.log("After part of text fixtureA");

//     }

// });

//Multiple fixture and  worker fixture


export const test = baseTest.extend({

    fixtureA: async ({},use) => {

   const a = "I am fixtureA";
   console.log("Before part of text fixtureA");
   await use(a);
   console.log("After part of text fixtureA");

    },
     fixtureB: async ({},use) => {

   const b = "I am fixtureB";
   console.log("Before part of text fixtureB");
   await use(b);
   console.log("After part of text fixtureB");

    },
 workerfixtureone: [async({},use) =>{

   console.log("Before part of text fixturew");
   await use("");
   console.log("After part of text fixturew");

    },{scope:"worker"}]


});