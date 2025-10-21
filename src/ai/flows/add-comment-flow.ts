
'use server';
/**
 * @fileOverview A Genkit flow for securely adding comments to a snippet.
 *
 * This file defines the `addCommentFlow` but does not export it.
 * The flow is intended to be imported and used by server-side logic (e.g., in `src/lib/comments.ts`).
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore/lite';
import { initializeApp, getApps } from 'firebase/app';
import { firebaseConfig } from '@/firebase/config';

// Initialize Firebase Admin SDK
// This ensures we're talking to Firebase from a trusted server environment.
if (!getApps().length) {
    initializeApp(firebaseConfig);
}
const db = getFirestore();

// Define the schema for a single comment
const CommentSchema = z.object({
    text: z.string().min(1, "Comment text cannot be empty."),
    authorId: z.string(),
    authorDisplayName: z.string(),
    authorAvatarUrl: z.string().url().or(z.literal("")),
});

// Define the input schema for the flow
export const AddCommentInputSchema = z.object({
  snippetSlug: z.string(),
  comment: CommentSchema,
});

export type AddCommentInput = z.infer<typeof AddCommentInputSchema>;

// Define the Genkit flow but DO NOT export it.
// It will be imported and used by `src/lib/comments.ts`.
export const addCommentFlow = ai.defineFlow(
  {
    name: 'addCommentFlow',
    inputSchema: AddCommentInputSchema,
    outputSchema: z.object({
        success: z.boolean(),
        commentId: z.string().optional(),
    }),
  },
  async (input) => {
    const { snippetSlug, comment } = input;

    try {
        const commentsRef = collection(db, 'snippets', snippetSlug, 'comments');
        
        const newCommentDoc = await addDoc(commentsRef, {
            ...comment,
            createdAt: serverTimestamp(),
        });

        return {
            success: true,
            commentId: newCommentDoc.id,
        };
    } catch (error) {
        console.error("Error in addCommentFlow: ", error);
        return {
            success: false
        };
    }
  }
);
