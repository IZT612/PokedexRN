## 1. App and feature screen structure

- [x] 1.1 Add the `pokemon-list` screen UI under `src/features/pokemon-list/ui/` and export it through the feature UI barrel.
- [x] 1.2 Update `src/app/App.tsx` so the app renders the `pokemon-list` screen as the default Home experience inside the existing app provider structure.

## 2. List-screen layout and store wiring

- [x] 2.1 Build the screen layout with a header, upper filter section, middle Pokemon list section, and bottom footer section in the requested order.
- [x] 2.2 Wire the screen to the `pokemon-list` Zustand store so it reads Pokemon results, filtered results, type options, active filters, loading flags, and error state.
- [x] 2.3 Trigger initial Pokemon list loading and type-option loading on first screen mount through the store.

## 3. Shared component integration

- [x] 3.1 Use the shared `SearchInput` and `Chip` components for the query filter and horizontal type filter row.
- [x] 3.2 Use the shared `Card` and `Chip` components to render each Pokemon card with image, id, name, and types.
- [x] 3.3 Use the shared `LoadingSpinner`, `ErrorMessage`, and `Button` components for feedback and the Home/Favorites footer section.
- [x] 3.4 Extend the shared `Chip` component so it can render Pokemon type visuals using the existing type color tokens.
- [x] 3.5 Use existing theme color tokens for brand, surface, border, text, and Pokemon type styling instead of ad hoc screen-local colors.

## 4. Filtering, pagination, and footer behavior

- [x] 4.1 Connect search-input and type-chip interactions to the store so query-only, type-only, and combined filtering all update the visible Pokemon list.
- [x] 4.2 Expose next-batch loading from the list UI so additional Pokemon are requested and appended when the user reaches the end of the current results.
- [x] 4.3 Show `There's no pokemon meeting your criteria.` when the filtered Pokemon list is empty.
- [x] 4.4 Mark `Home` as the active/default footer action and render `Favorites` as a visible but disabled placeholder button without real navigation behavior yet.

## 5. Verification

- [x] 5.1 Add or update focused tests for any new UI logic introduced by the screen implementation if needed.
- [x] 5.2 Run the relevant automated checks and fix any issues needed for the list-screen change.
