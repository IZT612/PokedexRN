## Why

The app now has a shared API client, but it still lacks the typed API contracts needed to model Pokemon list and detail responses consistently. Defining those interfaces now prevents feature code from inventing conflicting shapes and gives the data layer a clear architectural home for shared and feature-specific API types.

## What Changes

- Add typed Pokemon API entities and response interfaces for shared, list, and detail data concerns.
- Define where each interface belongs so shared contracts stay in `shared` and feature-specific responses stay inside their respective feature data layers.
- Establish folder structure guidance for API data entities, including `entities/` folders where shared or feature data models need to live.
- Allow type guards to be added if they are needed to validate or narrow API response data safely.

## Capabilities

### New Capabilities
- `api-types`: Define and organize typed Pok\u00e9API data contracts for shared Pokemon entities plus pokemon-list and pokemon-detail response models.

### Modified Capabilities

None.

## Impact

- Affected code: `src/shared/`, `src/features/pokemon-list/`, and `src/features/pokemon-detail/`.
- Architecture: introduces or expands data-layer `entities/` folders to keep API types aligned with project structure.
- Dependencies: no new runtime dependency required.
- External system: `https://pokeapi.co/api/v2` response shapes for list and detail endpoints.
