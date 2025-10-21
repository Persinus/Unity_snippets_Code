import { getAllSnippets, getSnippetBySlug } from "@/lib/snippets";
import { notFound } from "next/navigation";
import CodeBlock from "@/components/code-block";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getTagColorClasses } from "@/lib/tag-colors";
import { cn } from "@/lib/utils";

// This function is now commented out as we are not using file-based static generation for now.
// The data will be fetched at request time.
/*
export async function generateStaticParams() {
  const snippets = getAllSnippets();
  return snippets.map((snippet) => ({
    slug: snippet.slug,
  }));
}
*/

type SnippetPageProps = {
  params: {
    slug: string;
  };
};

export default function SnippetPage({ params }: SnippetPageProps) {
  const snippet = getSnippetBySlug(params.slug);

  if (!snippet) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <Button asChild variant="ghost">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
      <article className="space-y-6">
        <header className="space-y-2">
          <h1 className="font-headline text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {snippet.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {snippet.tags.map((tag) => (
              <Badge
                key={tag}
                className={cn(getTagColorClasses(tag))}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </header>
        <div className="prose prose-invert max-w-none text-muted-foreground">
          <p>{snippet.description}</p>
        </div>
        <CodeBlock code={snippet.code} />
      </article>
    </div>
  );
}
