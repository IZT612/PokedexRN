## 1. App-level screen flow

- [x] 1.1 Update `src/app/App.tsx` to track the active screen and selected Pokemon id without adding a navigation library.
- [x] 1.2 Wire `PokemonListScreen` card presses so selecting a Pokemon opens the detail screen for that Pokemon.
- [x] 1.3 Wire the detail screen back action so returning to the list preserves the existing list-store state.

## 2. Detail feature state and data loading

- [x] 2.1 Add a `pokemon-detail` domain store that owns detail data, loading state, error state, the active requested id, and a session-local favorites set.
- [x] 2.2 Implement guarded detail-loading actions that refetch by selected Pokemon id, clear prior errors, ignore duplicate in-flight loads for the same id, and ignore stale responses.
- [x] 2.3 Expose session-local favorite-toggle actions and selectors that keep favorite state stable across detail reloads without adding persistence yet.

## 3. Detail screen UI

- [x] 3.1 Create the `pokemon-detail` screen UI and export it through the feature barrel.
- [x] 3.2 Render the requested detail content: large image, name, id, types, height, weight, abilities, and stat rows.
- [x] 3.3 Add the back button and heart action in the detail-screen header or top action area.
- [x] 3.4 Style the hero image area with the primary type color and a secondary-type border when present.
- [x] 3.5 Render stat bars normalized against a maximum value of `255`, including numeric values and clamped fill widths.

## 4. Detail feedback and fallback behavior

- [x] 4.1 Show loading feedback while the selected Pokemon detail is being fetched.
- [x] 4.2 Show an error state with retry when detail loading fails.
- [x] 4.3 Render a safe fallback in the hero area when official artwork is missing.

## 5. Verification

- [x] 5.1 Add or update focused tests for detail-store guards, favorite toggling, and stat-bar normalization logic.
- [x] 5.2 Run the relevant automated checks and fix any issues needed for the detail-screen change.
