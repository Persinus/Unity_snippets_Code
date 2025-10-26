import { getAllSnippets } from '@/lib/snippets';
import SnippetBrowser from '@/components/snippet-browser';

export default function Home() {
  const allSnippets = getAllSnippets();

  return (
    <div className="space-y-12">
      <div className="text-center space-y-4">
        <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Chào mừng đến với Unity Codex
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Khám phá, chia sẻ và lưu trữ những đoạn mã C# hữu ích cho Unity. Từ giải pháp cho người
          mới bắt đầu đến kiến trúc phức tạp cho các dự án lớn.
        </p>
      </div>

      <SnippetBrowser allSnippets={allSnippets} />
    </div>
  );
}