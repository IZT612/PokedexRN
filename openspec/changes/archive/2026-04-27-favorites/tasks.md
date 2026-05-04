## 1. Persistence setup

- [x] 1.1 Add a phone-compatible local storage dependency and a focused shared/storage helper for reading and writing favorite Pokemon ids.
- [x] 1.2 Load persisted favorite ids into the detail feature and replace the current session-only favorite source with persisted state.
- [x] 1.3 Save favorite id changes back to storage and surface retryable errors when persistence load/save fails.

## 2. App and navigation flow

- [x] 2.1 Extend `src/app/App.tsx` to include a Favorites destination alongside the existing list and detail screens.
- [x] 2.2 Update the list-screen footer so the `Favorites` action navigates to the Favorites screen.
- [x] 2.3 Ensure selecting a Pokemon card from Favorites opens the existing detail screen and returning preserves the prior Favorites state.

## 3. Favorites feature state

- [x] 3.1 Create the `favorites` feature structure with a feature-owned store for canonical favorites data, derived filtered results, loading state, and error state.
- [x] 3.2 Implement Favorites loading that reads persisted ids first, fetches the needed Pokemon data by id, and derives visible results from canonical data plus active filters.
- [x] 3.3 Add guards that clear previous errors before new loads, ignore conflicting loads when appropriate, and remove detail-unfavorited Pokemon from canonical and filtered Favorites results immediately.

## 4. Favorites screen UI

- [x] 4.1 Create the Favorites screen UI and export it through the feature barrel.
- [x] 4.2 Reuse the main list-style search, type filtering, card presentation, and feedback patterns wherever possible for the Favorites screen.
- [x] 4.3 Add a clear empty state for no persisted favorites and retryable error feedback for persistence or Pokemon-fetch failures.
- [x] 4.4 Show `Favorites` as the active footer action on the Favorites screen and keep `Home` as navigation back to the main list.
- [x] 4.5 Keep unfavorite actions out of the Favorites list UI so users must open detail to remove a favorite.

## 5. Verification

- [x] 5.1 Add or update focused tests for persisted favorite loading/saving, Favorites filtering logic, and immediate removal behavior after unfavoriting.
- [x] 5.2 Run the relevant automated checks and fix any issues needed for the Favorites change.
