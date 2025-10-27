# FitRPG

Welcome to FitRPG, your AI-powered fitness companion that turns your workout journey into a role-playing game.

This is a [Next.js](https://nextjs.org/) application built with [Firebase](https://firebase.google.com/) for the backend, [Genkit](https://firebase.google.com/docs/genkit) for AI features, and [shadcn/ui](https://ui.shadcn.com/) for components.

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

- `firebase.json`: Configures Firebase services (Firestore) and emulator ports.
- `.firebaserc`: Associates your local project with a Firebase project. **Remember to replace `REPLACE_WITH_YOUR_PROJECT_ID` with your actual Firebase Project ID.**
- `firestore.rules`: Defines the security rules for your Firestore database.
- `firestore.indexes.json`: Defines composite indexes for complex Firestore queries.

### Emulator Suite

The project is configured to use the Firebase Emulator Suite for local development, allowing you to test your application against a local instance of Firebase services.

**Commands**

- **Start emulators** (run in a separate terminal):
  ```bash
  firebase emulators:start
  ```
  The Emulator UI will be available at [http://localhost:4000](http://localhost:4000), where you can view data in your local Firestore and Auth emulators.

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
  firebase deploy --only firestore
  ```

### Production Notes

- **Enable Auth Providers**: In the Firebase Console, go to **Authentication** > **Sign-in method** and enable **Email/Password** and **Google**.
- **Android Configuration**: For Google Sign-In on Android, you must add your app's SHA-1 certificate fingerprint in **Project Settings** > **Your apps** > **Android app**. After adding it, re-download the `google-services.json` file and place it in your Android app module.
- **Connecting App to Emulators**: During development, your application will automatically connect to the emulators if they are running.
- **Production Scripts**: When running seed scripts against a production environment, ensure you have properly configured service account credentials and remove or guard any emulator-specific configurations.
