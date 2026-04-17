## 1. Dependency and module setup

- [ ] 1.1 Add `axios` to the project dependencies if it is not already installed.
- [ ] 1.2 Create `src/shared/data/client.ts` as the shared Pok\u00e9API client entry point.
- [ ] 1.3 Export the client from `src/shared/data/index.ts` for feature-level imports.

## 2. Client configuration

- [ ] 2.1 Configure the Axios instance with the Pok\u00e9API v2 `baseURL`.
- [ ] 2.2 Configure a default request timeout in the shared client.
- [ ] 2.3 Define the typed application-facing error shape used by the client.

## 3. Error handling and verification

- [ ] 3.1 Implement normalized handling for timeout failures.
- [ ] 3.2 Implement normalized handling for network and unexpected API response failures.
- [ ] 3.3 Verify the client can perform requests successfully and rejects failures with the normalized error shape.
