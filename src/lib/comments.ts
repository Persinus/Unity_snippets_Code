'use server';

import {
  addDoc,
  collection,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore';
import { revalidatePath } from 'next/cache';

interface NewCommentClientData {
  text: string;
  authorId: string;
  authorDisplayName: string;
  authorAvatarUrl: string;
}

/**
 * Adds a new comment to a snippet by writing directly to Firestore within a Server Action.
 * This function is a Server Action and can be called from client components.
 * @param firestore - The Firestore instance (passed from the client).
 * @param snippetSlug - The slug of the snippet to comment on.
 * @param commentData - The data for the new comment from the client.
 */
export async function addComment(
  firestore: Firestore,
  snippetSlug: string,
  commentData: NewCommentClientData
) {
  if (!commentData.authorId) {
    console.error('User is not authenticated.');
    throw new Error('User not authenticated.');
  }
  if (!firestore) {
    console.error('Firestore instance is not available.');
    throw new Error('Firestore not available.');
  }

  try {
    const commentsRef = collection(firestore, 'snippets', snippetSlug, 'comments');
    
    await addDoc(commentsRef, {
        ...commentData,
        createdAt: serverTimestamp(),
    });

    // Revalidate the snippet page to show the new comment immediately
    revalidatePath(`/snippets/${snippetSlug}`);

  } catch (error) {
    console.error('Error in addComment Server Action: ', error);
    // Re-throw the error so the client's catch block can handle it.
    throw new Error('Could not post comment. Please try again.');
  }
}
