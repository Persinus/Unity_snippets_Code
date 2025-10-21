
'use client';

import { useMemo, useRef } from 'react';
import { Snippet, getAllSnippets } from '@/lib/snippets';
import SnippetCard from './snippet-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { Separator } from './ui/separator';
import { BookCopy } from 'lucide-react';

type RelatedSnippetsProps = {
  currentSnippet: Snippet;
};

export default function RelatedSnippets({ currentSnippet }: RelatedSnippetsProps) {
  const plugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  const relatedSnippets = useMemo(() => {
    const all = getAllSnippets();
    const currentTags = new Set(currentSnippet.tags);

    if (currentTags.size === 0) {
      return [];
    }

    return all
      .filter((snippet) => {
        // Exclude the current snippet from the list
        if (snippet.slug === currentSnippet.slug) {
          return false;
        }
        // Check if the snippet shares at least one tag
        return snippet.tags.some((tag) => currentTags.has(tag));
      })
      .sort((a, b) => {
        // Optional: Sort by the number of shared tags for better relevance
        const aSharedCount = a.tags.filter(tag => currentTags.has(tag)).length;
        const bSharedCount = b.tags.filter(tag => currentTags.has(tag)).length;
        return bSharedCount - aSharedCount;
      })
      .slice(0, 10); // Limit to 10 related snippets
  }, [currentSnippet]);

  if (relatedSnippets.length === 0) {
    return null;
  }

  return (
    <section className="space-y-8">
       <div className="flex items-center gap-4">
        <BookCopy className="h-7 w-7 text-primary" />
        <h2 className="text-2xl font-bold tracking-tight">Bài viết liên quan</h2>
      </div>
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-4">
          {relatedSnippets.map((snippet, index) => (
            <CarouselItem key={snippet.slug} className="md:basis-1/2 lg:basis-1/3 pl-4">
               <div className="p-1 h-full">
                <SnippetCard
                    snippet={snippet}
                    index={index}
                    selectedTags={currentSnippet.tags}
                    selectedCategories={[]}
                    onTagClick={() => {}}
                    onCategoryClick={() => {}}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
