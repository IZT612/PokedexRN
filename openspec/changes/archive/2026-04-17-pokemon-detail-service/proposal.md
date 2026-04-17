## Why

The app currently lacks a dedicated pokemon-detail service for retrieving a single Pokemon's detail data, which leaves that behavior undefined at the spec level. Adding an explicit contract now makes detail fetching, response parsing, error handling, and test coverage consistent with the existing pokemon-list-service approach.

## What Changes

- Add a pokemon-detail feature service capability for fetching a single Pokemon detail.
- Parse the necessary detail fields into the feature-facing detail shape.
- Define normalized error handling expectations for failed detail requests.
- Require automated test coverage for successful and failing detail requests.

## Capabilities

### New Capabilities
- `pokemon-detail-service`: Defines a pokemon-detail feature data service that retrieves one Pokemon detail payload, parses the necessary data, and exposes normalized failures to callers.

### Modified Capabilities

## Impact

- Affected code will likely live under `src/features/pokemon-detail/data/` while continuing to rely on shared API client utilities.
- The change depends on the existing API client utilities, shared entities, and feature detail response contract.
- New automated tests will be needed for the added pokemon-detail service behavior.
