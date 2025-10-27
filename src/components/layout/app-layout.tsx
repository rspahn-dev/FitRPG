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
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { SidebarNav } from '@/components/layout/sidebar-nav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Header } from './header';
import { Dumbbell, Settings, Cat } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { href: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
  { href: '/log-workout', label: 'Log Workout', icon: 'PenSquare' },
  { href: '/battle', label: 'Battle', icon: 'Swords' },
  { href: '/progress', label: 'Progress', icon: 'LineChart' },
  { href: '/ai-trainer', label: 'AI Trainer', icon: 'Bot' },
  { href: '/challenges', label: 'Challenges', icon: 'Trophy' },
  { href: '/social', label: 'Social', icon: 'Users' },
];

export function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Hide layout for welcome page
  if (pathname === '/welcome') {
    return <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>;
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarRail />
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Dumbbell className="h-8 w-8 text-primary" />
            <span className="text-lg font-semibold">FitRPG</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarNav items={navItems} pathname={pathname} />
        </SidebarContent>
        <SidebarFooter className="gap-4">
           <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={pathname === '/creature'}>
                    <Link href="/creature">
                        <Cat />
                        <span>Creature</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="#">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarSeparator />
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
