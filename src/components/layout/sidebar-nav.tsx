'use client';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import * as icons from 'lucide-react';

type NavItem = {
  href: string;
  label: string;
  icon: keyof typeof icons;
};

type SidebarNavProps = {
  items: NavItem[];
  pathname: string;
};

export function SidebarNav({ items, pathname }: SidebarNavProps) {
  if (!items?.length) {
    return null;
  }

  return (
    <SidebarMenu>
      {items.map((item, index) => {
        const Icon = icons[item.icon] as React.ElementType;
        const isActive = pathname === item.href;

        return (
          <SidebarMenuItem key={index}>
            <SidebarMenuButton
              asChild
              isActive={isActive}
              tooltip={{
                children: item.label,
                className: 'bg-primary text-primary-foreground',
              }}
            >
              <a href={item.href}>
                <Icon />
                <span>{item.label}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}
