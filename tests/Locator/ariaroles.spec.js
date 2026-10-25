//page.getByRole() to locate by explicit and implicit accessibility attributes.
//Common roles include button, link, textbox, checkbox, radio, heading, combobox,searchbox, listitem, and row. 
// The role must match the element's explicit or implicit accessibility role
/*
await page.getByRole('button', { name: 'Login' }).click();

await page.getByRole('link', { name: 'Home' }).click();

await page.getByRole('textbox', { name: 'Email' }).fill('test@gmail.com');

await page.getByRole('Searchbox', { name: 'Home' }).click();

await page.getByRole('checkbox', { name: 'Remember me' }).check();

await page.getByRole('heading', { name: 'Dashboard' }).isVisible();

await page.getByRole('radio', { name: 'Subscribe' }).check(); */



const {test,expect} = require("@playwright/test");

test ('Aria roles',async({page}) => {

 await page.goto("https://www.amazon.in/");
 await expect(page).toHaveTitle("Online Shopping site in India: Shop Online for Mobiles, Books, Watches, Shoes and More - Amazon.in");

  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).click();
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).fill('cream');
  await expect(page.getByRole('row', { name: 'cream pants for woman' })).toBeVisible();
  await page.getByRole('searchbox', { name: 'Search Amazon.in' }).press('Enter');
  await expect(page.getByRole('searchbox', { name: 'Search Amazon.in' })).toHaveValue('cream');
  await page.locator('#a-autoid-3').getByRole('button', { name: 'Add to cart' }).click();
  await expect(page.getByRole('group', { name: 'Quantity is' })).toBeVisible();
  await page.getByRole('link', { name: 'item in cart' }).click();
  await expect(page).toHaveURL('https://www.amazon.in/gp/cart/view.html?ref_=nav_cart');
  await page.locator('.a-icon.a-icon-checkbox').first().click();
  await page.getByRole('checkbox', { name: 'This order contains a gift' }).check();
  await expect(page.getByRole('checkbox', { name: 'This order contains a gift' })).toBeChecked();
  await page.getByRole('heading', { name: 'Connect with Us' }).click();
  await page.getByRole('dialog', { name: 'Account settings and Lists' }).click();
 await expect(page.getByRole('dialog', { name: 'Account settings and Lists' })).toBeVisible();
  await page.getByRole('dialog', { name: 'Account settings and Lists' }).getByRole('link', { name: 'Sign in' }).click();
 


 await page.getByRole('link', { name: 'Hello, sign in' }).click();
 await expect(page).toHaveTitle('Sign in');

 const textbox = page.getByRole('textbox', { name: 'email' });
 await expect(textbox).toBeVisible();

await textbox.fill('swarnaxtendis@gmail.com');
await page.getByRole('button', { name: 'Continue' }).click();


});