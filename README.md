## Getting started

### 1. Prerequisites

In order to execute the app, you have to make sure you have the following tools:

#### 1.1 Node.js

- **Node.js (v18 or higher):** Check your current version by running "node -v".

If you don't have it installed, follow this link: https://nodejs.org/

#### 1.2 Expo CLI

This project uses the local version of Expo to avoid system conflicts and permission issues.

- **Check Installation:** You can verify the local Expo CLI by running "npx expo -v".
- **No Global Install:** It is NOT necessary to install "expo-cli" globally with "-g".
- **Troubleshooting:** If you have an old global version and receive a "WARNING", you should uninstall it using "npm uninstall -g expo-cli".

If you need more information about the modern Expo CLI, you can visit: https://docs.expo.dev/more/expo-cli/

#### 1.3 Android Studio & Emulator

To run the application on a virtual device, you need to set up the Android development environment.

- **Android Studio:** Download and install it from the official site: https://developer.android.com/studio
- **SDK Manager:** Ensure you have the "Android SDK" and "Build-Tools" installed (found in Settings > Languages & Frameworks > Android SDK).
- **Virtual Device:** Open the "Device Manager" in Android Studio and create a new virtual device.

#### 1.4 VSCode Extensions

To ensure the best development experience and maintain code quality, we recommend installing the following extensions:

- **ESLint:** Helps maintain clean code and detects potential errors while you type.
- **Prettier:** An opinionated code formatter that ensures a consistent style across the entire project.
- **React Native Tools** Provides specialized support for debugging and running React Native commands directly from VS Code.

> **Note:** These extensions are highly recommended for developers but are not required to simply run the application.

### 2. Project Structure

The project follows a **Clean Architecture** pattern to ensure scalability and maintainability:

```text
src/
├── core/                 # Shared configurations and Dependency Injection
│   ├── config/
│   └── di/
├── data/                 # Implementation of data sources
│   ├── api/              # API clients and network calls
│   ├── mappers/          # Data transformation
│   └── repositories/     # Implementation of repository interfaces
├── domain/               # Business logic
│   ├── entities/         # Business models
│   ├── interfaces/       # Abstract definitions
│   │   ├── repositories/
│   │   └── useCases/
│   └── useCases/         # Application specific business rules
└── ui/                   # Presentation layer
    ├── components/       # Reusable UI components
    ├── hooks/            # Custom React hooks
    ├── viewModels/       # Logic for views
    └── views/            # Screen components
```
