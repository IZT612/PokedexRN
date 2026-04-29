## Why

The app currently lacks a dedicated pokemon-list service for retrieving the Pokemon list and the available Pokemon types, which leaves this data access behavior undefined at the spec level. Adding an explicit service contract now makes the data flow easier to implement consistently and ensures error handling and test coverage are part of the expected behavior.

## What Changes

- Add a pokemon-list feature service capability for fetching the Pokemon list.
- Add support in the same service capability for fetching the available Pokemon types.
- Define normalized error handling expectations for failed service requests.
- Require automated test coverage for the service behavior, including error scenarios.

## Capabilities

### New Capabilities
- `pokemon-list-service`: Defines a pokemon-list feature data service that retrieves Pokemon list data, retrieves Pokemon type data, and exposes normalized failures to callers.

### Modified Capabilities

## Impact

- Affected code will likely live under `src/features/pokemon-list/data/` while continuing to rely on shared API client utilities.
- The change depends on the existing API client utilities and their error normalization behavior.
- New automated tests will be needed for the added shared service behavior.
