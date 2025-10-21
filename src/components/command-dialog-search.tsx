
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
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
// AI flow is no longer used
// import { findSnippet } from '@/ai/flows/find-snippet-flow';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function CommandDialogSearch({ open, setOpen }: Props) {
  const [search, setSearch] = React.useState('');
  // All AI related state and effects are removed
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


  const handleSelect = (slug: string) => {
    router.push(`/snippets/${slug}`);
    setOpen(false);
  }

  return (
    // The CommandDialog is now empty as the AI functionality is removed
    <CommandDialog open={open} onOpenChange={setOpen}>
    </CommandDialog>
  );
}
