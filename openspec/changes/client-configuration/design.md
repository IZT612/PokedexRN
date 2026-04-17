## Context

The current repository already separates shared and feature-level data folders, but the data layer is still scaffolded and does not yet contain a reusable HTTP client. The application will depend on Pok\u00e9API for list, detail, and type requests, so repeated per-feature request setup would create duplication and inconsistent behavior. This change introduces a single shared client entry point in `src/shared/data/` that later repositories can consume.

## Goals / Non-Goals

**Goals:**
- Provide one shared Axios client configured for `https://pokeapi.co/api/v2`.
- Define a request timeout suitable for mobile and web usage.
- Normalize transport and response failures into predictable application errors.
- Keep the initial client small so feature repositories can adopt it without additional abstraction.

**Non-Goals:**
- Implement Pokemon repositories or use cases.
- Add caching, retries, auth headers, or offline support.
- Define UI error copy or notification behavior beyond the client error contract.

## Decisions

### Use a single shared Axios instance
The client will be created once in `src/shared/data/client.ts` and exported for reuse across feature data modules. This keeps base URL and timeout configuration in one place.

Alternative considered: calling `fetch` directly from each feature module.
This was rejected because timeout and error normalization would be repeated in multiple places.

### Configure the client against Pok\u00e9API v2
The Axios instance will use `https://pokeapi.co/api/v2` as its `baseURL`, matching the PRD endpoint definitions.

Alternative considered: storing fully qualified URLs in each repository.
This was rejected because it couples feature modules to infrastructure details and makes future endpoint changes harder.

### Normalize thrown errors at the client boundary
The client module will expose a helper or interceptor-backed behavior that converts Axios failures into a small, stable error shape with distinct cases for timeout, network failure, and unexpected API responses.

Alternative considered: letting raw Axios errors flow upward.
This was rejected because it leaks library-specific details into domain and UI code.

### Keep the first version synchronous to adopt
The client will focus on request execution and error mapping only. Interceptors may be used if they simplify normalization, but the design avoids additional wrapper layers until repositories exist.

Alternative considered: introducing a generic API service abstraction immediately.
This was rejected because the repo does not yet have enough concrete consumers to justify the extra indirection.

## Risks / Trade-offs

- [Timeout too short for slower mobile networks] -> Start with a moderate timeout and keep it centralized so it can be tuned without touching repositories.
- [Error mapping hides useful debugging context] -> Preserve the original cause/details on the normalized error where practical.
- [Future repositories need different request behavior] -> Keep the shared client minimal and allow feature-specific wrappers on top rather than expanding the base client prematurely.

## Migration Plan

1. Add `axios` if it is not already installed.
2. Implement `src/shared/data/client.ts` with base URL, timeout, and normalized error handling.
3. Export the client through the shared data index so feature modules can adopt it.
4. Update future repository work to import the shared client instead of creating ad hoc HTTP calls.

Rollback is low risk: remove the shared client module and revert consumers back to direct request logic if needed.

## Open Questions

- What timeout value best matches the product's acceptable loading experience in mobile conditions?
- Should normalized errors use a class-based shape or a plain typed object in this codebase?
