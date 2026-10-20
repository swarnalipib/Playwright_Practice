const { test, expect } = require("@playwright/test");

test("Built in locators", async ({ page }) => {
  await page.goto(
    "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
  );
  await page.getByTitle("Compare").click();
});