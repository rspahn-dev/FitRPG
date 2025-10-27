# Workout Sage

Welcome to Workout Sage, your AI-powered fitness companion.

This is a Next.js application built with Firebase, Genkit for AI features, and shadcn/ui for components.

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Firebase Backend Setup

This project includes a complete Firebase backend configuration for a fitness application.

### Prerequisites

- A Firebase project.
- Firebase CLI installed and authenticated (`npm i -g firebase-tools`, `firebase login`).

### Configuration Files

- `firebase.json`: Configures Firebase services and emulator ports.
- `.firebaserc`: Associates your local project with a Firebase project. **Remember to replace `REPLACE_WITH_YOUR_PROJECT_ID` with your actual Firebase Project ID.**
- `firestore.rules`: Secure access to your Firestore data.
- `firestore.indexes.json`: Defines composite indexes for complex queries.

### Emulator Suite

The project is configured to use the Firebase Emulator Suite for local development.

**Commands**

- **Install dev tools**:
  ```bash
  npm i -D firebase-admin firebase-tools
  ```

- **Start emulators** (run in a separate terminal):
  ```bash
  firebase emulators:start
  ```
  The Emulator UI will be available at [http://localhost:4000](http://localhost:4000).

- **Seed Auth Emulator**:
  This script provides instructions to create a test user (`test@fitrpg.dev`) in the Auth emulator.
  ```bash
  npm run seed:auth
  ```
  Follow the instructions in the terminal, or use the Emulator UI to add the user manually.

- **Seed Firestore Emulator**:
  This script populates the Firestore emulator with sample data for a development user.
  ```bash
  # You need to set your project ID for the Admin SDK
  # and a test UID for the user to seed data for.
  export GOOGLE_CLOUD_PROJECT=REPLACE_WITH_YOUR_PROJECT_ID
  export FITRPG_DEV_UID=devUser123
  npm run seed:firestore
  ```

- **Deploy to Production**:
  When you are ready to deploy your Firestore rules to your live Firebase project:
  ```bash
  firebase deploy --only firestore:rules
  ```

### Production Notes

- **Enable Auth Providers**: In the Firebase Console, go to **Authentication** > **Sign-in method** and enable **Email/Password** and **Google**.
- **Android Configuration**: For Google Sign-In on Android, you must add your app's SHA-1 certificate fingerprint in **Project Settings** > **Your apps** > **Android app**. After adding it, re-download the `google-services.json` file and place it in your Android app module.
- **Connecting App to Emulators**: During development, you can point your application to the emulators. For a Next.js app, you would configure the Firebase client SDK to use the emulator hosts and ports.
- **Production Scripts**: When running seed scripts against a production environment, ensure you have properly configured service account credentials and remove or guard any emulator-specific configurations (like `FIRESTORE_EMULATOR_HOST`).
