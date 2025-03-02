import React from 'react';
import { LucideIcon } from 'lucide-react';

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

export function SidebarLink({ href, icon: Icon, children }: SidebarLinkProps) {
  return (
    <a
      href={href}
      className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800 rounded-lg transition-colors duration-200"
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </a>
  );
}