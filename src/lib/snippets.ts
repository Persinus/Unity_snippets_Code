import snippetsData from "./snippets.json";

export type Snippet = {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  tags: string[];
  code: string;
};

// The data is now directly imported from the JSON file
const allSnippets: Snippet[] = [...snippetsData.snippets].sort((a, b) => a.title.localeCompare(b.title, 'en-US'));

export function getAllSnippets(): Snippet[] {
  // Return a copy of the pre-sorted array
  return allSnippets;
}

export function getSnippetBySlug(slug: string): Snippet | undefined {
  return allSnippets.find((snippet) => snippet.slug === slug);
}
