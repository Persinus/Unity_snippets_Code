
'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';

import {
  CommandDialog,
  DialogTitle,
} from '@/components/ui/command';

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
}

export function CommandDialogSearch({ open, setOpen }: Props) {
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
        <DialogTitle className="sr-only">Search</DialogTitle>
    </CommandDialog>
  );
}
