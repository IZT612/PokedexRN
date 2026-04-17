## Context

The repository now has a shared API client under `src/shared/data/api/`, but it still does not define the typed data contracts that repositories will consume from Pok\u00e9API. The project structure already separates `shared`, `pokemon-list`, and `pokemon-detail`, so the missing work is not just adding interfaces, but placing them in the correct layer and module so shared contracts are reusable while feature-specific responses remain local to each feature.

## Goals / Non-Goals

**Goals:**
- Define a shared Pokemon entity contract with the fields needed across the app.
- Define a shared Pokemon type contract that can be reused by multiple data models.
- Define feature-specific list and detail response interfaces in the corresponding feature data modules.
- Keep the API typing structure aligned with the project's architectural boundaries by using data-layer folders such as `entities/` when appropriate.
- Allow type guards to be introduced only where they materially help validate or narrow API response data.

**Non-Goals:**
- Implement repository fetch logic or response mapping.
- Finalize UI-facing domain model transformations.
- Add runtime validation libraries or schema tooling.
- Introduce cross-feature abstractions beyond the interfaces needed for this change.

## Decisions

### Place shared API entities under shared data
`Pokemon` and `PokemonType` will live in the shared data layer because they are reusable contracts across multiple features and are part of API-facing data modeling.

Alternative considered: placing these interfaces in `shared/domain`.
This was rejected because the request explicitly treats them as API/data-layer entities and asks for `entities/` folders when that is their architectural home.

### Keep feature response interfaces inside each feature
`PokemonListResponse` will live under the pokemon-list feature and `PokemonDetailResponse` under the pokemon-detail feature so list pagination and detail payload concerns do not leak into shared modules unnecessarily.

Alternative considered: storing every API response interface in `shared/data`.
This was rejected because list and detail responses represent feature-specific endpoint contracts rather than broadly reusable shared entities.

### Use data-layer entities folders where they clarify ownership
The implementation will create `entities/` folders under the relevant data modules when those folders are the clearest place for the interfaces. This keeps the type definitions close to the layer that owns the raw API contracts and leaves room for additional models or guards later.

Alternative considered: putting all interfaces directly in `index.ts` files.
This was rejected because it does not scale well as API contracts grow and makes ownership less obvious.

### Keep type guards optional and targeted
Type guards may be added if they are needed to narrow unknown data or protect future repository code, but they should stay minimal and focused on the interfaces introduced by this change.

Alternative considered: requiring guards for every interface immediately.
This was rejected because the current goal is to establish contracts, not add broad runtime validation without a concrete need.

## Risks / Trade-offs

- [Shared entity boundaries may blur with future domain models] -> Keep these interfaces explicitly framed as data-layer API contracts and defer UI/domain mapping to later changes.
- [Feature-specific response interfaces may duplicate some fields] -> Accept small duplication to preserve module ownership and avoid prematurely centralizing endpoint-specific shapes.
- [Optional guards may be underused or overused] -> Only add guards when a concrete unknown-input boundary exists during implementation.

## Migration Plan

1. Create shared data entity files for `Pokemon` and `PokemonType`.
2. Create feature data entity files for `PokemonListResponse` and `PokemonDetailResponse` in their respective features.
3. Export the new interfaces through the relevant module indexes if needed by consumers.
4. Add narrow type guards only if implementation encounters unknown API payload handling that benefits from them.

Rollback is straightforward: remove the new entity files and any related exports if the architecture changes before repository implementation begins.

## Open Questions

- Should `sprites` be kept as a focused minimal object shape or mirror the broader Pok\u00e9API nested response in full detail?
- Will `PokemonDetailResponse` be identical to `Pokemon`, or should it be defined separately to leave room for future endpoint-specific divergence?
