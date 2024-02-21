## Amnak React Native App

### Overview

Amnak is a React Native mobile application designed to create cybersecurity awareness. The app is developed for both Android and iOS platforms, and its code is organized as follows:

- `android`: Android platform-specific code
- `ios`: iOS platform-specific code
- `assets`: Directory containing assets used in the app
- `src`: Shared code for both platforms
  - `screens`: JavaScript files for all screens
  - Navigation system

### Getting Started

Follow the steps below to run the React Native app using Expo:

#### Prerequisites

Make sure you have Node.js: [https://nodejs.org/](https://nodejs.org/) and Expo CLI: [https://docs.expo.dev/get-started/installation/](https://docs.expo.dev/get-started/installation/) installed on your machine.

#### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/Amnak-UAE.git
   cd Amnak-UAE
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

   This command will install the necessary packages and dependencies required for the project.

#### Running the App

##### Expo Start

To run the app using Expo, use the following command:

```bash
expo start --dev-client
```

This will start the development server and open Expo DevTools in your default browser. You can then use Expo Go on your mobile device to preview the app.

##### Expo Client

1. Install Expo Go: [https://expo.dev/client](https://expo.dev/client) on your Android or iOS device.
2. Scan the QR code from Expo DevTools using the Expo Go app.

#### Additional Information

- The `package.json` file contains project dependencies and scripts.

### License

This project is licensed under the [MIT License](LICENSE).
