
import { getAllSnippets } from "@/lib/snippets";
import SnippetBrowser from "@/components/snippet-browser";

export default function Home() {
  const allSnippets = getAllSnippets();

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

      <SnippetBrowser allSnippets={allSnippets} />
    </div>
  );
}
