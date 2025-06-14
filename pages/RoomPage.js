import { expect } from "@playwright/test";
import {
  fillText,
  selectOption,
  uncheckElement,
} from "../utils/helpers/ui-helpers";
import BasePage from "./BasePage";

export default class RoomPage extends BasePage {
  constructor(page) {
    super(page);
    this.page = page;
    this.getRoomName = (roomNumber) =>
      this.page.locator("h2", { hasText: `Room: ${roomNumber}` });
    this.roomTypeValue = page.locator(
      ".room-details > div:nth-child(2) > div:nth-child(1)"
    );
    this.roomAccessibleValue = page.locator(
      ".room-details :nth-child(3) :nth-child(1) p:nth-child(1)"
    );
    this.roomFeatureValue = page.locator(
      ".room-details :nth-child(3) :nth-child(1) p:nth-child(2)"
    );
    this.roomPriceValue = page.locator(
      ".room-details :nth-child(3) :nth-child(1) p:nth-child(3)"
    );
    this.editButton = page.locator(".btn-outline-primary");
    this.roomNameField = page.locator("#roomName");
    this.typeRoomSelect = page.locator("#type");
    this.accessibilitySelectOption = page.locator("#accessible");
    this.roomPriceField = page.locator("#roomPrice");
    this.wifiCheckbox = page.locator("#wifiCheckbox");
    this.refreshCheckbox = page.locator("#refreshmentsCheckbox");
    this.tvCheckbox = page.locator("#tvCheckbox");
    this.safeCheckbox = page.locator("#safeCheckbox");
    this.radioCheckbox = page.locator("#radioCheckbox");
    this.viewsCheckbox = page.locator("#viewsCheckbox");
    this.updateRoomButton = page.locator("#update");
  }

  async getRoomTitle(name) {
    return await this.getElementText(this.getRoomName(name));
  }

  async verifyRoomTitle(room) {
    expect(await this.getRoomTitle(room.number)).toEqual(
      `Room: ${room.number}`
    );
  }

  async getRoomTypeValue() {
    return await this.getElementText(this.roomTypeValue);
  }

  async verifyRoomTypeValue(room) {
    expect(await this.getRoomTypeValue()).toEqual(`Type: ${room.type}`);
  }

  async getRoomAccessibleValue() {
    return await this.getElementText(this.roomAccessibleValue);
  }

  async verifyRoomAccessibilityValue(room) {
    expect(await this.getRoomAccessibleValue()).toEqual(
      `Accessible: ${room.accessibility}`
    );
  }

  async getRoomFeatureValue() {
    return await this.getElementText(this.roomFeatureValue);
  }

  async verifyRoomFeaturesValue(room) {
    expect(await this.getRoomFeatureValue()).toEqual(
      `Features: ${room.feature}`
    );
  }

  async getRoomPriceValue() {
    return await this.getElementText(this.roomPriceValue);
  }

  async verifyRoomPriceValue(room) {
    expect(await this.getRoomPriceValue()).toEqual(`Room price: ${room.price}`);
  }

  async verifyRoomDetails(room) {
    await this.verifyRoomTitle(room);
    await this.verifyRoomTypeValue(room);
    await this.verifyRoomAccessibilityValue(room);
    await this.verifyRoomFeaturesValue(room);
    await this.verifyRoomPriceValue(room);
  }

  async clickEditButton() {
    await this.editButton.waitFor({ state: "visible" });
    await this.clickElement(this.editButton);
  }

  async fillRoomName(name) {
    await this.fillText(this.roomNameField, name);
  }

  async unCheckRoomOptions(options = []) {
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
        await uncheckElement(checkbox);
      }
    }
  }
  async clickUpdateRoomButton() {
    await this.clickElement(this.updateRoomButton);
  }

  async updateRoom(name, type, option, price, options = []) {
    await fillText(this.roomNameField, name);
    await selectOption(this.typeRoomSelect, type);
    await selectOption(this.accessibilitySelectOption, option);
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
        await uncheckElement(checkbox);
      }
    }

    await this.clickUpdateRoomButton();
  }
}
