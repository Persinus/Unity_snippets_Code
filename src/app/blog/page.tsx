
import type { Metadata } from 'next';
import { getAllSnippets, Snippet } from '@/lib/snippets';
import SnippetCard from '@/components/snippet-card';
import { Separator } from '@/components/ui/separator';
import { Rss } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { getTagColorClasses } from '@/lib/tag-colors';
import { cn } from '@/lib/utils';
import { ArrowRight, Eye, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | Unity Codex',
  description: 'Khám phá các bài viết, hướng dẫn và snippet mới nhất về lập trình game với Unity C#.',
};

function FeaturedSnippetCard({ snippet }: { snippet: Snippet }) {
    return (
        <article className="group relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <Link href={`/snippets/${snippet.slug}`} className="block overflow-hidden rounded-lg">
                 <Image
                    src={snippet.imageUrl}
                    alt={snippet.title}
                    width={800}
                    height={450}
                    className="w-full object-cover aspect-[16/9] group-hover:scale-105 transition-transform duration-300"
                    priority
                    data-ai-hint="code snippet"
                />
            </Link>

            <div className="flex flex-col space-y-4">
                 <div className="space-y-3">
                    {snippet.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2 items-center">
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
                    <h2 className="font-headline text-3xl font-bold tracking-tight group-hover:text-primary transition-colors">
                        <Link href={`/snippets/${snippet.slug}`}>
                            {snippet.title}
                        </Link>
                    </h2>
                    <p className="text-muted-foreground line-clamp-3">
                        {snippet.description}
                    </p>
                </div>
                 <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <MessageSquare className="h-4 w-4" />
                        <span>({snippet.commentCount ?? 0}) Bình luận</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Eye className="h-4 w-4" />
                        <span>{snippet.viewCount ?? 0} Lượt xem</span>
                    </div>
                 </div>
                 <div className="pt-2">
                    <Link href={`/snippets/${snippet.slug}`} className="font-semibold text-primary flex items-center gap-2">
                        Đọc thêm
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                 </div>
            </div>
        </article>
    );
}


export default function BlogPage() {
  const allSnippets = getAllSnippets();
  
  if (allSnippets.length === 0) {
    return (
      <div className="text-center py-16">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Chưa có bài viết nào.
        </p>
      </div>
    );
  }

  const featuredSnippet = allSnippets[0];
  const otherSnippets = allSnippets.slice(1);

  return (
    <div className="space-y-12">
      <div className="space-y-4 text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Chào mừng đến với Blog
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Khám phá các bài viết, hướng dẫn và snippet mới nhất về lập trình game với Unity C#.
        </p>
      </div>
      
      <Separator />

      {/* Featured Snippet */}
      <FeaturedSnippetCard snippet={featuredSnippet} />

      {otherSnippets.length > 0 && (
        <>
            <Separator />
            <div className="space-y-8">
                 <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                    <Rss className="h-7 w-7 text-primary"/>
                    Tất cả bài viết
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {otherSnippets.map((snippet, index) => (
                    <SnippetCard
                    key={snippet.slug}
                    snippet={snippet}
                    index={index}
                    selectedTags={[]}
                    selectedCategories={[]}
                    onTagClick={() => {}}
                    onCategoryClick={() => {}}
                    />
                ))}
                </div>
            </div>
        </>
      )}
    </div>
  );
}
