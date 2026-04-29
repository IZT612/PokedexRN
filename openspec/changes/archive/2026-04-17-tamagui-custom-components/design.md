## Context

This change introduces a shared set of Tamagui-based UI primitives for common screen building blocks: button, card, search input, chip/tag, loading spinner, and error message. The goal is to establish one consistent implementation pattern that future screens can reuse without recreating local component variants.

## Goals / Non-Goals

**Goals:**
- Provide reusable UI components built on Tamagui primitives.
- Keep APIs small, consistent, and easy to compose.
- Align component styling with the app theme so screens can share a visual language.

**Non-Goals:**
- Building a full design system.
- Refactoring every existing screen to the new components immediately.
- Introducing a second component framework alongside Tamagui.

## Decisions

- Use Tamagui primitives as the base layer for all shared components.
  - Rationale: keeps the system consistent with the user's requested stack and allows theme-aware styling.
  - Alternative considered: React Native-only wrappers, which would duplicate styling conventions already available in Tamagui.

- Expose simple variant-based APIs rather than many specialized component types.
  - Rationale: variants cover the common cases while avoiding a fragmented component surface.
  - Alternative considered: separate bespoke controls per screen, which would increase drift and maintenance.

- Keep loading and error states as first-class reusable components.
  - Rationale: async screens need consistent feedback patterns and recovery affordances.
  - Alternative considered: inline ad hoc states in each screen, which would repeat markup and behavior.

- Organize the shared components under a single UI module with a barrel export.
  - Rationale: simplifies imports and makes the shared surface easy to discover.
  - Alternative considered: scattering components across feature folders, which makes reuse harder.

## Risks / Trade-offs

- [Risk] Over-generalized component props may make the API hard to use -> Mitigation: start with the smallest useful prop set and expand only when a real reuse need appears.
- [Risk] Tamagui theme assumptions may not match every screen -> Mitigation: allow limited style overrides while keeping the default design opinionated.
- [Risk] Component reuse may lag behind creation -> Mitigation: document the shared module and use it as the default for new screens.

## Migration Plan

1. Create the shared Tamagui component module.
2. Export the components from one entry point.
3. Adopt them in new UI work first, then replace duplicated screen-local controls as touched.
4. Refine variants if a component needs to support an additional common use case.

## Open Questions

- Should the shared UI module live at `src/components/ui` or another folder once the app structure is finalized?
- Should the button component include icon support in the first iteration or remain text-focused?
