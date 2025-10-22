'use server';

import { revalidatePath } from 'next/cache';
import { FieldValue } from 'firebase-admin/firestore';
import { initializeAdminApp } from '@/firebase/admin-config';

interface NewCommentClientData {
  text: string;
  authorId: string;
  authorDisplayName: string;
  authorAvatarUrl: string;
}

/**
 * Adds a new comment to a snippet by writing directly to Firestore using the Admin SDK.
 * This function is a Server Action and must be called from the client.
 * @param snippetSlug - The slug of the snippet to comment on.
 * @param commentData - The data for the new comment from the client.
 */
export async function addComment(
  snippetSlug: string,
  commentData: NewCommentClientData
) {
  if (!commentData.authorId) {
    throw new Error('User is not authenticated.');
  }
  if (!snippetSlug) {
    throw new Error('Snippet slug is missing.');
  }

  try {
    const { firestore } = initializeAdminApp();
    const commentsRef = firestore.collection('snippets').doc(snippetSlug).collection('comments');
    
    // The new document will have an auto-generated ID.
    await commentsRef.add({
        ...commentData,
        // Use FieldValue.serverTimestamp() from the Admin SDK
        createdAt: FieldValue.serverTimestamp(),
    });

    // Revalidate the snippet page to show the new comment immediately
    revalidatePath(`/snippets/${snippetSlug}`);
    
    return { success: true };

  } catch (error) {
    console.error('Error in addComment Server Action: ', error);
    // Re-throw a generic error to avoid leaking implementation details to the client.
    throw new Error('Could not post comment. Please try again later.');
  }
}
