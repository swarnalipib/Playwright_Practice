//Codegen in Playwright is a built-in CLI tool that automatically generates test scripts by recording your interactions with a browser
//When running the codegen command two windows will be opened,Codegen opens a browser window for interaction and the Playwright Inspector for recording, copying, and managing your generated tests.
//command -npx playwright codegen 
//npx playwright codegen https://opensource-demo.orangehrmlive.com/web/index.php/auth/login -o ./tests/second.spec.js ->with targeted destination it can copy and create a new target destination and paste the recordings


/*Functionality: 

1.Interactive Test Recording - As you click links, fill out forms, check checkboxes, or navigate pages, Codegen tracks your behavior and logs the actions 
2. Visual Assertions
By clicking an assertion icon and hovering over a UI component, you can instantly inject validation blocks verifying:
• Element visibility
• Exact or partial text matching
• Form inputs or element values

3. "Pick Locator" Playground 
If you are writing tests manually but struggling to isolate a specific web element, you can pause recording and use the Pick Locator tool

4.
Environment and Device Emulation

Codegen lets you mock specific user environments directly from the terminal flags, making it easier to script responsive behaviors:
• Device Profiles: Simulate specific smartphones or tablets (e.g., --device="iPhone 14").
• Screen Layouts: Force custom viewports (e.g., --viewport-size=800,600).
• Localization: Mock distinct --timezone, --geolocation, and language properties.

5.Cross-Language Output

While Playwright defaults to JavaScript/TypeScript, the Inspector dropdown allows you to instantly convert the live-recorded script into Python, Java, or C# (.NET) syntax

Codegen can capture cookies and local storage states:
• Save State: --save-storage=auth.json saves your logged-in session locally.
 npx playwright codegen --save-storage=auth.json https://opensource-demo.orangehrmlive.com/web/index.php/auth/login -o ./tests/codegen.spec.js

 Playwright automatically exports your cookies, local storage, and session data into auth.json

• Load State: --load-storage=auth.json opens the generated browser already logged in, letting you record deep page states immediately.
npx playwright codegen --load-storage=auth.json  https://opensource-demo.orangehrmlive.com/web/index.php/auth/login     

• Playwright launches a new browser instance that already injects the cookies and local storage saved in auth.json.
• Action: The browser opens straight to your app in an already-logged-in state, letting you immediately record tests for deep-page flows without repeating the manual login process

*/



import { test, expect } from '@playwright/test';

test ('test', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await page.locator('div').filter({ hasText: /^Username$/ }).nth(2).click();
  await page.getByRole('textbox', { name: 'Username' }).click();
  await page.getByRole('textbox', { name: 'Username' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Leave' }).click();
});