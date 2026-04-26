## Why

The app has the shared UI pieces, repository layer, and Zustand store needed for the main Pokedex flow, but it still does not render the actual Pokemon list screen. Adding that screen now turns the existing data and state work into a usable default experience and establishes the baseline layout for future screens such as Favorites.

## What Changes

- Add the initial `pokemon-list` screen UI as the default Home screen in `src/app/App.tsx`.
- Add a feature-owned `pokemon-list` UI module that renders a header, filter section, Pokemon results list, and bottom navigation section.
- Connect the screen to the existing `pokemon-list` Zustand store so the UI can load Pokemon, load type options, filter by query, filter by type, combine those filters, and paginate forward through the list.
- Reuse the existing shared `SearchInput`, `Chip`, `Card`, `Button`, `LoadingSpinner`, and `ErrorMessage` components instead of creating parallel UI primitives.
- Prepare a footer with `Home` and `Favorites` actions, with `Home` representing the current active screen and `Favorites` present as an inactive placeholder for future work.

## Capabilities

### New Capabilities
- `list-screen`: Defines the default Pokedex list screen layout, store wiring, filtering behavior, list rendering, and footer navigation placeholder.

### Modified Capabilities
<!-- None. Existing shared UI and state capabilities are reused as-is. -->

## Impact

- Affects `src/app/App.tsx` by replacing the placeholder surface with the real default list-screen composition.
- Affects `src/features/pokemon-list/ui/` by adding the screen and any small feature-owned presentation helpers it needs.
- Affects `src/features/pokemon-list/domain/` only through UI consumption of the existing store API.
- Reuses shared UI components from `src/shared/ui/components/` and existing type styling helpers from `src/shared/ui/`.
