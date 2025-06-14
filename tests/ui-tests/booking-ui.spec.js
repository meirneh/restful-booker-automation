
import { test, chromium } from "@playwright/test";
import HomePage from "../../pages/HomePage";
import LoginPage from "../../pages/LoginPage";
import RoomsPage from "../../pages/RoomsPage";
import RoomPage from "../../pages/roomPage";
import HeaderPage from "../../pages/HeaderPage";
import { userUiCredentials } from "../../utils/data/uiCredentials";
import{ ROOM_NUMBER, roomDetails1, roomDetails2, roomExpectedDetails1, roomExpectedDetails2} from "../../utils/data/roomTestData";
import { UI_BASE_URL } from "../../utils/data/env-data";
/** @type {HomePage} */
let homePage;
/** @type {LoginPage} */
let loginPage;
/** @type {RoomsPage} */
let roomsPage;
/** @type {RoomPage} */
let roomPage;
/** @type {HeaderPage} */
let headerPage;

test.describe("Booking UI Tests", () => {
  let browser, context, page;

  test.test.beforeAll(async () => {
    browser = await chromium.launch({ channel: "chrome"});
    context = await browser.newContext();
    page = await context.newPage();
    await page.goto(UI_BASE_URL);
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    roomsPage = new RoomsPage(page);
    roomPage = new RoomPage(page);
    headerPage = new HeaderPage(page);
  });

  test.afterAll(async () => {
    if (context) await context.close();
    if (page) await page.close();
  });

  test("test01 verify addition new room to the list", async () => {
    await homePage.clickAdminTagButton();
    await loginPage.login(userUiCredentials.username, userUiCredentials.password);
    await roomsPage.createRoom(
      ROOM_NUMBER,
      roomDetails1.type,
      roomDetails1.accessibility,
      roomDetails1.price,
      roomDetails1.features
    );
    await roomsPage.goToRoomPage(roomDetails1.number);
    await roomPage.verifyRoomDetails({
      number: ROOM_NUMBER,
      type: roomExpectedDetails1.type,
      accessibility: roomExpectedDetails1.accessibility,
      feature: roomExpectedDetails1.features,
      price: roomExpectedDetails1.price,
    });
  });

  test("test02 Verify room data update is reflected correctly", async () => {
    await roomPage.clickEditButton();
    await roomPage.updateRoom(
      ROOM_NUMBER,
      roomDetails2.type,
      roomDetails2.accessibility,
      roomDetails2.price,
      roomDetails2.features
    );
    await roomPage.verifyRoomDetails({
      number: ROOM_NUMBER,
      type: roomExpectedDetails2.type,
      accessibility: roomExpectedDetails2.accessibility,
      feature: roomExpectedDetails2.features,
      price: roomExpectedDetails2.price,
    });
  });

  test("test03 Verify Updated room deletion", async () => {
    headerPage.goToRoomsPage();
    await roomsPage.deleteRoomByName(ROOM_NUMBER);
    await roomsPage.verifyRoomDeleted(ROOM_NUMBER);
  });
});
