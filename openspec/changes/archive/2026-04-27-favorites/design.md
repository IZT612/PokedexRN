## Context

The app now has a working list screen, a detail screen, and a heart toggle on detail, but favorite state is still session-local inside the `pokemon-detail` store and disappears after reload. The list-screen footer still includes a `Favorites` affordance in the product model, but there is no real Favorites destination yet.

This change crosses the app layer and multiple features: app-level screen flow needs a Favorites destination, the detail feature needs persistent favorite state instead of session-only state, and the new favorites feature needs to browse favorited Pokemon with the same interaction model as the main list. Because the user explicitly wants Favorites to work like the list screen, the design should reuse list-style filtering, card rendering, and detail handoff wherever possible rather than introducing a new browsing pattern.

## Goals / Non-Goals

**Goals:**
- Add a dedicated Favorites screen that behaves like the main list for browsing, filtering, and opening Pokemon details.
- Persist favorite Pokemon ids locally so favorite state survives reloads on supported platforms.
- Keep the heart toggle as the single source of add/remove favorite intent while making that state visible in the Favorites screen.
- Reuse existing list-screen behavior and UI patterns where that is the smaller correct change.
- Make the footer `Favorites` action a real navigation entry point.
- Specify loading, persistence, empty-state, and duplicate-action guards before implementation.

**Non-Goals:**
- Redesign the list screen or detail screen beyond the changes needed to support Favorites.
- Introduce a remote backend, user account syncing, or server-owned favorites.
- Add unrelated persistence for other app data.
- Create a completely separate card/filter system for Favorites when the list behavior can be reused.

## Decisions

### Add Favorites as a third app-level screen in the existing local flow
`src/app/App.tsx` should extend its current local screen state from the list/detail flow to include a `favorites` destination. The footer `Favorites` action should navigate into that screen, and selecting a card from Favorites should open the existing detail screen using the same detail handoff pattern as the main list.

This keeps the navigation model consistent with the current app architecture instead of prematurely introducing a navigation library.

Alternative considered: wait to expose Favorites until a navigation library is added.
This was rejected because the current app-level screen state is still sufficient for one more destination and the feature is already being requested now.

### Persist favorite ids locally and keep them feature-owned
Favorite persistence should store a canonical array of Pokemon ids in local device/web storage. The detail feature should stop treating favorite state as session-only and should instead load, save, and toggle this persisted id set through a feature-owned storage path.

This keeps favorite ownership close to the existing heart toggle behavior while making the persistence contract explicit.

Alternative considered: move favorite ownership entirely into the new favorites feature.
This was rejected because the heart toggle already lives in the detail feature, and splitting write ownership from the toggle point would make the behavior harder to reason about.

### Use local storage compatible with phones and web
The persistence mechanism should use a storage API that works on React Native phones and web, such as AsyncStorage-backed persistence. The persisted payload should remain small and JSON-based, storing only favorite Pokemon ids rather than full Pokemon payloads.

This matches the user's local JSON storage expectation while avoiding unnecessary duplication of fetched Pokemon data.

Alternative considered: persist full Pokemon objects.
This was rejected because list/detail data can be fetched from existing repositories and persisting whole objects would introduce stale-data and migration concerns with little benefit.

### Build the Favorites screen on top of list-style store behavior
The Favorites feature should own a store that mirrors the useful behavior of the main list flow: query filtering, type filtering, derived visible results, loading state, and error state. It should not duplicate the full pagination contract, because Favorites is bounded by the persisted id set rather than an infinite remote list.

The favorites store should load the persisted ids first, then fetch the corresponding Pokemon details needed to render cards, and derive its filtered results from the canonical favorites collection plus active filters.

Alternative considered: point the Favorites screen directly at the existing `pokemon-list` store.
This was rejected because the list store owns remote pagination state and list-specific fetch semantics that do not match the persisted-favorites flow.

### Reuse the same card and filter UI patterns instead of inventing a new Favorites layout
The Favorites screen should reuse the existing search, type-chip, card, loading, empty-state, and footer interaction patterns from the list screen where possible. The goal is for Favorites to feel like a scoped version of the main list rather than a separate product surface.

This reduces implementation churn and aligns with the user's request to keep the logic the same as the list screen when possible.

Alternative considered: build a unique Favorites layout with different cards and controls.
This was rejected because it would increase scope without improving the requested behavior.

### Keep favorite removal as a detail-screen-only action
The Favorites screen should allow browsing, filtering, and opening Pokemon details, but it should not expose its own direct unfavorite control. If the user wants to remove a Pokemon from favorites, they must open that Pokemon's detail screen and use the existing heart toggle there.

This keeps add/remove ownership in one place instead of duplicating favorite mutation controls across multiple screens.

Alternative considered: allow direct unfavorite actions from Favorites cards or the Favorites screen itself.
This was rejected because the user explicitly wants unfavorite behavior to happen only from the detail screen.

### Make detail-driven removals reflect across Favorites immediately
When the user removes a Pokemon from favorites from the detail screen, the Favorites screen should update against the same persisted id source. If the removed Pokemon is currently visible in Favorites, it should disappear from the canonical favorites collection and from any derived filtered view without requiring a manual refresh.

This keeps the feature internally consistent and avoids stale cards lingering after a remove action.

Alternative considered: defer visible removal until the next Favorites reload.
This was rejected because it would make the toggle feel broken and would contradict the expectation of immediate state updates.

### Treat empty favorites and persistence failures as first-class states
If there are no persisted favorites, the Favorites screen should show a clear empty state rather than an empty list with no explanation. If persisted favorite ids fail to load or the follow-up Pokemon fetches fail, the screen should show actionable error feedback and allow retry.

This keeps the new screen understandable even before the user has favorited anything and makes storage/fetch failures debuggable.

Alternative considered: silently render nothing on empty or failed states.
This was rejected because empty Favorites and persistence failures would otherwise look like rendering bugs.

## Risks / Trade-offs

- [Risk] Reusing list-style logic too literally could leak pagination assumptions into Favorites. -> Mitigation: reuse only the filtering/card interaction model and keep Favorites fetch semantics feature-specific.
- [Risk] Local persistence can fail or differ slightly across native and web environments. -> Mitigation: keep the stored payload minimal, handle load/save errors explicitly, and surface retryable failures.
- [Risk] Fetching every favorited Pokemon by id can become slower as the favorites set grows. -> Mitigation: keep the first implementation simple and bounded; optimize batching/caching later only if the feature size makes it necessary.
- [Risk] Sharing favorite ownership between detail and Favorites can create stale UI if stores drift. -> Mitigation: make persisted favorite ids the canonical source and design the feature stores/actions around that shared contract.
- [Risk] Removing a Pokemon from Favorites while viewing its detail could create timing issues between screens. -> Mitigation: specify immediate canonical favorite updates and derive screen state from the same persisted id set.

<!-- Once again, everything was understood perfectly and the only issues were my own fault at specifying. But AI makes no wrong assumptions anymore. -->