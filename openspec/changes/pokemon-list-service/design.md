## Context

The repository already has a shared Axios client in `src/shared/data/api/client.ts` that centralizes base URL, timeout handling, and normalized request failures. What is still missing is a higher-level shared service that uses that client to fetch Pokemon list data and Pokemon type data in a way that feature code can reuse without duplicating endpoint knowledge or error handling behavior.

The repo guidance favors keeping reusable API code in `src/shared/data`, keeping normalization logic out of UI components, and adding focused tests near shared data code. This change should stay small and fit that existing layering rather than introducing a broader repository or store abstraction.

## Goals / Non-Goals

**Goals:**
- Add a shared service API for fetching the Pokemon list.
- Add a shared service API for fetching Pokemon types.
- Reuse the existing normalized API client error behavior instead of introducing a second error shape.
- Add focused automated tests for successful requests and failure propagation.

**Non-Goals:**
- Introduce feature-level state management or caching.
- Redesign the existing API client or entity model shape.
- Add UI handling, screens, or cross-feature orchestration.

## Decisions

### Add a focused shared service module under `src/shared/data`
The service should live in a dedicated shared data folder instead of broadening feature-local data modules. This matches the existing layering and keeps endpoint orchestration reusable by both current and future consumers.

Alternative considered: placing service logic under `src/features/pokemon-list/data`.
Why not: that would make Pokemon type retrieval harder to reuse and would couple a shared API concern to a single feature.

### Expose separate functions for list and types retrieval
The service should export one function for fetching the Pokemon list and one for fetching Pokemon types. This keeps the public API straightforward and aligns with the user request.

Alternative considered: a single service object with methods.
Why not: the repo currently favors simple named exports and minimal indirection.

### Let the shared API client own normalized error behavior
The new service should allow the `apiClient` interceptor behavior to remain the single source of truth for normalized request failures. The service may enrich request parameters or response mapping, but it should not translate failures into a second custom error contract.

Alternative considered: wrapping client failures in service-specific errors.
Why not: that would duplicate existing behavior and increase testing surface without a clear consumer need.

### Keep tests close to the new shared service
Tests should live near the new shared data code in a dedicated test location so the behavior is easy to find and maintain. The tests should cover list retrieval, type retrieval, and normalized failure propagation.

Alternative considered: relying only on the existing API client tests.
Why not: those tests do not prove that the new service calls the expected endpoints or forwards failures correctly.

## Risks / Trade-offs

- [Risk] Endpoint response mapping may depend on raw PokéAPI shapes that differ from shared entities. → Mitigation: keep the service surface narrow and only map fields that current shared entities already model.
- [Risk] Service tests could become fragile if they depend on live network responses. → Mitigation: use adapter-based client mocking, matching the existing API client tests.
- [Risk] A generic shared service folder could become another catch-all bucket. → Mitigation: create a specific folder for this service concern instead of adding files loosely under `shared/data`.

## Migration Plan

No migration is required. This is an additive shared data capability. Consumers can adopt the new service incrementally after implementation.

## Open Questions

- None at this stage.
