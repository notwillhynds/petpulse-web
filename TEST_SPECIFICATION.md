# PetPulse Web - Test Specification

## 1.0 Introduction

This document describes the test plan and test procedures for PetPulse Web, a Next.js web application for pet health monitoring. It covers functional testing of all user-facing features, authentication flows, external API integrations, and UI component behavior. The document serves as both a planning reference and a detailed enumeration of test cases.

### 1.1 Goals and Objectives

- Verify all pages render correctly and display expected content
- Validate authentication flows (login, signup, OTP verification, logout, session management)
- Confirm user settings operations (name update, password change, email change) work end-to-end with Supabase
- Test external API integrations (TheDog API, TheCat API) including error/fallback states
- Ensure responsive behavior across mobile, tablet, and desktop breakpoints
- Validate form input rules (email format, password length, password match) and error messaging
- Confirm theme toggling (light/dark/system) persists and applies correctly
- Verify protected routes redirect unauthenticated users

### 1.2 Statement of Scope

**In Scope:**

- All application pages: Home (`/`), About (`/about`), Features (`/features`), Subscribe (`/subscribe`), User Settings (`/user/settings`), Education (`/edu`)
- Authentication: login form, signup form with OTP verification, logout, session refresh via middleware
- User profile management: display name update, password change, email change request
- Navbar behavior: auth state rendering, navigation links, active link styling, mobile hamburger menu
- UI components: image carousel, live monitor widget, breed cards (dog and cat), feature preview panel
- Form validation: email regex, password length (≥6), password confirmation match
- Responsive design: dialog vs. drawer form rendering at 768px breakpoint, grid layout changes
- Theme system: light/dark toggle, ThemeColorSync meta tag updates
- External API error handling: loading skeletons, error fallback components, missing image fallback
- Supabase integration: profiles table CRUD, auth operations, RLS policy enforcement

**Out of Scope:**

- Stripe payment processing (not yet wired up; marked TODO PET-19)
- Real harness/sensor data (live monitor widget uses simulated data only)
- Dedicated `/auth/login` page (does not exist; auth is modal-based)
- Performance/load testing
- Accessibility (WCAG) compliance audit
- Cross-browser compatibility beyond standard Chromium/Firefox/Safari
- Backend infrastructure, Supabase server configuration, and SMTP provider setup

---

## 2.0 Test Plan

### 2.1 Software to Be Tested

| Item            | Version | Notes                                      |
| --------------- | ------- | ------------------------------------------ |
| PetPulse Web    | 0.1.0   | Next.js 16.1.6, React 19.2.3, TypeScript 5 |
| Supabase JS SDK | ^2.98.0 | Auth and database operations               |
| Supabase SSR    | ^0.9.0  | Server-side session management             |
| TheDog API      | v1      | Breed data and images                      |
| TheCat API      | v1      | Breed data and images                      |

**Exclusions:** Stripe.js (^9.0.0) is included as a dependency but payment integration is incomplete and not tested.

### 2.3 Testing Tools and Environment

| Category              | Tool / Resource                                                                                                            |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Browser               | Chrome (latest), Firefox (latest), Safari (latest)                                                                         |
| Mobile testing        | Chrome DevTools device emulation (375px, 768px, 1024px, 1440px viewports)                                                  |
| Dev server            | `npm run dev` (localhost:3000)                                                                                             |
| Database              | Supabase project with profiles table and RLS policies applied (`supabase/migrations/001_create_profiles_table.sql`)        |
| External APIs         | Live TheDog API and TheCat API endpoints (API keys in `.env.local`)                                                        |
| Test accounts         | At least two Supabase email/password accounts for auth testing                                                             |
| Environment variables | `.env.local` with `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, `THE_DOG_API_KEY`, `THE_CAT_API_KEY` |
| Build verification    | `npm run build` (production build), `npm run lint` (ESLint)                                                                |

### 2.4 Test Schedule

| Phase   | Description                                                                   | Duration |
| ------- | ----------------------------------------------------------------------------- | -------- |
| Phase 1 | Build and lint verification                                                   | Day 1    |
| Phase 2 | Page rendering and navigation (TC-001 through TC-012)                         | Day 1–2  |
| Phase 3 | Authentication flows (TC-013 through TC-027)                                  | Day 2–3  |
| Phase 4 | User settings operations (TC-028 through TC-042)                              | Day 3–4  |
| Phase 5 | External API and breed cards (TC-043 through TC-052)                          | Day 4    |
| Phase 6 | UI components — carousel, live monitor, feature panel (TC-053 through TC-062) | Day 5    |
| Phase 7 | Responsive design and theme (TC-063 through TC-074)                           | Day 5–6  |
| Phase 8 | Edge cases and error handling (TC-075 through TC-085)                         | Day 6    |
| Phase 9 | Regression and final review                                                   | Day 7    |

---

## 3.0 Test Cases

### 3.1 Page Rendering and Navigation

| ID     | Test Input                                         | Expected Output                                                                                                                                                                | Description                                      |
| ------ | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| TC-001 | Navigate to `/`                                    | Hero section, feature carousel (4 harness images), live monitor widget, feature overview cards, and CTA buttons ("Get Started", "Learn more", "Join the waitlist") are visible | Home page renders all sections                   |
| TC-002 | Navigate to `/about`                               | Mission statement, product overview, and four team member cards (William Hynds, Renad Nofal, Anthony Riad, Makarouis Tagay) are displayed                                      | About page renders team and mission              |
| TC-003 | Navigate to `/features`                            | Page header, FeaturePreviewPanel (pet "Luna · Golden Retriever"), four core capability cards, and breed health guide section with 3 dog + 3 cat breed cards are visible        | Features page renders all sections               |
| TC-004 | Navigate to `/subscribe`                           | Two pricing tier cards are displayed: Basic ($14.99/month) and Pro ($34.99/month with "Popular" badge), each with feature lists and Subscribe buttons                          | Subscribe page renders pricing tiers             |
| TC-005 | Navigate to `/user/settings` while unauthenticated | User is redirected to `/` (home page)                                                                                                                                          | Protected route redirects unauthenticated users  |
| TC-006 | Navigate to `/user/settings` while authenticated   | Settings page loads with three sections: Display Name, Password, and Email. Current email is pre-filled                                                                        | Protected route renders for authenticated users  |
| TC-007 | Navigate to `/edu`                                 | Education page content renders                                                                                                                                                 | Education page loads                             |
| TC-008 | Click "Home" link in navbar from `/about`          | Page navigates to `/`. Home link shows active styling (border-b-2 border-primary)                                                                                              | Navbar Home link navigation                      |
| TC-009 | Click "About" link in navbar from `/`              | Page navigates to `/about`. About link shows active styling                                                                                                                    | Navbar About link navigation                     |
| TC-010 | Click "Features" link in navbar from `/`           | Page navigates to `/features`. Features link shows active styling                                                                                                              | Navbar Features link navigation                  |
| TC-011 | Click "Subscribe" link in navbar from `/`          | Page navigates to `/subscribe`. Subscribe link shows active styling                                                                                                            | Navbar Subscribe link navigation                 |
| TC-012 | View navbar active link on `/`                     | Only Home link has active border styling. Other links do not                                                                                                                   | Active link styling only on exact match for Home |

### 3.2 Authentication — Login

| ID     | Test Input                                                | Expected Output                                                                                                              | Description                             |
| ------ | --------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| TC-013 | Click "Login" button in navbar (desktop, ≥768px)          | Dialog modal opens with email and password fields                                                                            | Login dialog opens on desktop           |
| TC-014 | Click "Login" button in navbar (mobile, <768px)           | Drawer slides down from top with email and password fields                                                                   | Login drawer opens on mobile            |
| TC-015 | Type invalid email (e.g., "notanemail") in login form     | Submit button remains disabled. Email field does not show green border                                                       | Email validation rejects invalid format |
| TC-016 | Type valid email (e.g., "user@example.com") in login form | Email field border turns green. Submit button becomes enabled                                                                | Email validation accepts valid format   |
| TC-017 | Submit login form with valid credentials                  | Loading spinner appears on button. On success, modal closes. Navbar updates to show user dropdown with email                 | Successful login flow                   |
| TC-018 | Submit login form with incorrect password                 | Error message displayed in red text with Info icon. Form remains open. `submitted` resets to allow retry                     | Login error handling — wrong password   |
| TC-019 | Submit login form with non-existent email                 | Supabase error message displayed in red. Form remains open for retry                                                         | Login error handling — unknown user     |
| TC-020 | Press Enter in password field of login form               | Form submits (same as clicking submit button)                                                                                | Enter key triggers login submission     |
| TC-021 | Successfully login, then check navbar                     | Login/SignUp buttons are replaced by user dropdown menu showing user email, Settings link, theme toggle, and Sign Out button | Navbar reflects authenticated state     |

### 3.3 Authentication — Signup

| ID     | Test Input                                               | Expected Output                                                                                         | Description                                    |
| ------ | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ---------------------------------------------- |
| TC-022 | Open signup form, enter email only                       | Submit button disabled. Password fields empty, no green border                                          | Signup requires all fields                     |
| TC-023 | Enter email, password < 6 chars, matching confirm        | Submit button remains disabled                                                                          | Password minimum length enforced (≥6 chars)    |
| TC-024 | Enter email, password ≥ 6 chars, non-matching confirm    | Submit button disabled. Confirm field does not show green border                                        | Password match validation                      |
| TC-025 | Enter valid email, password ≥ 6 chars, matching confirm  | Submit button enabled. Password field border green. Confirm field border green                          | All signup validations pass                    |
| TC-026 | Submit signup with valid new user credentials            | Form transitions to OTP verification stage. Token input field appears. User receives verification email | Signup triggers OTP flow                       |
| TC-027 | Enter correct OTP token in verification field and submit | Verification succeeds. Modal closes. User is authenticated. Navbar updates                              | OTP verification completes signup              |
| TC-028 | Submit signup with already-registered email              | Error message: "User already exists"                                                                    | Duplicate signup detected via identities array |
| TC-029 | Enter incorrect OTP token                                | Error message displayed. User can retry with correct token                                              | OTP verification error handling                |

### 3.4 Authentication — Logout and Session

| ID     | Test Input                                 | Expected Output                                                                 | Description                              |
| ------ | ------------------------------------------ | ------------------------------------------------------------------------------- | ---------------------------------------- |
| TC-030 | Click "Sign out" in user dropdown          | User is signed out. Browser redirects to `/`. Navbar shows Login/SignUp buttons | Logout clears session and redirects      |
| TC-031 | Authenticated user refreshes page          | Session persists. Navbar still shows authenticated state (user dropdown)        | Middleware refreshes session via cookies |
| TC-032 | Authenticated user navigates between pages | Auth state persists across all page transitions. No re-login required           | Session maintained across navigation     |

### 3.5 User Settings — Display Name

| ID     | Test Input                                                                  | Expected Output                                                                                                          | Description                                   |
| ------ | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| TC-033 | Load settings page with existing profile (first_name and last_name set)     | First Name and Last Name fields pre-filled with current values                                                           | Profile data loads into form                  |
| TC-034 | Load settings page with no existing profile                                 | First Name and Last Name fields are empty                                                                                | Empty profile handled gracefully              |
| TC-035 | Enter new first name and last name, click "Update Name" (profile exists)    | Confirmation dialog appears asking to confirm the update                                                                 | Existing profile triggers confirmation dialog |
| TC-036 | Confirm name update in dialog                                               | Name upserted to profiles table. Success message: "Name updated successfully!" with Check icon. Input borders turn green | Name update succeeds with visual feedback     |
| TC-037 | Wait 3 seconds after successful name update                                 | Success message disappears                                                                                               | Success notification auto-clears              |
| TC-038 | Leave both name fields empty, check Update button                           | Update button is disabled                                                                                                | Empty name fields prevent submission          |
| TC-039 | Enter new first name and last name, click "Update Name" (no profile exists) | Name upserted directly without confirmation dialog. Success message displayed                                            | New profile created without dialog            |

### 3.6 User Settings — Password Change

| ID     | Test Input                                              | Expected Output                                                                        | Description                       |
| ------ | ------------------------------------------------------- | -------------------------------------------------------------------------------------- | --------------------------------- |
| TC-040 | Enter new password < 6 characters                       | Error: "Password must be at least 6 characters"                                        | Password minimum length enforced  |
| TC-041 | Enter new password ≥ 6 chars, non-matching confirmation | Error: "Passwords do not match"                                                        | Password match validation         |
| TC-042 | Enter valid matching passwords ≥ 6 chars, submit        | Password updated via Supabase auth. Success message displayed. Password fields cleared | Password change succeeds          |
| TC-043 | Enter valid matching passwords, confirm field           | Confirm password field border turns green when passwords match                         | Visual feedback on password match |

### 3.7 User Settings — Email Change

| ID     | Test Input                                             | Expected Output                                                                                                                           | Description                          |
| ------ | ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| TC-044 | View email section                                     | Current email displayed as readonly text                                                                                                  | Current email shown                  |
| TC-045 | Enter invalid email in new email field                 | "Request Email Change" button remains disabled                                                                                            | Email validation on change request   |
| TC-046 | Enter valid new email, click "Request Email Change"    | Supabase sends verification emails to both old and new addresses. Success message: "Verification emails sent!" with both addresses listed | Email change request sent            |
| TC-047 | After email change requested, view form state          | Form shows success state with instructions to check both inboxes, note about spam folders, and "Request Different Email" button           | Post-request UI state                |
| TC-048 | Click "Request Different Email" after a change request | Form resets to initial state with new email input field                                                                                   | Email change form reset              |
| TC-049 | Enter valid new email in field                         | Email field border turns green                                                                                                            | Visual validation feedback for email |

### 3.8 External API — Breed Cards

| ID     | Test Input                                         | Expected Output                                                                                                              | Description                            |
| ------ | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| TC-050 | Load `/features` page with valid API keys          | Three dog breed cards and three cat breed cards render with images, breed names, and health tips                             | Breed cards fetch and display API data |
| TC-051 | Load `/features` when Dog/Cat API is unreachable   | BreedSectionError component displays: AlertCircle icon, "Could not load breed data", and API unavailability message          | API error fallback renders             |
| TC-052 | Load `/features` page — observe initial state      | BreedCardSkeleton loading placeholders (animated) visible within Suspense boundaries before API data loads                   | Loading skeletons shown during fetch   |
| TC-053 | Breed card renders with API response missing image | Card displays "No image" fallback text in place of image                                                                     | Missing image fallback                 |
| TC-054 | Reload `/features` multiple times                  | Different random breeds appear each time (3 of 10 dogs, 3 of 10 cats selected randomly). Health tips vary (1 of 5 per breed) | Randomization of breeds and tips       |

### 3.9 UI Components — Carousel

| ID     | Test Input                                     | Expected Output                                                                               | Description                         |
| ------ | ---------------------------------------------- | --------------------------------------------------------------------------------------------- | ----------------------------------- |
| TC-055 | View home page carousel                        | First image displayed. Indicator dots visible at bottom. Current dot highlighted (bg-primary) | Carousel renders with initial state |
| TC-056 | Click next arrow on carousel (last image)      | Carousel wraps to first image. First indicator dot highlighted                                | Circular next navigation            |
| TC-057 | Click previous arrow on carousel (first image) | Carousel wraps to last image. Last indicator dot highlighted                                  | Circular previous navigation        |
| TC-058 | Click third indicator dot                      | Third image displayed. Third dot highlighted                                                  | Direct dot navigation               |
| TC-059 | Render carousel with empty images array        | Component returns null — nothing rendered                                                     | Empty carousel edge case            |

### 3.10 UI Components — Live Monitor Widget

| ID     | Test Input                         | Expected Output                                                                                                                                                         | Description                  |
| ------ | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| TC-060 | View home page live monitor widget | Four metric panels visible: Respiratory Rate, Heart Rate, Steps, Temperature. Each shows a sparkline SVG, current value, and unit. "LIVE" badge displayed               | Live monitor initial render  |
| TC-061 | Observe widget for ~5 seconds      | Metric values update approximately every 1.7 seconds. Values stay within defined ranges: breath rate 10–30, heart rate 68–160, steps 120–4200, temperature 99.1–103.8°F | Live data simulation updates |
| TC-062 | Check temperature display format   | Temperature values display with 1 decimal place (e.g., "101.3")                                                                                                         | Number formatting            |

### 3.11 UI Components — Feature Preview Panel

| ID     | Test Input                                | Expected Output                                                                                                                                                                     | Description                               |
| ------ | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| TC-063 | View feature preview panel on `/features` | Panel shows pet "Luna · Golden Retriever", "Stable" status badge, metrics (Heart Rate: 98 bpm, Activity: 7.3k steps, Temperature: 101.1°F), sparkline, and configuration indicators | Feature panel renders hardcoded mock data |

### 3.12 Theme and Styling

| ID     | Test Input                            | Expected Output                                                                                | Description                           |
| ------ | ------------------------------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------- |
| TC-064 | Click Sun icon (light theme toggle)   | Page switches to light theme. `<html>` element has `class="light"`. Sun button shows bg-accent | Light theme applied                   |
| TC-065 | Click Moon icon (dark theme toggle)   | Page switches to dark theme. `<html>` element has `class="dark"`. Moon button shows bg-accent  | Dark theme applied                    |
| TC-066 | Switch to dark theme, check meta tag  | `<meta name="theme-color">` content set to `#091a2a`                                           | ThemeColorSync updates meta for dark  |
| TC-067 | Switch to light theme, check meta tag | `<meta name="theme-color">` content set to `#ffffff`                                           | ThemeColorSync updates meta for light |
| TC-068 | Toggle theme while authenticated      | Theme toggle available inside user dropdown menu. Toggle works the same as unauthenticated     | Auth-state theme toggle               |

### 3.13 Responsive Design

| ID     | Test Input                                | Expected Output                                                              | Description                |
| ------ | ----------------------------------------- | ---------------------------------------------------------------------------- | -------------------------- |
| TC-069 | View navbar at <768px                     | Hamburger menu icon visible. Nav links hidden. Login/SignUp buttons hidden   | Mobile navbar layout       |
| TC-070 | Click hamburger menu at <768px            | Mobile navigation drawer opens below navbar with page links and theme toggle | Mobile menu opens          |
| TC-071 | Open login form at <768px viewport        | Form appears as a Drawer sliding from top                                    | Mobile login uses Drawer   |
| TC-072 | Open login form at ≥768px viewport        | Form appears as a centered Dialog modal                                      | Desktop login uses Dialog  |
| TC-073 | Open signup form at <768px viewport       | Form appears as a Drawer sliding from top                                    | Mobile signup uses Drawer  |
| TC-074 | Open signup form at ≥768px viewport       | Form appears as a centered Dialog modal                                      | Desktop signup uses Dialog |
| TC-075 | View features page breed cards at ≥1024px | Breed cards arranged in 3-column grid                                        | Desktop grid layout        |
| TC-076 | View features page breed cards at <640px  | Breed cards stacked in single column                                         | Mobile stacked layout      |

### 3.14 Edge Cases and Error Handling

| ID     | Test Input                                                 | Expected Output                                                             | Description                              |
| ------ | ---------------------------------------------------------- | --------------------------------------------------------------------------- | ---------------------------------------- |
| TC-077 | Authenticated user views login form trigger                | Login/SignUp buttons not visible in navbar. Only user dropdown shown        | Auth state prevents showing login UI     |
| TC-078 | Submit name update — Supabase returns error                | Error message displayed in red with AlertCircle icon below the name form    | Name update error handling               |
| TC-079 | Submit password change — Supabase returns error            | Error message displayed in red below the password form                      | Password update error handling           |
| TC-080 | Submit email change — Supabase returns error               | Error message displayed in red below the email form                         | Email change error handling              |
| TC-081 | Signup with existing email (identities array length === 0) | Error: "User already exists" displayed in form                              | Duplicate account detection              |
| TC-082 | Multiple rapid form submissions (name update)              | Button disabled during loading (spinner shown). Prevents duplicate requests | Double-submit prevention                 |
| TC-083 | Navigate to `/user/settings`, profile table query fails    | Page handles missing profile gracefully (empty fields, no crash)            | Settings resilient to missing profile    |
| TC-084 | Click Subscribe button on pricing page                     | `handleSubscribe` fires (logs to console). No payment processing occurs     | Subscribe button is wired but incomplete |
| TC-085 | Verify `npm run build` completes                           | Production build succeeds with no TypeScript or ESLint errors               | Build verification                       |
