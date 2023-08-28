// @ts-check
const { test, expect } = require('@playwright/test');
const {LoginPage} = require("./login");
const { LandingPage } = require('./landingPage');

test("End to end test for sauce labs", async ({page})=>{
    const login = new LoginPage(page)
    const landingpage = new LandingPage(page)
    const name= "standard_user";
    const password = "secret_sauce";
 

    await login.Launch()
    await login.email(name)
    await login.password(password)
    await login.validLogin()
    await landingpage.searchProduct1()
    await landingpage.searchProduct2()
    await landingpage.verifyShoppingCart()
    await landingpage.checkout()
    await landingpage.verifyItemPrice()


})  