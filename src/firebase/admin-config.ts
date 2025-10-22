// IMPORTANT: This file should not be used in client-side code.
// It requires Node.js environment and is intended for Server Actions or API routes.

import * as admin from 'firebase-admin';

// We store the initialized app to avoid re-initializing it on every call.
let adminApp: admin.app.App | null = null;

export function initializeAdminApp() {
  if (adminApp) {
    return {
      firestore: admin.firestore(),
      auth: admin.auth(),
    };
  }

  const serviceAccountKeyJson = process.env.GCP_SA_KEY;

  if (!serviceAccountKeyJson) {
    throw new Error('Firebase service account key not found. Please set GCP_SA_KEY environment variable.');
  }
  
  const serviceAccount = JSON.parse(serviceAccountKeyJson);

  adminApp = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  return {
    firestore: admin.firestore(),
    auth: admin.auth(),
  };
}
