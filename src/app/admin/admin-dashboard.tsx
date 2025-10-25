'use server';

import { getAllSnippets } from '@/lib/snippets';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { initializeAdminApp } from '@/firebase/admin-config';
import { BarChart, MessageSquare, BookOpen } from 'lucide-react';
import CommentsChart from './comments-chart';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale';
import Link from 'next/link';

type CommentData = {
    id: string;
    text: string;
    authorDisplayName: string;
    authorAvatarUrl: string;
    createdAt: { seconds: number; nanoseconds: number; } | null;
    snippetId: string;
    snippetTitle: string;
};

async function getAllComments() {
    const { firestore } = initializeAdminApp();
    const snippets = await getAllSnippets();
    const allComments: CommentData[] = [];

    for (const snippet of snippets) {
        const commentsSnapshot = await firestore.collection(`snippets/${snippet.slug}/comments`).orderBy('createdAt', 'desc').get();
        commentsSnapshot.forEach(doc => {
            const data = doc.data();
            allComments.push({
                id: doc.id,
                text: data.text,
                authorDisplayName: data.authorDisplayName,
                authorAvatarUrl: data.authorAvatarUrl,
                createdAt: data.createdAt,
                snippetId: snippet.slug,
                snippetTitle: snippet.title,
            });
        });
    }

    // Sort all comments globally by creation date
    allComments.sort((a, b) => (b.createdAt?.seconds ?? 0) - (a.createdAt?.seconds ?? 0));
    
    return allComments;
}

export default async function AdminDashboard() {
  const snippets = await getAllSnippets();
  const allComments = await getAllComments();

  const snippetsWithCommentCount = snippets.map(s => ({
      ...s,
      commentCount: allComments.filter(c => c.snippetId === s.slug).length,
  }));

  const totalSnippets = snippets.length;
  const totalComments = allComments.length;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số Snippet</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSnippets}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng số Bình luận</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalComments}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5"/>
                Thống kê Bình luận
            </CardTitle>
            <CardDescription>Số lượng bình luận trên mỗi snippet.</CardDescription>
          </CardHeader>
          <CardContent>
            <CommentsChart data={snippetsWithCommentCount} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5"/>
                Các bình luận gần đây
            </CardTitle>
            <CardDescription>Tất cả bình luận trên trang, được sắp xếp theo thời gian.</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
                <div className="space-y-6">
                    {allComments.map(comment => (
                        <div key={comment.id} className="flex items-start gap-4">
                             <Avatar>
                                <AvatarImage src={comment.authorAvatarUrl} alt={comment.authorDisplayName} />
                                <AvatarFallback>{comment.authorDisplayName.charAt(0).toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold">{comment.authorDisplayName}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {comment.createdAt ? formatDistanceToNow(new Date(comment.createdAt.seconds * 1000), { addSuffix: true, locale: vi }) : '...'}
                                    </p>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-wrap">{comment.text}</p>
                                <p className="text-xs text-muted-foreground/80 mt-2">
                                    trong bài 
                                    <Link href={`/snippets/${comment.snippetId}`} className="font-medium text-primary hover:underline ml-1">
                                       {comment.snippetTitle}
                                    </Link>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
