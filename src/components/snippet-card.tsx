
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
import { ArrowRight, Bookmark, Eye, MessageSquare } from "lucide-react";
import { getTagColorClasses } from "@/lib/tag-colors";
import { cn } from "@/lib/utils";
import React, { useMemo } from "react";
import { Button } from "./ui/button";
import { useCollection, useFirestore, useMemoFirebase, useUser } from "@/firebase";
import { toggleBookmark } from "@/lib/bookmarks";
import { collection } from "firebase/firestore";
import { toast } from "@/hooks/use-toast";
import { Separator } from "./ui/separator";

type SnippetCardProps = {
  snippet: Snippet;
  index: number;
  selectedCategories: string[];
  selectedTags: string[];
  onCategoryClick: (category: string) => void;
  onTagClick: (tag: string) => void;
};

export default function SnippetCard({ snippet, index, selectedCategories, selectedTags, onCategoryClick, onTagClick }: SnippetCardProps) {
  const hasSelection = selectedTags.length > 0 || selectedCategories.length > 0;
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
              <CardTitle as="h2" className="font-headline text-lg font-semibold group-hover/title:text-primary">
                {snippet.title}
              </CardTitle>
            </Link>
            {user && (
                 <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 shrink-0"
                    onClick={handleBookmarkClick}
                    aria-label="Bookmark this snippet"
                  >
                    <Bookmark className={cn("h-5 w-5", isBookmarked ? "fill-primary text-primary" : "text-muted-foreground")} />
                  </Button>
            )}
        </div>
        <CardDescription className="line-clamp-2 pt-1">
          {snippet.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col gap-4">
        {snippet.categories.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {snippet.categories.map((cat) => (
              <Badge
                key={cat}
                className={cn(
                  "cursor-pointer",
                  getTagColorClasses(cat, selectedCategories.includes(cat), hasSelection, true)
                )}
                onClick={(e) => { e.preventDefault(); onCategoryClick(cat); }}
              >
                {cat}
              </Badge>
            ))}
          </div>
        )}
         {snippet.categories.length > 0 && snippet.tags.length > 0 && (
          <Separator />
        )}
        {snippet.tags.length > 0 && (
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
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
          <Link href={`/snippets/${snippet.slug}`} className="flex items-center text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              Xem Snippet
              <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
             <div className="flex items-center gap-1.5">
                <MessageSquare className="h-4 w-4" />
                <span>({snippet.commentCount ?? 0})</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                 <span>{snippet.viewCount ?? 0}</span>
            </div>
          </div>
      </CardFooter>
    </Card>
  );
}

    