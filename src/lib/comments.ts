
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
 * @param firestore - The Firestore instance (currently unused but kept for API consistency).
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
    toast({
      variant: "destructive",
      title: "Lỗi",
      description: "Bạn cần đăng nhập để bình luận.",
    });
    // Return a rejected promise to be caught by the caller
    return Promise.reject(new Error("User not authenticated."));
  }

  try {
    // Call the backend Genkit flow instead of writing to Firestore directly
    await addCommentFlow({
      snippetSlug: snippetSlug,
      comment: {
        text: commentData.text,
        authorId: commentData.authorId,
        authorDisplayName: commentData.authorDisplayName,
        authorAvatarUrl: commentData.authorAvatarUrl,
      },
    });
  } catch (error) {
    console.error("Error adding comment via flow: ", error);
    toast({
      variant: "destructive",
      title: "Lỗi",
      description: "Không thể đăng bình luận. Vui lòng thử lại.",
    });
    // Re-throw the error to be caught by the caller's catch block
    throw error;
  }
}
