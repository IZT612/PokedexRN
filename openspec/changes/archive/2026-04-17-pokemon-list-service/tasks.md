## 1. Pokemon-list service structure

- [x] 1.1 Create a dedicated pokemon-list data service location under `src/features/pokemon-list/data`
- [x] 1.2 Export the new pokemon-list service API through the relevant feature barrel files

## 2. Service implementation

- [x] 2.1 Implement a function that fetches Pokemon list data through the shared API client
- [x] 2.2 Implement a function that fetches Pokemon type data through the shared API client
- [x] 2.3 Ensure both service functions preserve the normalized error behavior from the shared API client

## 3. Verification

- [x] 3.1 Add focused automated tests for successful Pokemon list and Pokemon type retrieval
- [x] 3.2 Add focused automated tests that verify normalized failures are propagated for both service functions
- [x] 3.3 Run the relevant automated checks and confirm they pass before considering the implementation complete
