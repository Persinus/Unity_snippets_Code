
import { doc, deleteDoc, setDoc, Firestore } from "firebase/firestore";
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { toast } from "@/hooks/use-toast";

/**
 * Toggles a bookmark for a user.
 * Adds the bookmark if it doesn't exist, removes it if it does.
 * @param firestore - The Firestore instance.
 * @param userId - The ID of the user.
 * @param snippetSlug - The slug of the snippet to bookmark.
 * @param isCurrentlyBookmarked - Whether the snippet is already bookmarked.
 */
export async function toggleBookmark(
  firestore: Firestore,
  userId: string,
  snippetSlug: string,
  isCurrentlyBookmarked: boolean
) {
  if (!userId || !firestore) {
    console.error("User or Firestore instance is not available.");
    return;
  }

  const bookmarkRef = doc(firestore, "users", userId, "bookmarks", snippetSlug);

  if (isCurrentlyBookmarked) {
    // --- Delete the bookmark ---
    deleteDoc(bookmarkRef)
      .then(() => {
        toast({
          title: "Đã bỏ đánh dấu",
          description: "Snippet đã được xóa khỏi danh sách của bạn.",
        });
      })
      .catch((serverError) => {
        console.error("Error removing bookmark: ", serverError);
        const contextualError = new FirestorePermissionError({
          operation: 'delete',
          path: bookmarkRef.path,
        });
        errorEmitter.emit('permission-error', contextualError);
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Không thể xóa đánh dấu. Vui lòng thử lại.",
        });
      });
  } else {
    // --- Add the bookmark ---
    // The document contains the ID for easier querying if needed later.
    setDoc(bookmarkRef, { id: snippetSlug })
      .then(() => {
        toast({
          title: "Đã đánh dấu",
          description: "Snippet đã được lưu vào danh sách của bạn.",
        });
      })
      .catch((serverError) => {
        console.error("Error adding bookmark: ", serverError);
        const contextualError = new FirestorePermissionError({
          operation: 'create',
          path: bookmarkRef.path,
          requestResourceData: { id: snippetSlug },
        });
        errorEmitter.emit('permission-error', contextualError);
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Không thể đánh dấu snippet. Vui lòng thử lại.",
        });
      });
  }
}
