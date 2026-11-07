# Wingify Playwright Framework

A Playwright + TypeScript test automation framework for the [Wingify VWO](https://app.wingify.com) login functionality, built using the **Page Object Model (POM)** pattern.

---

## Tech Stack

| Tool | Version |
|------|---------|
| [Playwright](https://playwright.dev) | ^1.49.0 |
| TypeScript | ^5.6.0 |
| dotenv | ^16.4.5 |
| Browser | Chromium |

---

## Project Structure

```
PlaywrightFramework/
├── pages/
│   └── LoginPage.ts          # Page Object for the login page
├── tests/
│   ├── validLogin.spec.ts    # Test: successful login redirects away
│   └── invalidLogin.spec.ts  # Tests: error messages for bad credentials
├── .env.example              # Environment variable template
├── .gitignore                # Excludes .env, node_modules, reports
├── playwright.config.ts      # Playwright configuration
├── tsconfig.json             # TypeScript configuration
└── package.json
```

---

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Install Chromium browser

```bash
npx playwright install chromium
```

### 3. Configure credentials

Copy the example env file and fill in your Wingify account details:

```bash
cp .env.example .env
```

Edit `.env`:

```
WINGIFY_EMAIL=your_email@example.com
WINGIFY_PASSWORD=your_secure_password
```

> **Security:** `.env` is listed in `.gitignore` and must never be committed. Credentials are never hardcoded in test files.

---

## Running Tests

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests in headless mode |
| `npm run test:headed` | Run all tests with visible browser |
| `npm run test:report` | Open the last HTML report |

---

## Test Cases

### `validLogin.spec.ts`
| Test | Assertion |
|------|-----------|
| Successful authentication | URL changes away from `#/login` after login |

### `invalidLogin.spec.ts`
| Test | Assertion |
|------|-----------|
| Wrong email and password | Error banner visible with correct message |
| Unregistered email | Error banner visible, URL stays at `#/login` |

---

## HTML Report

After running `npm test`, the report is saved to:

```
playwright-report/index.html
```

Open it with:

```bash
npm run test:report
```

---

## Key Design Decisions

- **`waitUntil: 'domcontentloaded'`** — Wingify is an Angular SPA that never fires the `load` event due to console errors; `domcontentloaded` is used in `navigate()` to avoid timeouts.
- **ID-based locators** (`#login-username`, `#login-password`, `#js-login-btn`, `#js-notification-box`) — Wingify renders multiple hidden form panels on the same page; unique IDs avoid Playwright strict mode violations.
- **No hardcoded waits** — all synchronisation is handled by Playwright's built-in auto-waiting and `expect` assertions.
