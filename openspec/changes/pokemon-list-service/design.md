## Context

The repository already has a shared Axios client in `src/shared/data/api/client.ts` that centralizes base URL, timeout handling, and normalized request failures. What is still missing is a higher-level pokemon-list service that uses that client to fetch Pokemon list data and Pokemon type data without duplicating endpoint knowledge or error handling behavior inside UI code.

The repo guidance favors keeping reusable API infrastructure in `src/shared/data/api`, keeping feature-specific retrieval logic in its owning feature, and adding focused tests near the code they cover. This change should stay small and fit that existing layering rather than introducing a broader repository or store abstraction.

## Goals / Non-Goals

**Goals:**
- Add a pokemon-list feature service API for fetching the Pokemon list.
- Add a pokemon-list feature service API for fetching Pokemon types.
- Reuse the existing normalized API client error behavior instead of introducing a second error shape.
- Add focused automated tests for successful requests and failure propagation.

**Non-Goals:**
- Introduce feature-level state management or caching.
- Redesign the existing API client or entity model shape.
- Add UI handling, screens, or cross-feature orchestration.

## Decisions

### Add a focused pokemon-list service module under `src/features/pokemon-list/data`
The service should live in the pokemon-list feature because the current behavior is list-specific and there is no confirmed second feature consumer yet. Shared code should stay limited to reusable API infrastructure and shared entities.

Alternative considered: placing service logic under `src/shared/data/api`.
Why not: that would make feature-specific retrieval logic look globally shared before there is a concrete reuse case.

### Expose separate functions for list and types retrieval
The service should export one function for fetching the Pokemon list and one for fetching Pokemon types. This keeps the public API straightforward and aligns with the user request.

Alternative considered: a single service object with methods.
Why not: the repo currently favors simple named exports and minimal indirection.

### Let the shared API client own normalized error behavior
The new feature service should allow the `apiClient` interceptor behavior to remain the single source of truth for normalized request failures. The service may enrich request parameters or response mapping, but it should not translate failures into a second custom error contract.

Alternative considered: wrapping client failures in service-specific errors.
Why not: that would duplicate existing behavior and increase testing surface without a clear consumer need.

### Keep tests close to the new feature service
Tests should live near the pokemon-list data code in a dedicated test location so the behavior is easy to find and maintain. The tests should cover list retrieval, type retrieval, and normalized failure propagation.

Alternative considered: relying only on the existing API client tests.
Why not: those tests do not prove that the new service calls the expected endpoints or forwards failures correctly.

## Risks / Trade-offs

- [Risk] Endpoint response mapping may depend on raw PokéAPI shapes that differ from shared entities. → Mitigation: keep the service surface narrow and only map fields that current shared entities already model.
- [Risk] Service tests could become fragile if they depend on live network responses. → Mitigation: use adapter-based client mocking, matching the existing API client tests.
- [Risk] The service could be promoted to shared too early and blur ownership boundaries. → Mitigation: keep it under `src/features/pokemon-list/data/` unless a second real consumer appears.

## Migration Plan

No migration is required. This is an additive feature data capability. Consumers can adopt the new service incrementally after implementation.

## Open Questions

- None at this stage.
