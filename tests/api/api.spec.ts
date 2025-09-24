import { test, expect } from '@playwright/test';

test.describe('API Tests', () => {
    const baseUrl = "https://reqres.in/api";
    const headers = {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
    };
    test('GET Request Test', async ({ request }) => {

        const response = await request.get(`${baseUrl}/users/2`, { headers });
        expect(response.status()).toBe(200);
        const responseBody = JSON.parse(await response.text());
    });

    test('Invalid request', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/non-existent`);
        expect(response.status()).toBe(401);
    });

    test('GET Request - Get User Details', async ({ request }) => {
        const response = await request.get(`${baseUrl}/users/1`, { headers });
        expect(response.status()).toBe(200);
        const responseBody = JSON.parse(await response.text());
        expect(responseBody.data.id).toBe(1);
    })

    test('POST Request Test', async ({ request }) => {
        const requestBody = {
            name: "morpheus",
            job: "leader"
        };
        const response = await request.post(`${baseUrl}/users`, {
            headers,
            data: requestBody
        });
        expect(response.status()).toBe(201);
        const responseBody = JSON.parse(await response.text());
        expect(responseBody.name).toBe(requestBody.name);
        expect(responseBody.job).toBe(requestBody.job);
    });
});