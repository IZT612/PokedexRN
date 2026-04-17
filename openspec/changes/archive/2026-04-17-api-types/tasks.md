## 1. Shared data entities

- [x] 1.1 Create a shared data `entities/` folder for API-facing Pokemon contracts.
- [x] 1.2 Add `PokemonType` in the shared data entities module.
- [x] 1.3 Add `Pokemon` in the shared data entities module with `id`, `name`, a minimal `sprites` object that includes `front_default`, `types`, `stats`, `abilities`, `weight`, and `height`.
- [x] 1.4 Export the shared data entities through the relevant shared module indexes.

## 2. Feature response contracts

- [x] 2.1 Create a pokemon-list data `entities/` folder for feature-specific API response types.
- [x] 2.2 Add `PokemonListResponse` in the pokemon-list feature data layer.
- [x] 2.3 Create a pokemon-detail data `entities/` folder for feature-specific API response types.
- [x] 2.4 Add `PokemonDetailResponse` in the pokemon-detail feature data layer as a separate interface rather than reusing `Pokemon` directly.
- [x] 2.5 Export the feature response interfaces through the relevant feature data indexes.

## 3. Guard and verification work

- [x] 3.1 Add targeted type guards only if implementation reveals a concrete narrowing need.
- [x] 3.2 Verify the new interface files and exports follow the intended shared/list/detail architecture.
- [x] 3.3 Run the relevant validation step and fix any issues introduced by the new API types.
