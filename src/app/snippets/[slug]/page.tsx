
'use client';

import { useMemo } from "react";
import { getSnippetBySlug } from "@/lib/snippets";
import { notFound } from "next/navigation";
import CodeBlock from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Bookmark } from "lucide-react";
import { getTagColorClasses } from "@/lib/tag-colors";
import { cn } from "@/lib/utils";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { toast } from "@/hooks/use-toast";
import { toggleBookmark } from "@/lib/bookmarks";
import { Separator } from "@/components/ui/separator";
import CommentSection from "@/components/comment-section";

type SnippetPageProps = {
  params: {
    slug: string;
  };
};

export default function SnippetPage({ params }: SnippetPageProps) {
  const snippet = getSnippetBySlug(params.slug);
  const { user } = useUser();
  const firestore = useFirestore();

  const userBookmarksQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, 'bookmarks');
  }, [firestore, user]);

  const { data: bookmarks } = useCollection<{id: string}>(userBookmarksQuery);

  const isBookmarked = useMemo(() => {
    return !!(bookmarks && bookmarks.some(b => b.id === snippet?.slug));
  }, [bookmarks, snippet?.slug]);

  if (!snippet) {
    notFound();
  }

  const handleBookmarkClick = () => {
    if (!user || !firestore) {
      toast({
        variant: "destructive",
        title: "Lỗi",
        description: "Bạn cần đăng nhập để sử dụng tính năng này.",
      });
      return;
    }
    toggleBookmark(firestore, user.uid, snippet.slug, isBookmarked);
  };


  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="mb-8">
        <Button asChild variant="ghost">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Trở về trang chủ
          </Link>
        </Button>
      </div>
      <article className="space-y-6">
        <header className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {snippet.title}
            </h1>
            {user && (
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 shrink-0"
                onClick={handleBookmarkClick}
                aria-label="Bookmark this snippet"
              >
                <Bookmark className={cn("h-5 w-5", isBookmarked ? "fill-primary text-primary" : "text-muted-foreground")} />
              </Button>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {snippet.tags.map((tag) => (
              <Badge
                key={tag}
                className={cn(getTagColorClasses(tag))}
              >
                {tag}
              </Badge>
            ))}
          </div>
          <div className="prose prose-invert max-w-none text-muted-foreground pt-4">
            <p>{snippet.description}</p>
          </div>
        </header>
        <CodeBlock code={snippet.code} />
      </article>

      <Separator className="my-12" />

      <CommentSection snippetSlug={snippet.slug} />
    </div>
  );
}
