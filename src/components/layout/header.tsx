'use client';

import Link from 'next/link';
import Logo from '@/components/logo';
import { ThemeToggle } from '@/components/layout/theme-toggle';
import { Button } from '@/components/ui/button';
import { useAuth, useUser, useMemoFirebase, useFirestore } from '@/firebase';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { LogIn, User as UserIcon, LogOut, ChevronDown, ShieldCheck, Star } from 'lucide-react';
import { doc, setDoc } from 'firebase/firestore';
import { AdmobIcon, FirebaseIcon, GooglePlayGamesIcon, MetaIcon } from '../icons';
import { useUserClaims } from '@/lib/user-claims';
import { useDocumentData } from '@/hooks/use-document-data';
import { MobileNav } from './mobile-nav';

export default function Header() {
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const { claims } = useUserClaims();

  const userDocRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid);
  }, [firestore, user]);

  const { data: userData } = useDocumentData<{ isPro?: boolean }>(userDocRef);
  const isPro = userData?.isPro === true;
  const isAdmin = claims?.admin === true;

  const handleLogin = async () => {
    if (!auth) return;
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user && firestore) {
        const userRef = doc(firestore, 'users', user.uid);
        await setDoc(
          userRef,
          {
            displayName: user.displayName,
            email: user.email,
            avatarUrl: user.photoURL,
            id: user.uid,
          },
          { merge: true }
        );
      }
    } catch (error) {
      console.error('Error during Google sign-in:', error);
    }
  };

  const handleLogout = async () => {
    if (!auth) return;
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Left side: Logo and Desktop Nav */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>

          <nav className="hidden items-center space-x-2 text-sm font-medium text-muted-foreground md:flex">
            <Link href="/" className="transition-colors hover:text-foreground">
              Trang chủ
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="link" className="flex items-center gap-1 text-muted-foreground">
                  Tài nguyên
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="start">
                <DropdownMenuLabel>Link hữu ích cho Unity Dev</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem asChild>
                    <a
                      href="https://developers.google.com/admob/unity/quick-start"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <AdmobIcon className="mr-2 h-4 w-4" />
                      <span>Google Mobile Ads (AdMob)</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href="https://developers.google.com/games/services/android/quickstart"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <GooglePlayGamesIcon className="mr-2 h-4 w-4" />
                      <span>Google Play Games</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href="https://firebase.google.com/docs/unity/setup"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FirebaseIcon className="mr-2 h-4 w-4" />
                      <span>Firebase SDK</span>
                    </a>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <a
                      href="https://developers.facebook.com/docs/unity/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MetaIcon className="mr-2 h-4 w-4" />
                      <span>Meta (Facebook) SDK</span>
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            {isAdmin && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <ShieldCheck className="h-4 w-4" />
                Admin
              </Link>
            )}
          </nav>
        </div>

        {/* Right side: Desktop actions */}
        <div className="hidden items-center justify-end space-x-2 md:flex">
          <ThemeToggle />
          {isUserLoading ? (
            <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.photoURL || undefined} alt={user.displayName || 'User'} />
                    <AvatarFallback>
                      {user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium leading-none">{user.displayName}</p>
                      {(isPro || isAdmin) && <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />}
                    </div>
                    <p className="text-xs leading-none text-muted-foreground break-all">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <UserIcon className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      <span>Admin Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={handleLogin}>
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          )}
        </div>

         {/* Right side: Mobile Nav Trigger */}
        <div className="md:hidden">
          <MobileNav 
            isAdmin={isAdmin}
            isPro={isPro}
            isUserLoading={isUserLoading}
            user={user}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        </div>
      </div>
    </header>
  );
}
