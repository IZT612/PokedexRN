## 1. Repository structure and contracts

- [x] 1.1 Add feature-owned repository modules and exports under `src/features/pokemon-list/data/` and `src/features/pokemon-detail/data/`.
- [x] 1.2 Define repository method contracts that expose store-friendly outputs while standardizing Pokemon data on the shared `Pokemon` entity.
- [x] 1.3 Update any response or helper contracts needed so repositories can consume `PokemonListResponse` and `PokemonDetailResponse` without leaking those DTOs into store state.

## 2. Repository implementation

- [x] 2.1 Implement `PokemonListRepository` fetch logic through the shared API client for list and type loading.
- [x] 2.2 Implement `PokemonDetailRepository` fetch logic through the shared API client for single-Pokemon loading.
- [x] 2.3 Add repository-level transformation from feature response DTOs into store-friendly `Pokemon` data and preserve normalized error propagation.

## 3. Consumer and verification updates

- [x] 3.1 Update feature consumers and pending Zustand store-facing imports to use repositories as the async fetch boundary instead of direct service calls.
- [x] 3.2 Add focused repository tests for success-path transformation and normalized failure propagation without live API calls.
- [x] 3.3 Run the relevant automated checks and fix any issues needed for the repository change.
