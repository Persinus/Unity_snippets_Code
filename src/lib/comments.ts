
'use client';

import {
  Firestore,
  addDoc,
  collection,
  serverTimestamp,
} from 'firebase/firestore';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';

interface NewCommentClientData {
  text: string;
  authorId: string;
  authorDisplayName: string;
  authorAvatarUrl: string;
}

/**
 * Adds a new comment to a snippet using the client-side SDK.
 * @param firestore - The Firestore instance from the client.
 * @param snippetSlug - The slug of the snippet to comment on.
 * @param commentData - The data for the new comment from the client.
 */
export async function addComment(
  firestore: Firestore,
  snippetSlug: string,
  commentData: NewCommentClientData
) {
  if (!commentData.authorId) {
    throw new Error('User is not authenticated.');
  }
  if (!snippetSlug) {
    throw new Error('Snippet slug is missing.');
  }

  const commentsRef = collection(firestore, 'snippets', snippetSlug, 'comments');
  const payload = {
    ...commentData,
    createdAt: serverTimestamp(),
  };

  try {
    await addDoc(commentsRef, payload);
  } catch (error) {
    const permissionError = new FirestorePermissionError({
      path: commentsRef.path,
      operation: 'create',
      requestResourceData: payload,
    });

    // Emit the error with the global error emitter
    errorEmitter.emit('permission-error', permissionError);

    // Re-throw so the UI layer can handle it
    throw permissionError;
  }
}
