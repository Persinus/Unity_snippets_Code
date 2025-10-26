'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, ShieldCheck, LogIn, LogOut, User as UserIcon, Star, Sun, Moon } from 'lucide-react';
import Logo from '../logo';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import type { User } from 'firebase/auth';
import { Skeleton } from '../ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useTheme } from 'next-themes';
import { Separator } from '../ui/separator';

interface MobileNavProps {
  isAdmin: boolean;
  isPro: boolean;
  user: User | null;
  isUserLoading: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

export function MobileNav({ isAdmin, isPro, user, isUserLoading, onLogin, onLogout }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col pr-0 sm:max-w-sm">
        <SheetHeader className="p-4">
          <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
            <Logo />
          </Link>
        </SheetHeader>
        <Separator />
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-col space-y-3 p-4">
            <Link href="/" className="text-muted-foreground" onClick={() => setOpen(false)}>
              Trang chủ
            </Link>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="resources">
                <AccordionTrigger className="text-muted-foreground">Tài nguyên</AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2 pl-4">
                    <a
                      href="https://developers.google.com/admob/unity/quick-start"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground/80"
                      onClick={() => setOpen(false)}
                    >
                      Google Mobile Ads (AdMob)
                    </a>
                    <a
                      href="https://developers.google.com/games/services/android/quickstart"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground/80"
                      onClick={() => setOpen(false)}
                    >
                      Google Play Games
                    </a>
                    <a
                      href="https://firebase.google.com/docs/unity/setup"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground/80"
                      onClick={() => setOpen(false)}
                    >
                      Firebase SDK
                    </a>
                    <a
                      href="https://developers.facebook.com/docs/unity/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground/80"
                      onClick={() => setOpen(false)}
                    >
                      Meta (Facebook) SDK
                    </a>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 text-muted-foreground"
                onClick={() => setOpen(false)}
              >
                <ShieldCheck className="h-4 w-4" />
                Admin
              </Link>
            )}
          </div>
        </div>
        <Separator />
        <SheetFooter className="flex flex-col gap-4 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Chế độ Sáng/Tối</span>
            <div className="flex items-center rounded-full border p-1">
              <Button
                variant={theme === 'light' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-7 w-7 rounded-full"
                onClick={() => setTheme('light')}
              >
                <Sun className="h-4 w-4" />
              </Button>
              <Button
                variant={theme === 'dark' ? 'secondary' : 'ghost'}
                size="icon"
                className="h-7 w-7 rounded-full"
                onClick={() => setTheme('dark')}
              >
                <Moon className="h-4 w-4" />
              </Button>
            </div>
          </div>
          {isUserLoading ? (
            <Skeleton className="h-12 w-full" />
          ) : user ? (
            <div className="space-y-2">
               <Link href="/profile" passHref>
                <Button variant="secondary" className="w-full justify-start" onClick={() => setOpen(false)}>
                  <Avatar className="mr-2 h-7 w-7">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                    <AvatarFallback>
                      {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium leading-none flex items-center gap-1.5">
                      {user.displayName}
                       {(isPro || isAdmin) && <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />}
                    </span>
                    <span className="text-xs text-muted-foreground font-normal">Xem hồ sơ</span>
                  </div>
                </Button>
              </Link>
              <Button variant="destructive" className="w-full" onClick={() => { onLogout(); setOpen(false); }}>
                <LogOut className="mr-2 h-4 w-4" />
                Đăng xuất
              </Button>
            </div>
          ) : (
            <Button className="w-full" onClick={() => { onLogin(); setOpen(false); }}>
              <LogIn className="mr-2 h-4 w-4" />
              Đăng nhập bằng Google
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
