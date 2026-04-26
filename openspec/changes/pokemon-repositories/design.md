## Context

The pending `state-zustand` change requires repository-backed store actions and already fixes the architectural direction around one store per feature. The current codebase has feature-owned API services for list and detail fetching, but there is no repository layer that converts raw API responses and feature response contracts such as `PokemonListResponse` and `PokemonDetailResponse` into the shared `Pokemon` shape that store state is expected to use.

The repo structure favors feature ownership for non-shared data access code, and earlier service changes intentionally kept list and detail retrieval separate because there was no proven shared consumer. This repository change needs to preserve that ownership model while establishing a clear boundary between API concerns and store-facing data.

## Goals / Non-Goals

**Goals:**
- Add a repository layer for Pokemon list and Pokemon detail flows that can be consumed by feature stores.
- Keep repositories feature-separated so list and detail ownership stay aligned with the one-store-per-feature direction.
- Make repositories responsible for API fetching and data shaping into store-friendly `Pokemon` data.
- Preserve feature response contracts where they still help define list and detail retrieval semantics.

**Non-Goals:**
- Introduce a shared cross-feature `PokemonRepository` abstraction.
- Redesign the shared API client or shared `Pokemon` entity.
- Add caching, persistence, or offline synchronization.
- Collapse list and detail use cases into a single broad data module.

## Decisions

<!-- Specify what response means to avoid confussions. -->
### Response means raw API payload
In this change, a response means the raw payload returned by the API. Feature-owned service contracts such as `PokemonListResponse` and `PokemonDetailResponse` remain parsed representations derived from those raw payloads, not the final shape stores should consume.

Alternative considered: use response to mean both raw API payloads and parsed feature DTOs interchangeably.
This was rejected because it blurs the handoff between API-facing parsing and repository-level domain mapping.

<!-- Keep repositories aligned with the current feature split structure instead of inventing a shared abstraction before there is proven reuse. -->
### Use one repository per feature
The change should introduce `PokemonListRepository` and `PokemonDetailRepository` rather than a shared `PokemonRepository`. This keeps ownership parallel to the store plan, avoids one abstraction having to serve pagination and single-entity retrieval equally, and matches the current feature split.

Alternative considered: create one shared `PokemonRepository`.
This was rejected because the current consumers are still feature-specific and the repo guidance discourages promoting data logic to shared before there is proven cross-feature reuse.

<!-- Repositories should be the interface stores depend on so state code does not need transport knowledge. -->
### Repositories are the fetch boundary for store consumers
Repositories should be the modules that feature stores call for async loading, and they should own the API fetch orchestration through the shared `apiClient`. That keeps transport knowledge out of state code and gives the store a narrow domain-friendly contract.

Alternative considered: have stores call feature services directly.
This was rejected because the Zustand change already requires a repository abstraction between store logic and transport-level data fetching.

<!-- Specify using the Pokemon entity that stores will require instead of using responses directly. -->
### Repositories expose shared Pokemon-shaped data to stores
Repository outputs for store-facing methods should use the shared `Pokemon` entity where Pokemon data enters state. List repositories may still return pagination metadata alongside `Pokemon[]`, and detail repositories may return a single `Pokemon`, but the Pokemon payload itself should be standardized for store use.

Alternative considered: let repositories return `PokemonListResponse` and `PokemonDetailResponse` directly to stores.
This was rejected because the store contract is already intended to standardize on the shared `Pokemon` entity, and returning feature DTOs would push data-shape branching into state logic.

<!-- API responses should remain for repository logic, while repositories export the usable Pokemon entity shape and any feature data stores need. -->
### Keep feature response DTOs as repository-internal parsing contracts
`PokemonListResponse` and `PokemonDetailResponse` should remain feature-owned response contracts that describe the data returned from API-facing retrieval logic. Repositories should consume those response shapes and transform them into useful caller-facing results, exposing the shared `Pokemon` entity wherever Pokemon data enters store state and preserving any additional feature-specific data, such as list pagination metadata, that the store still needs. Stores must not depend on the response DTOs directly.

Alternative considered: remove the response DTO layer entirely.
This was rejected because the existing response contracts still provide a clear boundary for API-facing data, and removing them would either push raw endpoint shapes upward or collapse service and repository responsibilities together.

<!-- Specify the flow that will be used to make sure it is well implemented -->
### Use raw-response-to-repository-to-store flow
The intended flow is: the API client retrieves the raw API payload, feature-owned API-facing logic parses that payload into `PokemonListResponse` or `PokemonDetailResponse`, repositories consume those parsed response contracts, and repositories return the useful store-facing data. That store-facing data must use the shared `Pokemon` entity for Pokemon records and may include any additional feature-specific values the store needs.

Alternative considered: let stores or UI code consume feature response contracts directly.
This was rejected because it would leak API-facing data shapes into state code and weaken the repository boundary.

### Use named-export repository functions
Repositories should be implemented as plain named-export functions rather than classes. This keeps the data layer consistent with the rest of the codebase, avoids unnecessary object construction, and keeps tests focused on function contracts.

Alternative considered: implement repositories as classes.
This was rejected because the repository behavior is stateless and the current repo style does not benefit from constructor-based abstractions here.

<!-- The list flow needs pagination metadata in addition to Pokemon entities, so the repository should preserve that extra data instead of removing it. -->
### Keep list pagination metadata in a repository-specific result
The `pokemon-list` repository should return a repository-specific list result that preserves `count`, `next`, `previous`, the batch `limit` of `30`, and the current `offset` alongside `Pokemon[]`. The `limit` and `offset` values must be available so callers can request the next batch correctly. The `pokemon-detail` repository should return a single `Pokemon`, and `fetchPokemonTypes` should stay owned by the list repository while type loading remains feature-specific and return `PokemonType[]`.

Alternative considered: flatten list repository results to only `Pokemon[]`.
This was rejected because it would discard useful pagination data or force callers to reconstruct list-specific metadata outside the repository boundary.

<!-- Validate repository mapping and failure behavior directly before store code depends on them -->
### Keep repository tests focused on transformation and failure propagation
Repository tests should cover successful fetch-to-domain mapping and normalized failure propagation without relying on live API calls. Service-level tests can remain focused on lower-level parsing if those modules continue to exist, while repository tests validate the new boundary stores depend on.

Alternative considered: rely only on store tests once repositories exist.
This was rejected because repositories introduce transformation logic that should be validated directly and independently from Zustand behavior.

## Risks / Trade-offs

- [Risk] The list and detail repositories may duplicate some Pokemon normalization logic. -> Mitigation: keep any shared mapping helper minimal and only extract it if both repositories clearly need the same transformation.
- [Risk] Keeping services and repositories during migration may create temporary overlap. -> Mitigation: define repositories as the consumer-facing fetch boundary and reduce service visibility to repository-internal use where possible.
- [Risk] Repository return shapes could become too store-specific and hard to reuse elsewhere. -> Mitigation: standardize only the Pokemon entity and keep non-Pokemon metadata narrowly scoped to the feature use case.
- [Risk] The change may conflict with the current service specs if not updated explicitly. -> Mitigation: include spec deltas that move the fetch boundary expectation from service consumers to repositories.

## Migration Plan

1. Add feature-owned repository modules and exports for list and detail data access.
2. Implement repository fetch methods against the shared API client, reusing existing response parsing where appropriate.
3. Update feature consumers and the upcoming Zustand stores to depend on repositories instead of service fetch functions.
4. Keep or simplify existing service modules based on whether they still provide useful parsing helpers.
5. If rollback is needed, switch store or feature consumers back to the existing service functions and remove the repository layer.

## Open Questions

- None at this time.
