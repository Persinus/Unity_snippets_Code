'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import {
  Calculator,
  Code,
  Smile,
} from 'lucide-react';
import { useDebounce } from 'use-debounce';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { findSnippet } from '@/ai/flows/find-snippet-flow';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function CommandDialogSearch({ open, setOpen }: Props) {
  const [search, setSearch] = React.useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [aiResult, setAiResult] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();


  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen(!open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [open, setOpen]);

  React.useEffect(() => {
    const performSearch = async () => {
        if (debouncedSearch.length > 3) {
            setLoading(true);
            try {
                const result = await findSnippet(debouncedSearch);
                if (result.slug) {
                    setAiResult(result.slug);
                } else {
                    setAiResult(null);
                }
            } catch (error) {
                console.error("Error finding snippet:", error);
                setAiResult(null);
            } finally {
                setLoading(false);
            }
        } else {
            setAiResult(null);
        }
    }
    performSearch();
  }, [debouncedSearch]);


  const handleSelect = (slug: string) => {
    router.push(`/snippets/${slug}`);
    setOpen(false);
  }

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput 
        placeholder="Hỏi AI tìm code snippet..."
        value={search}
        onValueChange={setSearch}
      />
      <CommandList>
        {loading && <CommandEmpty>AI đang tìm kiếm...</CommandEmpty>}
        {!loading && !aiResult && debouncedSearch.length > 3 && <CommandEmpty>Không tìm thấy kết quả.</CommandEmpty>}
        
        {aiResult && (
             <CommandGroup heading="Gợi ý từ AI">
                <CommandItem onSelect={() => handleSelect(aiResult)}>
                    <Code className="mr-2 h-4 w-4" />
                    <span>Đi đến snippet: {aiResult.replace(/-/g, ' ')}</span>
                </CommandItem>
             </CommandGroup>
        )}

        <CommandSeparator />
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Smile className="mr-2 h-4 w-4" />
            <span>Tìm code về "Stamina"</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Làm sao để lưu dữ liệu game?</span>
          </CommandItem>
          <CommandItem>
            <Code className="mr-2 h-4 w-4" />
            <span>Ví dụ về Object Pooling</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
