## Why

The app currently needs a single, consistent visual foundation so screens, cards, filters, and detail views do not drift as the Pokédex grows. Defining shared design tokens now will make the UI more cohesive and easier to evolve across web and Android.

## What Changes

- Introduce a shared token system for colors, typography, and spacing.
- Standardize brand, surface, text, and semantic type colors for reusable UI styling.
- Define a consistent typography scale and spacing scale for the app.
- Make the tokens available for use across the existing UI layer so future components inherit the same visual language.

## Capabilities

### New Capabilities
- `design-tokens`: Shared design tokens for colors, typography, spacing, and semantic type styling.

### Modified Capabilities


## Impact

- Affects the UI layer styling primitives and any component styles that consume shared tokens.
- May require new token modules or theme constants in the app codebase.
- Supports future screen and component work by providing a stable visual contract.
