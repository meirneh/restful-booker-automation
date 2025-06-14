# 📄 Vimeo - Senior QA Engineer Home Assignment

## 🔍 Project Overview
This project contains both **API** and **UI** automated tests for the public application [https://automationintesting.online/](https://automationintesting.online/) as part of a take-home assignment for the Senior QA Engineer role at **Vimeo**.

All automation was implemented using **Playwright with JavaScript**.

---

## 📁 Project Structure

```
restful-booker-automation/
├── api-tests/
│   └── booking-api.spec.js
├── ui-tests/
│   └── booking-ui.spec.js
├── pages/
│   ├── BasePage.js
│   ├── HeaderPage.js
│   ├── HomePage.js
│   ├── LoginPage.js
│   ├── RoomPage.js
│   └── RoomsPage.js
├── utils/
│   ├── data/
│   │   ├── booking-data.js
│   │   ├── credentials.js
│   │   └── env-data.js
│   └── helpers/
│       ├── api-helpers.js
│       └── ui-helpers.js
├── playwright.config.js
└── README.md
```

---

## ✅ Test Suites

### 🔹 API Tests
**Tools:** Playwright API testing module

Test cases:
1. `TC-01`: Create a new booking
2. `TC-02`: Retrieve the booking by ID
3. `TC-03`: Update the booking with new data
4. `TC-03b`: Retrieve the updated booking and verify changes *(additional test not required by assignment)*
5. `TC-04`: Delete the booking

> 🧠 *Note:* The `TC-03b` test case was added as a best practice to verify persisted changes after an update request. Although not required by the assignment, it reflects a proactive quality mindset (להגדיל ראש).

---

### 🔹 UI Tests
**Tools:** Playwright UI testing module

Test cases:
1. `TC-01`: Verify addition of a new room to the list
2. `TC-02`: Verify updated data is displayed after editing a room
3. `TC-03`: Verify updated room is successfully deleted

The UI tests follow the same room flow: creation → update → deletion. This flow is implemented as a sequence due to system limitations.

> ⚠️ *Note:* Tests must be executed **sequentially in a single browser** to avoid unexpected failures caused by the application state.

---

## 🧪 Manual API Testing Summary (Postman)
Before writing automated tests, the API was manually explored using Postman to understand its behavior.

- ✅ Successfully created a booking with a `POST /booking` request.
- ✅ Retrieved it via `GET /booking/:id`
- ✅ Generated token with `POST /auth`
- ✅ Updated the booking via `PUT /booking/:id` using the token
- ✅ Deleted the booking with `DELETE /booking/:id`

### 🔸 Observation
In the `DELETE` booking request, the response returned:
```json
{"created": "true"}
```
Instead of the more intuitive:
```json
{"deleted": "true"}
```
This could lead to confusion and is worth noting, even though it is consistent with the application's official documentation.

---

## 🐞 UI Bug Report (Manual Testing)

While testing the UI manually:

- ❌ Rooms can be deleted immediately using the ❌ icon, **without any confirmation dialog**.  
  ➤ This deletion is **immediate and irreversible**, which may lead to user frustration and accidental data loss.  
  ➤ 🔧 *Recommendation:* Implement a confirmation modal before deleting rooms.

- ❌ **Price field only accepts integers** — inserting decimal values like `100.50` results in an error.  
  ➤ Although this might be part of the requirements, **not accepting cents is likely an oversight** in a hotel booking system.

- ❌ **System crashes after input errors in `roomName` or `price` fields**.  
  ➤ If invalid data is entered (e.g., letters in `price`), the system shows an error message **but blocks any further correction**.  
  ➤ User must refresh the page and **log in again** to continue, which is a poor UX.  
  ➤ 🔧 *Recommendation:* Allow inline correction and avoid forced full reload.

---

## 🚀 Setup Instructions (for reviewer)

1. Clone the project
2. Run `npm install`

### ▶️ Execute API tests:
```bash
npx playwright test api-tests/booking-api.spec.js
```

### ▶️ Execute UI tests:
```bash
npx playwright test ui-tests/booking-ui.spec.js --project=chromium
```

> ⚠️ *Important:* Due to limitations in the application under test, UI tests may **fail if executed in parallel** or across multiple browsers.  
To ensure a clean and stable run:
- Run only on one browser (e.g., `chromium`)
- Avoid parallelism by running without the default multi-project setup

---

## 🧠 Final Notes
- The test suite is modular and follows Page Object Model (POM) design pattern.
- All data and URLs are externalized in the `utils/data/` folder.
- Redundant methods were removed for clarity and maintainability.
- UI helpers were created to encapsulate common interactions (`fillText`, `selectOption`, `checkElement`, etc.).
- Tests are deterministic and self-contained.