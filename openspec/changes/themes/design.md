## Context

The app currently exposes a single static color palette from `src/theme/tokens.ts`, and screens/components read those values directly. `TamaguiAppProvider` is still a passthrough wrapper, so there is a natural app-level integration point for shared theme state, but no current logic for detecting the device appearance or applying light/dark tokens across screens.

This change cuts across the full UI surface: tokens need a dark-mode expansion, the app root needs to react to the user's device theme, and existing screens/components need to follow the active theme consistently. Because the repository already centralizes color usage through shared tokens, the design should preserve that pattern rather than introducing per-screen theme logic or scattered `useColorScheme` calls.

## Goals / Non-Goals

**Goals:**
- Add a complete dark theme alongside the existing light theme using shared color tokens.
- Detect the user's device theme automatically and apply the matching app theme without a manual toggle.
- Apply the active theme across all current screens and shared UI primitives.
- Keep theme ownership centralized so screens continue consuming tokens rather than managing color scheme logic themselves.
- Make the existing app provider path the integration point for theme state.

**Non-Goals:**
- Add a user-facing theme preference toggle in this change.
- Redesign spacing, typography, or Pokemon type color semantics beyond what dark-theme support requires.
- Introduce a second theming system outside the current token/provider path.
- Add theme-specific one-off overrides only for a single screen unless they are required by the shared token contract.

## Decisions

### Keep light and dark palettes in the shared token layer
The theme layer should expand from a single static color set to an explicit light/dark token contract. Shared app colors such as background, surface, text, border, and other base UI colors should exist in both themes, while shared non-theme scales like spacing and typography remain unchanged.

This keeps all screens and shared components aligned on one source of truth and satisfies the requirement to add everything to the color tokens.

Alternative considered: leave the token file mostly unchanged and patch dark colors directly into components.
This was rejected because it would scatter theme decisions across the codebase and break the current token-driven styling rule.

### Detect device appearance once at the app/theme-provider boundary
Device theme detection should happen centrally at the app/provider level using the platform appearance hook/API. The app should subscribe to the user's current device scheme and expose the resolved active theme to the rest of the UI through the existing provider path.

This avoids repeated per-screen appearance detection and ensures theme changes propagate consistently across all screens.

Alternative considered: have each screen call `useColorScheme` independently.
This was rejected because it would duplicate logic, make consistency harder to guarantee, and weaken the role of the shared provider.

### Expose resolved active colors through shared theme utilities
The theme layer should provide a resolved active-theme object or helper so consumers can read the currently active colors without having to branch on `light` versus `dark` locally. Existing components that currently read `tokens.colors.*` will need to move to the resolved active color surface rather than continuing to assume one static palette.

This keeps component code straightforward and minimizes repeated conditional logic in UI files.

Alternative considered: make every component choose between `light` and `dark` tokens itself.
This was rejected because it would create repetitive branching and make the code harder to maintain.

### Keep Pokemon type colors semantically stable across themes unless a token-level need appears
Pokemon type colors should remain semantic and consistent across themes unless contrast testing proves a specific dark-theme adjustment is needed. The dark theme should primarily change base UI colors such as surfaces, text, and borders, while type colors continue representing Pokemon semantics across list, detail, and favorites.

This preserves user recognition of type identity while limiting the change to the colors that actually need theme adaptation.

Alternative considered: create completely separate dark-mode Pokemon type colors.
This was rejected because it would increase token complexity without a clear requirement unless contrast or readability issues make it necessary.

### Apply theme updates across shared primitives and all current screens
Shared UI primitives and all existing screens should consume the resolved active theme so list, detail, and favorites update together. The provider integration should be broad enough that a device theme switch updates every current screen rather than only the one that happens to remount later.

This keeps the app visually coherent and matches the requirement that the behavior should work on every screen.

Alternative considered: update only the most visible screens first.
This was rejected because partial theme coverage would leave the app in an inconsistent mixed-theme state.

## Risks / Trade-offs

- [Risk] Expanding the token shape can force many files to update at once. -> Mitigation: keep the public theme API focused and provide a resolved active-theme surface that minimizes consumer churn.
- [Risk] Some existing hard assumptions about light backgrounds may become unreadable in dark mode. -> Mitigation: audit shared primitives and current screens so they all move to theme-driven text, surface, and border colors.
- [Risk] Device-theme detection might behave slightly differently across native and web. -> Mitigation: centralize detection in the provider/app boundary and rely on the platform appearance API intended for this purpose.
- [Risk] Keeping Pokemon type colors unchanged across themes could expose contrast issues on dark surfaces. -> Mitigation: keep type colors semantic by default, but ensure the surrounding surface/text tokens provide enough contrast and adjust only if a specific issue appears.
