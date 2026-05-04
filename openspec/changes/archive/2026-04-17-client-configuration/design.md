## Context

The current repository already separates shared and feature-level data folders, but the data layer is still scaffolded and does not yet contain a reusable HTTP client. The application will depend on Pok\u00e9API for list, detail, and type requests, so repeated per-feature request setup would create duplication and inconsistent behavior. This change introduces a dedicated API area under `src/shared/data/api/`, with `client.ts` as the shared entry point that later repositories can consume.

## Goals / Non-Goals

**Goals:**
- Provide one shared Axios client configured for `https://pokeapi.co/api/v2`.
- Enforce a fixed `10` second request timeout.
- Normalize transport and response failures into predictable application errors.
- Keep the initial client small so feature repositories can adopt it without additional abstraction.
- Add a unit test that exercises the client configuration and error normalization behavior.

**Non-Goals:**
- Implement Pokemon repositories or use cases.
- Add caching, retries, auth headers, or offline support.
- Define UI error copy or notification behavior beyond the client error contract.

## Decisions

### Use a dedicated shared API folder
The client will live in `src/shared/data/api/client.ts`, and the shared data layer will re-export it for reuse across feature data modules. This keeps API-specific concerns grouped together and leaves room for future API helpers alongside the client.

Alternative considered: calling `fetch` directly from each feature module.
This was rejected because timeout and error normalization would be repeated in multiple places.

### Configure the client against Pok\u00e9API v2
The Axios instance will use `https://pokeapi.co/api/v2` as its `baseURL`, matching the PRD endpoint definitions.

Alternative considered: storing fully qualified URLs in each repository.
This was rejected because it couples feature modules to infrastructure details and makes future endpoint changes harder.

### Use a fixed 10 second timeout
The Axios instance will use a `10000` millisecond timeout so request behavior is deterministic across consumers.

Alternative considered: leaving the timeout configurable or deciding it later.
This was rejected because the change now has an explicit product requirement for a 10 second limit.

### Normalize thrown errors as plain typed objects
The client module will expose a helper or interceptor-backed behavior that converts Axios failures into a small, stable plain-object error shape with distinct cases for timeout, network failure, and unexpected API responses.

Alternative considered: letting raw Axios errors flow upward.
This was rejected because it leaks library-specific details into domain and UI code.

Alternative considered: using custom error classes.
This was rejected because the change now explicitly requires plain typed objects instead of class-based shapes.

### Keep the first version synchronous to adopt
The client will focus on request execution and error mapping only. Interceptors may be used if they simplify normalization, but the design avoids additional wrapper layers until repositories exist.

Alternative considered: introducing a generic API service abstraction immediately.
This was rejected because the repo does not yet have enough concrete consumers to justify the extra indirection.

## Risks / Trade-offs

- [10 second timeout may be too short for slower mobile networks] -> Keep the timeout centralized in the client so it can be changed later through a follow-up spec if real usage shows it is too aggressive.
- [Error mapping hides useful debugging context] -> Preserve the original cause/details on the normalized error where practical.
- [Future repositories need different request behavior] -> Keep the shared client minimal and allow feature-specific wrappers on top rather than expanding the base client prematurely.
- [Test setup may not exist yet] -> Add the minimal unit test configuration needed for the client and keep the scope focused on this module.

## Migration Plan

1. Add `axios` if it is not already installed.
2. Implement `src/shared/data/api/client.ts` with base URL, a 10 second timeout, and normalized plain-object error handling.
3. Export the client through the shared data index so feature modules can adopt it.
4. Add a unit test for the client and fix any issues until the full test suite passes.
5. Update future repository work to import the shared client instead of creating ad hoc HTTP calls.

Rollback is low risk: remove the shared client module and revert consumers back to direct request logic if needed.

## Open Questions

- Which test runner already aligns best with the repo if test infrastructure must be introduced for this client test?
