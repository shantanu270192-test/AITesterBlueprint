import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Wingify Login - Invalid Credentials', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('should display error message for incorrect email and password', async ({ page }) => {
        await loginPage.login('invalid@test.com', 'WrongPassword123!');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Your email, password, IP address or location did not match');
        await expect(page).toHaveURL(/.*#\/login/);
    });

    test('should remain on login page and show error for wrong password on valid email format', async ({ page }) => {
        await loginPage.login('notregistered@example.com', 'AnotherWrong456!');
        await expect(loginPage.errorNotification).toBeVisible();
        await expect(page).toHaveURL(/.*#\/login/);
    });
});
