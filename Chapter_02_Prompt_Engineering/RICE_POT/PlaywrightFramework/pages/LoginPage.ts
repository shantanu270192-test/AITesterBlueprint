import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly signInButton: Locator;
    readonly errorNotification: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.locator('#login-username');
        this.passwordInput = page.locator('#login-password');
        this.signInButton = page.locator('#js-login-btn');
        this.errorNotification = page.locator('#js-notification-box');
    }

    async navigate(): Promise<void> {
        await this.page.goto('/#/login', { waitUntil: 'domcontentloaded' });
        await expect(this.emailInput).toBeVisible();
    }

    async login(email: string, password: string): Promise<void> {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.signInButton.click();
    }

    async getErrorMessage(): Promise<string> {
        await expect(this.errorNotification).toBeVisible();
        return (await this.errorNotification.textContent()) ?? '';
    }
}
