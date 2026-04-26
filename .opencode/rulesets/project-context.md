# Project Context

## Project Snapshot

- `PokedexRN` is a small TypeScript React Native app with a Pokedex domain.
- The main entrypoint is `App.tsx`, which re-exports `src/app/App.tsx`.
- Code is organized by feature under `src/features`, with shared code under `src/shared` and theme tokens under `src/theme`.
- The repo already uses `axios` for API access and `zustand` is available for state if a store becomes necessary.

## Commands

- Install dependencies with `npm install`.
- Run tests with `npm test`.
- Run a TypeScript check with `npx tsc --noEmit`.

## Practical Notes

- `tsconfig.json` currently has `strict: false`; do not rely on that to justify sloppy types, but also avoid repo-wide typing churn unless the task calls for it.
- `TamaguiAppProvider` is currently a passthrough component. Treat it as the integration point for future provider setup rather than bypassing it.
- `README.md` is minimal, so prefer grounding decisions in the current source tree and configs.
