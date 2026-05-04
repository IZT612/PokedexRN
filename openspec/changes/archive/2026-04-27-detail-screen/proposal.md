## Why

The app now has a working list screen, but selecting a Pokemon still stops at the list instead of letting the user inspect the full entry. Adding a detail screen now completes the main Pokedex browsing flow and introduces the first real favorite action users can take from a Pokemon profile.

## What Changes

- Add a new `detail-screen` capability that defines the Pokemon detail screen layout, data-loading behavior, navigation back to the list, and favorite action behavior.
- Show a large hero image, Pokemon name, id, types, height, weight, abilities, and stats on the detail screen.
- Render stat values as bars whose fill is proportional to the Pokemon stat value out of a maximum of `255`.
- Style the hero image surface using the Pokemon's primary type color, and when a Pokemon has a secondary type, add a border using the secondary type color.
- Add a back action that returns the user from the detail screen to the list screen.
- Fetch the selected Pokemon again by id when the detail screen opens instead of reusing only the list-card data.
- Add a heart action on the detail screen so users can toggle whether a Pokemon is in favorites for the current session.
- Update the list-screen behavior so pressing a Pokemon card opens that Pokemon's detail screen instead of only exposing generic selection.

## Capabilities

### New Capabilities
- `detail-screen`: Defines the Pokemon detail experience, including layout, detail refetch behavior, session-local favorite toggling, and navigation back to the list.

### Modified Capabilities
- `list-screen`: Change Pokemon-card selection behavior so pressing a card opens the chosen Pokemon's detail screen.

## Impact

- Affects `src/app/App.tsx` by introducing app-level navigation flow between the list and detail screens.
- Affects `src/features/pokemon-detail/` by adding the detail screen UI and any feature-owned state needed for loading and displaying a selected Pokemon.
- Affects `src/features/pokemon-list/ui/` by wiring Pokemon-card presses into the detail-screen flow.
- Reuses shared entities and data access in `src/shared/data/` and `src/features/pokemon-detail/data/` for loading Pokemon detail data by id when the detail screen opens.
- Reuses existing theme tokens and Pokemon type colors for the detail hero styling and stat presentation.
