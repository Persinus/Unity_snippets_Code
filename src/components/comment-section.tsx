'use client';

import { useState } from 'react';
import { useUser, useFirestore } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { addComment } from '@/lib/comments';
import { toast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';
import { Send, MessageSquare, Smile } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useCollection, useMemoFirebase } from '@/firebase';
import { Turnstile } from '@marsidev/react-turnstile';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from './ui/separator';

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

const EMOJIS = ['👍', '❤️', '😂', '😮', '😢', '🔥', '🎉', '🤔', '🙏', '💯', '✨', '🚀', '💡', '✅', '🙌'];

export default function CommentSection({ snippetSlug }: CommentSectionProps) {
  const { user } = useUser();
  const firestore = useFirestore();
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const commentsQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    const commentsRef = collection(firestore, 'snippets', snippetSlug, 'comments');
    return query(commentsRef, orderBy('createdAt', 'desc'));
  }, [firestore, snippetSlug]);

  const { data: comments, isLoading: commentsLoading } = useCollection<Comment>(commentsQuery);

  const handleEmojiSelect = (emoji: string) => {
    setCommentText(prev => prev + emoji);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !firestore || commentText.trim() === '' || !captchaToken) {
      if (!captchaToken) {
        toast({
          variant: "destructive",
          title: "Lỗi",
          description: "Vui lòng hoàn thành xác thực CAPTCHA.",
        });
      }
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
      setCaptchaToken(null);
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
  
  const siteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-3">
        <MessageSquare className="h-7 w-7 text-primary" />
        <h2 className="text-2xl font-bold tracking-tight">Bình luận ({comments?.length ?? 0})</h2>
      </div>

      {user ? (
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex gap-4 items-start">
                 <Avatar>
                    <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                    <AvatarFallback>{user.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="relative w-full">
                  <Textarea
                    placeholder="Viết bình luận của bạn..."
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    disabled={isSubmitting}
                    rows={4}
                    className="pr-12"
                  />
                   <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-8 w-8 text-muted-foreground hover:bg-muted">
                          <Smile className="h-5 w-5" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-2">
                        <div className="grid grid-cols-5 gap-1">
                          {EMOJIS.map(emoji => (
                            <Button
                              key={emoji}
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 text-xl"
                              onClick={() => handleEmojiSelect(emoji)}
                            >
                              {emoji}
                            </Button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="w-full sm:w-auto">
                    {siteKey && (
                      <Turnstile
                        siteKey={siteKey}
                        onSuccess={(token) => setCaptchaToken(token)}
                        onExpire={() => setCaptchaToken(null)}
                        options={{ theme: 'dark' }}
                      />
                    )}
                </div>
                <Button type="submit" disabled={isSubmitting || commentText.trim() === '' || !captchaToken} className="w-full sm:w-auto">
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? 'Đang gửi...' : 'Gửi bình luận'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="text-center bg-accent/20 border-dashed">
          <CardContent className="p-6 flex flex-col items-center justify-center">
            <p className="text-muted-foreground">Bạn cần <span className="font-semibold text-primary">đăng nhập</span> để có thể bình luận.</p>
          </CardContent>
        </Card>
      )}

      <div className="space-y-8">
        {commentsLoading ? (
            <div className="space-y-6">
                <CommentSkeleton />
                <CommentSkeleton />
            </div>
        ) : comments && comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={comment.id}>
              {index > 0 && <Separator className="my-6" />}
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={comment.authorAvatarUrl} alt={comment.authorDisplayName} />
                  <AvatarFallback>{comment.authorDisplayName.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <p className="font-semibold">{comment.authorDisplayName}</p>
                    <p className="text-xs text-muted-foreground">
                      • {comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt.seconds * 1000), { addSuffix: true, locale: vi }) : '...'}
                    </p>
                  </div>
                  <p className="text-muted-foreground mt-2 whitespace-pre-wrap">{comment.text}</p>
                </div>
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
