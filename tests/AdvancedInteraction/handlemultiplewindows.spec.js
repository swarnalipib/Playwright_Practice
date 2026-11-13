const { test, expect } = require('@playwright/test');

//Handling Windows opened at the Browser Context Level

test('count pages', async ({ context }) => {
  // 1. Open the first tab manually since we didn't inject the default 'page' fixture
  const tabOne = await context.newPage();
  await tabOne.goto('https://demoqa.com/');

  // 2. Open a second tab
  const tabTwo = await context.newPage();
  await tabTwo.goto('https://demoqa.com');

  // 3. Open a third tab (where the select menu actually lives)
  const tabThree = await context.newPage();
  await tabThree.goto('https://demoqa.com/select-menu');

  // Fetch all open windows/tabs in this context
  const allPages = context.pages();
  console.log(`Total active windows: ${allPages.length}`); // Properly outputs 3

  // Loop through tabs dynamically and print titles safely
  for (const p of allPages) {
    // Wait for the load state to ensure the title is readable
    await p.waitForLoadState('domcontentloaded');
    console.log(`Window title: ${await p.title()}`);
  }

  // Focus and interact with the third window (index 2) where the dropdown exists
  await allPages[2].bringToFront();
  
  // Interact with the element now that we are on the correct page
  const selectMenu = allPages[2].locator('#oldSelectMenu');
  await selectMenu.waitFor({ state: 'visible' });
  await selectMenu.click();
});
