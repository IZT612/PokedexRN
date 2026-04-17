# AGENTS.md

## Project Snapshot

- `PokedexRN` is a small TypeScript React Native app with a Pokedex domain.
- The main entrypoint is `App.tsx`, which re-exports `src/app/App.tsx`.
- Code is organized by feature under `src/features`, with shared code under `src/shared` and theme tokens under `src/theme`.
- The repo already uses `axios` for API access and `zustand` is available for state if a store becomes necessary.

## Commands

- Install dependencies with `npm install`.
- Run tests with `npm test`.
- Run a TypeScript check with `npx tsc --noEmit`.

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
- When adding files, avoid letting broad buckets like `data`, `domain`, or `ui` become catch-all directories; create more specific subfolders when that makes ownership and intent clearer.
- Reuse existing theme tokens from `src/theme/tokens.ts` instead of introducing ad hoc colors, spacing, or typography values.
- If a change starts using Tamagui components for real, wire that change through the existing `tamagui.config.ts` and `TamaguiAppProvider` instead of creating a parallel theme path.

## Code Style

- Prefer small, local changes over broad refactors.
- Match the existing file style: named exports, straightforward functions, and minimal indirection.
- Keep types close to the code that owns them unless they are clearly shared.
- Add comments only when the intent is not obvious from the code itself.
- Avoid introducing new dependencies unless there is a clear payoff.

## Testing Expectations

- Add or update focused tests when changing shared logic, especially under `src/shared/data`.
- The existing test setup uses Node's built-in test runner with `*.test.ts` files.
- When a change has relevant automated tests available, do not consider the implementation complete until those tests pass; keep fixing failures and rerunning the tests until they succeed.
- When automated tests are not available, manually check the changed behavior before considering the work complete; if you find errors, fix them and repeat the manual verification until the change behaves correctly.
- When adding new tests, prefer keeping them close to the code they cover in a specific subfolder. For example, code in `src/shared/data/api/` should generally have tests under `src/shared/data/api/tests/`.
- For UI-heavy changes, at minimum run `npm test` and `npx tsc --noEmit` before finishing.

## Practical Notes

- `tsconfig.json` currently has `strict: false`; do not rely on that to justify sloppy types, but also avoid repo-wide typing churn unless the task calls for it.
- `TamaguiAppProvider` is currently a passthrough component. Treat it as the integration point for future provider setup rather than bypassing it.
- `README.md` is minimal, so prefer grounding decisions in the current source tree and configs.
- Treat implementation, commits, and pushes as separate steps that each require a direct user instruction. Do not implement a change, create a commit, and push in one go unless the user explicitly asks for that combined workflow.
- Keep commits focused on related changes. When there are unrelated edits for different purposes, split them into separate commits instead of bundling them together; for example, a `README.md` update and a new feature should normally be committed separately.

## When Editing

- Check whether a similar helper, entity, or UI primitive already exists before adding a new one.
- Keep components token-driven so visual updates stay centralized.
- When adding exports, make sure import paths stay clean and consistent with the current barrel-file pattern.
- Avoid touching unrelated files just to reshape the project.
