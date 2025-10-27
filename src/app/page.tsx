'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the welcome page to simulate new user onboarding
    router.replace('/welcome');
  }, [router]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-muted-foreground">Loading your adventure...</p>
    </div>
  );
}
