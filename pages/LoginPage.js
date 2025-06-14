import BasePage from "./BasePage";

export default class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.usernameField = page.locator("#username");
    this.passwordField = page.locator("#password");
    this.loginButton = page.locator("#doLogin");
  }

  async login(username, password) {
    await this.fillText(this.usernameField, username);
    await this.fillText(this.passwordField, password);
    await this.clickElement(this.loginButton);
  }
}
