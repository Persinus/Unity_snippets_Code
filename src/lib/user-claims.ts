'use client';

import { useUser } from '@/firebase';
import { useEffect, useState } from 'react';

export interface UserClaims {
  admin?: boolean;
  // Add other potential claims here
}

/**
 * A client-side hook to get a user's custom claims.
 * It forces a token refresh to ensure the latest claims are fetched.
 * @returns An object containing the claims and a loading state.
 */
export function useUserClaims() {
  const { user, isUserLoading } = useUser();
  const [claims, setClaims] = useState<UserClaims | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isUserLoading) {
      setIsLoading(true);
      return;
    }

    if (!user) {
      setClaims(null);
      setIsLoading(false);
      return;
    }

    // Force a token refresh to get the latest custom claims.
    user.getIdTokenResult(true)
      .then((idTokenResult) => {
        setClaims((idTokenResult.claims as UserClaims) || {});
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching user claims:", error);
        setClaims(null);
        setIsLoading(false);
      });
  }, [user, isUserLoading]);

  return { claims, isLoading };
}
