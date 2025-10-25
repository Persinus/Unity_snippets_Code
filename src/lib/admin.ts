'use server';

import { initializeAdminApp } from '@/firebase/admin-config';
import { revalidatePath } from 'next/cache';

/**
 * Sets a custom claim on a user to grant them admin privileges.
 * This is a Server Action and should only be called from a trusted environment.
 * @param email The email of the user to grant admin privileges to.
 */
export async function setAdminClaim(email: string) {
  if (!email) {
    throw new Error('Email is required to set admin claim.');
  }

  try {
    const { auth } = initializeAdminApp();
    const user = await auth.getUserByEmail(email);

    if (user.customClaims && (user.customClaims as any).admin === true) {
      console.log(`User ${email} is already an admin.`);
      return { message: `User ${email} is already an admin.` };
    }

    await auth.setCustomUserClaims(user.uid, { admin: true });
    console.log(`Successfully set admin claim for user: ${email}`);

    // Revalidate the path to ensure the client gets the updated claims on next navigation.
    revalidatePath('/admin');
    revalidatePath('/');

    return { message: `Successfully made ${email} an admin.` };
  } catch (error: any) {
    console.error('Error setting admin claim:', error);
    throw new Error(`Failed to set admin claim: ${error.message}`);
  }
}
