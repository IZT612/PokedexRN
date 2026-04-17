## 1. Dependency and module setup

- [x] 1.1 Add `axios` to the project dependencies if it is not already installed.
- [x] 1.2 Create `src/shared/data/api/client.ts` as the shared Pok\u00e9API client entry point.
- [x] 1.3 Export the client through `src/shared/data/index.ts` for feature-level imports.
- [x] 1.4 Add the minimal unit test file and any required test wiring for the client module.

## 2. Client configuration

- [x] 2.1 Configure the Axios instance with the Pok\u00e9API v2 `baseURL`.
- [x] 2.2 Configure a `10000` millisecond timeout in the shared client.
- [x] 2.3 Define the plain typed application-facing error object used by the client.

## 3. Error handling and verification

- [x] 3.1 Implement normalized handling for timeout failures.
- [x] 3.2 Implement normalized handling for network and unexpected API response failures.
- [x] 3.3 Add unit coverage for client configuration and normalized failure behavior.
- [x] 3.4 Run the full test suite and fix any failures until all tests pass.
