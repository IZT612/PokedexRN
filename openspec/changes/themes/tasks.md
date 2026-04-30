## 1. Theme token expansion

- [x] 1.1 Expand `src/theme/tokens.ts` so shared app color tokens define both light and dark theme values.
- [x] 1.2 Keep non-theme token scales stable while updating the theme exports/helpers to expose the resolved active-theme color surface cleanly.

## 2. App-level theme detection

- [x] 2.1 Turn `src/shared/ui/TamaguiAppProvider.tsx` into the central theme integration point for detecting the user's device appearance.
- [x] 2.2 Resolve the active app theme automatically from the device appearance and make it available to screens and shared UI primitives.

## 3. Theme application across UI

- [x] 3.1 Update shared UI primitives that currently assume one static palette so they consume the active theme colors instead.
- [x] 3.2 Update the list, detail, and favorites screens so their backgrounds, surfaces, text, and borders follow the active theme.
- [x] 3.3 Verify that Pokemon type colors remain semantically consistent while the surrounding light/dark surfaces adapt correctly.

## 4. Verification

- [x] 4.1 Add or update focused tests for theme token resolution and device-theme-driven active theme selection if practical.
- [x] 4.2 Run the relevant automated checks and fix any issues needed for the theme change.
