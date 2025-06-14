
import BasePage from "./BasePage";

export default class HomePage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.adminTagButton = page.locator("#navbarNav li:nth-child(6) > a");
  }

  async clickAdminTagButton() {
    await this.adminTagButton.waitFor({ state: "visible" });
    await this.clickElement(this.adminTagButton);
  }
}
