## Context

The repository already has a shared Axios client in `src/shared/data/api/client.ts` that centralizes base URL, timeout handling, and normalized request failures. What is still missing is a higher-level pokemon-detail service that uses that client to fetch one Pokemon detail payload and parse it into the feature-facing response shape without duplicating endpoint knowledge or error handling behavior inside UI code.

The repo guidance favors keeping reusable API infrastructure in `src/shared/data/api`, keeping feature-specific retrieval logic in its owning feature, and adding focused tests near the code they cover. This change should stay small and fit that existing layering rather than introducing a broader repository or store abstraction.

## Goals / Non-Goals

**Goals:**
- Add a pokemon-detail feature service API for fetching one Pokemon detail.
- Parse the response into the existing `PokemonDetailResponse` feature shape.
- Reuse the existing normalized API client error behavior instead of introducing a second error shape.
- Add focused automated tests for successful requests and failure propagation.

**Non-Goals:**
- Introduce feature-level state management or caching.
- Redesign the existing API client or shared entity model shape.
- Add list fetching behavior, UI handling, screens, or cross-feature orchestration.

## Decisions

### Add a focused pokemon-detail service module under `src/features/pokemon-detail/data`
The service should live in the pokemon-detail feature because the current behavior is detail-specific and there is no confirmed second feature consumer yet. Shared code should stay limited to reusable API infrastructure and shared entities.

Alternative considered: placing service logic under `src/shared/data/api`.
Why not: that would make feature-specific retrieval logic look globally shared before there is a concrete reuse case.

### Expose a single detail retrieval function
The service should export one function for fetching a Pokemon detail by identifier or name. This keeps the public API straightforward and matches the scope of the feature.

Alternative considered: a service object with methods.
Why not: the repo currently favors simple named exports and minimal indirection.

### Parse the raw endpoint payload into `PokemonDetailResponse`
The new service should map the necessary detail fields into the feature-owned `PokemonDetailResponse` contract rather than leaking the raw endpoint payload to consumers.

Alternative considered: returning the raw API payload directly.
Why not: the feature already owns a detail response contract, and keeping parsing inside the service prevents endpoint shape knowledge from spreading outward.

### Let the shared API client own normalized error behavior
The new feature service should allow the `apiClient` interceptor behavior to remain the single source of truth for normalized request failures. The service may parse response data, but it should not translate failures into a second custom error contract.

Alternative considered: wrapping client failures in service-specific errors.
Why not: that would duplicate existing behavior and increase testing surface without a clear consumer need.

### Keep tests close to the new feature service
Tests should live near the pokemon-detail data code in a dedicated test location so the behavior is easy to find and maintain. The tests should cover successful detail retrieval, response parsing, and normalized failure propagation.

### Use mocked tests that run offline
The service tests should mock API client behavior instead of depending on live external calls so they remain reliable in offline and CI environments.

Alternative considered: hitting the live PokeAPI in tests.
Why not: that would make automated checks slower and more fragile, and it would break offline execution.

Alternative considered: adapter-level request stubbing inside each test.
Why not: direct API client method mocks make the service boundary under test more explicit and keep the tests focused on service behavior rather than transport wiring.

Alternative considered: relying only on the existing API client tests.
Why not: those tests do not prove that the new service calls the expected endpoint or returns the feature detail shape correctly.

## Risks / Trade-offs

- [Risk] The detail endpoint may contain more fields than the feature contract needs. → Mitigation: parse only the fields already required by `PokemonDetailResponse`.
- [Risk] Service tests could become fragile if they depend on live network responses. → Mitigation: mock the shared API client methods directly so the suite runs offline and stays focused on service behavior.
- [Risk] The service could be promoted to shared too early and blur ownership boundaries. → Mitigation: keep it under `src/features/pokemon-detail/data/` unless a second real consumer appears.

## Migration Plan

No migration is required. This is an additive feature data capability. Consumers can adopt the new service incrementally after implementation.

## Open Questions

- None at this stage.
