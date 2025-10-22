
'use client';

import { useMemo, useState, useEffect } from "react";
import CodeBlock from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Bookmark, ChevronRight, Cog, Home, MessageSquare, Share2 } from "lucide-react";
import { getTagColorClasses } from "@/lib/tag-colors";
import { cn } from "@/lib/utils";
import { useUser, useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection } from "firebase/firestore";
import { toast } from "@/hooks/use-toast";
import { toggleBookmark } from "@/lib/bookmarks";
import { Separator } from "@/components/ui/separator";
import CommentSection from "@/components/comment-section";
import type { Snippet } from "@/lib/snippets";
import RelatedSnippets from "@/components/related-snippets";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';

type SnippetClientPageProps = {
  snippet: Snippet;
};

// Define types for settings
type FontSize = 'sm' | 'md' | 'lg';
type FontFamily = 'source-code-pro' | 'fira-code';
type CodeTheme = 'github-dark' | 'a11y-light' | 'monokai-sublime';

export default function SnippetClientPage({ snippet }: SnippetClientPageProps) {
  const { user } = useUser();
  const firestore = useFirestore();

  // State for saved settings
  const [fontSize, setFontSize] = useState<FontSize>('md');
  const [fontFamily, setFontFamily] = useState<FontFamily>('source-code-pro');
  const [codeTheme, setCodeTheme] = useState<CodeTheme>('github-dark');

  // Temporary state for popover selections
  const [tempFontSize, setTempFontSize] = useState<FontSize>(fontSize);
  const [tempFontFamily, setTempFontFamily] = useState<FontFamily>(fontFamily);
  const [tempCodeTheme, setTempCodeTheme] = useState<CodeTheme>(codeTheme);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);


  // Load settings from localStorage on initial render
  useEffect(() => {
    const savedFontSize = localStorage.getItem('code-fontSize') as FontSize || 'md';
    const savedFontFamily = localStorage.getItem('code-fontFamily') as FontFamily || 'source-code-pro';
    const savedCodeTheme = localStorage.getItem('code-theme') as CodeTheme || 'github-dark';
    
    setFontSize(savedFontSize);
    setFontFamily(savedFontFamily);
    setCodeTheme(savedCodeTheme);

    // Initialize temp state with saved values
    setTempFontSize(savedFontSize);
    setTempFontFamily(savedFontFamily);
    setTempCodeTheme(savedCodeTheme);
  }, []);

  const handleApplySettings = () => {
    setFontSize(tempFontSize);
    localStorage.setItem('code-fontSize', tempFontSize);

    setFontFamily(tempFontFamily);
    localStorage.setItem('code-fontFamily', tempFontFamily);

    setCodeTheme(tempCodeTheme);
    localStorage.setItem('code-theme', tempCodeTheme);

    setIsPopoverOpen(false); // Close popover after applying
    toast({
      title: "Đã lưu cài đặt",
      description: "Cài đặt hiển thị code của bạn đã được cập nhật.",
    });
  };

  const userBookmarksQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, 'bookmarks');
  }, [firestore, user]);

  const { data: bookmarks } = useCollection<{id: string}>(userBookmarksQuery);

  const isBookmarked = useMemo(() => {
    return !!(bookmarks && bookmarks.some(b => b.id === snippet?.slug));
  }, [bookmarks, snippet?.slug]);

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
  
  const handleShareClick = () => {
    const urlToShare = window.location.href;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
    window.open(facebookShareUrl, '_blank', 'noopener,noreferrer');
  };


  return (
    <div className="mx-auto max-w-4xl space-y-8">
       <nav className="flex items-center text-sm text-muted-foreground">
        <Link href="/" className="flex items-center gap-1 hover:text-primary transition-colors">
          <Home className="h-4 w-4" />
          Trang chủ
        </Link>
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="font-medium text-foreground truncate">{snippet.title}</span>
      </nav>

      <div className="relative w-full aspect-[16/7] rounded-lg overflow-hidden">
        <Image
          src={snippet.imageUrl}
          alt={snippet.title}
          fill
          className="object-cover"
          priority
          data-ai-hint="feature image"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      <article className="space-y-6">
        <header className="space-y-4">
          <div className="flex justify-between items-start gap-4">
            <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {snippet.title}
            </h1>
            <div className="flex items-center gap-2">
              <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 shrink-0"
                  onClick={handleShareClick}
                  aria-label="Share on Facebook"
                >
                  <Share2 className="h-5 w-5 text-muted-foreground" />
              </Button>
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
          </div>
          <div className="flex flex-col gap-3">
             {snippet.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-semibold text-muted-foreground">Nền tảng:</span>
                    {snippet.categories.map((cat) => (
                    <Badge
                        key={cat}
                        className={cn(getTagColorClasses(cat, false, false, true))}
                    >
                        {cat}
                    </Badge>
                    ))}
                </div>
            )}
             {snippet.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 items-center">
                    <span className="text-sm font-semibold text-muted-foreground">Tags:</span>
                    {snippet.tags.map((tag) => (
                    <Badge
                        key={tag}
                        variant="outline"
                        className={cn(getTagColorClasses(tag))}
                    >
                        {tag}
                    </Badge>
                    ))}
                </div>
            )}
          </div>
        </header>

        <Card>
            <CardHeader className="flex-row items-center justify-between p-3 border-b">
                <p className="text-sm font-medium text-muted-foreground">C# Code</p>
                 <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:bg-muted" aria-label="Code settings">
                           <Cog className="h-4 w-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64" align="end">
                        <div className="grid gap-4">
                            <div className="space-y-2">
                                <h4 className="font-medium leading-none">Cài đặt Code</h4>
                                <p className="text-sm text-muted-foreground">
                                    Tùy chỉnh hiển thị của khối code.
                                </p>
                            </div>
                            <div className="grid gap-4">
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="font-size">Cỡ chữ</Label>
                                    <Select value={tempFontSize} onValueChange={(value: string) => setTempFontSize(value as FontSize)}>
                                        <SelectTrigger id="font-size" className="col-span-2 h-8">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="sm">Nhỏ</SelectItem>
                                            <SelectItem value="md">Vừa</SelectItem>
                                            <SelectItem value="lg">Lớn</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="font-family">Font</Label>
                                     <Select value={tempFontFamily} onValueChange={(value: string) => setTempFontFamily(value as FontFamily)}>
                                        <SelectTrigger id="font-family" className="col-span-2 h-8">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="source-code-pro">Source Code Pro</SelectItem>
                                            <SelectItem value="fira-code">Fira Code</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <Label htmlFor="code-theme">Theme</Label>
                                     <Select value={tempCodeTheme} onValueChange={(value: string) => setTempCodeTheme(value as CodeTheme)}>
                                        <SelectTrigger id="code-theme" className="col-span-2 h-8">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="github-dark">GitHub Dark</SelectItem>
                                            <SelectItem value="a11y-light">A11y Light</SelectItem>
                                            <SelectItem value="monokai-sublime">Monokai Sublime</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                             <Button onClick={handleApplySettings} className="mt-4 w-full">Lưu Cài đặt</Button>
                        </div>
                    </PopoverContent>
                </Popover>
            </CardHeader>
            <CardContent className="p-0">
                <CodeBlock 
                  code={snippet.code} 
                  fontSize={fontSize}
                  fontFamily={fontFamily}
                  theme={codeTheme}
                />
            </CardContent>
        </Card>


        <div className="prose prose-invert max-w-none text-muted-foreground pt-4">
            <p>{snippet.description}</p>
        </div>
      </article>

      <Separator className="my-12" />

      <CommentSection snippetSlug={snippet.slug} />

      <Separator className="my-12" />

      <RelatedSnippets currentSnippet={snippet} />
    </div>
  );
}
