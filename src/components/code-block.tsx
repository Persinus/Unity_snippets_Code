
"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import hljs from "highlight.js/lib/core";
import csharp from "highlight.js/lib/languages/csharp";

// Import themes
import "highlight.js/styles/github-dark.css";
import "highlight.js/styles/a11y-light.css";
import "highlight.js/styles/monokai-sublime.css";

hljs.registerLanguage("csharp", csharp);

type CodeBlockProps = {
  code: string;
  className?: string;
  theme?: string;
  fontSize?: string;
  fontFamily?: string;
};

export default function CodeBlock({ 
  code, 
  className,
  theme = 'github-dark',
  fontSize = 'md',
  fontFamily = 'source-code-pro',
}: CodeBlockProps) {
  const [hasCopied, setHasCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [code, theme]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code).then(() => {
      setHasCopied(true);
      setTimeout(() => {
        setHasCopied(false);
      }, 2000);
    });
  };

  const fontSizeClasses: { [key: string]: string } = {
    sm: 'text-[var(--code-font-size-sm)]',
    md: 'text-[var(--code-font-size-md)]',
    lg: 'text-[var(--code-font-size-lg)]',
  };

  const fontFamilyClasses: { [key: string]: string } = {
    'source-code-pro': 'font-code',
    'fira-code': 'font-fira-code',
  };


  return (
    <div
      className={cn(
        "relative",
        theme, // Apply theme class
        fontFamilyClasses[fontFamily],
        fontSizeClasses[fontSize],
        className
      )}
    >
      <div className="absolute right-2 top-2 z-10">
        <Button
          size="icon"
          variant="ghost"
          onClick={copyToClipboard}
          className="h-8 w-8 text-muted-foreground hover:bg-muted"
          aria-label="Copy code to clipboard"
        >
          {hasCopied ? (
            <Check className="h-4 w-4 text-primary" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
      <pre className="overflow-x-auto p-4 !bg-transparent rounded-b-lg">
        <code ref={codeRef} className="language-csharp !bg-transparent p-0">
          {code}
        </code>
      </pre>
    </div>
  );
}

    