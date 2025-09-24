import {test, expect} from '@playwright/test';
import { LoginPage } from "../../page-object/LoginPage";

test.describe.only("Login / Logout Flow", () => {
    let loginPage: LoginPage;
    //Befor Hook
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        //await page.goto('https://practicetestautomation.com/practice-test-login/');
        await loginPage.visit();
    });

    //Navigate Scenario + Logout
    test('Login and Logout', async ({page}) => {
        //Negative Login Scenario
        //await page.fill('#username', 'invalid username');
        //await page.fill('#password', 'invalid password');
        //await page.click('#submit');
        //const errorMessage = page.locator('#error');
        //await expect(errorMessage).toContainText("Your username is invalid!");

        await loginPage.login('invalid_username', 'invalid_password');
        await loginPage.wait(2000);
        await loginPage.assertErrorMessage();
    });

    //Positive Login Scenario + Logout
    test('Login with valid credentials', async ({page}) => {
        await loginPage.login('student', 'Password123');
        const successMessage = page.locator('h1');
        await expect(successMessage).toContainText("Logged In Successfully");
        await page.click('.wp-block-button__link.has-text-color.has-background.has-very-dark-gray-background-color');
        await expect(page).toHaveURL('https://practicetestautomation.com/practice-test-login/');
    });
});