## Why

The app depends on Pok\u00e9API data, but the current data layer does not yet have a shared HTTP client for consistent requests, timeout behavior, or error handling. Defining that client now gives the rest of the API implementation a stable foundation and reduces repeated network configuration across features.

## What Changes

- Add a shared API client configuration for Pok\u00e9API requests using Axios.
- Define a consistent base URL, request timeout, and normalized error handling strategy.
- Expose the client from the shared data layer so feature-level repositories can use the same configuration.
- Establish the behavioral contract for successful requests and failures before repository implementation begins.

## Capabilities

### New Capabilities
- `api-client`: Create and expose a shared HTTP client that can perform Pok\u00e9API requests with a configured base URL, timeout, and predictable error handling.

### Modified Capabilities

None.

## Impact

- Affected code: `src/shared/data/` and feature data modules that will consume the client later.
- Dependencies: adds `axios` as the HTTP client if it is not already present.
- External system: `https://pokeapi.co/api/v2`.
