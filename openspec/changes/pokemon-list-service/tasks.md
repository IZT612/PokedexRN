## 1. Shared service structure

- [ ] 1.1 Create a dedicated shared data service location for the Pokemon list service under `src/shared/data`
- [ ] 1.2 Export the new shared service API through the relevant shared data barrel files

## 2. Service implementation

- [ ] 2.1 Implement a function that fetches Pokemon list data through the shared API client
- [ ] 2.2 Implement a function that fetches Pokemon type data through the shared API client
- [ ] 2.3 Ensure both service functions preserve the normalized error behavior from the shared API client

## 3. Verification

- [ ] 3.1 Add focused automated tests for successful Pokemon list and Pokemon type retrieval
- [ ] 3.2 Add focused automated tests that verify normalized failures are propagated for both service functions
- [ ] 3.3 Run the relevant automated checks and confirm they pass before considering the implementation complete
