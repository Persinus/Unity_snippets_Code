'use client';

import { useUserClaims } from '@/lib/user-claims';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '../ui/skeleton';

interface AdminRouteProps {
  children: React.ReactNode;
}

/**
 * A client-side component that protects a route, allowing only admin users.
 * If the user is not an admin, it redirects them to the home page.
 */
export default function AdminRoute({ children }: AdminRouteProps) {
  const { claims, isLoading } = useUserClaims();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !claims?.admin) {
      console.log("Redirecting non-admin user.");
      router.push('/');
    }
  }, [claims, isLoading, router]);

  if (isLoading || !claims?.admin) {
    // Show a loading state or a blank page while checking claims
    // to prevent flashing the admin content to non-admin users.
    return (
        <div className="space-y-4 p-4">
            <Skeleton className="h-12 w-1/4" />
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-8 w-1/2 mt-8" />
            <Skeleton className="h-40 w-full" />
        </div>
    );
  }

  // If claims are loaded and the user is an admin, render the children.
  return <>{children}</>;
}
