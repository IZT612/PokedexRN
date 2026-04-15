## Context

The PRD already defines a visual direction for the app: classic Pokédex brand colors, semantic Pokémon type colors, and a consistent typography foundation. What is missing is a shared token source that the UI can consume instead of hard-coded values spread across screens and components.

This change sits in the UI layer but affects the whole app because the token set will become the visual contract for cards, filters, detail views, and any future screens.

## Goals / Non-Goals

**Goals:**
- Centralize brand, semantic type, typography, and spacing values.
- Keep token values stable and reusable across mobile and web targets.
- Make the token set easy to extend without touching individual component styles.

**Non-Goals:**
- Redesigning screen layouts or component structure.
- Adding a runtime theme switcher or dark mode.
- Changing the product-level color palette beyond what is already defined in the PRD.

## Decisions

- Use a single source of truth for tokens instead of per-component styling constants. This reduces drift and makes visual updates predictable. An alternative would be local style files per screen, but that would quickly fragment the system.
- Keep tokens platform-agnostic and map them into UI styles through a thin layer. This supports React Native and web without duplicating the palette. A platform-specific theme per target was considered, but it would make maintenance harder for a small shared design system.
- Treat Pokémon type colors as semantic tokens, not component-specific styles. This allows cards, chips, borders, and filters to all reference the same value. Hard-coding type colors inside UI components was rejected because it duplicates logic and makes consistency harder.
- Define spacing as a small scale of reusable steps rather than arbitrary numbers. This keeps layout rhythm aligned across responsive screens. Ad-hoc spacing values were considered, but they tend to produce uneven layouts over time.

## Risks / Trade-offs

- [Token drift] If tokens are copied into component styles instead of imported, visual consistency will erode. Mitigation: keep tokens in one shared module and use them everywhere.
- [Incomplete coverage] New UI states may need tokens that are not initially defined. Mitigation: start with the PRD-driven set and extend deliberately as new requirements appear.
- [Overfitting] A very large token set can become hard to navigate. Mitigation: keep the initial palette small and purpose-driven.

## Migration Plan

1. Add the shared token definitions.
2. Update existing UI styles to consume tokens where applicable.
3. Verify screens render correctly on mobile and web.
4. If any regression appears, roll back the token imports and restore previous style values.

## Open Questions

- Should tokens be exposed as a plain constants module, a theme object, or both?
- Do we want spacing tokens to be exact pixel values or a relative scale mapped by the UI layer?
