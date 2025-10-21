
import { collection, addDoc, serverTimestamp, Firestore } from "firebase/firestore";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { toast } from "@/hooks/use-toast";

interface NewCommentData {
    text: string;
    authorId: string;
    authorDisplayName: string;
    authorAvatarUrl: string;
}

/**
 * Adds a new comment to a snippet.
 * @param firestore - The Firestore instance.
 * @param snippetSlug - The slug of the snippet to comment on.
 * @param commentData - The data for the new comment.
 */
export function addComment(
  firestore: Firestore,
  snippetSlug: string,
  commentData: NewCommentData
) {
  if (!commentData.authorId) {
    console.error("User is not authenticated.");
    toast({
      variant: "destructive",
      title: "Lỗi",
      description: "Bạn cần đăng nhập để bình luận.",
    });
    return;
  }

  const commentsRef = collection(firestore, "snippets", snippetSlug, "comments");
  const dataWithTimestamp = {
    ...commentData,
    createdAt: serverTimestamp(),
  };

  addDoc(commentsRef, dataWithTimestamp)
    .catch((serverError) => {
      console.error("Error adding comment: ", serverError);
      const contextualError = new FirestorePermissionError({
        operation: 'create',
        path: `${commentsRef.path}/${'new-comment'}`, // Placeholder for new doc
        requestResourceData: dataWithTimestamp,
      });
      errorEmitter.emit('permission-error', contextualError);
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Không thể đăng bình luận. Vui lòng thử lại.",
      });
    });
}
