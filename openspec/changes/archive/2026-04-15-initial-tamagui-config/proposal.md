## Why

The app needs a shared styling foundation before more UI is built, otherwise colors, spacing, and typography will drift across screens. Introducing Tamagui now gives the project a consistent design system contract that matches the PRD and is reusable across mobile and web.

## What Changes

- Add an initial Tamagui configuration file as the app-wide styling entry point.
- Define shared tokens for brand colors, Pokémon type colors, typography, and spacing based on the PRD.
- Establish a reusable theme structure for the app UI.
- Make the configuration available for all future components and screens.

## Capabilities

### New Capabilities
- `tamagui-config`: Shared Tamagui configuration and token set for the Pokédex UI.

### Modified Capabilities


## Impact

- Affects the UI foundation and any components that consume shared design values.
- Introduces Tamagui as the design-system layer for the app.
- Supports future screens by providing a single source of truth for theme values.
