/*

page.getByRole() to locate by explicit and implicit accessibility attributes.
page.getByText() to locate by text content.
page.getByLabel() to locate a form control by associated label's text.
page.getByPlaceholder() to locate an input by placeholder.
page.getByAltText() to locate an element, usually image, by its text alternative.
page.getByTitle() to locate an element by its title attribute.
page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured). */


const {test,expect} = require("@playwright/test");

test ('Built-in-locators',async({page}) => {

await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

//page.getByAltText() to locate an element, usually image, by its text alternative.

const logo = await page.getByAltText('company-branding');
await expect(logo).toBeVisible();

//page.getByPlaceholder() to locate an input by placeholder.


await page.getByPlaceholder('Username').fill('Admin');
await page.getByPlaceholder('Password').fill('admin123');

//page.getByLabel() to locate a form control by associated label's text.

//await page.getByLabel('Username').fill('Admin');
//await page.getByLabel('Password').fill('admin123');

//page.getByRole() to locate by explicit and implicit accessibility attributes.

await page.getByRole( 'button',{type:'submit'} ).click();

//page.getByText() to locate by text content.

const name = await page.locator('p[class="oxd-userdropdown-name"]').textContent(); //textContent will capture/fetch the text
await expect (await page.getByText(name)).toBeVisible();

/*
//page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).
//await page.getByTestId('directions').click();
When to use testid locators
You can also use test ids when you choose to use the test id methodology or when you can't locate by role or text.

Set a custom test id attribute
By default, page.getByTestId() will locate elements based on the data-testid attribute, but you can configure it in your test config or by calling selectors.setTestIdAttribute().

Set the test id to use a custom data attribute for your tests.

playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    testIdAttribute: 'data-pw'
  }
});

In your html you can now use data-pw as your test id instead of the default data-testid.

<button data-pw="directions">Itinéraire</button>

And then locate the element as you would normally do:

await page.getByTestId('directions').click(); */


});