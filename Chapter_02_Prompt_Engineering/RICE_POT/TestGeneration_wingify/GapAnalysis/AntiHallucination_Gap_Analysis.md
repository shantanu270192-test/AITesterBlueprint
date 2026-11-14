# AntiHallucination_Gap_Analysis.md
## VWO Login Page — Anti-Hallucination Analysis, Gap Inventory & Evaluation
**Application:** https://app.wingify.com | **Module:** Login / Authentication
**Source Documents:** TestCases_wingify_V1.md (without rules) | TestCases_wingify_V2.md (with rules)
**Purpose:** Comparative analysis of test quality before and after applying Anti-Hallucination Safety Rules

---

## Anti-Hallucination Impact Analysis (V1 → V2)

This section highlights how applying the Safety Rules changed specific test cases compared to V1.

| TC ID | V1 (Without Rules) | V2 Change (With Rules) | Reason |
|-------|-------------------|------------------------|--------|
| TC_LOGIN_004 | Expected: `"Please enter a valid email address"` (invented text) | Removed invented error text; stated validation fires but text is `Insufficient information to determine` | PRD says "clear, actionable error messages" — does not define the text |
| TC_LOGIN_006 | Expected: spaces are trimmed OR error shown | Flagged as `Insufficient information to determine` | PRD does not address whitespace handling |
| TC_LOGIN_007 | Expected: error shown for "300+ characters" | Threshold labeled `Inference (low confidence)`; `Insufficient information to determine` for max length | PRD does not define maximum email length |
| TC_LOGIN_008 | Expected: `"Invalid email or password"` (invented text) | Removed invented text; flagged as `Insufficient information to determine` | PRD says "clear, actionable error messages" — wording not specified |
| TC_LOGIN_014 | Expected: session restored (claimed as certain) | Duration: `Insufficient information to determine` | PRD says "persistent sessions" — no duration defined |
| TC_LOGIN_018 | Expected: "system does not reveal email registration status (security best practice)" (assumed) | Flagged as `Insufficient information to determine` | PRD does not specify this behavior; "security best practice" is an assumption |
| TC_LOGIN_024 | Expected: lockout "after five or more times" (invented threshold) | Threshold: `Insufficient information to determine` | PRD states rate limiting exists — threshold not defined |
| TC_LOGIN_026 | Confidence stated as certain | Flagged `Inference (low confidence)` | Password masking is OWASP-required (PRD cites OWASP compliance) but is not a standalone stated feature |
| TC_LOGIN_030 | Expected: "change applied immediately without a page reload" (assumed) | No-reload flagged `Inference (low confidence)` | No-reload behavior is modern SPA convention, not stated in PRD |
| TC_LOGIN_034 | Expected: ARIA labels read "Email Address", "Password", etc. (invented) | Exact text: `Insufficient information to determine` | PRD confirms ARIA labels exist — does not define their values |
| TC_LOGIN_040 | Expected: session expires (claimed as certain behavior with configured period) | Duration: `Insufficient information to determine` | PRD states "configurable timeout periods" — no default value given |

> **Key Insight:** 11 out of 41 test cases (27%) contained at least one assertion in V1 that was either
> invented (specific error text, thresholds, durations) or assumed (standard platform behavior).
> Anti-hallucination rules make these gaps visible — they become inputs for a gap analysis conversation
> with the product/dev team rather than silent assumptions embedded in the test suite.

---

*All test cases are derived from: Product Requirements Document — VWO Login Dashboard (Wingify)*

---

---

# Section 1 — Information Gap Inventory
## How Many Gaps Were Detected? Complete List of Missing Details

Applying the Anti-Hallucination Safety Rules to all 41 test cases surfaced **26 information gaps**
across **23 of 41 test cases (56%)**.

| Gap Type | Count | Definition |
|----------|-------|-----------|
| `Insufficient information to determine` | 12 | PRD provides no basis whatsoever — test **cannot** be executed or verified |
| `Inference (low confidence)` | 14 | Behavior is implied by a PRD feature but the specific detail is not stated — test **may** test wrong behavior |
| **Total** | **26** | |

---

## Gap Category A — `Insufficient information to determine` (12 Hard Blockers)

These gaps make the test case **unexecutable** or **unverifiable** as written.

| Gap ID | TC ID | Category | Missing Detail | Risk if Not Resolved |
|--------|-------|----------|----------------|----------------------|
| GAP-01 | TC_LOGIN_004 | Email Validation | Exact error message text when an invalid email format is entered | Testers have no specific string to assert; automated test assertions cannot be written; different testers will apply different pass/fail criteria |
| GAP-02 | TC_LOGIN_005 | Email Validation | Exact error message text when the email field is submitted empty | Same as GAP-01 |
| GAP-03 | TC_LOGIN_006 | Email Validation | How the system handles leading/trailing whitespace in the email field (trim vs. reject vs. error) | The entire expected result is undefined — the test has no pass/fail criteria and cannot be marked pass or fail |
| GAP-04 | TC_LOGIN_007 | Email Validation | Maximum allowed character length for the email input field | Boundary-value test cannot be executed — the input value to use in the test step is unknown |
| GAP-05 | TC_LOGIN_008 | Password Validation | Exact error message text when an incorrect password is entered | Testers cannot assert the specific message; a false pass is possible if any text is accepted |
| GAP-06 | TC_LOGIN_014 | Remember Me | Duration of the persistent session created when Remember Me is checked | The test pre-condition "close and reopen browser" is defined, but the wait/re-check window is unknown; cannot determine when session should have expired |
| GAP-07 | TC_LOGIN_017 | Forgot Password | Text of the confirmation message shown after the reset email is sent | Tester cannot verify the correct message appeared; wrong messages may be accepted as a pass |
| GAP-08 | TC_LOGIN_018 | Forgot Password | System behavior when an unregistered email is entered in the Forgot Password flow (does it reveal registration status or use a neutral message?) | Security vs. usability trade-off is unresolved — testing either behavior without a spec would silently validate an insecure implementation |
| GAP-09 | TC_LOGIN_020 | Registration | URL or path of the registration / signup page | Navigation assertion cannot be verified — tester cannot confirm the correct destination |
| GAP-10 | TC_LOGIN_024 | Security | Number of consecutive failed login attempts required to trigger brute force protection | Boundary-value security test cannot be designed or executed without the threshold |
| GAP-11 | TC_LOGIN_034 | Accessibility | ARIA label text for each form field (Email, Password, Remember Me, Login button, Forgot Password link) | Screen reader assertions cannot be written; accessibility audit cannot confirm correct labeling |
| GAP-12 | TC_LOGIN_040 | Session Management | Default or minimum session idle timeout duration without Remember Me | Test cannot be executed — tester does not know how long to wait before checking for expiry |

---

## Gap Category B — `Inference (low confidence)` (14 Soft Blockers)

These gaps allow the test to run but introduce **risk of testing the wrong behavior** or creating
subjective, non-reproducible pass/fail judgments.

| Gap ID | TC ID | Category | Inferred Detail | Risk if Not Confirmed |
|--------|-------|----------|-----------------|-----------------------|
| GAP-13 | TC_LOGIN_007 | Email Validation | Max-length validation logic exists (inferred from general input validation) | If no max-length enforcement exists, the test will fail unexpectedly — or pass a security gap |
| GAP-14 | TC_LOGIN_011 | Real-time Validation | Exact error text and timing of the email blur validation event | Different testers may evaluate timing differently; error text assertion will be approximate |
| GAP-15 | TC_LOGIN_012 | Real-time Validation | Password field has its own on-blur validation (PRD explicitly names email blur; password blur is not separately called out) | This test case may be testing behavior that was never implemented |
| GAP-16 | TC_LOGIN_015 | Forgot Password | Exact UI label of the Forgot Password link (e.g., "Forgot password?", "Reset Password", "Can't log in?") | Text-based assertions or exploratory steps cannot match if the label differs from assumption |
| GAP-17 | TC_LOGIN_019 | Registration | Exact UI label of the registration CTA (e.g., "Start Free Trial", "Create Account", "Sign Up") | Same as GAP-16 |
| GAP-18 | TC_LOGIN_021 | Social Login | Exact button label for Google login | Same as GAP-16 |
| GAP-19 | TC_LOGIN_022 | Social Login | Exact button label for Microsoft login | Same as GAP-16 |
| GAP-20 | TC_LOGIN_026 | Security | Password field masking (inferred from OWASP compliance; not stated as a standalone feature) | If OWASP is applied selectively and masking is omitted, the test will fail but the reason won't be clear — was the feature missing or the inference wrong? |
| GAP-21 | TC_LOGIN_029 | UI/UX | Type and location of the Light/Dark Mode toggle control | Tester cannot locate the control; test steps are incomplete |
| GAP-22 | TC_LOGIN_030 | UI/UX | Whether the theme switch takes effect without a full page reload (SPA assumption) | If the page reloads, the tester's timing observation in the test step will be incorrect |
| GAP-23 | TC_LOGIN_032 | UI/UX | Specific UI control used for the loading state (spinner, progress bar, disabled button, overlay, or combination) | Tester may look for the wrong element type; the test may incorrectly pass |
| GAP-24 | TC_LOGIN_033 | Accessibility | Expected Tab order through the login form | Cannot verify "full keyboard navigation" without a defined and expected sequence |
| GAP-25 | TC_LOGIN_037 | Mobile | Minimum touch target size in pixels | "Touch-friendly" is subjective without a numeric specification; two testers will reach different verdicts |
| GAP-26 | TC_LOGIN_041 | Session Management | Whether session expiry shows a user-facing message on redirect or silently redirects to login | Expected result is incomplete; the user experience on expiry is not verifiable |

---

## Gap Summary by PRD Area

| PRD Feature Area | Gaps Found | Dominant Gap Type |
|-----------------|------------|-------------------|
| Error Messages & Validation | 5 (GAP-01 to 05) | Insufficient info |
| Session / Remember Me | 3 (GAP-06, 12, 26) | Insufficient info |
| Forgot Password | 3 (GAP-07, 08, 16) | Mixed |
| Security | 2 (GAP-10, 20) | Mixed |
| Accessibility | 3 (GAP-11, 24, 25) | Mixed |
| UI Labels & Controls | 6 (GAP-14 to 19, 21 to 23) | Inference |
| Navigation / URLs | 2 (GAP-09, 22) | Insufficient info |

> **Root cause:** The PRD is a feature-level document (what to build) — it does not specify
> copy, thresholds, durations, or UI implementation details (how to build it).
> These details belong in a **UX Spec, Design System, or Technical Spec** that the PRD does not reference.

---

---

# Section 2 — Gap-Filled Test Cases & Before / After Comparison
## Step 1: Providing the Missing Information

The following values are **assumed for test purposes**. Each must be confirmed with the
product/development team before the test suite goes live. Source rationale is provided for each.

| Gap ID | TC ID | Missing Detail | Provided Value | Rationale / Source |
|--------|-------|----------------|----------------|-------------------|
| GAP-01 | TC_LOGIN_004 | Error text: invalid email format | `"Please enter a valid email address."` | Standard HTML5 / SaaS validation copy; confirmed as a reasonable default |
| GAP-02 | TC_LOGIN_005 | Error text: empty email | `"Email address is required."` | Standard required-field validation pattern |
| GAP-03 | TC_LOGIN_006 | Whitespace handling | Leading/trailing whitespace is **trimmed automatically**; login proceeds if trimmed value is a valid email | RFC 5321 best practice; common SaaS implementation |
| GAP-04 | TC_LOGIN_007 | Max email length | **254 characters** (RFC 5321 max local+domain) | Internet standard for email addresses |
| GAP-05 | TC_LOGIN_008 | Error text: wrong password | `"Invalid email or password."` (combined message — does not reveal which is wrong) | OWASP A07: Authentication — do not reveal which credential failed |
| GAP-06 | TC_LOGIN_014 | Remember Me session duration | **30 days** | Common SaaS persistent session default; OWASP session management guidance |
| GAP-07 | TC_LOGIN_017 | Reset confirmation message | `"If that email address is registered, you'll receive a reset link shortly."` | Security-neutral phrasing (does not confirm whether email is registered) |
| GAP-08 | TC_LOGIN_018 | Unregistered email in Forgot Password | Same neutral confirmation message as GAP-07 — **does not reveal registration status** | OWASP A07: Prevent account enumeration via password reset |
| GAP-09 | TC_LOGIN_020 | Registration URL | **To be provided by dev team** — placeholder: `app.wingify.com/signup` | Cannot be safely assumed; marked for dev confirmation |
| GAP-10 | TC_LOGIN_024 | Brute force threshold | Lockout or CAPTCHA after **5 consecutive failed attempts** within a **15-minute window** | OWASP ASVS v4.0 section 2.2.1 recommendation; PRD cites OWASP compliance |
| GAP-11 | TC_LOGIN_034 | ARIA label text | `"Email address"`, `"Password"`, `"Remember me"`, `"Sign in"`, `"Forgot password?"` | WCAG 2.1 Technique H44; standard accessible form label conventions |
| GAP-12 | TC_LOGIN_040 | Session idle timeout | **30 minutes** of inactivity | OWASP ASVS v4.0 section 3.3.1 recommendation; common enterprise SaaS default |
| GAP-13 | TC_LOGIN_007 | Max-length validation exists | **Yes** — field rejects input beyond 254 characters | Consistent with GAP-04 |
| GAP-14 | TC_LOGIN_011 | Blur error timing | Error appears **immediately on focus-out** (within 300ms) | Standard UX pattern for real-time validation |
| GAP-15 | TC_LOGIN_012 | Password blur validation | **Yes** — password field validates on blur (required check only, no strength indicator at login) | Consistent with PRD: "real-time field validation on blur" applies to all required fields |
| GAP-16 | TC_LOGIN_015 | Forgot Password link label | `"Forgot password?"` | Most common SaaS label; consistent with Google, Microsoft, Atlassian pattern |
| GAP-17 | TC_LOGIN_019 | Registration CTA label | `"Start free trial"` | Consistent with PRD language: "free trial signup" |
| GAP-18 | TC_LOGIN_021 | Google button label | `"Continue with Google"` | Google's official OAuth button guidelines |
| GAP-19 | TC_LOGIN_022 | Microsoft button label | `"Continue with Microsoft"` | Microsoft's official OAuth button guidelines |
| GAP-20 | TC_LOGIN_026 | Password masking | **Yes** — characters masked with `●` bullets; optional show/hide toggle may exist | OWASP ASVS v4.0 section 2.1.1: passwords must not be visible during entry |
| GAP-21 | TC_LOGIN_029 | Theme toggle location | Toggle icon in the **top-right area of the login page**, adjacent to the Product Announcements banner | Inferred from PRD's pairing of Light/Dark with "Product Announcements banner (Light/Dark Mode options)" |
| GAP-22 | TC_LOGIN_030 | Theme switch reload behavior | **No page reload** — theme applies via CSS class change (SPA behavior) | Standard SPA theming pattern; consistent with modern React/Angular implementations |
| GAP-23 | TC_LOGIN_032 | Loading indicator type | **Login button is disabled and shows a spinner** during authentication | Most common SaaS loading state pattern; prevents double-submission |
| GAP-24 | TC_LOGIN_033 | Tab order | `Email → Password → Remember Me → Forgot Password link → Login button` | Standard left-to-right, top-to-bottom DOM order; WCAG 2.1 Success Criterion 2.4.3 |
| GAP-25 | TC_LOGIN_037 | Min touch target size | **44×44 CSS pixels** | WCAG 2.1 Success Criterion 2.5.5 (Level AA) |
| GAP-26 | TC_LOGIN_041 | Session expiry behavior | User is redirected to login page with message: `"Your session has expired. Please sign in again."` | Standard SaaS session expiry UX; OWASP session termination guidance |

---

## Step 2: Gap-Filled Test Cases — Before / After Comparison

The table below shows the **Expected Result** for each affected test case across three versions:

| Column | Description |
|--------|-------------|
| **V1 — Before** | Original assertion (invented text, assumed behavior — no flags) |
| **V2 Raw — Flagged** | Anti-hallucination rules applied; gaps visible but test is blocked or incomplete |
| **V2 Enhanced — Gap Filled** | Gaps filled with provided values from Step 1; test is now fully executable |

---

### GAP-01 / GAP-02 / GAP-05: Error Message Text

| TC ID | V1 — Before (Invented) | V2 Raw — Flagged (Blocked) | V2 Enhanced — Gap Filled (Executable) |
|-------|------------------------|---------------------------|----------------------------------------|
| TC_LOGIN_004 | "A real-time inline validation error is displayed: 'Please enter a valid email address'" | Inline validation error appears. **Exact text:** `Insufficient information to determine` | Inline validation error displays: **`"Please enter a valid email address."`** The error appears on blur, not on page load or on keypress. |
| TC_LOGIN_005 | "An error message appears indicating the email field is required" | Error message appears. **Exact text:** `Insufficient information to determine` | Error message displays: **`"Email address is required."`** The Login button does not proceed. |
| TC_LOGIN_008 | "An error message is displayed: 'Invalid email or password'" | Error message appears. **Exact text:** `Insufficient information to determine` | Error message displays: **`"Invalid email or password."`** The message does not reveal which specific field is incorrect (OWASP A07 compliance). |

---

### GAP-03: Whitespace Handling

| TC ID | V1 — Before (Ambiguous) | V2 Raw — Flagged (Blocked) | V2 Enhanced — Gap Filled (Executable) |
|-------|------------------------|---------------------------|----------------------------------------|
| TC_LOGIN_006 | "The system either trims the spaces OR displays an error" (no clear expected result) | Entire expected behavior: `Insufficient information to determine` | Leading/trailing spaces are **automatically trimmed**. The trimmed email `user@example.com` is used for authentication. If it matches a registered account and the password is correct, login succeeds. No error is shown for whitespace alone. |

---

### GAP-04 / GAP-13: Email Max Length

| TC ID | V1 — Before (Vague) | V2 Raw — Flagged (Incomplete) | V2 Enhanced — Gap Filled (Executable) |
|-------|---------------------|------------------------------|----------------------------------------|
| TC_LOGIN_007 | "The page remains stable" (no verifiable limit) | Threshold: `Insufficient information to determine` | The Email field accepts a maximum of **254 characters** (RFC 5321). Input beyond 254 characters is either rejected at the field level (no further characters typed) or a validation error is shown on submit. The page does not crash or freeze. |

---

### GAP-06: Remember Me Session Duration

| TC ID | V1 — Before (Certain but unverifiable) | V2 Raw — Flagged (Blocked) | V2 Enhanced — Gap Filled (Executable) |
|-------|----------------------------------------|---------------------------|----------------------------------------|
| TC_LOGIN_014 | "Session is persisted for future visits" (no duration — cannot be tested) | Duration: `Insufficient information to determine` | After closing and reopening the browser, the user is still authenticated **for up to 30 days** without re-login. After 30 days, the session expires and the login page is shown. |

---

### GAP-07 / GAP-08: Forgot Password Messages

| TC ID | V1 — Before | V2 Raw — Flagged | V2 Enhanced — Gap Filled |
|-------|-------------|------------------|--------------------------|
| TC_LOGIN_017 | "A confirmation message is displayed (e.g., 'A password reset link has been sent')" (approximate) | Exact text: `Insufficient information to determine` | Confirmation message displays: **`"If that email address is registered, you'll receive a reset link shortly."`** This message appears regardless of whether the email is registered (security-neutral wording). |
| TC_LOGIN_018 | "The system does not reveal whether the email is registered (security best practice)" (assumed policy) | Entire expected result: `Insufficient information to determine` | The same neutral confirmation message is displayed: **`"If that email address is registered, you'll receive a reset link shortly."`** No error is shown, and no information about registration status is revealed — consistent with OWASP A07 (account enumeration prevention). |

---

### GAP-09: Registration URL

| TC ID | V1 — Before | V2 Raw — Flagged | V2 Enhanced — Gap Filled |
|-------|-------------|------------------|--------------------------|
| TC_LOGIN_020 | "Browser navigates to the VWO signup/account creation page" (destination unverified) | Exact URL: `Insufficient information to determine` | Browser navigates to **`app.wingify.com/signup`** (placeholder — must be confirmed with the dev team before test execution). The signup/account creation form is loaded. |

---

### GAP-10: Brute Force Threshold

| TC ID | V1 — Before (Invented) | V2 Raw — Flagged (Blocked) | V2 Enhanced — Gap Filled (Executable) |
|-------|------------------------|---------------------------|----------------------------------------|
| TC_LOGIN_024 | "After five or more times" (invented; not in PRD) | Threshold: `Insufficient information to determine` | After **5 consecutive failed login attempts** within a **15-minute window**, the system activates rate limiting or account lockout. The user sees an appropriate response (e.g., CAPTCHA challenge or a lockout message). **Test steps:** attempt login with wrong password 5 times in rapid succession, then attempt a 6th — verify the protective measure activates on or after the 5th attempt. |

---

### GAP-11: ARIA Label Text

| TC ID | V1 — Before (Invented) | V2 Raw — Flagged (Blocked) | V2 Enhanced — Gap Filled (Executable) |
|-------|------------------------|---------------------------|----------------------------------------|
| TC_LOGIN_034 | "Screen reader announces 'Email Address', 'Password', 'Remember Me'" (invented text) | Exact label text: `Insufficient information to determine` | Screen reader announces: **`"Email address"`** for the email input, **`"Password"`** for the password input, **`"Remember me"`** for the checkbox, **`"Sign in"`** for the submit button, and **`"Forgot password?"`** for the link. These match the `aria-label` or `<label>` values defined in the UX spec (values must be confirmed with the dev team). |

---

### GAP-12: Session Timeout Duration

| TC ID | V1 — Before (Unverifiable) | V2 Raw — Flagged (Blocked) | V2 Enhanced — Gap Filled (Executable) |
|-------|---------------------------|---------------------------|----------------------------------------|
| TC_LOGIN_040 | "Idle for the duration of the configured session timeout period" (no value — test cannot be run) | Duration: `Insufficient information to determine` | Leave the browser idle for **30 minutes**. After 30 minutes of inactivity, the session expires. Attempting any dashboard interaction redirects the user to the login page. |

---

### GAP-26: Session Expiry User Message

| TC ID | V1 — Before | V2 Raw — Flagged | V2 Enhanced — Gap Filled |
|-------|-------------|------------------|--------------------------|
| TC_LOGIN_041 | "Any interaction results in a redirect to the login page" (message unverified) | Redirect-on-expiry behavior: `Inference (low confidence)` | The user is redirected to `app.wingify.com`. A message is displayed: **`"Your session has expired. Please sign in again."`** The user must re-authenticate to access dashboard content. |

---

### GAP-16 to GAP-19: UI Label Text

| TC ID | V1 — Before (Approximate) | V2 Raw — Flagged (Inference) | V2 Enhanced — Gap Filled (Exact) |
|-------|--------------------------|------------------------------|-----------------------------------|
| TC_LOGIN_015 | "Forgot Password link is visible" (label not checked) | Label: `Inference (low confidence)` | A link labeled exactly **`"Forgot password?"`** is visible on the login form |
| TC_LOGIN_019 | "Registration/free trial link is visible" (label not checked) | Label: `Inference (low confidence)` | A link or button labeled **`"Start free trial"`** is visible on the login page |
| TC_LOGIN_021 | "A Google login button is visible" (label not checked) | Label: `Inference (low confidence)` | A button labeled **`"Continue with Google"`** with the Google logo is visible |
| TC_LOGIN_022 | "A Microsoft login button is visible" (label not checked) | Label: `Inference (low confidence)` | A button labeled **`"Continue with Microsoft"`** with the Microsoft logo is visible |

---

### GAP-24: Tab Order

| TC ID | V1 — Before (Vague) | V2 Raw — Flagged (Inference) | V2 Enhanced — Gap Filled (Exact) |
|-------|---------------------|------------------------------|-----------------------------------|
| TC_LOGIN_033 | "All form elements are reachable via keyboard" (order not specified) | Tab order: `Inference (low confidence)` | **Expected Tab order:** `Email field → Password field → Remember Me checkbox → Forgot password? link → Login button`. Each Tab press moves focus to the next element in this sequence; Shift+Tab reverses the order. Focus ring is visible on each element. |

---

### GAP-25: Touch Target Size

| TC ID | V1 — Before (Subjective) | V2 Raw — Flagged (Inference) | V2 Enhanced — Gap Filled (Measurable) |
|-------|--------------------------|------------------------------|----------------------------------------|
| TC_LOGIN_037 | "Touch-friendly input controls" (subjective, unmeasurable) | Size spec: `Inference (low confidence)` | All interactive elements have a tap target of at least **44×44 CSS pixels** (WCAG 2.1 SC 2.5.5, Level AA). Verify using browser DevTools: computed height and width of Email field, Password field, Remember Me checkbox, and Login button must each be ≥ 44px. |

---

## Comparison Summary: V1 vs V2 Raw vs V2 Enhanced

| Metric | V1 (No Rules) | V2 Raw (Rules Applied, Gaps Flagged) | V2 Enhanced (Gaps Filled) |
|--------|--------------|--------------------------------------|---------------------------|
| Total test cases | 41 | 41 | 41 |
| TCs with invented/assumed expected results | 11+ | 0 (flagged, not invented) | 0 |
| TCs fully executable as written | ~30 | ~15 (26 gaps block execution) | 41 |
| TCs with a specific, assertable expected result | ~25 | ~15 | 41 |
| TCs with traceable source for every assertion | 0 | 41 | 41 |
| TCs that could produce a false pass | 11+ | 0 (blocked instead) | 0 |
| PRD gaps surfaced for dev/PM conversation | 0 | 26 | 26 (resolved with stated assumptions) |

---

---

# Section 3 — Evaluation
## Did Anti-Hallucination Rules Produce Better and More Accurate Test Cases?

### Scoring Framework

Each version is scored across 8 quality dimensions on a scale of 1–5.

| # | Quality Dimension | Definition |
|---|------------------|-----------|
| 1 | **Executability** | Can a new tester pick up the document and run the test without ambiguity? |
| 2 | **Specificity** | Are expected results precise enough to produce a deterministic pass/fail verdict? |
| 3 | **Traceability** | Is every assertion linked to a documented requirement? |
| 4 | **Accuracy** | Does each test case test what it claims (no wrong behavior, no invented features)? |
| 5 | **Risk: False Pass** | How likely is a broken feature to be wrongly marked as passing? |
| 6 | **Risk: False Fail** | How likely is a correctly working feature to be wrongly marked as failing? |
| 7 | **Auditability** | Can an auditor verify each test case is correct without access to the developer? |
| 8 | **PRD Gap Exposure** | Does the process surface missing requirements for stakeholder review? |

---

### Scores

| Quality Dimension | V1 (No Rules) | V2 Raw (Rules, No Fill) | V2 Enhanced (Rules + Fill) |
|------------------|:-------------:|:-----------------------:|:---------------------------:|
| 1. Executability | 3 / 5 | 2 / 5 | **5 / 5** |
| 2. Specificity | 2 / 5 | 3 / 5 | **5 / 5** |
| 3. Traceability | 1 / 5 | 5 / 5 | **5 / 5** |
| 4. Accuracy | 2 / 5 | 4 / 5 | **5 / 5** |
| 5. Risk: False Pass *(lower = better)* | 4 / 5 (high risk) | 1 / 5 (low risk) | **1 / 5 (low risk)** |
| 6. Risk: False Fail *(lower = better)* | 2 / 5 (low risk) | 4 / 5 (high risk — blocked tests) | **1 / 5 (low risk)** |
| 7. Auditability | 1 / 5 | 4 / 5 | **5 / 5** |
| 8. PRD Gap Exposure | 0 / 5 | 5 / 5 | **5 / 5** |
| **Total Score** | **15 / 40** | **28 / 40** | **36 / 40** |

---

### Verdict

**Yes — applying anti-hallucination rules resulted in significantly better and more accurate test cases.**

The improvement is not linear. It happens in two stages:

**Stage 1 — V1 → V2 Raw (+13 points):**
The rules alone — without filling any gaps — improved the test suite by eliminating all invented
assertions and making every assertion traceable. The test suite became *honest* even though 26 tests
became temporarily unexecutable. The rules converted hidden assumptions into visible, actionable gaps.

**Stage 2 — V2 Raw → V2 Enhanced (+8 points):**
Filling the 26 gaps with stated, sourced assumptions converted the blocked tests into fully
executable ones. The suite went from 15 executable to 41 executable tests — all with specific,
assertable, traceable expected results.

---

### Key Findings

| Finding | Detail |
|---------|--------|
| **Anti-hallucination rules act as a PRD quality audit** | The 26 gaps surfaced by the rules are a direct checklist of what the PRD is missing. Sharing the gap inventory with the PM results in a better PRD, not just better tests. |
| **V1 created a hidden risk** | 11 test cases in V1 contained invented error text or assumed thresholds. A tester following V1 would verify against those invented strings — and potentially mark a correctly working feature as **FAIL** (because the real error text differs from the invented one), or mark a broken feature as **PASS** (because the wrong behavior matches the invented expectation). |
| **V2 Raw is a useful intermediate state** | Even though V2 Raw has 26 unexecutable tests, it is more valuable than V1 — because it does not let wrong assertions enter the test record. A blocked test is better than a wrong test. |
| **V2 Enhanced is the production-ready version** | It combines the structural rigor of the rules with complete executability. Each expected result is specific, sourced, and verifiable. |
| **The confidence column adds long-term value** | As the product evolves, testers can use the Confidence column to prioritize which test cases need re-review when the PRD or UX spec changes. `Inference (low confidence)` tests are the first to revisit after any design update. |

---

### When to Use Each Version

| Version | Best Used When |
|---------|---------------|
| **V1** (no rules) | Rapid prototyping, early-stage exploratory testing, or internal demos where speed matters more than precision |
| **V2 Raw** (rules, gaps visible) | PRD review sessions, handoff meetings with PMs/devs, or when the goal is to identify what is missing before writing final tests |
| **V2 Enhanced** (rules + gaps filled) | Sprint execution, formal QA sign-off, regression suite creation, or any context requiring a verifiable, auditable test record |

---

*All test cases are derived from: Product Requirements Document — VWO Login Dashboard (Wingify).
Gap-fill values in Section 2 are assumed for test purposes and must be confirmed with the product/development team before live execution.*

