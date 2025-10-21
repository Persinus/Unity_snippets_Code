
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Snippet } from "@/lib/snippets";
import { ArrowRight, Bookmark } from "lucide-react";
import { getTagColorClasses } from "@/lib/tag-colors";
import { cn } from "@/lib/utils";
import React, { useState, useEffect, useMemo } from "react";
import { Button } from "./ui/button";
import { useAuth, useCollection, useFirestore, useMemoFirebase, useUser } from "@/firebase";
import { toggleBookmark } from "@/lib/bookmarks";
import { collection, doc } from "firebase/firestore";
import { toast } from "@/hooks/use-toast";

type SnippetCardProps = {
  snippet: Snippet;
  index: number;
  selectedTags: string[];
  onTagClick: (tag: string) => void;
};

export default function SnippetCard({ snippet, index, selectedTags, onTagClick }: SnippetCardProps) {
  const hasSelection = selectedTags.length > 0;
  const { user } = useUser();
  const firestore = useFirestore();

  const userBookmarksQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, 'bookmarks');
  }, [firestore, user]);

  const { data: bookmarks } = useCollection<{id: string}>(userBookmarksQuery);

  const isBookmarked = useMemo(() => {
    return !!(bookmarks && bookmarks.some(b => b.id === snippet.slug));
  }, [bookmarks, snippet.slug]);


  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.preventDefault();
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
    <Card 
      className="flex h-full flex-col transition-all duration-300 group hover:border-primary hover:shadow-lg hover:shadow-primary/10 animate-in fade-in-90 slide-in-from-bottom-4 zoom-in-95"
      style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
            <Link href={`/snippets/${snippet.slug}`} className="group/title block flex-grow">
              <CardTitle className="font-headline text-lg font-semibold group-hover/title:text-primary">
                {snippet.title}
              </CardTitle>
            </Link>
            {user && (
                 <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={handleBookmarkClick}
                  >
                    <Bookmark className={cn("h-5 w-5", isBookmarked ? "fill-primary text-primary" : "text-muted-foreground")} />
                  </Button>
            )}
        </div>
        <CardDescription className="line-clamp-2 pt-1">
          {snippet.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {snippet.tags.map((tag) => (
            <Badge 
              key={tag} 
              className={cn(
                "cursor-pointer",
                getTagColorClasses(tag, selectedTags.includes(tag), hasSelection)
              )}
              onClick={(e) => {
                e.preventDefault();
                onTagClick(tag);
              }}
              variant="outline"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
          <Link href={`/snippets/${snippet.slug}`} className="flex items-center text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Xem Snippet
              <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
      </CardFooter>
    </Card>
  );
}
