/*

//Best practices for test stability:

1. Resilient Locator Strategies

Brittle DOM paths are the primary cause of high test maintenance. Prioritize user-facing, semantic locators over structural CSS or XPath selectors.
• Use getByRole() first: It acts as the gold standard because it mirrors how a user (or assistive technology) perceives the element and forces better accessibility standards.
// Do this
await page.getByRole('button', { name: 'Submit' }).click();

// Avoid this (brittle to UI styling updates)
await page.locator('.btn-primary').click();

Use code with caution.
• Leverage Form Labels and Placeholders: Utilize getByLabel() and getByPlaceholder() for input fields.
• Fall back to Dedicated Test IDs: When an element lacks semantic meaning or undergoes heavy dynamic changes, use getByTestId(). Ensure your team adds custom data-testid attributes in the application source code.

2. Native Synchronization (Eliminate Hard Waits)

Arbitrary timeouts mask underlying race conditions and slow down the suite.
• Trust Auto-Waiting: Playwright automatically checks element actionability (visible, attached, stable, enabled) before performing operations like .click() or .fill().
• Never use page.waitForTimeout(): Fixed pauses guarantee flakiness across differing machine performances. If you must wait for a state change, use web-first assertions.
• Use Web-First Assertions: Use expect(locator).toBeVisible() or expect(locator).toHaveText(). These assertions automatically retry until the condition passes or the timeout is reached.
• Synchronize Concurrent Events: When a user action triggers a network request or navigation, use Promise.all() to prevent race conditions:typescript
await Promise.all([
  page.waitForResponse(response => response.url().includes('/api/save') && response.status() === 200),
  page.getByRole('button', { name: 'Save' }).click()
]);

3. Absolute Test Isolation

Cross-test contamination is a leading source of random CI failures.
• Fresh Browser Contexts: Playwright naturally isolates tests via distinct browser contexts, which operate like incognito windows. Do not bypass this by manually reusing a single page object across multiple unrelated tests.
• Independent Data Management: Ensure each test seeds its own unique state. Avoid making Test B depend on the success or data created by Test A.
• Global Authentication State: Do not repeat UI login steps for every single test block. Authenticate once in a setup step, save the state to a file via storageState, and load it globally in your Playwright Configuration.

4. Resilient Network & Data Control

• Mock Third-Party Dependencies: If your application relies on external payment gateways, analytics, or third-party APIs, utilize page.route() to mock these network boundaries. This isolates your frontend tests from environment outages outside of your control.
• Seed via API, Validate via UI: Instead of using the slow and error-prone UI to create prerequisites (e.g., creating a new user account just to test an account settings page), perform these actions directly via backend API requests before running the test steps.

5. Code Quality & Linting

• Prevent Missing Awaits: Missing an await before a Playwright action allows the code runner to execute the next step prematurely, triggering confusing timing errors. Enforce TypeScript and use the no-floating-promises lint rule in ESLint to block un-awaited promises at the pre-commit stage.
• Omit Conditional Logic: Avoid adding if/else branching or try/catch logic inside your tests. Tests should follow strict, deterministic, predictable user paths.

6. Production CI Engineering

• Rely on Trace Viewer: Do not guess why a test failed locally or on a remote runner. Configure your pipeline to capture traces on the first failure retry (trace: 'on-first-retry'). The Playwright Trace Viewer gives a full timeline, network logs, and DOM snapshots exactly at the millisecond of the crash.
• Utilize Sharding over High Worker Counts: Instead of spinning up massive local thread counts that risk CPU throttling on single CI runners, scale by using Playwright's native sharding (--shard=1/3) to distribute tests smoothly across separate distributed machines

7.Use chaining and filtering
Locators can be chained to narrow down the search to a particular part of the page.

const product = page.getByRole('listitem').filter({ hasText: 'Product 2' });

8.Use codegen to generate locators
9.Don't use manual assertions that are not awaiting the expect. In the code below the await is inside the expect rather than before it. When using assertions such as isVisible() the test won't wait a single second, it will just check the locator is there and return immediately.

// expect(await page.getByText('welcome').isVisible()).toBe(true);

Use web first assertions such as toBeVisible() instead.

// await expect(page.getByText('welcome')).toBeVisible();

10.Keep your Playwright dependency up to date
11.Productivity tips-Use Soft assertions
If your test fails, Playwright will give you an error message showing what part of the test failed which you can see either in VS Code, the terminal, the HTML report, or the trace viewer. However, you can also use soft assertions. These do not immediately terminate the test execution, but rather compile and display a list of failed assertions once the test ended.



*/