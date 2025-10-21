
"use client";

import { useState, useMemo } from "react";
import { getAllSnippets } from "@/lib/snippets";
import SnippetCard from "@/components/snippet-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, Search } from "lucide-react";
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

const SNIPPETS_PER_PAGE = 10;

export default function Home() {
  const allSnippets = useMemo(() => getAllSnippets(), []);
  
  const { allTags, allCategories } = useMemo(() => {
    const tags = new Set<string>();
    const categories = new Set<string>();
    allSnippets.forEach((snippet) => {
      snippet.tags.forEach((tag) => tags.add(tag));
      snippet.categories.forEach((cat) => categories.add(cat));
    });
    return { 
      allTags: Array.from(tags).sort(), 
      allCategories: Array.from(categories).sort() 
    };
  }, [allSnippets]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredSnippets = useMemo(() => {
    return allSnippets.filter((snippet) => {
      const searchMatch =
        searchTerm === "" ||
        snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.description.toLowerCase().includes(searchTerm.toLowerCase());

      const tagMatch =
        selectedTags.length === 0 ||
        selectedTags.every((tag) => snippet.tags.includes(tag));

      const categoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.every((cat) => snippet.categories.includes(cat));

      return searchMatch && tagMatch && categoryMatch;
    });
  }, [allSnippets, searchTerm, selectedTags, selectedCategories]);

  const totalPages = Math.ceil(filteredSnippets.length / SNIPPETS_PER_PAGE);

  const currentSnippets = useMemo(() => {
    const start = (currentPage - 1) * SNIPPETS_PER_PAGE;
    const end = start + SNIPPETS_PER_PAGE;
    return filteredSnippets.slice(start, end);
  }, [filteredSnippets, currentPage]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => {
      const newSelection = prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag];
      setCurrentPage(1);
      return newSelection;
    });
  };
  
  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) => {
      const newSelection = prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category];
      setCurrentPage(1);
      return newSelection;
    });
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxPagesToShow = 5;
    const halfMaxPages = Math.floor(maxPagesToShow / 2);
    let startPage = Math.max(1, currentPage - halfMaxPages);
    let endPage = Math.min(totalPages, currentPage + halfMaxPages);

    if (currentPage - 1 <= halfMaxPages) {
      endPage = Math.min(totalPages, maxPagesToShow);
    }
    if (totalPages - currentPage <= halfMaxPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
              aria-disabled={currentPage === 1}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {startPage > 1 && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>
          )}
          {startPage > 2 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}

          {pageNumbers.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(page);
                }}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {endPage < totalPages - 1 && (
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
          )}
          {endPage < totalPages && (
            <PaginationItem>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageChange(totalPages);
                }}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          )}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
              aria-disabled={currentPage === totalPages}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedCategories([]);
    setCurrentPage(1);
  };

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
           <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Lọc theo Nền tảng
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Chọn Nền tảng</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {allCategories.map((cat) => (
                  <DropdownMenuCheckboxItem
                    key={cat}
                    checked={selectedCategories.includes(cat)}
                    onCheckedChange={() => toggleCategory(cat)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {cat}
                  </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                Lọc theo Tag
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[calc(100vw-2rem)] max-w-[600px]" align="center">
              <DropdownMenuLabel>Chọn Tag</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1 p-1">
                {allTags.map((tag) => (
                  <DropdownMenuCheckboxItem
                    key={tag}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => toggleTag(tag)}
                    onSelect={(e) => e.preventDefault()}
                  >
                    {tag}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {(selectedTags.length > 0 || selectedCategories.length > 0) && (
            <Button
              variant="ghost"
              onClick={clearFilters}
            >
              Xóa bộ lọc
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {selectedCategories.map((cat) => (
              <Badge
                key={cat}
                className={cn(getTagColorClasses(cat, true, true), "cursor-pointer text-base")}
                onClick={() => toggleCategory(cat)}
              >
                {cat}
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
              </Badge>
            ))}
          </div>
        </div>
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
    </div>
  );
}
