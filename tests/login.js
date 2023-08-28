class LoginPage{

    constructor(page){
        this.page = page
        this.nameField=  page.locator("#user-name")
        this.passwordField = page.locator("#password")
        this.loginBtn = page.locator('[data-test="login-button"]');
    }
    async Launch(){
        await this.page.goto('/')
    }
    async email(username){
       await this.nameField.fill(username)
    }
    async password(password){
        await this.passwordField.fill(password)
     }
     async validLogin(){
        await this.loginBtn.press("Enter")
     }

} 
module.exports = {LoginPage};