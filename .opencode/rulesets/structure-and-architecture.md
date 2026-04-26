# Structure And Architecture

## Structure

- Keep app-level composition in `src/app`.
- Put feature-specific code in `src/features/<feature-name>`.
- Put reusable API code and shared entities in `src/shared/data`.
- Put reusable UI primitives in `src/shared/ui`.
- Put design tokens and token helpers in `src/theme`.
- Prefer updating existing `index.ts` barrel files when adding new public exports.

## Architecture Guidance

- Preserve the current layering: app -> features/shared -> theme/data utilities.
- Do not make one feature import from another feature unless there is a clear, intentional shared abstraction.
- Keep API normalization logic in shared data utilities instead of spreading response-shape handling across UI components.
- Treat broad buckets like `data`, `domain`, and `ui` as containers, not final destinations for new files. If shared data code belongs to the API layer, place it under `src/shared/data/api/`; otherwise create a specific subfolder under `src/shared/data/` instead of dropping files directly into `data/`.
- Reuse existing theme tokens from `src/theme/tokens.ts` instead of introducing ad hoc colors, spacing, or typography values.
- If a change starts using Tamagui components for real, wire that change through the existing `tamagui.config.ts` and `TamaguiAppProvider` instead of creating a parallel theme path.
