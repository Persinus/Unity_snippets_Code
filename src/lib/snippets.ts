import data from "./snippets.json";

export type Snippet = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  code: string;
};

const snippets: Snippet[] = data.snippets;

export function getAllSnippets(): Snippet[] {
  return snippets;
}

export function getSnippetBySlug(slug: string): Snippet | undefined {
  return snippets.find((snippet) => snippet.slug === slug);
}
