import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

export function Header({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header
      className={cn(
        'sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6',
        className
      )}
    >
      {children}
    </header>
  );
}
