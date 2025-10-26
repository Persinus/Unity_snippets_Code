
'use server';

import { initializeAdminApp } from '@/firebase/admin-config';
import { revalidatePath } from 'next/cache';
import { auth as adminAuth } from 'firebase-admin';

const PRO_ACTIVATION_CODE = 'FaEE2405';

/**
 * Sets a custom claim on a user to grant them PRO privileges.
 * This is a Server Action and should only be called from a trusted environment.
 * @param uid The UID of the user to grant PRO privileges to.
 * @param activationCode The code entered by the user.
 */
export async function setProClaim(uid: string, activationCode: string) {
  if (!uid) {
    throw new Error('User ID is required to set pro claim.');
  }

  if (activationCode !== PRO_ACTIVATION_CODE) {
    throw new Error('Mã kích hoạt không hợp lệ.');
  }

  try {
    const { auth } = initializeAdminApp();
    const user = await auth.getUser(uid);

    const currentClaims = user.customClaims || {};
    if (currentClaims.pro === true) {
      return { message: 'Tài khoản của bạn đã là tài khoản PRO.' };
    }

    // Preserve existing claims and add the new 'pro' claim
    const newClaims = { ...currentClaims, pro: true };

    await auth.setCustomUserClaims(user.uid, newClaims);
    console.log(`Successfully set PRO claim for user: ${user.email}`);

    // Revalidate paths to ensure the client gets the updated claims
    revalidatePath('/profile');
    revalidatePath('/');

    return { message: `Chúc mừng! Tài khoản của bạn đã được nâng cấp lên PRO.` };
  } catch (error: any) {
    console.error('Error setting pro claim:', error);
    throw new Error(`Không thể nâng cấp tài khoản: ${error.message}`);
  }
}
