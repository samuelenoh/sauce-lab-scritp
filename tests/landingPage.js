const { expect } = require('@playwright/test');
class LandingPage{
constructor(page){
    this.page = page 
    this.inventoryCount= page.locator(".inventory_item_name");
    this.inventoryTitle = page.locator(".inventory_item_name")
    this.productName = page.locator(".inventory_item_name");
    this.clickProduct1 = page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]');
    this.clickProduct2 = page.locator('#add-to-cart-sauce-labs-onesie')
    this.browserBack = page.locator('[data-test="back-to-products"]')
    this.shoppingCart =page.locator(".shopping_cart_link")
    this.product = page.locator(".cart_item_label")
    this.checkoutBtn = page.locator("#checkout")
    this.firstName = page.locator('[data-test="firstName"]')
    this.lastName = page.locator('[data-test="lastName"]')
    this.postCode = page.locator('[data-test="postalCode"]')
    this.continueBtn = page.locator('[data-test="continue"]')
    this.itemPrice1 = page.getByText('$15.99')
    this.itemPrice2 = page.getByText('$7.99')
    this.totalItemPrice = page.getByText('Total: $25.90')
    this.finishBtn = page.locator("#finish")
    this.successMessgae = page.locator(".complete-header")



}

async searchProduct1(){
    const inventoryCount = await this.inventoryCount.count()
     const productTitle = "Sauce Labs Bolt T-Shirt"
     const productTitle1 = "Sauce Labs Onesie"
 this.inventoryTitle

//  console.log(inventoryCount)
 for(let i=0; i < inventoryCount; ++i){
  if( await  this.inventoryTitle.nth(i).textContent()===productTitle){
    await this.productName.nth(i).click()
    break;
  }
 }
 await this.clickProduct1.click()
 await this.browserBack .click()
}

async searchProduct2(){
    const inventoryCount = await this.inventoryCount.count()
    const productTitle1 = "Sauce Labs Onesie"
    for(let i=0; i < inventoryCount; ++i){
        if( await  this.inventoryTitle.nth(i).textContent()===productTitle1){
          await this.productName.nth(i).click()
          break;
        }
       }
    await this.clickProduct2.click()
    await this.browserBack .click()
}
async verifyShoppingCart(){
    await this.shoppingCart .click()
    console.log(await this.product.nth(0).textContent())
}

async checkout(){
    await this.checkoutBtn.press("Enter")
    
await this.firstName.fill("jofn")
await this.lastName.fill("jofn")
await this.postCode.fill("325")
await this.continueBtn.click()
}

async verifyItemPrice(){
    let item1price,item2price;
item1price =await  this.itemPrice1.innerText()
item2price =await  this.itemPrice2.innerText()

console.log(item1price)
const price1 =Number(item1price.split("$")[1])
const price2 =Number(item2price.split("$")[1])

const totalItemPrice = price1 + price2;
const totalPrice = (await this.totalItemPrice.innerText()).split("$")[1]
console.log(totalItemPrice)
console.log(totalPrice)
expect(totalItemPrice===Number(totalPrice)).toBeFalsy()
console.log(price1)

await this.finishBtn .click()
const successMessgae = await this.successMessgae.textContent()
expect(successMessgae?.includes("Thank you")).toBeTruthy()
}


}
module.exports = {LandingPage};