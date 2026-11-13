/*
In Playwright, tags are labels you can assign to tests or groups of tests to categorize them based on characteristics or functionality.

By using tags, you can run specific tests based on your needs, such as focusing on only smoke tests or isolating a group of flaky tests for
 further investigation. Tags improve the management of large test suites, allowing for more efficient test execution and reporting.

 The main benefit is the ability to filter and group tests for focused execution. This makes your test suites more flexible and efficient. Tags help in the following ways:

Organizing tests: Tags allow you to group related tests, making it easier to find and manage them.
Selective test execution: You can run specific groups of tests based on the tags, which is particularly useful in CI/CD pipelines or for focused debugging.
Reducing test execution time: By running only a subset of tests based on tags, you can significantly reduce the time spent on testing, especially when dealing with large test suites.
Enhanced collaboration: Tags help teams align on test priorities and categories, improving collaboration in multi-team environments.

Benefits of using tags in Playwright:
-----------------------------------------

1.Organize tests: Group tests by category (e.g., @smoke, @regression).
2.Speed up execution: Run only relevant tests based on tags.
3.Enhance CI/CD: Automate tag-based execution for faster builds.
4.Target flaky tests: Isolate and debug unstable tests.
Scale efficiently: Run tests in parallel with tags for better performance.
6.Improve reporting: Filter and generate focused test reports.
7.Boost collaboration: Standardize tags for team alignment.


There are two main ways to tag your tests: 
1.using the Metadata Object Syntax (preferred for modern Playwright versions) or
2. using the Title String Syntax

1.using the Metadata Object Syntax 
-------------------------------------

This approach keeps your test titles clean and stores tags natively inside a configuration object. 
You can supply a single tag or an array of tags
{ tag: '@smoke' }
{ tag: ['@regression', '@critical'] }

import { test, expect } from '@playwright/test';

// Single tag
test('user can log in', { tag: '@smoke' }, async ({ page }) => {
  // Test code here
});

// Multiple tags
test('submit payment transaction', { tag: ['@regression', '@critical'] }, async ({ page }) => {
  // Test code here
});

// Tagging an entire describe group (all tests inside inherit the tag)
test.describe('admin dashboard features', { tag: '@admin' }, () => {
  test('render analytics panel', async ({ page }) => {
    // Inherits @admin
  });
});

2.using the Title String Syntax
-----------------------------------
Every tag must start with the @ symbol

import { test, expect } from '@playwright/test';

test('user can log out @smoke', async ({ page }) => {
  // Playwright parses "@smoke" out as a single tag
});

test('generate monthly financial invoice @slow @regression', async ({ page }) => {
  // Multiple tags in the title
});

commands:
-----------
Playwright allows you to filter tests by using the –grep option in the command line interface

npx playwright test -–grep '@smoke' //o run only smoke tests
npx playwright test -–grep @regression –grep‑invert '@smoke' //You can also exclude certain tags by using –grep‑invert to run all tests except those with the given tag:


Configuring Tags in playwright.config.ts
------------------------------------------

If you want a certain tag strategy to execute by default without typing it into the command line every time, you can configure the grep property in your Playwright Configuration File:
typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Run all tests except those tagged with @slow by default
  grepInvert: /@slow/, 
  
  projects: [
    {
      name: 'chromium',
      // You can also restrict specific projects to specific tags
      grep: /@smoke/, 
    },
  ],
});


Running Tagged Tests via CLI
--------------------------------

Playwright utilizes the --grep (or -g) flag to match tag patterns using basic strings or regular expressions.

Intent	                             Command
Run a specific tag	                npx playwright test --grep @smoke
Run tests with EITHER tag	        npx playwright test --grep "@smoke|@regression"
Run tests containing BOTH tags  	npx playwright test --grep "(?=.*@smoke)(?=.*@fast)"
Exclude a specific tag	            npx playwright test --grep-invert @slow

*/