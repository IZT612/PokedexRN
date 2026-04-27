## Context

The app now renders the `pokemon-list` screen as its default experience, and Pokemon cards are already pressable. However, `src/app/App.tsx` still mounts only the list screen, while `src/features/pokemon-detail/ui/` and `src/features/pokemon-detail/domain/` are effectively empty. The repository already has a `pokemon-detail` repository layer that can fetch a full Pokemon entity, so the missing work is the screen flow, the detail presentation, and a small amount of screen state.

This change crosses the app layer and two features: the app needs a minimal screen-switching mechanism, the list feature needs to hand off a selected Pokemon, and the detail feature needs to own loading, display, and favorite interaction behavior. The design should stay lightweight and avoid introducing a full navigation library before the app has more than two real screens.

## Goals / Non-Goals

**Goals:**
- Add a detail screen under `src/features/pokemon-detail/ui/` that shows the selected Pokemon's image, name, id, types, height, weight, abilities, and stats.
- Add a minimal app-level navigation flow between the list and detail screens using the existing app composition path.
- Load detail data through the existing `pokemon-detail` repository layer and expose clear loading, error, retry, and back behavior.
- Add a heart action that lets the user add or remove a Pokemon from session-local favorites.
- Preserve the existing list screen state when navigating to detail and back.
- Specify guard behavior for repeated presses, missing values, request overlap, and favorite toggles before implementation.

**Non-Goals:**
- Introduce React Navigation, Expo Router, or another multi-screen navigation library.
- Build the Favorites screen or a persisted favorites system in this change.
- Change the shared Pokemon entity or repository contracts unless a small gap is discovered during implementation.
- Add backend persistence, user accounts, or cross-device sync for favorites.

## Decisions

### Keep navigation app-local instead of adding a navigation library
`src/app/App.tsx` should own a minimal screen state such as `"list" | "detail"` plus the selected Pokemon id. The list screen should receive an `onPokemonPress` callback, and the detail screen should receive the selected Pokemon id plus an `onBack` callback.

This keeps the first two-screen flow small, explicit, and compatible with the current app composition structure.

Alternative considered: add a navigation library now.
This was rejected because the app only needs a single forward transition and a back action today, so introducing a full navigation stack would add more structure than the current scope needs.

### Put detail loading and favorite state in a feature-owned detail store
The `pokemon-detail` feature should add a single Zustand store that owns the selected Pokemon detail data, loading state, error state, and a session-local set of favorite Pokemon ids. The store should expose actions for loading a Pokemon by id and toggling favorite state.

This keeps async detail behavior and favorite toggles in one feature-owned place instead of scattering them between the app component and the screen.

Alternative considered: keep all detail state directly in the screen component.
This was rejected because loading guards, retry behavior, and favorite state are easier to test and reuse when they live in a dedicated feature store.

### Refetch detail by selected Pokemon id on screen entry
Opening the detail screen should always trigger a detail fetch by the selected Pokemon id through the existing `pokemon-detail` repository path. The detail screen should not treat the list-card data as sufficient detail data, because the list flow is only responsible for summary presentation and the detail flow should always derive its content from the feature's own fetch path.

This keeps the detail screen contract explicit and avoids coupling detail rendering to whichever fields the list happened to preload.

Alternative considered: reuse the Pokemon object already held by the list screen and skip a detail fetch.
This was rejected because the detail screen should own its own fetch lifecycle and remain correct even if the list payload changes or becomes more summary-oriented later.

### Replace stale detail data on new selection and ignore duplicate in-flight loads
When the app opens the detail screen for a Pokemon id, the detail store should treat that id as the canonical requested target. Starting a new load should clear the previous error, set loading state, and replace the previously displayed Pokemon once the request succeeds. If the same Pokemon id is requested while it is already loading, the store should ignore the duplicate request.

If a stale request resolves after a newer id has already become active, the store should ignore the older response so the screen cannot snap back to the wrong Pokemon.

Alternative considered: keep rendering the previous Pokemon until the next request completes and accept every response in arrival order.
This was rejected because it risks showing the wrong Pokemon details during transitions and makes repeated presses harder to reason about.

### Keep favorites session-local and toggleable from the detail header
The heart action should toggle whether the currently viewed Pokemon id is present in a session-local favorites set. The action should be synchronous and local-only for this change, with no API call or persistence. If the current Pokemon is already a favorite, pressing the heart should remove it; otherwise it should add it.

This satisfies the requested user action now while keeping the feature compatible with a future dedicated Favorites screen and a later persistence change.

Alternative considered: make the heart an add-only action with no removal behavior.
This was rejected because the screen would then have no clean behavior for an already-favorited Pokemon and would force follow-up cleanup work into a later change.

### Use a type-colored hero panel for the large artwork treatment
The detail screen should present the large Pokemon artwork inside a hero panel whose background uses the primary Pokemon type color. If the Pokemon has a secondary type, the hero panel should add a border using the secondary type color; otherwise it should fall back to the existing neutral border token.

This delivers the requested visual treatment while keeping type-driven styling grounded in the existing token set.

Alternative considered: color the full screen background by Pokemon type.
This was rejected because the requirement is specifically about the image background area, and limiting the strong type color to the hero panel preserves readability for the rest of the screen.

### Represent stats as normalized bars against a max value of 255
Each Pokemon stat should render with its numeric label and a horizontal fill bar. Fill width should be derived as `clamp(base_stat / 255, 0, 1)` so a stat such as `123` lands around half width, while larger stats never overflow the track.

This turns the raw numbers into a fast visual comparison without inventing a new scale.

Alternative considered: render stats as text only.
This was rejected because the user explicitly requested bar-based stat visualization.

### Preserve list state when returning from detail
Navigating back from detail should only switch the active screen back to `list`; it should not reset the list screen store. Query filters, selected type filters, loaded results, and pagination state should remain intact after returning.

This makes the detail flow feel like a drill-down from the current list context instead of a fresh restart.

Alternative considered: remount the list screen into a fresh state on every back navigation.
This was rejected because it would discard the user's current browsing context and make list-to-detail exploration frustrating.

## Risks / Trade-offs

- [Risk] App-local screen state can grow awkward if more destinations are added quickly. -> Mitigation: keep the navigation contract narrow now and revisit a library only when the number of screens or transitions justifies it.
- [Risk] Session-local favorites do not survive app reloads. -> Mitigation: state that limitation explicitly in the change and keep the favorite contract compatible with future persistence.
- [Risk] Detail requests can race if the selected Pokemon changes quickly. -> Mitigation: track the currently requested id in the store and ignore stale responses.
- [Risk] Strong type colors behind artwork can reduce contrast for overlay elements. -> Mitigation: limit the type color treatment to the hero panel and keep text/content sections on the existing surface/background tokens.
- [Risk] Bar-based stat scaling may make mid-range values look visually compressed. -> Mitigation: use the canonical max of `255` requested by the user and always render the numeric stat beside the bar.

<!-- Everything was added exactly as planned and requested design-related>