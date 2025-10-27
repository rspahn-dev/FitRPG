/**
 * Seeds Firestore (preferably emulator) with sample data for one dev user.
 * 
 * Before running:
 * 1. Make sure Firebase emulators are running (`firebase emulators:start`).
 * 2. Set the required environment variables.
 *
 * Usage:
 *   export GOOGLE_CLOUD_PROJECT=REPLACE_WITH_YOUR_PROJECT_ID
 *   export FITRPG_DEV_UID=devUser123
 *   node tools/seed_firestore.mjs
 * 
 * To run against production (use with caution!):
 * 1. Make sure you have authenticated with `gcloud auth application-default login`.
 * 2. Unset FIRESTORE_EMULATOR_HOST if it's set in your environment.
 */
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';

// --- Configuration ---
const projectId = process.env.GOOGLE_CLOUD_PROJECT || 'REPLACE_WITH_YOUR_PROJECT_ID';
const uid = process.env.FITRPG_DEV_UID;

// --- Pre-flight checks ---
if (projectId === 'REPLACE_WITH_YOUR_PROJECT_ID') {
  console.error('Error: GOOGLE_CLOUD_PROJECT environment variable is not set.');
  console.error('Please set it to your Firebase project ID.');
  process.exit(1);
}

if (!uid) {
  console.error('Error: FITRPG_DEV_UID environment variable is not set.');
  console.error('Please provide a user ID to seed data for (e.g., `devUser123`).');
  process.exit(1);
}

// Check if running against emulator
if (process.env.FIRESTORE_EMULATOR_HOST) {
  console.log(`Firestore emulator detected at: ${process.env.FIRESTORE_EMULATOR_HOST}`);
} else {
  console.warn('Warning: FIRESTORE_EMULATOR_HOST is not set.');
  console.warn('This script will run against the PRODUCTION Firestore database.');
}

// --- Firebase Admin Initialization ---
try {
  process.env.GCLOUD_PROJECT = projectId;
  initializeApp({
    credential: applicationDefault(),
    projectId,
  });
} catch (error) {
  console.error('Error initializing Firebase Admin SDK:', error.message);
  console.error('Ensure you have authenticated with gcloud or have a service account key configured.');
  process.exit(1);
}

const db = getFirestore();
const now = new Date();

async function seed() {
  console.log(`Starting Firestore seed for user: ${uid} in project: ${projectId}`);
  const batch = db.batch();
  const baseRef = db.collection('users').doc(uid);

  // 1. Profile
  const profileRef = baseRef.collection('profile').doc('profile');
  batch.set(profileRef, {
    displayName: 'Dev User',
    createdAt: FieldValue.serverTimestamp()
  }, { merge: true });

  // 2. Player Stats
  const playerRef = baseRef.collection('player').doc('player');
  batch.set(playerRef, {
    level: 3,
    xp: 120,
    xpToNext: 300,
    str: 12,
    agi: 9,
    sta: 14,
    intl: 6,
    energyToday: 40,
    energyCap: 200,
    streakDays: 2
  }, { merge: true });

  // 3. Workouts
  const workouts = [
    { ts: Timestamp.fromDate(new Date(now.getTime() - 36e5)), type: 'cardio', name: 'Walk', minutes: 20, steps: 2400 },
    { ts: Timestamp.fromDate(new Date(now.getTime() - 3 * 36e5)), type: 'strength', name: 'Pushups', sets: 3, reps: 12 },
    { ts: Timestamp.fromDate(new Date(now.getTime() - 26 * 36e5)), type: 'mobility', name: 'Stretch', minutes: 10 }
  ];
  workouts.forEach(w => {
    const workoutRef = baseRef.collection('workouts').doc();
    batch.set(workoutRef, w);
  });

  // 4. Quests
  const dailyQuestRef = baseRef.collection('quests').doc('q_daily_energy');
  batch.set(dailyQuestRef, { title: 'Accumulate 25 Energy', type: 'daily', target: 25, progress: 10 });

  const weeklyQuestRef = baseRef.collection('quests').doc('q_weekly_boss');
  batch.set(weeklyQuestRef, { title: 'Charge Weekly Boss (300 Energy)', type: 'weekly', target: 300, progress: 120 });

  // 5. Layout
  const layoutRef = baseRef.collection('layout').doc('layout');
  batch.set(layoutRef, {
    order: ['energy', 'xp', 'stats', 'quests', 'trainer', 'battle'],
    hidden: []
  }, { merge: true });

  await batch.commit();
  console.log('✅ Firestore seeding complete!');
}

seed().catch(e => {
  console.error('❌ Firestore seeding failed:', e);
  process.exit(1);
});
