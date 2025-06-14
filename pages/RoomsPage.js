import BasePage from "./BasePage";
import { expect } from "@playwright/test";
import {
  fillText,
  selectOption,
  checkElement,
} from "../utils/helpers/ui-helpers";

export default class RoomsPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.roomNameField = page.locator("#roomName");
    this.typeRoomeSelect = page.locator("#type");
    this.accesibleSelectOption = page.locator("#accessible");
    this.roomPriceField = page.locator("#roomPrice");
    this.wifiCheckbox = page.locator("#wifiCheckbox");
    this.refreshCheckbox = page.locator("#refreshCheckbox");
    this.tvCheckbox = page.locator("#tvCheckbox");
    this.safeCheckbox = page.locator("#safeCheckbox");
    this.radioCheckbox = page.locator("#radioCheckbox");
    this.viewsCheckbox = page.locator("#viewsCheckbox");
    this.createRoomButton = page.locator("#createRoom");
    this.roomDetailsContainer = page.locator("[data-testid='roomlisting']");
    this.getRoomByName = (roomNumber) =>
      this.page.locator(`#roomName${roomNumber}`);
    this.deleteRoomButton = page.locator(".fa.fa-remove.roomDelete");
  }

  async fillRoomName(name) {
    await this.fillText(this.roomNameField, name);
  }

  async clickCreateRoomButton() {
    await this.clickElement(this.createRoomButton);
  }

  async createRoom(name, type, option, price, options = []) {
    await fillText(this.roomNameField, name);
    await selectOption(this.typeRoomeSelect, type);
    await selectOption(this.accesibleSelectOption, option);
    await fillText(this.roomPriceField, price);

    const mapping = {
      wifi: this.wifiCheckbox,
      refresh: this.refreshCheckbox,
      tv: this.tvCheckbox,
      safe: this.safeCheckbox,
      radio: this.radioCheckbox,
      views: this.viewsCheckbox,
    };

    for (const opt of options) {
      const checkbox = mapping[opt];
      if (checkbox) {
        await checkElement(checkbox);
      }
    }

    await this.clickCreateRoomButton();
  }

  async checkRoomOptions(options = []) {
    const mapping = {
      wifi: this.wifiCheckbox,
      refresh: this.refreshCheckbox,
      tv: this.tvCheckbox,
      safe: this.safeCheckbox,
      radio: this.radioCheckbox,
      views: this.viewsCheckbox,
    };

    for (const option of options) {
      const checkbox = mapping[option];
      if (checkbox) {
        await checkElement(checkbox);
      }
    }
  }
  async getRoomName(name) {
    return await this.getElementText(this.getRoomByName(name));
  }

  async verifyCreatedRoom(name) {
    expect(await this.getRoomName(name)).toEqual(name);
  }

  async goToRoomPage(name) {
    await this.clickElement(this.getRoomByName(name));
  }

  async deleteRoomByName(roomNumber) {
    // Find the container in the room row
    const roomContainer = this.page
      .locator(`#roomName${roomNumber}`)
      .locator("..")
      .locator("..")
      .locator("..");
    // Find the delete button inside the container
    const deleteButton = roomContainer.locator(".fa.fa-remove.roomDelete");
    await deleteButton.click();
  }

  async verifyRoomDeleted(roomNumber) {
    const roomLocator = this.page.locator(`#roomName${roomNumber}`);
    await expect(roomLocator).toHaveCount(0);
  }
}
