// IMPORTANT: This file should not be used in client-side code.
// It requires Node.js environment and is intended for Server Actions or API routes.

import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as path from 'path';

// We store the initialized app to avoid re-initializing it on every call.
let adminApp: admin.app.App | null = null;

export function initializeAdminApp() {
  if (adminApp) {
    return {
      firestore: admin.firestore(),
      auth: admin.auth(),
    };
  }

  const serviceAccountPath = path.resolve(process.cwd(), 'firebase-admin-config.json');

  if (!fs.existsSync(serviceAccountPath)) {
    throw new Error(
      'Firebase service account key not found. Please create firebase-admin-config.json in the root directory.'
    );
  }

  const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

  try {
    adminApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  } catch (error) {
     console.error("Firebase admin initialization error", error);
     // Re-throw or handle as needed
     throw new Error("Could not initialize Firebase Admin SDK. Please check your service account key.");
  }


  return {
    firestore: admin.firestore(),
    auth: admin.auth(),
  };
}
