"use client";

import { useState, useMemo } from "react";
import { getAllSnippets } from "@/lib/snippets";
import SnippetCard from "@/components/snippet-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";

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

  const toggleTag = (tag: string) => {
    setSelectedTags((prevTags) =>
      prevTags.includes(tag)
        ? prevTags.filter((t) => t !== tag)
        : [...prevTags, tag]
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

      <div className="mx-auto max-w-2xl space-y-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search snippets by title or description..."
            className="w-full pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">Filter by tag:</span>
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "secondary"}
              onClick={() => toggleTag(tag)}
              className="cursor-pointer transition-colors"
            >
              {tag}
            </Badge>
          ))}
          {selectedTags.length > 0 && (
             <button onClick={() => setSelectedTags([])} className="text-sm text-primary hover:underline">Clear</button>
          )}
        </div>
      </div>
      
      {filteredSnippets.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSnippets.map((snippet) => (
            <SnippetCard key={snippet.slug} snippet={snippet} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No snippets found. Try a different search or filter.</p>
        </div>
      )}
    </div>
  );
}
