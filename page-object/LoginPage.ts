import { Locator, Page, expect } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class LoginPage extends AbstractPage {
    //Define selectors
    //readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;

    //Initialize selectors using constructor
    constructor(page: Page) {
        super(page);
        //this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.submitButton = page.locator('#submit');
        this.errorMessage = page.locator('#error');
    }

    //Define methods to interact with the page
    async visit() {
        await this.page.goto('https://practicetestautomation.com/practice-test-login/');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async assertErrorMessage(){
        await expect(this.errorMessage).toContainText('Your username is invalid!');
    }

    async getErrorMessage() {
        return this.errorMessage.textContent();
    }
}