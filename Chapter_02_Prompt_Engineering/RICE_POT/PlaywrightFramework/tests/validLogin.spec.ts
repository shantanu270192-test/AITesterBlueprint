import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

test.describe('Wingify Login - Valid Credentials', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('should redirect away from login page after successful authentication', async ({ page }) => {
        await loginPage.login(
            process.env.WINGIFY_EMAIL!,
            process.env.WINGIFY_PASSWORD!
        );
        await expect(page).not.toHaveURL(/.*#\/login/, { timeout: 30000 });
    });
});
