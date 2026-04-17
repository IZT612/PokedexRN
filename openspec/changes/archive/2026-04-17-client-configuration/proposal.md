## Why

The app depends on Pok\u00e9API data, but the current data layer does not yet have a shared HTTP client for consistent requests, timeout behavior, or error handling. Defining that client now gives the rest of the API implementation a stable foundation and reduces repeated network configuration across features.

## What Changes

- Add a shared API client configuration for Pok\u00e9API requests using Axios under `src/shared/data/api/`.
- Define a fixed `10` second request timeout and normalized plain-object error handling strategy.
- Expose the client from the shared data layer so feature-level repositories can use the same configuration.
- Add unit coverage for the client behavior and require the test suite to pass before the change is complete.
- Establish the behavioral contract for successful requests and failures before repository implementation begins.

## Capabilities

### New Capabilities
- `api-client`: Create and expose a shared HTTP client under `src/shared/data/api/` that can perform Pok\u00e9API requests with a configured base URL, a 10 second timeout, predictable plain-object error handling, and unit test coverage.

### Modified Capabilities

None.

## Impact

- Affected code: `src/shared/data/api/`, `src/shared/data/`, and feature data modules that will consume the client later.
- Dependencies: adds `axios` as the HTTP client if it is not already present.
- Tests: adds or updates unit test coverage for the shared API client.
- External system: `https://pokeapi.co/api/v2`.
