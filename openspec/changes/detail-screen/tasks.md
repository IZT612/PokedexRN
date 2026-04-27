## 1. App-level screen flow

- [ ] 1.1 Update `src/app/App.tsx` to track the active screen and selected Pokemon id without adding a navigation library.
- [ ] 1.2 Wire `PokemonListScreen` card presses so selecting a Pokemon opens the detail screen for that Pokemon.
- [ ] 1.3 Wire the detail screen back action so returning to the list preserves the existing list-store state.

## 2. Detail feature state and data loading

- [ ] 2.1 Add a `pokemon-detail` domain store that owns detail data, loading state, error state, the active requested id, and a session-local favorites set.
- [ ] 2.2 Implement guarded detail-loading actions that refetch by selected Pokemon id, clear prior errors, ignore duplicate in-flight loads for the same id, and ignore stale responses.
- [ ] 2.3 Expose session-local favorite-toggle actions and selectors that keep favorite state stable across detail reloads without adding persistence yet.

## 3. Detail screen UI

- [ ] 3.1 Create the `pokemon-detail` screen UI and export it through the feature barrel.
- [ ] 3.2 Render the requested detail content: large image, name, id, types, height, weight, abilities, and stat rows.
- [ ] 3.3 Add the back button and heart action in the detail-screen header or top action area.
- [ ] 3.4 Style the hero image area with the primary type color and a secondary-type border when present.
- [ ] 3.5 Render stat bars normalized against a maximum value of `255`, including numeric values and clamped fill widths.

## 4. Detail feedback and fallback behavior

- [ ] 4.1 Show loading feedback while the selected Pokemon detail is being fetched.
- [ ] 4.2 Show an error state with retry when detail loading fails.
- [ ] 4.3 Render a safe fallback in the hero area when official artwork is missing.

## 5. Verification

- [ ] 5.1 Add or update focused tests for detail-store guards, favorite toggling, and stat-bar normalization logic.
- [ ] 5.2 Run the relevant automated checks and fix any issues needed for the detail-screen change.
