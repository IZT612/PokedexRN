## Why

The app currently ships only one color theme, so it does not respect the user's device appearance preference and can feel visually inconsistent on phones set to dark mode. Adding a real dark theme now makes the app feel native to the user's device while establishing a complete token-based theme contract that applies consistently across all existing screens.

## What Changes

- Add a new `adaptive-theme` capability that defines light and dark app themes driven by color tokens.
- Expand the app color tokens so both light and dark themes are fully represented in the shared theme layer.
- Detect the user's device theme automatically and switch the app theme between light and dark without requiring a manual in-app toggle.
- Apply the active theme across the whole app so list, detail, favorites, and shared UI primitives all render with the correct theme colors.
- Update the current theme provider path so app-wide theme state is provided centrally instead of each screen handling appearance independently.

## Capabilities

### New Capabilities
- `adaptive-theme`: Defines app-wide light/dark theme tokens, device-theme detection, and active-theme application across screens.

### Modified Capabilities
- `design-tokens`: Expand the existing token contract so shared app color tokens cover both light and dark themes instead of a single static palette.

## Impact

- Affects `src/theme/` by expanding the token model to support light and dark color themes.
- Affects `src/shared/ui/TamaguiAppProvider.tsx` by turning it into the central app theme integration point.
- Affects screens and shared UI primitives that currently read static theme colors so they can follow the active app theme automatically.
- Reuses the current token-driven styling approach rather than introducing screen-local theme logic.
