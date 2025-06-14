// utils/helpers/ui-helpers.js

/**
 * Selects an option from a <select> element.
 * @param {import('@playwright/test').Locator} locator - The Playwright locator for the select element.
 * @param {string} value - The option to select.
 */
export async function selectOption(locator, value) {
  await locator.selectOption(value);
}

/**
 * Fills text into an input field.
 * @param {import('@playwright/test').Locator} locator - The Playwright locator for the input.
 * @param {string} text - The text to fill.
 */
export async function fillText(locator, text) {
  await locator.fill(text);
}

/**
 * Checks a checkbox if it's not already checked.
 * @param {import('@playwright/test').Locator} locator - The Playwright locator for the checkbox.
 */
export async function checkElement(locator) {
  if (!(await locator.isChecked())) {
    await locator.check();
  }
}

/**
 * Unchecks a checkbox if it's checked.
 * @param {import('@playwright/test').Locator} locator - The Playwright locator for the checkbox.
 */
export async function uncheckElement(locator) {
  if (await locator.isChecked()) {
    await locator.uncheck();
  }
}
