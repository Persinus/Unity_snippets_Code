
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Snippet } from "@/lib/snippets";
import { ArrowRight } from "lucide-react";
import { getTagColorClasses } from "@/lib/tag-colors";
import { cn } from "@/lib/utils";
import React from "react";

type SnippetCardProps = {
  snippet: Snippet;
  index: number;
};

export default function SnippetCard({ snippet, index }: SnippetCardProps) {
  return (
    <Link href={`/snippets/${snippet.slug}`} className="group block">
      <Card 
        className="flex h-full flex-col transition-all duration-300 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/10 animate-in fade-in-90 slide-in-from-bottom-4 zoom-in-95"
        style={{ animationDelay: `${index * 50}ms`, animationFillMode: 'backwards' }}
      >
        <CardHeader>
          <CardTitle className="font-headline text-lg font-semibold group-hover:text-primary">
            {snippet.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {snippet.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
            {snippet.tags.map((tag) => (
              <Badge key={tag} className={cn(getTagColorClasses(tag))}>
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter>
            <div className="flex items-center text-sm font-medium text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                View Snippet
                <ArrowRight className="ml-2 h-4 w-4" />
            </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
