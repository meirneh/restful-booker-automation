import { apiCredentials } from "../data/credentials.js";

export async function getAuthToken(apiContext) {
  const response = await apiContext.post(
    "https://restful-booker.herokuapp.com/auth",
    {
      data: apiCredentials,
    }
  );
  const body = await response.json();
  return body.token;
}

export function verifyBookingDetails(actual, expected, expect) {
  expect(actual.firstname).toBe(expected.firstname);
  expect(actual.lastname).toBe(expected.lastname);
  expect(actual.totalprice).toBe(expected.totalprice);
  expect(actual.depositpaid).toBe(expected.depositpaid);
  expect(actual.additionalneeds).toBe(expected.additionalneeds);
  expect(actual.bookingdates.checkin).toBe(expected.bookingdates.checkin);
  expect(actual.bookingdates.checkout).toBe(expected.bookingdates.checkout);
}
