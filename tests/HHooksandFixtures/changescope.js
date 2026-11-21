import { test as baseTest,Page } from '@playwright/test';

export const test = baseTest.extend({
    fixtureA :[ async({},use) =>
    {
        const a = "My name is swarna";
        console.log("fixture started")
        await use(a);
        console.log("fixture ended")
    },{scope:'test'}

    ]
});
