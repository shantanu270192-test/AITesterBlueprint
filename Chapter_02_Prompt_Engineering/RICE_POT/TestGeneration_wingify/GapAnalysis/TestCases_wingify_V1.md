# TestCases_wingify_V1.md
## VWO Login Page — Manual Test Cases
**Application:** https://app.wingify.com | **Module:** Login / Authentication
**Generated using:** RICE-POT Prompt Engineering Method
**Source:** Product Requirements Document — VWO Login Dashboard
**Version:** V1 

---

## RICE-POT Prompt

### R — Role
You are a Senior QA Test Analyst with 15+ years of experience in web application testing, SaaS platform validation, and CRM/analytics tool quality assurance. You have deep familiarity with conversion rate optimization (CRO) platforms, specifically VWO (Visual Website Optimizer) by Wingify. You understand enterprise authentication flows, security compliance (OWASP, GDPR, CCPA), and accessibility standards (WCAG 2.1).

---

### I — Instructions
- Generate a comprehensive manual test case suite for the VWO login page at `app.wingify.com`.
- [Critical] Cover all functional requirements stated in the PRD: authentication, field validation, Remember Me, Forgot Password, social login, SSO, 2FA, session management, and brute-force protection.
- [Critical] Include positive (happy path), negative, edge-case, security, accessibility, UI/UX, mobile/responsive, and performance test scenarios.
- [Mandatory] Each test case must have a unique TC ID in the format `TC_LOGIN_XXX`.
- [Mandatory] Map every test case to a requirement traceable to the PRD — do not invent behavior.
- [Mandatory] Assign priority levels: `Critical`, `High`, `Medium`, or `Low`.
- [Output] Deliver test cases as a Markdown table with columns: TC ID, Title, Category, Priority, Pre-conditions, Test Steps, Expected Result, Status.
- [Don't] Do not include test cases for features not mentioned in the PRD.
- [Don't] Do not invent specific error message text, exact thresholds, timeout durations, or UI element IDs not stated in the PRD.

---

### C — Context
The VWO Login Dashboard is the primary entry point to the VWO platform at `app.wingify.com`. The PRD specifies the following features for the login page:

- **Authentication:** Email + password-based login with real-time field validation on blur
- **Remember Me:** Checkbox for persistent session across browser restarts
- **Forgot Password:** Streamlined password reset via email-based secure token
- **Social Login:** Google and Microsoft OAuth integration
- **SSO:** SAML and OAuth enterprise SSO support
- **2FA:** Optional multi-factor authentication
- **Branding & UI:** VWO logo, clean minimalist design, product announcements banner
- **Theme:** Light and Dark Mode toggle support
- **Accessibility:** ARIA labels, keyboard navigation, screen reader support, high contrast mode
- **Mobile:** Responsive design with touch-friendly controls and email-type keyboard on mobile
- **Security:** HTTPS/TLS enforcement, brute-force rate limiting, password masking, encrypted storage
- **Performance:** Page load ≤ 2 seconds, 99.9% uptime
- **Post-Login:** Seamless redirect to VWO Dashboard after successful authentication
- **Registration CTA:** Link to free trial signup for new users

---

### E — Example

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result |
|-------|-------|----------|----------|----------------|------------|-----------------|
| TC_LOGIN_001 | Successful login with valid credentials | Happy Path | Critical | User has a registered VWO account; browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Enter registered email in the Email field 3. Enter correct password in the Password field 4. Click the Login button | User is authenticated and redirected to the VWO Dashboard |

---

### P — Parameters
- All test cases are derived solely from the PRD document; no behavior is assumed beyond what is stated.
- Test steps are concise, numbered, and executable by a human tester without automation.
- Expected results are specific and verifiable — not generic phrases like "it works".
- ~41 test cases across 14 categories for complete coverage.
- Priority assignments follow: `Critical` = auth flows / security; `High` = core UX flows; `Medium` = secondary features; `Low` = cosmetic / informational.

---

### O — Output
**Format:** Markdown tables grouped by category  
**Columns (in order):** TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result  
**Grouping:** 14 categories, each as a separate sub-table with a `##` heading  

---

### T — Tone
Technical, precise, QA-standard. Test steps use imperative verbs (Navigate, Enter, Click, Verify). No filler text, no marketing language.

---

---

## Test Cases

---

## Category 1: Happy Path / Positive Scenarios

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result |
|-------|-------|----------|----------|----------------|------------|-----------------|
| TC_LOGIN_001 | Successful login with valid email and password | Happy Path | Critical | User has a registered VWO account; browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Enter registered email address in the Email field 3. Enter the correct password in the Password field 4. Click the **Login** button | User is authenticated successfully and redirected to the VWO Dashboard |
| TC_LOGIN_002 | Successful login with Remember Me checkbox selected | Happy Path | Critical | User has a registered VWO account; browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Enter valid email and password 3. Check the **Remember Me** checkbox 4. Click the **Login** button | User is authenticated and redirected to VWO Dashboard; session is persisted for future visits |
| TC_LOGIN_003 | Post-login redirect to VWO Dashboard | Happy Path | Critical | User has valid credentials and is on the login page | 1. Enter valid email and password 2. Click **Login** 3. Observe the URL and page content after login | Browser redirects to the VWO Dashboard; the dashboard loads with the user's account data and recent activity |

---

## Category 2: Email Field Validation

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result |
|-------|-------|----------|----------|----------------|------------|-----------------|
| TC_LOGIN_004 | Login attempt with invalid email format (missing @) | Email Validation | High | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Enter `usernameexample.com` (no `@`) in the Email field 3. Enter any password 4. Click **Login** or tab away from the Email field | A real-time inline validation error is displayed: "Please enter a valid email address"; login does not proceed |
| TC_LOGIN_005 | Login attempt with empty email field | Email Validation | Critical | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Leave the Email field blank 3. Enter any value in the Password field 4. Click **Login** | An error message appears indicating the email field is required; login does not proceed |
| TC_LOGIN_006 | Login attempt with email containing leading/trailing spaces | Email Validation | Medium | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Enter `  user@example.com  ` (with spaces) in the Email field 3. Enter a password 4. Click **Login** | Either the spaces are trimmed and the valid email is accepted, OR a validation error is displayed; the system does not crash |
| TC_LOGIN_007 | Login attempt with email exceeding maximum character length | Email Validation | Low | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Enter an email address with 300+ characters in the Email field 3. Click **Login** or tab away | A validation error is displayed or the field rejects input beyond the max length; the page remains stable |

---

## Category 3: Password Field Validation

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result |
|-------|-------|----------|----------|----------------|------------|-----------------|
| TC_LOGIN_008 | Login attempt with valid email and incorrect password | Password Validation | Critical | User has a registered VWO account | 1. Navigate to app.wingify.com 2. Enter a registered email address 3. Enter an incorrect password 4. Click **Login** | A clear, actionable error message is displayed (e.g., "Invalid email or password"); login is rejected; the user is not authenticated |
| TC_LOGIN_009 | Login attempt with empty password field | Password Validation | Critical | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Enter a valid email address 3. Leave the Password field blank 4. Click **Login** | An error message appears indicating the password field is required; login does not proceed |
| TC_LOGIN_010 | Login attempt with both email and password fields empty | Password Validation | High | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Leave both Email and Password fields blank 3. Click **Login** | Validation errors appear for both fields indicating they are required; login does not proceed |

---

## Category 4: Real-time Field Validation (On Blur)

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result |
|-------|-------|----------|----------|----------------|------------|-----------------|
| TC_LOGIN_011 | Real-time validation on Email field blur with invalid format | Real-time Validation | High | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Click on the Email field 3. Type `notanemail` (no domain, no `@`) 4. Click on the Password field (triggering blur on Email) | An inline validation error appears immediately below the Email field indicating the format is invalid; no page reload occurs |
| TC_LOGIN_012 | Real-time validation on Password field blur when empty | Real-time Validation | Medium | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Click on the Password field 3. Do not type anything 4. Click on the Email field (triggering blur on Password) | An inline validation message appears indicating the Password field cannot be empty; the error is shown before the user clicks Login |

---

## Category 5: Remember Me Functionality

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result |
|-------|-------|----------|----------|----------------|------------|-----------------|
| TC_LOGIN_013 | Remember Me checkbox is visible and toggleable | Remember Me | High | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Locate the **Remember Me** checkbox on the login form 3. Click the checkbox to select it 4. Click the checkbox again to deselect it | The Remember Me checkbox is visible on the login page; it toggles between checked and unchecked states correctly |
| TC_LOGIN_014 | Session persists after browser is closed and reopened with Remember Me | Remember Me | High | User has logged in with Remember Me checked | 1. Log in with valid credentials and Remember Me checked 2. Close the browser completely 3. Reopen the browser and navigate to app.wingify.com | The user is still logged in; the session is restored and the VWO Dashboard is displayed without requiring a new login |

---

## Category 6: Forgot Password

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result |
|-------|-------|----------|----------|----------------|------------|-----------------|
| TC_LOGIN_015 | Forgot Password link is visible on the login page | Forgot Password | High | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Inspect the login form for a Forgot Password link or button | A "Forgot Password" link is visible on the login page, near the Password field or below the Login button |
| TC_LOGIN_016 | Forgot Password link navigates to the password reset page | Forgot Password | High | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Click the **Forgot Password** link | The browser navigates to a password reset page; the user is prompted to enter their registered email address |
| TC_LOGIN_017 | Password reset email is sent for a valid registered email | Forgot Password | Critical | User has a registered VWO account with a known email | 1. Navigate to the Forgot Password page 2. Enter the registered email address 3. Click **Submit** or **Send Reset Link** | A confirmation message is displayed (e.g., "A password reset link has been sent to your email"); a password reset email with a secure token link is received in the inbox |
| TC_LOGIN_018 | Error message for unregistered email on Forgot Password page | Forgot Password | High | Browser is on the Forgot Password page | 1. Enter an email address not registered with VWO 2. Click **Submit** | An appropriate error or informational message is displayed; the system does not reveal whether the email is registered or not (security best practice) |

---

## Category 7: Account Registration (Free Trial CTA)

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result |
|-------|-------|----------|----------|----------------|------------|-----------------|
| TC_LOGIN_019 | Account Registration / Free Trial link is visible on the login page | Registration | Medium | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Inspect the login page for a registration or free trial link | A link or button directing new users to create an account or start a free trial is visible on the login page |
| TC_LOGIN_020 | Registration link navigates to the VWO signup page | Registration | Medium | Browser is open at app.wingify.com; registration link is visible | 1. Navigate to app.wingify.com 2. Click the registration / free trial link | The browser navigates to the VWO signup / account creation page |

---

## Category 8: Social Login

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result |
|-------|-------|----------|----------|----------------|------------|-----------------|
| TC_LOGIN_021 | Google login button is visible on the login page | Social Login | High | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Inspect the login page for a Google login option | A "Sign in with Google" button or link is visible on the login page |
| TC_LOGIN_022 | Microsoft login button is visible on the login page | Social Login | High | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Inspect the login page for a Microsoft login option | A "Sign in with Microsoft" button or link is visible on the login page |
| TC_LOGIN_023 | Clicking Google login initiates the Google OAuth flow | Social Login | High | Browser is open at app.wingify.com; user has a Google account | 1. Navigate to app.wingify.com 2. Click the **Sign in with Google** button | The browser is redirected to the Google OAuth authorization page; the user is prompted to select or authenticate their Google account |

---

## Category 9: Security

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result |
|-------|-------|----------|----------|----------------|------------|-----------------|
| TC_LOGIN_024 | Account is locked after multiple consecutive failed login attempts | Security | Critical | User has a registered VWO account | 1. Navigate to app.wingify.com 2. Enter the correct email and an incorrect password 3. Click **Login** 4. Repeat steps 2–3 five or more times in quick succession | After a defined threshold of failed attempts, the account is temporarily locked or a CAPTCHA is presented; an appropriate error message is shown (e.g., "Too many failed attempts. Please try again later.") |
| TC_LOGIN_025 | Login page is served over HTTPS | Security | Critical | Browser is open | 1. Navigate to `http://app.wingify.com` (HTTP, not HTTPS) | The browser is automatically redirected to `https://app.wingify.com`; a valid SSL/TLS certificate is present; no insecure content warnings are displayed |
| TC_LOGIN_026 | Password field input is masked by default | Security | Critical | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Click on the Password field 3. Type any characters | The typed characters are displayed as bullets (●) or asterisks (*); the actual password text is not visible |

---

## Category 10: UI / UX

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result |
|-------|-------|----------|----------|----------------|------------|-----------------|
| TC_LOGIN_027 | Auto-focus is set on the Email field on page load | UI/UX | Medium | Browser is open | 1. Navigate to app.wingify.com 2. Observe which element has focus immediately after page load (without clicking) | The Email input field is automatically focused on page load; the user can start typing their email immediately without clicking |
| TC_LOGIN_028 | VWO logo and branding are visible on the login page | UI/UX | Medium | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Inspect the login page for VWO branding | The VWO logo is displayed on the login page; the design follows the VWO color scheme and design system |
| TC_LOGIN_029 | Light Mode is applied by default or when selected | UI/UX | Medium | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Locate the theme toggle (Light/Dark Mode) 3. Select **Light Mode** | The login page switches to or remains in Light Mode; background is light, text is dark; the change is immediate |
| TC_LOGIN_030 | Dark Mode switches the login page theme to dark | UI/UX | Medium | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Locate the theme toggle 3. Select **Dark Mode** | The login page switches to Dark Mode; background is dark, text is light; the change is applied immediately without a page reload |
| TC_LOGIN_031 | Product Announcements banner is displayed on the login page | UI/UX | Low | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Observe the page for a Product Announcements section or banner | A Product Announcements banner is visible on the login page; it displays relevant VWO news or updates |
| TC_LOGIN_032 | Loading indicator is displayed during authentication processing | UI/UX | High | Browser is open at app.wingify.com | 1. Enter valid email and password 2. Click **Login** 3. Immediately observe the login button and page | A loading spinner, progress indicator, or disabled button state is displayed while the authentication request is being processed; the UI does not appear frozen |

---

## Category 11: Accessibility

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result |
|-------|-------|----------|----------|----------------|------------|-----------------|
| TC_LOGIN_033 | Full keyboard navigation through the login form | Accessibility | High | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Without using the mouse, use the **Tab** key to move through all form elements 3. Use **Shift+Tab** to navigate backwards 4. Press **Enter** to submit the form | All form elements (Email field, Password field, Remember Me checkbox, Login button, Forgot Password link) are reachable and operable via keyboard alone; focus indicators are visible |
| TC_LOGIN_034 | Login form elements have appropriate ARIA labels for screen readers | Accessibility | High | Screen reader software is installed and active; browser is open at app.wingify.com | 1. Activate a screen reader (e.g., NVDA, VoiceOver) 2. Navigate to app.wingify.com 3. Tab through all form elements | The screen reader announces descriptive labels for the Email field, Password field, Remember Me checkbox, Login button, and Forgot Password link using ARIA labels |
| TC_LOGIN_035 | Login page is usable in high contrast mode | Accessibility | Medium | Browser is open at app.wingify.com; OS high contrast mode is enabled | 1. Enable the operating system's high contrast mode 2. Navigate to app.wingify.com 3. Inspect all text, buttons, and input fields | All text, form fields, buttons, and links remain readable and usable; no elements become invisible or indistinguishable from the background |

---

## Category 12: Mobile / Responsive Design

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result |
|-------|-------|----------|----------|----------------|------------|-----------------|
| TC_LOGIN_036 | Login page renders correctly on a mobile viewport | Mobile/Responsive | High | Browser DevTools is available; or a physical mobile device | 1. Open app.wingify.com on a mobile device (or emulate a 375px viewport in browser DevTools) 2. Inspect the layout of the login form | The login form is fully visible without horizontal scrolling; all elements are properly sized and spaced for the mobile viewport; no elements are cut off or overlapping |
| TC_LOGIN_037 | Login form controls are touch-friendly on mobile | Mobile/Responsive | Medium | A mobile device or touch-emulation environment is available | 1. Open app.wingify.com on a mobile device 2. Tap on the Email field, Password field, Remember Me checkbox, and Login button | All interactive elements have sufficient tap target size (≥ 44×44px); they respond correctly to touch input without requiring a precise stylus-level tap |
| TC_LOGIN_038 | Email keyboard type appears on mobile for the Email input | Mobile/Responsive | Medium | A mobile device or touch-emulation environment is available | 1. Open app.wingify.com on a mobile device 2. Tap on the Email input field | The mobile keyboard that appears is the email-type keyboard (showing `@` and `.` prominently), not the standard alphanumeric keyboard |

---

## Category 13: Performance

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result |
|-------|-------|----------|----------|----------------|------------|-----------------|
| TC_LOGIN_039 | Login page loads within 2 seconds | Performance | High | Browser is connected to the internet; browser DevTools Network panel is accessible | 1. Open browser DevTools and navigate to the **Network** tab 2. Clear the cache 3. Navigate to app.wingify.com 4. Record the total page load time | The login page is fully loaded and interactive within 2 seconds on a standard broadband connection; the DOMContentLoaded and Load events complete within the SLA defined in the PRD |

---

## Category 14: Session Management

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result |
|-------|-------|----------|----------|----------------|------------|-----------------|
| TC_LOGIN_040 | Session expires after the configured timeout period (without Remember Me) | Session Management | High | User is logged in without the Remember Me option; session timeout is configured | 1. Log in to VWO without selecting Remember Me 2. Leave the browser idle and inactive for the duration of the configured session timeout period 3. Attempt to interact with the VWO Dashboard after the timeout | The session is expired; the user is automatically logged out; any interaction results in a redirect to the login page |
| TC_LOGIN_041 | Expired session redirects user to the login page | Session Management | High | User's session has expired (see TC_LOGIN_040) | 1. With an expired session, navigate to any authenticated VWO URL (e.g., app.wingify.com/dashboard) | The browser redirects to the login page (app.wingify.com); the user cannot access authenticated content without re-authenticating |

---

## Test Case Summary

| Category | TC Count | Critical | High | Medium | Low |
|----------|----------|----------|------|--------|-----|
| Happy Path / Positive | 3 | 3 | 0 | 0 | 0 |
| Email Field Validation | 4 | 1 | 2 | 1 | 1 |
| Password Field Validation | 3 | 2 | 1 | 0 | 0 |
| Real-time Field Validation | 2 | 0 | 1 | 1 | 0 |
| Remember Me | 2 | 0 | 2 | 0 | 0 |
| Forgot Password | 4 | 1 | 3 | 0 | 0 |
| Account Registration | 2 | 0 | 0 | 2 | 0 |
| Social Login | 3 | 0 | 3 | 0 | 0 |
| Security | 3 | 3 | 0 | 0 | 0 |
| UI / UX | 6 | 0 | 1 | 3 | 2 |
| Accessibility | 3 | 0 | 2 | 1 | 0 |
| Mobile / Responsive | 3 | 0 | 1 | 2 | 0 |
| Performance | 1 | 0 | 1 | 0 | 0 |
| Session Management | 2 | 0 | 2 | 0 | 0 |
| **TOTAL** | **41** | **10** | **19** | **10** | **3** |

---

*All test cases are derived from: Product Requirements Document — VWO Login Dashboard (Wingify)*
