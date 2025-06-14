import BasePage from "./BasePage";

export default class HeaderPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.roomsTagButton = page.locator(".navbar-nav.mr-auto :nth-child(1) > a")
  }

  async goToRoomsPage() {
    await this.clickElement(this.roomsTagButton);
  }
}
