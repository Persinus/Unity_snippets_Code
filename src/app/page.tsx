import { getAllSnippets } from "@/lib/snippets";
<<<<<<< HEAD
import SnippetCard from "@/components/snippet-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Search, XCircle } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { getTagColorClasses } from "@/lib/tag-colors";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

const SNIPPETS_PER_PAGE = 10;
=======
import SnippetBrowser from "@/components/snippet-browser";
>>>>>>> 48c7725 (Application error: a server-side exception has occurred while loading 60)

export default function Home() {
  const allSnippets = getAllSnippets();

  const hasActiveFilters = selectedTags.length > 0 || selectedCategories.length > 0;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Chào mừng đến với Unity Codex
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Kho lưu trữ hiện đại của bạn cho các đoạn mã Unity C#.
        </p>
      </div>

<<<<<<< HEAD
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Tìm kiếm snippet theo tiêu đề hoặc mô tả..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
           <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                Lọc theo Nền tảng
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start" side="bottom">
               <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Chọn Nền tảng</h4>
                    <p className="text-sm text-muted-foreground">
                      Chọn một hoặc nhiều nền tảng để lọc.
                    </p>
                  </div>
                   <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                    {allCategories.map((cat) => (
                        <CategoryCheckboxItem key={cat} category={cat} />
                    ))}
                  </div>
               </div>
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                Lọc theo Tag
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start" side="bottom">
               <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Chọn Tag</h4>
                    <p className="text-sm text-muted-foreground">
                      Chọn một hoặc nhiều tag để lọc.
                    </p>
                  </div>
                   <div className="grid grid-cols-2 gap-2 max-h-96 overflow-y-auto">
                    {allTags.map((tag) => (
                        <TagCheckboxItem key={tag} tag={tag} />
                    ))}
                  </div>
               </div>
            </PopoverContent>
          </Popover>

           {hasActiveFilters && (
             <Button
                variant="destructive"
                onClick={clearFilters}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Xóa bộ lọc
            </Button>
          )}
        </div>
        
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-center gap-4 animate-in fade-in-50">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {selectedCategories.map((cat) => (
                <Badge
                  key={cat}
                  className={cn(getTagColorClasses(cat, true, true, true), "cursor-pointer text-base")}
                  onClick={() => toggleCategory(cat)}
                >
                  {cat}
                   <XCircle className="ml-2 h-3 w-3" />
                </Badge>
              ))}
            </div>
            {selectedCategories.length > 0 && selectedTags.length > 0 && <Separator orientation="vertical" className="h-6"/>}
            <div className="flex flex-wrap items-center justify-center gap-2">
              {selectedTags.map((tag) => (
                <Badge
                  key={tag}
                  className={cn(getTagColorClasses(tag, true, true), "cursor-pointer")}
                  variant="outline"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                   <XCircle className="ml-2 h-3 w-3" />
                </Badge>
              ))}
            </div>
          </div>
        )}
      </div>

      {currentSnippets.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {currentSnippets.map((snippet, index) => (
            <SnippetCard 
              key={snippet.slug} 
              snippet={snippet} 
              index={index} 
              selectedTags={selectedTags}
              selectedCategories={selectedCategories}
              onTagClick={toggleTag}
              onCategoryClick={toggleCategory}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            Không tìm thấy snippet nào. Vui lòng thử lại với từ khóa hoặc bộ lọc khác.
          </p>
        </div>
      )}

      {renderPagination()}
=======
      <SnippetBrowser allSnippets={allSnippets} />
>>>>>>> 48c7725 (Application error: a server-side exception has occurred while loading 60)
    </div>
  );
}
