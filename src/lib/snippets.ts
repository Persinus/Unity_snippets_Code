import snippetsData from "./snippets.json";
import snippetsData2 from "./snippets-2.json";

export type Snippet = {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  tags: string[];
  code: string;
};

// Combine snippets from all sources and sort them
const allSnippets: Snippet[] = [...snippetsData.snippets, ...snippetsData2.snippets].sort((a, b) => a.title.localeCompare(b.title, 'en-US'));

export function getAllSnippets(): Snippet[] {
  // Return a copy of the pre-sorted array
  return allSnippets;
}

export function getSnippetBySlug(slug: string): Snippet | undefined {
  return allSnippets.find((snippet) => snippet.slug === slug);
}
