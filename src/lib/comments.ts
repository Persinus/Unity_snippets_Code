
'use server';

import { addCommentFlow } from "@/ai/flows/add-comment-flow";
import { toast } from "@/hooks/use-toast";
import type { Firestore } from "firebase/firestore";

interface NewCommentClientData {
    text: string;
    authorId: string;
    authorDisplayName: string;
    authorAvatarUrl: string;
}

/**
 * Adds a new comment to a snippet by calling a secure backend flow.
 * This function is a Server Action and can be called from client components.
 * @param firestore - The Firestore instance (unused, kept for API consistency).
 * @param snippetSlug - The slug of the snippet to comment on.
 * @param commentData - The data for the new comment from the client.
 */
export async function addComment(
  firestore: Firestore, // No longer used directly but kept for consistency
  snippetSlug: string,
  commentData: NewCommentClientData
) {
  if (!commentData.authorId) {
    console.error("User is not authenticated.");
    // This server-side error won't show a toast on the client directly.
    // The client-side catch block should handle UI feedback.
    throw new Error("User not authenticated.");
  }

  try {
    // Call the backend Genkit flow directly.
    const result = await addCommentFlow({
      snippetSlug: snippetSlug,
      comment: {
        text: commentData.text,
        authorId: commentData.authorId,
        authorDisplayName: commentData.authorDisplayName,
        authorAvatarUrl: commentData.authorAvatarUrl,
      },
    });

    if (!result.success) {
        // Create a more specific error message if the flow fails.
        throw new Error(`Failed to add comment. Flow returned success: false. CommentId: ${result.commentId}`);
    }
    // Success is handled on the client side.
    
  } catch (error) {
    console.error("Error in addComment Server Action: ", error);
    // Re-throw the error so the client's catch block can handle it.
    // This allows for displaying a toast or other UI feedback.
    throw new Error("Could not post comment. Please try again.");
  }
}
