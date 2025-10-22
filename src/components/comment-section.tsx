
'use client';

import { useState, useMemo } from 'react';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, serverTimestamp, orderBy, query } from 'firebase/firestore';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { addComment } from '@/lib/comments';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';
import { Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';

interface CommentSectionProps {
  snippetSlug: string;
}

interface Comment {
  id: string;
  text: string;
  authorId: string;
  authorDisplayName: string;
  authorAvatarUrl: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  } | null;
}

function CommentSkeleton() {
  return (
    <div className="flex items-start space-x-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}

export default function CommentSection({ snippetSlug }: CommentSectionProps) {
  const { user } = useUser();
  const firestore = useFirestore();
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const commentsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    const commentsRef = collection(firestore, 'snippets', snippetSlug, 'comments');
    return query(commentsRef, orderBy('createdAt', 'desc'));
  }, [firestore, snippetSlug]);

  const { data: comments, isLoading: commentsLoading } = useCollection<Comment>(commentsQuery);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !firestore || commentText.trim() === '') {
      return;
    }

    setIsSubmitting(true);

    try {
      await addComment(firestore, snippetSlug, {
        text: commentText,
        authorId: user.uid,
        authorDisplayName: user.displayName || 'Anonymous',
        authorAvatarUrl: user.photoURL || '',
      });
      setCommentText('');
      toast({
        title: 'Thành công',
        description: 'Bình luận của bạn đã được đăng.',
      });
    } catch (error) {
        console.error("Failed to add comment:", error);
        toast({
            variant: "destructive",
            title: "Lỗi",
            description: (error as Error).message || "Không thể gửi bình luận. Vui lòng thử lại.",
        });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">Bình luận ({comments?.length ?? 0})</h2>

      {user ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-4 items-start">
             <Avatar>
                <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                <AvatarFallback>{user.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="Viết bình luận của bạn..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              disabled={isSubmitting}
              rows={3}
            />
          </div>
          <Button type="submit" disabled={isSubmitting || commentText.trim() === ''} className="self-end">
            <Send className="mr-2 h-4 w-4" />
            {isSubmitting ? 'Đang gửi...' : 'Gửi bình luận'}
          </Button>
        </form>
      ) : (
        <Card className="text-center">
          <CardContent className="p-6">
            <p className="text-muted-foreground">Bạn cần <span className="font-semibold text-primary">đăng nhập</span> để có thể bình luận.</p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-6">
        {commentsLoading ? (
            <div className="space-y-6">
                <CommentSkeleton />
                <CommentSkeleton />
            </div>
        ) : comments && comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={comment.authorAvatarUrl} alt={comment.authorDisplayName} />
                <AvatarFallback>{comment.authorDisplayName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{comment.authorDisplayName}</p>
                  <p className="text-xs text-muted-foreground">
                    {comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt.seconds * 1000), { addSuffix: true, locale: vi }) : '...'}
                  </p>
                </div>
                <p className="text-muted-foreground whitespace-pre-wrap">{comment.text}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted-foreground py-8">Chưa có bình luận nào. Hãy là người đầu tiên!</p>
        )}
      </div>
    </section>
  );
}

    