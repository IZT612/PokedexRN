# PokedexRN

React Native + Expo Pokedex app written in TypeScript.

## Prerequisites

- Node.js 18+
- npm
- Android Studio / emulator or Expo Go if you want to run on device

## Running the app

1. Install dependencies with `npm install`
2. Start the Expo dev server with `npm run start`
3. Open the app with:
   - `npm run android`
   - `npm run ios`
   - `npm run web`

## Quality checks

- `npm test`
- `npm run typecheck`
- `npm run lint`

## Project structure

```text
src/
├── app/          # App composition and screen switching
├── features/     # Feature-specific UI, state, and data layers
├── shared/       # Shared entities, API, storage, and UI
└── theme/        # Theme tokens and helpers
```
