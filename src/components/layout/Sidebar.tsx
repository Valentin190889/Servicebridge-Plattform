import React from 'react';
import { Brain, Users, BookOpen, Newspaper, LifeBuoy, Briefcase, Settings, Target } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

function SidebarLink({ to, icon: Icon, children }: { to: string; icon: any; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive 
            ? 'bg-white/10 text-white border border-white/20' 
            : 'text-gray-300 hover:bg-white/5 hover:border-[#29DDDA] border border-transparent'
        }`
      }
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </NavLink>
  );
}

export function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 w-64 z-20">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/Background_Theme_SAI.jpg")',
          filter: 'brightness(0.9)'
        }}
      />
      {/* Overlay for better content visibility */}
      <div className="absolute inset-0 z-0 bg-black bg-opacity-80" />

      <div className="relative z-10 h-full p-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-2">
            <img src="/service-bridge_small_white.png" alt="ServiceBridge" className="h-8 w-8" />
            <span className="text-xl font-bold text-white">ServiceBridge</span>
          </div>
          <ThemeToggle />
        </div>
        
        <nav className="space-y-2">
          <SidebarLink to="/aico" icon={Brain}>
            AiCo
          </SidebarLink>
          <SidebarLink to="/challenges" icon={Target}>
            Challenges
          </SidebarLink>
          <SidebarLink to="/news" icon={Newspaper}>
            News & Insights
          </SidebarLink>
          <SidebarLink to="/community" icon={Users}>
            Community.AI
          </SidebarLink>
          <SidebarLink to="/knowledge" icon={BookOpen}>
            Knowledge.Hub
          </SidebarLink>
          <SidebarLink to="/experts" icon={Users}>
            Experts
          </SidebarLink>
          <SidebarLink to="/workspace" icon={Briefcase}>
            Workspace
          </SidebarLink>
          <SidebarLink to="/support" icon={LifeBuoy}>
            Support
          </SidebarLink>
          <SidebarLink to="/settings" icon={Settings}>
            Settings
          </SidebarLink>
        </nav>
      </div>
    </aside>
  );
}