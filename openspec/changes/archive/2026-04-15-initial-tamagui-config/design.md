## Context

The PRD defines the app's visual language already: a Pokédex red/blue brand palette, semantic Pokémon type colors, and an `Inter`-based typography direction. The missing piece is an app-level Tamagui configuration that turns those values into a reusable styling system.

This is a cross-cutting foundation change because every future screen and component should consume the same config instead of embedding local styling constants.

## Goals / Non-Goals

**Goals:**
- Create a single `tamagui.config.ts` entry point.
- Encode PRD colors, type colors, typography, and spacing as shared tokens.
- Provide a theme foundation that component styles can rely on immediately.
- Keep the config simple enough to extend later without reworking the app.

**Non-Goals:**
- Building the full UI screen set.
- Introducing dark mode or runtime theme switching.
- Creating multiple theme variants before the base system is stable.

## Decisions

- Use one root Tamagui config file as the source of truth. This keeps the design system discoverable and avoids token duplication. An alternative was per-feature config fragments, but that would make the app harder to reason about.
- Map PRD values directly into Tamagui tokens and themes. The PRD already provides the brand and type palette, so inventing a new semantic layer now would add unnecessary translation overhead. A custom token naming scheme beyond the PRD-driven categories was considered, but it would reduce clarity.
- Keep the initial theme surface small: brand, background, surface, text, border, and type colors. This supports the current Pokédex UI while leaving room to expand. A more elaborate theme tree was rejected because there is not yet a need for multiple visual modes.
- Define typography defaults around a single `Inter` family and a small scale. This matches the PRD and keeps UI text consistent. Allowing component-specific font overrides would create visual drift.

## Risks / Trade-offs

- [Token mismatch] If the Tamagui tokens drift from the PRD values, the design system becomes unreliable. → Mitigation: keep the PRD palette as the reference and review the config against it.
- [Overengineering] Introducing too many abstractions too early can make the config hard to maintain. → Mitigation: start with a small token set and expand only when a UI need exists.
- [Migration churn] Components may need updates when they move to Tamagui. → Mitigation: migrate shared primitives first and keep the rollout incremental.

## Migration Plan

1. Add the root Tamagui config.
2. Wire the config into the application bootstrap/provider.
3. Point shared UI primitives at the new tokens and theme values.
4. Verify the base palette and typography visually on mobile and web.
5. If a rollback is needed, revert the provider/config wiring and restore the previous styling path.

## Open Questions

- Should the initial config include only the PRD tokens, or also utility tokens for future layout needs?
- Do we want the config file to live at the repo root or under a dedicated theme directory?
