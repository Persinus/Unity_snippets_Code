
'use client';

import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { collection } from 'firebase/firestore';
import { useAuth }from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';
import SnippetCard from '@/components/snippet-card';
import { Snippet, getAllSnippets } from '@/lib/snippets';
import Link from 'next/link';

function ProfileSkeleton() {
  return (
    <div className="flex justify-center items-start pt-16">
      <Card className="w-full max-w-lg">
        <CardHeader className="items-center text-center">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-6 w-40 mt-4" />
          <Skeleton className="h-4 w-52 mt-2" />
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Skeleton className="h-10 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();

  // Memoize the query to prevent re-renders
  const userBookmarksQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, 'bookmarks');
  }, [firestore, user]);

  const { data: bookmarks, isLoading: bookmarksLoading } = useCollection<{id: string}>(userBookmarksQuery);

  const allSnippets = getAllSnippets();
  
  const bookmarkedSnippets = useMemoFirebase(() => {
    if (!bookmarks || !allSnippets) return [];
    const bookmarkedIds = new Set(bookmarks.map(b => b.id));
    return allSnippets.filter(s => bookmarkedIds.has(s.slug));
  }, [bookmarks, allSnippets]);


  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/');
    }
  }, [user, isUserLoading, router]);

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  if (isUserLoading || !user) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
        <Card className="w-full max-w-xs sticky top-24">
          <CardHeader className="items-center text-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={user.photoURL || undefined} alt={user.displayName || "User"} />
              <AvatarFallback className="text-3xl">
                {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <CardTitle className="text-2xl mt-4">{user.displayName}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <Button onClick={handleLogout} className="w-full" variant="destructive">
              Đăng xuất
            </Button>
          </CardContent>
        </Card>
        
        <div className="w-full flex-1">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold tracking-tight">Snippet đã đánh dấu</h2>
          </div>
          <Separator />
          
          <div className="mt-6">
            {bookmarksLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
              </div>
            ) : bookmarkedSnippets && bookmarkedSnippets.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {bookmarkedSnippets.map((snippet, index) => (
                  <SnippetCard 
                    key={snippet.slug} 
                    snippet={snippet} 
                    index={index}
                    selectedTags={[]}
                    onTagClick={() => {}} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <h3 className="text-xl font-semibold text-muted-foreground">Bạn chưa đánh dấu snippet nào</h3>
                <p className="text-muted-foreground mt-2">Khám phá và lưu lại những snippet bạn thấy hữu ích!</p>
                <Button asChild className="mt-4">
                  <Link href="/">
                    Khám phá ngay
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
