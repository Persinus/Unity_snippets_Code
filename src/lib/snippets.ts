import snippetsData from "./snippets.json";

export type Snippet = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  code: string;
};

// The data is now directly imported from the JSON file
const allSnippets: Snippet[] = snippetsData.snippets;

export function getAllSnippets(): Snippet[] {
  // Sort snippets alphabetically by title
  return [...allSnippets].sort((a, b) => a.title.localeCompare(b.title));
}

export function getSnippetBySlug(slug: string): Snippet | undefined {
  return allSnippets.find((snippet) => snippet.slug === slug);
}
