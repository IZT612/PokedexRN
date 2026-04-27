## Context

The repository now has the data and state pieces required for the default Pokedex flow: feature-owned repositories for Pokemon list loading and a `pokemon-list` Zustand store with query filtering, type filtering, pagination metadata, and guarded async actions. The app UI is still a placeholder in `src/app/App.tsx`, while reusable shared UI components already exist for search input, chip tags, cards, buttons, loading, and error states.

This change needs to turn those existing building blocks into the first real screen of the app without introducing parallel primitives or bypassing the feature structure. The screen should stay simple: a header, an upper filter section, the middle Pokemon list, and a footer with Home and Favorites actions.

## Goals / Non-Goals

**Goals:**
- Add the default `pokemon-list` screen UI under the feature `ui` layer and compose it from `src/app/App.tsx`.
- Render the screen using the existing `pokemon-list` Zustand store and shared UI components.
- Support filtering by name, filtering by type, and combining those filters in the UI.
- Show Pokemon cards with image, id, name, and type chips.
- Prepare a bottom navigation section with `Home` as the active screen and `Favorites` as a non-functional placeholder.
- Expose the existing pagination behavior through the list screen so additional Pokemon can load as the user moves through the list.

**Non-Goals:**
- Add the Favorites feature itself.
- Redesign the shared component library or introduce new shared primitives unless a clear gap appears during implementation.
- Introduce navigation libraries, routing, or multi-screen app structure.
- Change repository or store contracts beyond what the screen needs to consume.

## Decisions

### Keep screen composition feature-owned and app wiring minimal
The list-screen implementation should live in `src/features/pokemon-list/ui/`, while `src/app/App.tsx` should only compose that screen inside the existing app provider and root surface. This keeps app-level composition thin and preserves feature ownership for screen behavior.

Alternative considered: keep the full screen markup directly in `src/app/App.tsx`.
This was rejected because it would bypass the feature UI layer and make the screen harder to evolve alongside feature state.

<!-- Using our custom components is great -->
### Reuse existing shared UI components instead of creating parallel ones
The screen should use the existing `SearchInput`, `Chip`, `Card`, `Button`, `LoadingSpinner`, and `ErrorMessage` components, plus existing text/surface primitives where helpful. This keeps the screen aligned with the current design system surface and avoids duplicating already-accepted UI capabilities.

Alternative considered: create list-screen-specific versions of inputs, chips, cards, or footer buttons.
This was rejected because the repo already has reusable components that cover the requested layout.

### Extend the shared chip for Pokemon type styling
The screen should reuse the shared `Chip` component for both filter chips and Pokemon type chips, but the shared chip needs a token-driven way to render Pokemon type visuals. That extension should stay inside the shared UI component instead of being reimplemented in the list-screen so screens can keep using one shared chip primitive.

Alternative considered: wrap the existing chip in a screen-local type-tag component with its own colors.
This was rejected because the type-color behavior is still a shared chip concern and should not create a parallel visual primitive inside the feature.

<!-- Had to tell the AI to add this, should add it into a ruleset. -->
### Make design-token brand colors mandatory
The list screen should use the existing color tokens from `src/theme/tokens.ts` for all brand, surface, border, and text color decisions. Type-specific visuals should use the existing Pokemon type color tokens rather than ad hoc values. This keeps the screen visually consistent with the current theme contract and avoids one-off colors creeping into the first real app screen.

Alternative considered: style the screen with screen-local color values for speed.
This was rejected because the repo already has an explicit token source and the first real screen should reinforce that token-driven styling rule.

<!-- At a first glance, the layout seems to be just as I described it -->
### Use a simple four-section layout
The screen should render in this order:
1. header with `PokedexRN`
2. filter section with search input and horizontal type chips
3. Pokemon list section with card-based results
4. footer with `Home` and `Favorites` buttons

This layout matches the requested structure and keeps the first screen easy to scan on mobile.

Alternative considered: merge the header and filter section into one denser toolbar.
This was rejected because the requested layout separates the title from the filters and the screen should stay visually simple.

<!-- Nice since this is separating responsabilities, the screen shouldn't make its own filter and anything that isn't visual/representation logic.-->
### Drive the list directly from the feature store
The screen should read `filteredPokemon`, `query`, `selectedType`, `typeOptions`, loading flags, and the shared error state directly from the `pokemon-list` store. It should call store actions for initial list loading, type loading, next-batch loading, query updates, and type selection. This keeps filtering and guarded async behavior in one place instead of duplicating it in the UI.

Alternative considered: let the screen maintain its own filter state and only use the store for fetched Pokemon.
This was rejected because the accepted store capability already owns the non-trivial feature state and derived filtering behavior.

### Load list and type data on first screen mount
The screen should trigger `loadPokemonList()` and `loadPokemonTypes()` on mount so the default Home screen is immediately populated with both Pokemon results and filter options. Because the store now separates loading concerns, these requests can run independently without conflicting.

Alternative considered: delay type loading until the user interacts with filters.
This was rejected because the requested layout always shows the type filter row, so the options should be ready as part of the initial screen load.

<!-- Perfect, as this makes the list update automatically and doesn't require the user to do anything besides scroll. -->
### Use list-end pagination instead of a dedicated load-more control
The screen should present Pokemon results in a scrollable list and request the next batch when the user reaches the end of the current list. This matches the store's append-oriented pagination flow and keeps the middle content area focused on cards instead of adding a separate pagination button.

Alternative considered: expose a `Load more` button below the list.
This was rejected because the screen already has a dedicated footer section for Home and Favorites, and list-end loading keeps pagination closer to the content flow.

### Show an explicit empty state for filter results
When `filteredPokemon` is empty, the screen should render the message `There's no pokemon meeting your criteria.` in the results area. This gives the user a clear explanation when active filters or query text eliminate all visible Pokemon instead of leaving the list area blank.

Alternative considered: leave the results area empty when no Pokemon match.
This was rejected because an empty list without explanation makes it harder to distinguish between a loading problem, a rendering bug, and a valid no-results state.

### Use official artwork for Pokemon card images
Pokemon cards should render the `official_artwork` image from the shared `Pokemon` entity for the list-screen artwork treatment. This keeps the list visually polished and consistent across cards instead of mixing in lower-fidelity sprite assets by default.

Alternative considered: use `front_default` as the primary card image.
This was rejected because the list cards are meant to present a cleaner showcase treatment and the shared entity already exposes `official_artwork` for that purpose.

### Keep footer actions visually ready but behavior-light
The footer should show `Home` and `Favorites` using the shared button component. `Home` should appear as the current active/default action, while `Favorites` should be rendered as a pressable-looking button that is currently disabled. This prepares the screen structure for future expansion without pretending that navigation already exists.

Alternative considered: omit Favorites until the feature exists.
This was rejected because the requested screen explicitly needs the placeholder footer section now.

## Risks / Trade-offs

- [Risk] The screen could feel too static if list-end pagination does not trigger reliably on different device sizes. -> Mitigation: keep store guards in place and test list-end loading behavior during implementation.
- [Risk] Reusing general shared components may produce a UI that needs small layout overrides. -> Mitigation: prefer local screen layout styling around the shared components instead of changing the components themselves unless a reusable gap is proven.
- [Risk] The screen could drift from the current visual language if implementation adds one-off colors. -> Mitigation: require brand, surface, text, border, and type styling to come from the existing theme tokens.
- [Risk] The single shared error field may let the most recent request failure replace an earlier one. -> Mitigation: keep the first screen simple and surface the latest actionable error state through the existing shared error component.
- [Risk] The footer placeholder may imply real navigation. -> Mitigation: style `Home` as the active action and keep `Favorites` visibly present but disabled.
