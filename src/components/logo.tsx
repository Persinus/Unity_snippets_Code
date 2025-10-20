import { Code2 } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center justify-center" aria-label="Unity Codex Logo">
      <Code2 className="h-6 w-6 text-primary" />
      <span className="ml-2 font-headline text-xl font-semibold tracking-tighter text-foreground">
        Unity Codex
      </span>
    </div>
  );
}
