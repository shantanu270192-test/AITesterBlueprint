# TestCases_wingify_V2.md
## VWO Login Page — Test Cases (with Anti-Hallucination Rules)
**Application:** https://app.wingify.com | **Module:** Login / Authentication
**Generated using:** RICE-POT Prompt Engineering Method + Anti-Hallucination Safety Rules
**Source:** Product Requirements Document — VWO Login Dashboard
**Version:** V2 | **Previous Version:** TestCases_wingify_V1.md (without Anti-Hallucination rules)

---

> **V2 vs V1 — What changed:**
> The Anti-Hallucination Safety Rules block has been added to the RICE-POT prompt.
> As a result, several Expected Results in V1 that contained **invented text, assumed thresholds,
> or inferred behavior** not explicitly stated in the PRD are now either:
> - Labeled **`[Inference (low confidence)]`** — detail is implied but not stated
> - Replaced with **`Insufficient information to determine`** — PRD provides no basis at all
>
> This makes V2 a more honest, traceable, and audit-ready test case document.

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
- [Mandatory] Apply Anti-Hallucination rules (see Safety Rules section below) to every Expected Result.
- [Output] Deliver test cases as a Markdown table with columns: TC ID, Title, Category, Priority, Pre-conditions, Test Steps, Expected Result, Confidence.
- [Don't] Do not include test cases for features not mentioned in the PRD.
- [Don't] Do not invent specific error message text, exact thresholds, timeout durations, or UI element IDs not stated in the PRD.

---

### C — Context
The VWO Login Dashboard is the primary entry point to the VWO platform at `app.wingify.com`. The PRD specifies the following features for the login page:

- **Authentication:** Email + password-based login with real-time field validation on blur
- **Remember Me:** Checkbox for persistent session across browser restarts
- **Forgot Password:** Streamlined password reset via email-based secure token generation
- **Social Login:** Google and Microsoft OAuth integration
- **SSO:** SAML and OAuth enterprise SSO support
- **2FA:** Optional multi-factor authentication
- **Branding & UI:** VWO logo, clean minimalist design, product announcements banner
- **Theme:** Light and Dark Mode toggle support
- **Accessibility:** ARIA labels, keyboard navigation, screen reader support, high contrast mode
- **Mobile:** Responsive design with touch-friendly controls and email-type keyboard on mobile
- **Security:** HTTPS/TLS enforcement, brute-force rate limiting, password masking, encrypted storage, OWASP compliance
- **Performance:** Page load ≤ 2 seconds (explicitly stated in PRD), 99.9% uptime
- **Post-Login:** Seamless redirect to VWO Dashboard after successful authentication
- **Registration CTA:** Link to free trial signup for new users

---

### E — Example

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result | Confidence |
|-------|-------|----------|----------|----------------|------------|-----------------|------------|
| TC_LOGIN_001 | Successful login with valid credentials | Happy Path | Critical | User has a registered VWO account; browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Enter registered email 3. Enter correct password 4. Click Login | User is authenticated and redirected to the VWO Dashboard | Traced (PRD: "Seamless post-login transition to VWO dashboard") |

---

### P — Parameters
- All test cases are derived solely from the PRD document; no behavior is assumed beyond what is stated.
- Test steps are concise, numbered, and executable by a human tester without automation.
- Expected results are specific and verifiable — not generic phrases like "it works".
- ~41 test cases across 14 categories for complete coverage.
- Priority assignments follow: `Critical` = auth flows / security; `High` = core UX flows; `Medium` = secondary features; `Low` = cosmetic / informational.
- **Confidence column** tracks traceability: `Traced` = directly in PRD; `Inference (low confidence)` = implied but not stated; `Insufficient information to determine` = no PRD basis.

---

### O — Output
**Format:** Markdown tables grouped by category
**Columns (in order):** TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result | Confidence
**Grouping:** 14 categories, each as a separate sub-table with a `##` heading

---

### T — Tone
Technical, precise, QA-standard. Test steps use imperative verbs (Navigate, Enter, Click, Verify). Expected results are factual and traceable, not aspirational.

---

## Safety Rules / Anti-Hallucination Rules

- Output must be **deterministic** (same input → same output).
- Every assertion must be **traceable to the PRD**. The Confidence column must cite the PRD section or phrase that supports the assertion.
- If information is missing or unclear, the Expected Result must state exactly: **`Insufficient information to determine`**.
- If a detail is implied but not explicitly stated, label it exactly: **`Inference (low confidence)`**.
- **Do not invent** specific error message text, exact field length limits, session timeout durations, lockout thresholds, ARIA label text, or any UI element ID not stated in the PRD.
- **Do not assume** default or "typical" authentication platform behavior (e.g., do not assume "5 failed attempts = lockout" because that is common — it must be in the PRD).
- **Do not invent** button labels, link text, or URL paths not mentioned in the PRD.

---

---

## Test Cases

> **Confidence Key:**
> - `Traced` — Expected result is directly stated or clearly implied by the PRD
> - `Inference (low confidence)` — Behavior is implied by a PRD feature but the specific detail is not stated; labeled per anti-hallucination rules
> - `Insufficient information to determine` — PRD provides no basis for this specific assertion

---

## Category 1: Happy Path / Positive Scenarios

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result | Confidence |
|-------|-------|----------|----------|----------------|------------|-----------------|------------|
| TC_LOGIN_001 | Successful login with valid email and password | Happy Path | Critical | User has a registered VWO account; browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Enter registered email address in the Email field 3. Enter the correct password in the Password field 4. Click the **Login** button | User is authenticated successfully and redirected to the VWO Dashboard | Traced — PRD: "Secure access to the experimentation platform"; "Seamless post-login transition to VWO dashboard" |
| TC_LOGIN_002 | Successful login with Remember Me checkbox selected | Happy Path | Critical | User has a registered VWO account; browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Enter valid email and password 3. Check the **Remember Me** checkbox 4. Click the **Login** button | User is authenticated and redirected to VWO Dashboard; session is persisted | Traced — PRD: "Remember Me checkbox for persistent sessions" |
| TC_LOGIN_003 | Post-login redirect to VWO Dashboard | Happy Path | Critical | User has valid credentials and is on the login page | 1. Enter valid email and password 2. Click **Login** 3. Observe the URL and page content after login | Browser redirects to the VWO Dashboard; the user's account data is accessible | Traced — PRD: "Seamless post-login transition to VWO dashboard" |

---

## Category 2: Email Field Validation

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result | Confidence |
|-------|-------|----------|----------|----------------|------------|-----------------|------------|
| TC_LOGIN_004 | Login attempt with invalid email format (missing @) | Email Validation | High | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Enter `usernameexample.com` (no `@`) in the Email field 3. Tab away or click Login | An inline validation error is displayed indicating the email format is invalid; login does not proceed. **Note:** Specific error message text is not defined in the PRD — do not assert exact wording. | Traced — PRD: "Email format verification"; "Real-time field validation on blur" |
| TC_LOGIN_005 | Login attempt with empty email field | Email Validation | Critical | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Leave the Email field blank 3. Enter any value in the Password field 4. Click **Login** | An error message appears indicating a required field is empty; login does not proceed. **Note:** Exact error text is `Insufficient information to determine` — PRD states "clear, actionable error messages" but does not specify the text. | Traced — PRD: "Clear, actionable error messages for failed authentication" |
| TC_LOGIN_006 | Login attempt with email containing leading/trailing spaces | Email Validation | Medium | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Enter `  user@example.com  ` (with spaces) in the Email field 3. Click **Login** | The system either trims the spaces and accepts the email, or displays a validation error. **Expected behavior (exact handling):** `Insufficient information to determine` — PRD does not specify whitespace handling. | Insufficient information to determine — PRD does not address whitespace handling in the email field |
| TC_LOGIN_007 | Login attempt with an abnormally long email input | Email Validation | Low | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Enter an email address exceeding 200+ characters 3. Click **Login** or tab away | The system displays an error or rejects the input gracefully; the page does not crash. **Maximum character limit:** `Insufficient information to determine` — PRD does not specify max email length. | Inference (low confidence) — PRD specifies input validation exists; specific length limit is not stated |

---

## Category 3: Password Field Validation

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result | Confidence |
|-------|-------|----------|----------|----------------|------------|-----------------|------------|
| TC_LOGIN_008 | Login attempt with valid email and incorrect password | Password Validation | Critical | User has a registered VWO account | 1. Navigate to app.wingify.com 2. Enter a registered email address 3. Enter an incorrect password 4. Click **Login** | An error message is displayed indicating authentication failed; login is rejected. **Exact error message text:** `Insufficient information to determine` — PRD states "clear, actionable error messages" but does not define the wording. | Traced — PRD: "Clear, actionable error messages for failed authentication" |
| TC_LOGIN_009 | Login attempt with empty password field | Password Validation | Critical | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Enter a valid email address 3. Leave the Password field blank 4. Click **Login** | An error message appears indicating the password field is required; login does not proceed. | Traced — PRD: "Clear, actionable error messages for failed authentication" |
| TC_LOGIN_010 | Login attempt with both email and password fields empty | Password Validation | High | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Leave both fields blank 3. Click **Login** | Validation errors appear for the empty fields; login does not proceed. | Traced — PRD: "User Input Validation"; "Clear, actionable error messages" |

---

## Category 4: Real-time Field Validation (On Blur)

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result | Confidence |
|-------|-------|----------|----------|----------------|------------|-----------------|------------|
| TC_LOGIN_011 | Real-time validation fires on Email field blur with invalid format | Real-time Validation | High | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Click on the Email field 3. Type `notanemail` 4. Click on the Password field (triggering blur) | An inline validation error appears immediately on blur — before the Login button is clicked. The error indicates an invalid email format. **Exact trigger timing and error text:** `Inference (low confidence)` — PRD states "real-time field validation on blur" without specifying the exact error copy. | Traced — PRD: "Real-time field validation on blur"; "Email format verification" |
| TC_LOGIN_012 | Real-time validation fires on Password field blur when empty | Real-time Validation | Medium | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Click on the Password field 3. Do not type anything 4. Click on the Email field (triggering blur) | An inline validation message appears indicating the field cannot be empty. **Exact message text:** `Insufficient information to determine` — PRD does not specify the password blur validation behavior explicitly (only email format and general "real-time on blur" are called out). | Inference (low confidence) — PRD states "real-time field validation on blur" generally; password-specific blur is not separately called out |

---

## Category 5: Remember Me Functionality

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result | Confidence |
|-------|-------|----------|----------|----------------|------------|-----------------|------------|
| TC_LOGIN_013 | Remember Me checkbox is visible and toggleable on the login form | Remember Me | High | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Locate the **Remember Me** checkbox 3. Click to check it 4. Click again to uncheck | The Remember Me checkbox is visible and toggles correctly between checked and unchecked. | Traced — PRD: "Remember Me checkbox for persistent sessions" |
| TC_LOGIN_014 | Session persists after browser restart when Remember Me is checked | Remember Me | High | User has logged in with Remember Me checked | 1. Log in with valid credentials and Remember Me checked 2. Close the browser completely 3. Reopen the browser and navigate to app.wingify.com | The user session is restored without requiring re-authentication. **Exact session duration / expiry window:** `Insufficient information to determine` — PRD mentions "persistent sessions" but does not define the persistence duration. | Traced (concept) — PRD: "persistent sessions"; duration: Insufficient information to determine |

---

## Category 6: Forgot Password

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result | Confidence |
|-------|-------|----------|----------|----------------|------------|-----------------|------------|
| TC_LOGIN_015 | Forgot Password link is visible on the login page | Forgot Password | High | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Look for a Forgot Password link or button on the login form | A Forgot Password link is visible on the login page. **Link label text:** `Inference (low confidence)` — PRD describes "Forgot Password" as a feature but does not specify the exact UI label. | Traced — PRD: "Forgot Password / streamlined password reset" |
| TC_LOGIN_016 | Forgot Password link navigates to the password reset page | Forgot Password | High | Browser is open at app.wingify.com; Forgot Password link is visible | 1. Navigate to app.wingify.com 2. Click the Forgot Password link | The browser navigates to a password reset page where the user can initiate the reset flow. | Traced — PRD: "Forgot Password / streamlined password reset with secure token generation" |
| TC_LOGIN_017 | Password reset email is sent for a valid registered email address | Forgot Password | Critical | User has a registered VWO account; browser is on the password reset page | 1. Enter the registered email address on the reset page 2. Submit the form | A confirmation is displayed that a reset link has been sent; the user receives an email containing a secure password reset token/link. **Exact confirmation message text:** `Insufficient information to determine` — PRD does not specify the copy. | Traced — PRD: "streamlined password reset with secure token generation"; "Multiple recovery options (email-based reset)" |
| TC_LOGIN_018 | Forgot Password behavior for an unregistered email address | Forgot Password | High | Browser is on the password reset page | 1. Enter an email address not registered with VWO 2. Submit the form | The system displays a response. **Whether the response reveals if the email is registered or not:** `Insufficient information to determine` — PRD mentions "clear, actionable error messages" but does not specify the exact handling for unregistered emails in the reset flow. | Insufficient information to determine — PRD does not specify this behavior |

---

## Category 7: Account Registration (Free Trial CTA)

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result | Confidence |
|-------|-------|----------|----------|----------------|------------|-----------------|------------|
| TC_LOGIN_019 | Account Registration / Free Trial link is visible on the login page | Registration | Medium | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Inspect the login page for a registration or free trial link | A link or call-to-action directing new users to create an account or start a free trial is visible. **Exact link text:** `Inference (low confidence)` — PRD mentions "Account Registration Link for free trial signup" but does not specify the label. | Traced — PRD: "Account Registration Link for free trial signup" |
| TC_LOGIN_020 | Registration link navigates to the VWO signup / account creation page | Registration | Medium | Registration link is visible on the login page | 1. Navigate to app.wingify.com 2. Click the registration / free trial link | The browser navigates to a signup or account creation page. **Exact destination URL:** `Insufficient information to determine` — PRD does not specify the URL path. | Traced (concept) — PRD: "Account Registration Link for free trial signup"; destination URL: Insufficient information to determine |

---

## Category 8: Social Login

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result | Confidence |
|-------|-------|----------|----------|----------------|------------|-----------------|------------|
| TC_LOGIN_021 | Google login option is visible on the login page | Social Login | High | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Inspect the login page for a Google login option | A Google login button or link is visible. **Exact button label:** `Inference (low confidence)` — PRD lists "Google" as a supported social login provider; the specific UI label (e.g., "Sign in with Google") is not stated. | Traced — PRD: "social login (Google, Microsoft) support" |
| TC_LOGIN_022 | Microsoft login option is visible on the login page | Social Login | High | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Inspect the login page for a Microsoft login option | A Microsoft login button or link is visible. **Exact button label:** `Inference (low confidence)` — PRD lists "Microsoft" but does not specify the button text. | Traced — PRD: "social login (Google, Microsoft) support" |
| TC_LOGIN_023 | Clicking the Google login option initiates the Google OAuth flow | Social Login | High | Browser is open at app.wingify.com; user has a Google account | 1. Navigate to app.wingify.com 2. Click the Google login option | The browser initiates the Google OAuth authorization flow; the user is presented with Google account selection or authentication. | Traced — PRD: "OAuth" and "social login (Google)" support |

---

## Category 9: Security

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result | Confidence |
|-------|-------|----------|----------|----------------|------------|-----------------|------------|
| TC_LOGIN_024 | Brute force protection activates after repeated failed login attempts | Security | Critical | User has a registered VWO account | 1. Navigate to app.wingify.com 2. Enter the registered email and an incorrect password 3. Click **Login** 4. Repeat multiple times in quick succession | The system activates rate limiting or an account lockout mechanism after a number of failed attempts; an appropriate message is displayed. **Exact threshold (e.g., "after 5 attempts"):** `Insufficient information to determine` — PRD states "rate limiting / brute force protection" but does not define the threshold. | Traced (concept) — PRD: "Rate limiting / brute force protection"; threshold: Insufficient information to determine |
| TC_LOGIN_025 | Login page is served over HTTPS with a valid TLS certificate | Security | Critical | Browser is open | 1. Navigate to `http://app.wingify.com` 2. Observe the protocol and certificate | The connection uses HTTPS; a valid SSL/TLS certificate is present; the browser shows no security warnings. | Traced — PRD: "HTTPS/SSL-TLS enforcement" |
| TC_LOGIN_026 | Password field input is masked by default | Security | Critical | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Click the Password field 3. Type any characters | Typed characters are masked (displayed as bullets or asterisks); the actual password text is not visible in the input field. | Traced — PRD: "Encrypted password storage"; OWASP authentication compliance implies masking — `Inference (low confidence)` for the masking itself as PRD does not explicitly state it, but OWASP compliance (which is stated) requires it. | Inference (low confidence) — PRD states "OWASP authentication guideline compliance"; password masking is an OWASP requirement but is not explicitly listed as a standalone feature in the PRD |

---

## Category 10: UI / UX

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result | Confidence |
|-------|-------|----------|----------|----------------|------------|-----------------|------------|
| TC_LOGIN_027 | Auto-focus is set on the first input field on page load | UI/UX | Medium | Browser is open | 1. Navigate to app.wingify.com 2. Observe which element is focused immediately after page load (without clicking) | The first input field (Email) is automatically focused; the user can begin typing without clicking. | Traced — PRD: "Auto-focus on first input field" |
| TC_LOGIN_028 | VWO logo and design-system branding are visible on the login page | UI/UX | Medium | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Inspect the page for VWO branding elements | The VWO logo is displayed; the design follows the VWO design system and color scheme. | Traced — PRD: "VWO design system / color scheme alignment" |
| TC_LOGIN_029 | Light Mode displays the login page with a light theme | UI/UX | Medium | Browser is open at app.wingify.com; theme toggle is available | 1. Navigate to app.wingify.com 2. Select **Light Mode** from the theme toggle | The login page is displayed in Light Mode (light background, dark text). **Exact toggle control label or location:** `Inference (low confidence)` — PRD mentions Light/Dark Mode support but does not describe the toggle control. | Traced — PRD: "Light and Dark Mode support" |
| TC_LOGIN_030 | Dark Mode switches the login page to a dark theme | UI/UX | Medium | Browser is open at app.wingify.com; theme toggle is available | 1. Navigate to app.wingify.com 2. Select **Dark Mode** from the theme toggle | The login page switches to Dark Mode (dark background, light text); the change is applied without a full page reload. **Exact behavior:** `Inference (low confidence)` — no-reload behavior is assumed from modern SPA standards, not stated in PRD. | Traced — PRD: "Light and Dark Mode support"; no-reload assumption: Inference (low confidence) |
| TC_LOGIN_031 | Product Announcements banner is displayed on the login page | UI/UX | Low | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Observe the page for a Product Announcements section | A Product Announcements banner is visible on the login page. **Exact content of the banner:** `Insufficient information to determine` — PRD mentions the banner exists but does not specify its content. | Traced — PRD: "Product Announcements banner (Light/Dark Mode options)" |
| TC_LOGIN_032 | Loading indicator is displayed while authentication is being processed | UI/UX | High | Browser is open at app.wingify.com | 1. Enter valid email and password 2. Click **Login** 3. Immediately observe the button and page state | A loading indicator (spinner, progress bar, or disabled button) is displayed during the authentication request. **Exact loading control type:** `Inference (low confidence)` — PRD states "Loading states during authentication processing" without specifying the UI control used. | Traced — PRD: "Loading states during authentication processing"; control type: Inference (low confidence) |

---

## Category 11: Accessibility

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result | Confidence |
|-------|-------|----------|----------|----------------|------------|-----------------|------------|
| TC_LOGIN_033 | Full keyboard navigation through the login form | Accessibility | High | Browser is open at app.wingify.com | 1. Navigate to app.wingify.com 2. Use **Tab** to move through all interactive form elements 3. Use **Shift+Tab** to navigate backwards 4. Use **Enter** to submit | All form elements are reachable and operable via keyboard; visible focus indicators are present. **Expected tab order:** `Inference (low confidence)` — PRD states "Full keyboard accessibility" without specifying the tab order. | Traced — PRD: "Full keyboard accessibility" |
| TC_LOGIN_034 | Login form fields have ARIA labels readable by screen readers | Accessibility | High | Screen reader is active; browser is open at app.wingify.com | 1. Enable a screen reader 2. Navigate to app.wingify.com 3. Tab through all form elements | The screen reader announces meaningful labels for each form element. **Exact ARIA label text:** `Insufficient information to determine` — PRD states "ARIA labels" are present but does not define their values. | Traced — PRD: "Screen reader support (ARIA labels)"; exact label text: Insufficient information to determine |
| TC_LOGIN_035 | Login page remains usable in OS high contrast mode | Accessibility | Medium | OS high contrast mode is enabled; browser is open at app.wingify.com | 1. Enable high contrast mode in the operating system 2. Navigate to app.wingify.com 3. Verify all text, buttons, and fields are readable | All elements remain visible and distinguishable in high contrast mode. | Traced — PRD: "High contrast mode for visually impaired users" |

---

## Category 12: Mobile / Responsive Design

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result | Confidence |
|-------|-------|----------|----------|----------------|------------|-----------------|------------|
| TC_LOGIN_036 | Login page renders correctly on a mobile viewport | Mobile/Responsive | High | Browser DevTools available or physical mobile device | 1. Open app.wingify.com on a mobile device or emulate a narrow viewport 2. Inspect the layout | The login form is fully visible without horizontal scrolling; all elements are properly sized for mobile. | Traced — PRD: "Responsive/mobile-optimized with touch-friendly controls" |
| TC_LOGIN_037 | Touch targets on the login form meet mobile usability standards | Mobile/Responsive | Medium | Mobile device or touch-emulation environment available | 1. Open app.wingify.com on a mobile device 2. Tap on the Email field, Password field, Remember Me checkbox, and Login button | All interactive elements respond correctly to touch input without requiring a precise tap. **Minimum tap target size:** `Inference (low confidence)` — PRD states "touch-friendly controls" without specifying pixel dimensions. | Traced — PRD: "touch-friendly controls"; size spec: Inference (low confidence) |
| TC_LOGIN_038 | Email input triggers the email-type keyboard on mobile | Mobile/Responsive | Medium | Mobile device or touch-emulation environment available | 1. Open app.wingify.com on a mobile device 2. Tap on the Email input field | The mobile keyboard that appears is the email-type keyboard with `@` and `.` keys prominently displayed. | Traced — PRD: "Email format verification with mobile keyboard support" |

---

## Category 13: Performance

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result | Confidence |
|-------|-------|----------|----------|----------------|------------|-----------------|------------|
| TC_LOGIN_039 | Login page loads within 2 seconds on a standard connection | Performance | High | Browser DevTools Network panel is accessible; cache is cleared | 1. Open browser DevTools → Network tab 2. Clear browser cache 3. Navigate to app.wingify.com 4. Record the total page load time | The page is fully loaded and interactive within **2 seconds**. | Traced — PRD: "Page load within 2 seconds" (explicitly stated) |

---

## Category 14: Session Management

| TC ID | Title | Category | Priority | Pre-conditions | Test Steps | Expected Result | Confidence |
|-------|-------|----------|----------|----------------|------------|-----------------|------------|
| TC_LOGIN_040 | Session expires after the configured idle timeout (without Remember Me) | Session Management | High | User is logged in without Remember Me; session timeout is configured | 1. Log in without Remember Me 2. Leave the browser idle for the configured timeout period 3. Attempt to interact with the dashboard | The session expires; the user is automatically logged out. **Exact timeout duration:** `Insufficient information to determine` — PRD states "configurable timeout periods" but does not define a specific default value. | Traced (concept) — PRD: "Session management with configurable timeout periods"; exact duration: Insufficient information to determine |
| TC_LOGIN_041 | Expired session redirects the user to the login page | Session Management | High | User's session has expired (see TC_LOGIN_040) | 1. With an expired session, navigate to any authenticated VWO URL | The browser redirects to the login page; the user cannot access authenticated content without re-authenticating. | Traced — PRD: "Session management"; OWASP authentication compliance implies redirect behavior — `Inference (low confidence)` for the specific redirect behavior. | Inference (low confidence) — PRD states session management and OWASP compliance; specific redirect-on-expiry behavior is not explicitly described |

---

## Test Case Summary

| Category | TC Count | Critical | High | Medium | Low |
|----------|----------|----------|------|--------|-----|
| Happy Path / Positive | 3 | 3 | 0 | 0 | 0 |
| Email Field Validation | 4 | 1 | 1 | 1 | 1 |
| Password Field Validation | 3 | 2 | 1 | 0 | 0 |
| Real-time Field Validation | 2 | 0 | 1 | 1 | 0 |
| Remember Me | 2 | 0 | 2 | 0 | 0 |
| Forgot Password | 4 | 1 | 3 | 0 | 0 |
| Account Registration | 2 | 0 | 0 | 2 | 0 |
| Social Login | 3 | 0 | 3 | 0 | 0 |
| Security | 3 | 2 | 0 | 0 | 0 |
| UI / UX | 6 | 0 | 1 | 3 | 2 |
| Accessibility | 3 | 0 | 2 | 1 | 0 |
| Mobile / Responsive | 3 | 0 | 1 | 2 | 0 |
| Performance | 1 | 0 | 1 | 0 | 0 |
| Session Management | 2 | 0 | 2 | 0 | 0 |
| **TOTAL** | **41** | **9** | **18** | **10** | **3** |

---

---

*All test cases are derived from: Product Requirements Document — VWO Login Dashboard (Wingify)*
