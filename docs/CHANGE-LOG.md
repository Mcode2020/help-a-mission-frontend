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

