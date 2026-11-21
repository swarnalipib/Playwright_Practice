import { test } from './customfixture';

test("demonstrating fixtureA",async ({workerfixtureone,fixtureA}) =>
{
    console.log(fixtureA);

});

test("demonstrating fixtureB",async ({workerfixtureone,fixtureB}) =>
{
    console.log(fixtureB);
});