## Why

The app needs a consistent shared UI layer built on Tamagui so screens can reuse the same controls and feedback states instead of recreating local versions. This reduces visual drift and makes future feature work faster.

## What Changes

- Add a shared Tamagui-based component set for common UI patterns.
- Introduce custom Button, Card, SearchInput, Chip/Tag, LoadingSpinner, and ErrorMessage components.
- Standardize these components so future screens can compose them with a consistent look and behavior.

## Capabilities

### New Capabilities
- `ui-components`: shared Tamagui-based UI components for buttons, cards, search input, chips/tags, loading states, and error states.

### Modified Capabilities


## Impact

- Shared presentation code used across the app.
- Screen-level UI composition for list, detail, and future feature screens.
- Dependence on Tamagui component primitives and theming.
