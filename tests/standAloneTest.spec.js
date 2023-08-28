// @ts-check
const { test, expect } = require('@playwright/test');
 
test('Stand alone test for sauce lab end to end', async ({ page }) => {
  const productTitle = "Sauce Labs Bolt T-Shirt"
  const productTitle1 = "Sauce Labs Onesie"
  await page.goto('/');
 const nameField=  page.locator("#user-name")
 const passwordField = page.locator("#password")

 expect(nameField).toBeEmpty()
 await nameField.type("standard_user")
 await passwordField.type("secret_sauce")
 expect(page.locator('[data-test="login-button"]')).toBeVisible()
 await page.locator('[data-test="login-button"]').click()

 const inventoryCount = await page.locator(".inventory_item_name").count()
 const inventoryTitle = page.locator(".inventory_item_name")

 console.log(inventoryCount)
 for(let i=0; i < inventoryCount; ++i){
  if( await inventoryTitle.nth(i).textContent()===productTitle){
    await page.locator(".inventory_item_name").nth(i).click()
    break;
  }
 }
 await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
 await page.locator('[data-test="back-to-products"]').click()

 for(let i=0; i < inventoryCount; ++i){
  if( await inventoryTitle.nth(i).textContent()===productTitle1){
    await page.locator(".inventory_item_name").nth(i).click()
    break;
  }
 }
 await page.locator('#add-to-cart-sauce-labs-onesie').click()
 await page.locator('[data-test="back-to-products"]').click()

 await page.locator(".shopping_cart_link").click()
console.log(await page.locator(".cart_item_label").nth(0).textContent())
//  expect(await page.locator(".cart_item_label").nth(0).textContent()).toBeTruthy()

await page.locator("#checkout").press("Enter")
await page.locator('[data-test="firstName"]').fill("jofn")
await page.locator('[data-test="lastName"]').fill("jofn")
await page.locator('[data-test="postalCode"]').fill("325")
await page.locator('[data-test="continue"]').click()

let item1price,item2price;
item1price =await  page.getByText('$15.99').innerText()
item2price =await  page.getByText('$7.99').innerText()

console.log(item1price)
const price1 =Number(item1price.split("$")[1])
const price2 =Number(item2price.split("$")[1])

const totalItemPrice = price1 + price2;
const totalPrice = (await page.getByText('Total: $25.90').innerText()).split("$")[1]
console.log(totalItemPrice)
console.log(totalPrice)
expect(totalItemPrice===Number(totalPrice)).toBeFalsy()
console.log(price1)

await page.locator("#finish").click()
const successMessgae = await page.locator(".complete-header").textContent()
expect(successMessgae?.includes("Thank you")).toBeTruthy()
});

// test('get started link', async ({ page }) => {
 
// });
