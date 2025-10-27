'use client';
import type { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
  SidebarRail,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Header } from './header';

const navItems = [
  { href: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/log-workout', label: 'Log Workout', icon: 'PenSquare' },
  { href: '/progress', label: 'Progress', icon: 'LineChart' },
  { href: '/ai-trainer', label: 'AI Trainer', icon: 'Bot' },
  { href: '/challenges', label: 'Challenges', icon: 'Trophy' },
  { href: '/profile', label: 'Profile', icon: 'User' },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarRail />
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-primary"
            >
              <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm-1 15.59V14H9v-2h2v-1.59c0-2.29 1.4-3.5 3.5-3.5 0.99 0 1.88.07 2.13.1v1.83h-1.09c-1.11 0-1.32.53-1.32 1.29V12h2.22l-.28 2h-1.94v3.59h-2z" />
            </svg>
            <span className="text-lg font-semibold">Workout Sage</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav items={navItems} pathname={pathname} />
        </SidebarContent>
        <SidebarFooter>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://picsum.photos/seed/user/40/40" alt="User" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">Alex</span>
              <span className="text-xs text-muted-foreground">alex@example.com</span>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <Header>
          <SidebarTrigger />
        </Header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
