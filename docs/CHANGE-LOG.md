# Frontend Changelog

## 2026-10-09 — Implement Login & Sign Up Auth Pages (feature)
- **Date**: 2026-10-09
- **Type**: feature / ui / auth
- **Problem**:
  - The application lacked dedicated Login and Sign Up pages for donors, volunteers, and society members.
  - Users could not navigate to authentication workflows from the header or mobile menu.
- **Design / Solution**:
  - **Login Page (`src/pages/Auth/Login.tsx`)**: Responsive dual-pane layout featuring brand hero banner, role selector tabs (Donor / Volunteer / Member), email/phone login form, password visibility toggle, remember me checkbox, interactive "Forgot Password?" modal, social auth buttons, and validation state.
  - **Sign Up Page (`src/pages/Auth/SignUp.tsx`)**: Matching responsive layout featuring full name, email, phone number, role selection, password strength indicator, terms checkbox, and instant registration confirmation modal.
  - **Locale Translations (`src/locales/en.json`, `src/locales/hi.json`)**: Added complete English & Hindi i18n keys for authentication UI strings and navigation.
  - **Navigation Integration (`src/components/layout/Navbar.tsx`, `MobileMenu.tsx`, `AppRoutes.tsx`)**: Added Sign In / Register buttons in header and mobile drawer, connected routes (`/:lang/login`, `/:lang/signup`, `/:lang/register`), and added non-prefixed fallback routes.
- **Status**: done
- **Verified**:
  - `cmd /c npm run build` (`tsc -b && vite build`): PASS (0 errors, built 1974 modules in 2.74s)

## 2026-10-08 — Fix DonationSection.tsx Syntax Error (bugfix)
- **Date**: 2026-10-08
- **Type**: bugfix / syntax
- **Problem**: `DonationSection.tsx` had duplicate JSX markup and a duplicate export default statement pasted outside the component body (lines 316–344), breaking TypeScript compilation and React rendering.
- **Design / Solution**: Removed stray duplicate JSX snippet and export statement at the bottom of `DonationSection.tsx`.
- **Status**: done
- **Verified**:
  - `cmd /c npm run build` (`tsc -b && vite build`): PASS (built in 2.81s with zero errors)

## 2026-10-05 — NGO Platform Modules & UI Implementation (feature)
- **Date**: 2026-10-05
- **Type**: feature / ui / architecture
- **Problem**:
  - Secondary navigation routes (`/about`, `/our-work`, `/campaigns`, `/contact`, `/donate`) were rendered as simple text placeholders.
  - Lack of structured NGO data models for active campaigns, field projects, leadership board, transformation stories, and tax exemption FAQs.
  - Absence of multi-step donation checkout, 80G tax calculation tools, campaign filtering, itemized budget breakdown modals, and volunteer registration workflows.
- **Design / Solution**:
  - **Structured Data Layer (`src/data/ngoData.ts`)**: Built TypeScript models and seed data for campaigns, leadership team, milestones, impact stories, and 80G tax FAQs.
  - **About Us Page (`src/pages/About/About.tsx`)**: Created comprehensive About page featuring government registration badge (Regd. No. 01667), Mission/Vision/Transparency tabs, interactive 2018–2026 milestone timeline, Board of Trustees grid, and downloadable 80G Tax Exemption Certificate modal.
  - **Campaigns Page (`src/pages/Campaigns/Campaigns.tsx`)**: Built interactive campaigns catalog with category filter chips, search bar, urgent needs toggle, itemized budget breakdown modals, and quick campaign donation drawer.
  - **Our Work & Impact Page (`src/pages/OurWork/OurWork.tsx`)**: Built live counters dashboard (50,000+ meals, 12,000+ kids, 8,500+ patients), field project gallery, before-vs-after transformation story cards, and downloadable annual audit report modal.
  - **Donate Checkout Flow (`src/pages/Donate/Donate.tsx`)**: Built 4-step donation wizard with frequency selector, custom amount chips, 50% 80G tax savings calculator, donor PAN input, mock payment gateway (UPI QR, Cards, Net Banking), and instant downloadable 80G Tax Exemption receipt.
  - **Contact & Volunteer Page (`src/pages/Contact/Contact.tsx`)**: Created contact inquiry form with category routing, interactive "Join as a Volunteer" multi-step registration modal, headquarters info card, and FAQ accordion.
  - **Router Integration (`src/routes/AppRoutes.tsx`)**: Connected all page modules into React Router.
- **Status**: done
- **Verified**:
  - `npm run lint`: 0 errors / 0 warnings (PASS)
  - `npm run build`: Vite production bundle generated cleanly in 2.01s (PASS)
