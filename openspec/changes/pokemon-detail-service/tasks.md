## 1. Pokemon-detail service structure

- [ ] 1.1 Create a dedicated pokemon-detail data service location under `src/features/pokemon-detail/data`
- [ ] 1.2 Export the new pokemon-detail service API through the relevant feature barrel files

## 2. Service implementation

- [ ] 2.1 Implement a function that fetches one Pokemon detail through the shared API client
- [ ] 2.2 Parse the endpoint response into the feature-owned `PokemonDetailResponse` shape
- [ ] 2.3 Ensure the pokemon-detail service preserves the normalized error behavior from the shared API client

## 3. Verification

- [ ] 3.1 Add focused mocked automated tests for successful Pokemon detail retrieval and response parsing
- [ ] 3.2 Add focused mocked automated tests that verify normalized failures are propagated by the pokemon-detail service
- [ ] 3.3 Run the relevant automated checks and confirm they pass before considering the implementation complete
