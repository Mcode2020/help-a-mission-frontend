# Frontend Changelog

## 2026-10-05 — Standards, Design System Primitives and UI Hardening (feature)
- **Date**: 2026-10-05
- **Type**: quality / architecture / ui
- **Problem**:
  - ESLint error in `src/components/layout/Navbar.tsx` due to non-component export `navItems` violating Fast Refresh rules.
  - Missing design system UI primitives (`components/ui/`) and class merge utility (`cn` / `clsx` + `tailwind-merge`).
  - Base `src/index.css` is minimal with only `@import "tailwindcss";`, lacking brand design tokens, typography, glassmorphism utilities, and rich styling.
  - `.cursor/` directory not ignored in `.gitignore`.
- **Design / Solution**:
  - Extract navigation constants to `src/constants/navigation.ts`.
  - Install `clsx` and `tailwind-merge` and export `cn()` helper in `src/lib/utils.ts`.
  - Scaffold standardized design system primitives: `Button`, `Card`, `Container`, `Badge`.
  - Modernize `src/index.css` with Google Fonts (Inter + Outfit), modern CSS variables, fluid typography, smooth scrolling, and custom scrollbars.
  - Add `.cursor/` to `.gitignore`.
- **Status**: done
- **Verified**:
  - `npm run lint`: 0 errors / 0 warnings (PASS)
  - `npm run build`: Vite production bundle generated cleanly in 1.85s (PASS)
  - `verify-gate`: passed (`code_claim_allowed: true`)

## 2026-10-05 — Secondary Pages, Razorpay Checkout & Interactive UI (feature)
- **Date**: 2026-10-05
- **Type**: feature / pages / payment / ui
- **Problem**:
  - Secondary pages (`/about`, `/campaigns`, `/donate`, `/contact`) are placeholders.
  - Home page lacks full-screen image lightbox, dynamic campaign progress meters, volunteer modal, and live Razorpay donation checkout.
  - Missing design system input primitives (`Input`, `Select`, `Textarea`, `Modal`).
- **Design / Solution**:
  - Scaffold UI primitives: `Input`, `Select`, `Textarea`, `Modal`.
  - Implement full pages:
    - `AboutPage`: NGO history, Regd. No. 01667 credentials, mission/vision, leadership, 80G tax exemption.
    - `CampaignsPage` & `CampaignDetailPage`: Category filters, progress meters, campaign detail story, and donation action.
    - `DonatePage`: Standalone donation portal with Razorpay checkout, 80G tax deduction breakdown, and receipt download.
    - `ContactPage`: Contact inquiry form with validation, volunteer application, Jind office details, and interactive links.
  - Implement Razorpay checkout script integration (`checkout.razorpay.com`) in `src/services/api.ts`.
  - Connect all routes in `src/routes/AppRoutes.tsx`.
- **Status**: done
- **Verified**:
  - `npm run lint`: 0 errors / 0 warnings (PASS)
  - `npm run build`: Vite production bundle generated cleanly in 2.57s (PASS)
  - `verify-gate`: passed (`code_claim_allowed: true`)



