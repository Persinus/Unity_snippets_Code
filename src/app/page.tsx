
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

const SNIPPETS_PER_PAGE = 10;

export default function Home() {
  const allSnippets = useMemo(() => getAllSnippets(), []);
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allSnippets.forEach((snippet) => {
      snippet.tags.forEach((tag) => tags.add(tag));
    });
    return Array.from(tags).sort();
  }, [allSnippets]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
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

      return searchMatch && tagMatch;
    });
  }, [allSnippets, searchTerm, selectedTags]);

  const totalPages = Math.ceil(filteredSnippets.length / SNIPPETS_PER_PAGE);

  const currentSnippets = useMemo(() => {
    const start = (currentPage - 1) * SNIPPETS_PER_PAGE;
    const end = start + SNIPPETS_PER_PAGE;
    return filteredSnippets.slice(start, end);
  }, [filteredSnippets, currentPage]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prevTags) => {
      const newTags = prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag];
      setCurrentPage(1); // Reset to first page on filter change
      return newTags;
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

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Welcome to Unity Codex
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your modern archive for Unity C# code snippets.
        </p>
      </div>

      <div className="mx-auto max-w-4xl space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search snippets by title or description..."
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
                Filter by tag
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[calc(100vw-2rem)] max-w-[600px]" align="center">
              <DropdownMenuLabel>Select tags to filter</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-1 p-1">
                {allTags.map((tag) => (
                  <DropdownMenuCheckboxItem
                    key={tag}
                    checked={selectedTags.includes(tag)}
                    onCheckedChange={() => toggleTag(tag)}
                    onSelect={(e) => e.preventDefault()} // Prevent closing on select
                  >
                    {tag}
                  </DropdownMenuCheckboxItem>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {selectedTags.length > 0 && (
            <Button
              variant="ghost"
              onClick={() => {
                setSelectedTags([]);
                setCurrentPage(1);
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-2">
          {selectedTags.map((tag) => (
             <Badge
              key={tag}
              className={cn(getTagColorClasses(tag, true, true))}
              variant="outline"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
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
              onTagClick={toggleTag}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            No snippets found. Try a different search or filter.
          </p>
        </div>
      )}

      {renderPagination()}
    </div>
  );
}
