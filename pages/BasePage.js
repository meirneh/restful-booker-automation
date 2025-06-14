
export default class BasePage {
  constructor(page) {
    this.page = page;
  }

  // === Navigation ===
  async navigateTo(url) {
    await this.page.goto(url);
  }

  // === Actions ===
  async clickElement(locator) {
    await locator.click();
  }

  async fillText(locator, text) {
    await locator.fill(text);
  }

  async typeText(locator, text, delay = 0) {
    await locator.fill("");
    await locator.type(text, { delay });
  }

  async checkElement(locator) {
    await locator.check();
  }

  async uncheckElement(locator) {
    await locator.uncheck();
  }

  async selectOption(locator, option) {
    await locator.selectOption(option);
    return this;
  }

  async getElementText(locator) {
    return await locator.innerText();
  }

  async getElementAttribute(locator, attribute) {
    return await locator.getAttribute(attribute);
  }

}
