import { test, expect, request } from '@playwright/test';
import { validBooking, updatedBooking } from '../../utils/data/booking-data.js';
import { adminCredentials } from '../../utils/data/credentials.js';
import { getAuthToken, verifyBookingDetails } from '../../utils/helpers/api-helpers.js';
import { BASE_URL } from '../../utils/data/env-data.js';

test.describe('Booking API Tests', () => {
  let apiContext;
  let bookingId;
  let token;

  test.beforeAll(async () => {
    apiContext = await request.newContext();

    // Create a booking 
    const response = await apiContext.post(`${BASE_URL}/booking`, {
      data: validBooking
    });

    const body = await response.json();
    bookingId = body.bookingid;

    // Get a authenticate token
    token = await getAuthToken(apiContext, adminCredentials);
  });

  test('TC-01: Create a new booking with valid data', async () => {
    expect(bookingId).toBeDefined();
  });

  test('TC-02: Retrieve booking by ID and verify data', async () => {
    const getResponse = await apiContext.get(`${BASE_URL}/booking/${bookingId}`);
    const body = await getResponse.json();

    expect(getResponse.status()).toBe(200);
    verifyBookingDetails(body, validBooking, expect);
  });

  test('TC-03: Update existing booking with new data', async () => {
    const updateResponse = await apiContext.put(`${BASE_URL}/booking/${bookingId}`, {
      data: updatedBooking,
      headers: {
        Cookie: `token=${token}`
      }
    });

    const body = await updateResponse.json();

    expect(updateResponse.status()).toBe(200);
    verifyBookingDetails(body, updatedBooking, expect);
  });

  test('TC-03b: Retrieve updated booking and verify changes', async () => {
    const getResponse = await apiContext.get(`${BASE_URL}/booking/${bookingId}`);
    const body = await getResponse.json();

    expect(getResponse.status()).toBe(200);
    verifyBookingDetails(body, updatedBooking, expect);
  });

  test('TC-04: Delete booking by ID', async () => {
    const deleteResponse = await apiContext.delete(`${BASE_URL}/booking/${bookingId}`, {
      headers: {
        Cookie: `token=${token}`
      }
    });

    expect(deleteResponse.status()).toBe(201);
  });
});
