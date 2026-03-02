## Getting started

### 1.  Prerequisites

In order to execute the app, you have to make sure you have the following tools:

#### 1.1 Node.js

* **Node.js (v18 or higher):** Check your current version by running "node -v".

If you don't have it installed, follow this link: https://nodejs.org/

#### 1.2 Expo CLI

This project uses the local version of Expo to avoid system conflicts and permission issues.

* **Check Installation:** You can verify the local Expo CLI by running "npx expo -v".
* **No Global Install:** It is NOT necessary to install "expo-cli" globally with "-g".
* **Troubleshooting:** If you have an old global version and receive a "WARNING", you should uninstall it using "npm uninstall -g expo-cli".

If you need more information about the modern Expo CLI, you can visit: https://docs.expo.dev/more/expo-cli/


#### 1.3 Android Studio & Emulator

To run the application on a virtual device, you need to set up the Android development environment.

* **Android Studio:** Download and install it from the official site: https://developer.android.com/studio
* **SDK Manager:** Ensure you have the "Android SDK" and "Build-Tools" installed (found in Settings > Languages & Frameworks > Android SDK).
* **Virtual Device:** Open the "Device Manager" in Android Studio and create a new virtual device.