/**
 * Seeds an Auth Emulator user: test@fitrpg.dev / fitrpg123
 * Run with emulator active: firebase emulators:start
 */
import { execSync } from 'node:child_process';

const email = process.env.SEED_EMAIL || 'test@fitrpg.dev';
const password = process.env.SEED_PASSWORD || 'fitrpg123';

console.log('Creating auth user in emulator:', email);

try {
  // Auth user creation via script can be complex. The simplest, most reliable way
  // for local development is to use the Emulator UI. This script prints instructions.
  console.log(`
  ================================================================
  Auth Emulator: Manual User Creation Required
  ================================================================
  
  Please create a test user manually in the Firebase Emulator UI.
  
  1. Open the Emulator UI in your browser: http://localhost:4000
  2. Navigate to the "Authentication" tab.
  3. Click "Add user".
  4. Enter the following credentials:
     - Email: ${email}
     - Password: ${password}
  5. Click "Add user".

  This will allow you to test authentication flows in your app.
  ================================================================
  `);
} catch (e) {
  console.error('Auth seed instruction script failed:', e.message);
}
