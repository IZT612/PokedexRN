## 1. Shared data entities

- [ ] 1.1 Create a shared data `entities/` folder for API-facing Pokemon contracts.
- [ ] 1.2 Add `PokemonType` in the shared data entities module.
- [ ] 1.3 Add `Pokemon` in the shared data entities module with `id`, `name`, `sprites`, `types`, `stats`, `abilities`, `weight`, and `height`.
- [ ] 1.4 Export the shared data entities through the relevant shared module indexes.

## 2. Feature response contracts

- [ ] 2.1 Create a pokemon-list data `entities/` folder for feature-specific API response types.
- [ ] 2.2 Add `PokemonListResponse` in the pokemon-list feature data layer.
- [ ] 2.3 Create a pokemon-detail data `entities/` folder for feature-specific API response types.
- [ ] 2.4 Add `PokemonDetailResponse` in the pokemon-detail feature data layer.
- [ ] 2.5 Export the feature response interfaces through the relevant feature data indexes.

## 3. Guard and verification work

- [ ] 3.1 Add targeted type guards only if implementation reveals a concrete narrowing need.
- [ ] 3.2 Verify the new interface files and exports follow the intended shared/list/detail architecture.
- [ ] 3.3 Run the relevant validation step and fix any issues introduced by the new API types.
