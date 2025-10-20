import { getAllSnippets } from "@/lib/snippets";
import SnippetCard from "@/components/snippet-card";

export default function Home() {
  const snippets = getAllSnippets();

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
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {snippets.map((snippet) => (
          <SnippetCard key={snippet.slug} snippet={snippet} />
        ))}
      </div>
    </div>
  );
}
