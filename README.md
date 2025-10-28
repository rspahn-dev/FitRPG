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

## Game Data

This section details the various game elements available in FitRPG.

### Creature Skills

| Skill Name | Description | Unlock Level |
| :--- | :--- | :--- |
| Quick Attack | A speedy physical attack. | 1 |
| Thunder Shock | An electric shock that may paralyze the foe. | 1 |
| Iron Defense | Hardens the body to raise Defense. | 10 |
| Aqua Jet | A quick charge of water. | 15 |
| Flame Burst | A fiery explosion that scorches the target. | 20 |
| Giga Drain | A powerful draining attack. | 25 |
| Dragon Claw | A vicious slash with sharp claws. | 30 |
| Psychic | A powerful psychic attack that may lower DEF. | 35 |
| Hyper Beam | An extremely powerful attack, but requires a recharge turn. | 40 |
| Solar Flare | A blinding flash of light that damages and may stun. | 45 |
| Meteor Mash | A powerful punch as fast and hard as a meteor. | 50 |

### Monsters

| Name | Species | Level | Unlock Level |
| :--- | :--- | :--- | :--- |
| Slime | Gelatinous Cube | 1 | 1 |
| Grumble | Cave Goblin | 3 | 1 |
| AI Rival | Cyborg Athlete | 5 | 5 |
| Wyvern | Young Dragon | 7 | 7 |
| Golem | Rock Titan | 12 | 10 |
| Hydra | Multi-headed Serpent | 18 | 15 |
| Griffin | Mythical Beast | 25 | 20 |
| Chimera | Aberration | 32 | 30 |
| Behemoth | Legendary Titan | 40 | 35 |
| Tarrasque | World Ender | 50 | 45 |

### Community Challenges

| Title                 | Description                                    | Reward   |
| --------------------- | ---------------------------------------------- | -------- |
| 5K Steps a Day        | Walk or run 5,000 steps every day for a week.  | 100 XP   |
| Strength Starter      | Complete 3 strength training sessions this week. | 150 XP   |
| Mobility Master       | Accumulate 60 minutes of mobility exercises.   | 120 XP   |
| Cardio Crusher        | Accumulate 90 minutes of cardio this week.     | 125 XP   |
| Volume Voyager        | Lift a total of 5,000 kg this month.           | 200 XP   |
| Perfect Week          | Complete one workout every day for 7 days straight. | 300 XP   |


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

## Mobile App Deployment

To make this web application available on the Google Play Store or Apple App Store, you can use a tool like [Capacitor](https://capacitorjs.com/) to wrap it in a native application shell.

### 1. Capacitor Setup

First, add Capacitor and the native platforms to your project. Run these commands in your terminal:

```bash
# Install Capacitor dependencies
npm install @capacitor/core @capacitor/cli @capacitor/android

# Initialize Capacitor
npx cap init FitRPG com.fitrpg.app --web-dir="out"

# Add the Android platform
npx cap add android
```

### 2. Build and Sync

Before building in Android Studio, you need to create a production build of your web app and sync it with Capacitor.

```bash
# Create a static export of your Next.js app
npm run build

# Sync the web build with your Android project
npx cap sync android
```

### 3. Production Configuration for Firebase

- **Enable Auth Providers**: In the Firebase Console, go to **Authentication** > **Sign-in method** and enable **Email/Password** and **Google**.

- **Android Configuration (for Google Sign-In)**:
  - In the Firebase Console, go to **Project Settings** > **Your apps** > **Android app**.
  - Add your Android app and provide the package name (`com.fitrpg.app`).
  - You must add your app's SHA-1 certificate fingerprint. You can get this from the "Signing" report in Android Studio or by running `./gradlew signingReport` in the `android` directory.
  - After adding the SHA-1, re-download the `google-services.json` file and place it in your Android app's `android/app` module directory.

- **iOS Configuration (for Google Sign-In)**:
    - In the Firebase Console, add an iOS app to your project.
    - Provide your iOS bundle ID (`com.fitrpg.app`).
    - Download the `GoogleService-Info.plist` file. In Xcode, add this file to the root of your iOS app target.
    - You will need to add a custom URL scheme to your Xcode project. Go to the "Info" tab of your target's settings and add a new URL Type. The scheme should be the `REVERSED_CLIENT_ID` found in your `GoogleService-Info.plist` file.

### 4. Signing Your Android App for Release

To publish to the Google Play Store, you must sign your app with a release key. This is done in Android Studio.

1.  **Open Android Studio**: Open the `android` folder of your project in Android Studio.
2.  **Generate Signed Bundle**: From the menu bar, click **Build > Generate Signed Bundle / APK...**.
3.  **Select App Bundle**: Select **Android App Bundle** and click **Next**.
4.  **Create Keystore**:
    *   Below the "Key store path" field, click **Create new...**.
    *   Choose a location to save your keystore file.
    *   Create a strong password for the keystore and for the key itself.
    *   Fill in the certificate information (your name, organization, etc.).
    *   **IMPORTANT**: Back up your keystore file and save your passwords in a secure place. If you lose your key, you will not be able to publish updates to your app.
5.  **Build Release**: After creating the keystore, you'll be returned to the previous screen. Ensure your new key is selected, choose `release` as the build variant, and click **Finish**.
6.  **Locate the AAB**: Android Studio will build your signed app. Once finished, a notification will appear with a link to locate the generated `.aab` file. This is the file you will upload to the Google Play Console.
