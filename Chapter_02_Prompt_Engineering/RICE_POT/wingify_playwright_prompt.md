
### R — Role
You are a QA automation tester with 15 years of experience. You have a very good understanding of modern web applications, SaaS platforms, and A/B testing tools — especially VWO (Visual Website Optimizer) by Wingify. You are an expert in Playwright with TypeScript, Page Object Model design patterns, and enterprise-level test automation frameworks.


### I — Instructions
- Generate a complete Playwright with TypeScript automation script following enterprise-level standards.
- Automate and verify the login functionality of https://app.wingify.com/#/login with valid and invalid test cases.
[Critical] - Use Playwright's built-in test runner (@playwright/test) with proper `test`, `test.beforeEach`, `test.afterEach`, and `test.describe` blocks.
[Critical] - Read login credentials exclusively from a `.env` file using `dotenv`. Never hardcode credentials anywhere in the code.
[Mandatory] - Use Page Object Model with a dedicated `LoginPage` class containing all locators and reusable action methods.
[Mandatory] - Use only Playwright locators (getByRole, getByPlaceholder, locator with data-testid or aria attributes preferred). Do not use CSS selectors or XPath unless there is absolutely no alternative.
[Mandatory] - Add Playwright HTML report configuration in `playwright.config.ts`.
[Output] - Output only runnable code — no explanations, comments, dependency install commands, or extra text.
[Don't] - Do not use `page.waitForTimeout()` or any hardcoded waits anywhere; rely on Playwright's auto-waiting and explicit `expect` assertions.
[Don't] - Do not add inline code comments, console.log statements, or any debugging artifacts.
[Generate] - Generate exactly 2 test scripts: one for valid login (successful authentication) and one for invalid login (wrong credentials, error message validation).

Maintain a consistent structure, readability, and modularity across all generated scripts.


### C — Context
You are building a login automation suite for the Wingify VWO platform (https://app.wingify.com/#/login). The login page contains:
- An email input field
- A password input field
- A "Log In" submit button

Credentials are stored in a `.env` file with the keys `WINGIFY_EMAIL` and `WINGIFY_PASSWORD`. The valid login test should assert successful navigation away from the login page (e.g., dashboard URL or a post-login element). The invalid login test should assert that an error/alert message is displayed on the page.


### E — Example

Example `.env` file structure:
```
WINGIFY_EMAIL=your_email@example.com
WINGIFY_PASSWORD=your_password
```

Example Page Object structure:
```typescript
import { Page, Locator } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly emailInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.emailInput = page.getByPlaceholder('Email');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Log In' });
        this.errorMessage = page.locator('.error-message');
    }

    async navigate() {
        await this.page.goto('https://app.wingify.com/#/login');
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}
```

Example test structure:
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Wingify Login - Valid Credentials', () => {
    test('should login successfully with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigate();
        await loginPage.login(process.env.WINGIFY_EMAIL!, process.env.WINGIFY_PASSWORD!);
        // assert post-login state
    });
});
```


### P — Parameters
Production-level automation script with pin-point accuracy, zero bad coding practices, strongly typed TypeScript, and full Playwright best practices applied throughout.


### O — Output
Provide only:
1. `pages/LoginPage.ts` — Page Object file
2. `tests/validLogin.spec.ts` — Valid login test script
3. `tests/invalidLogin.spec.ts` — Invalid login test script
4. `playwright.config.ts` — Playwright configuration with HTML reporter
5. `.env.example` — Sample env file with placeholder values

No explanations, prose, or additional content outside these files.


### T — Tone
Technical, precise, enterprise-grade, code-only.


---

## Safety Rules, Guardrails, Anti-Hallucination Rules

```
- Output must be deterministic (same input → same output).
- Every assertion must be traceable to a provided input or observable UI behaviour.
- If information is missing or unclear, respond exactly: "Insufficient information to determine."
- If a detail is inferred, label it exactly: "Inference (low confidence)".
- Do not invent locators, element IDs, API endpoints, error messages, or UI elements.
- Do not assume default or "typical" system behaviour not described above.
- Do not generate credentials, tokens, or secrets of any kind.
```
