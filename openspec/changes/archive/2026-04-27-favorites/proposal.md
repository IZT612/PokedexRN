## Why

The app can now mark Pokemon as favorites from the detail screen, but those favorites disappear when the session ends and there is still no dedicated way to browse them. Implementing the favorites flow now completes that feature by making saved favorites persistent and giving users a screen that behaves like the main list while remaining scoped to favorited Pokemon.

## What Changes

- Add a new `favorites-screen` capability that provides a dedicated Favorites screen using the same browsing patterns as the main Pokemon list.
- Make favorite Pokemon persist locally so favorite state survives app reloads instead of staying session-only.
- Let users open Pokemon detail screens from the Favorites screen by pressing the same card treatment used in the main list.
- Keep favorite removal owned by the detail screen heart toggle, so users must open Pokemon details to unfavorite instead of removing directly from the Favorites list.
- Reuse the list-style search, type filtering, loading, empty-state, and card presentation patterns for Favorites wherever possible instead of creating a separate interaction model.
- Update the existing list-screen footer so the `Favorites` action becomes a real navigation entry point rather than a disabled placeholder.
- Update the detail-screen favorite behavior so the heart toggle reads and writes persistent local favorites state.

## Capabilities

### New Capabilities
- `favorites-screen`: Defines the dedicated Favorites screen, including persisted favorite loading, list-style browsing behavior, and navigation into Pokemon details.

### Modified Capabilities
- `list-screen`: Change the footer `Favorites` action from a placeholder into real navigation to the Favorites screen.
- `detail-screen`: Change favorite behavior from session-local toggling to persisted local favorite state that survives app reloads.

## Impact

- Affects `src/app/App.tsx` by adding the Favorites destination to the app-level screen flow.
- Affects `src/features/pokemon-detail/` by replacing session-only favorite state with persistent local favorite state.
- Adds a new `src/features/favorites/` feature for the Favorites screen and any feature-owned state it needs.
- Reuses list-screen patterns and shared UI primitives from `src/features/pokemon-list/` and `src/shared/ui/` to keep the Favorites flow visually and behaviorally aligned.
- Requires phone-compatible local persistence for favorite Pokemon ids using a storage solution that works on React Native devices and web.
