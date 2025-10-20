"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  code: string;
  className?: string;
};

export default function CodeBlock({ code, className }: CodeBlockProps) {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setHasCopied(true);
      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    });
  };

  return (
    <div
      className={cn(
        "relative rounded-lg border bg-card font-code text-sm",
        className
      )}
    >
      <div className="absolute right-2 top-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={copyToClipboard}
          className="h-8 w-8 text-muted-foreground hover:bg-muted"
          aria-label="Copy code"
        >
          {hasCopied ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <pre className="overflow-x-auto p-4">
        <code>{code}</code>
      </pre>
    </div>
  );
}
