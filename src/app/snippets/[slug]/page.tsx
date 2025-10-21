
import { getSnippetBySlug, getAllSnippets } from "@/lib/snippets";
import { notFound } from "next/navigation";
import SnippetClientPage from "./snippet-client-page";
import type { Metadata, ResolvingMetadata } from 'next';

type SnippetPageProps = {
  params: {
    slug: string;
  };
};

// Generate metadata for each snippet page (Server Component)
export async function generateMetadata(
  { params }: SnippetPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
  const snippet = getSnippetBySlug(slug);

  if (!snippet) {
    return {
      title: 'Không tìm thấy Snippet',
      description: 'Snippet bạn đang tìm kiếm không tồn tại.',
    }
  }

  const previousImages = (await parent).openGraph?.images || []

  return {
    title: `${snippet.title} | Unity Codex`,
    description: snippet.description,
    openGraph: {
      title: snippet.title,
      description: snippet.description,
      images: [...previousImages],
    },
  }
}

// Generate static pages for all snippets at build time (Server Component)
export async function generateStaticParams() {
  const snippets = getAllSnippets();
  return snippets.map((snippet) => ({
    slug: snippet.slug,
  }));
}

// This is now a Server Component
export default function SnippetPage({ params }: SnippetPageProps) {
  const snippet = getSnippetBySlug(params.slug);

  if (!snippet) {
    notFound();
  }

  // Render the Client Component and pass the snippet data as a prop
  return <SnippetClientPage snippet={snippet} />;
}
