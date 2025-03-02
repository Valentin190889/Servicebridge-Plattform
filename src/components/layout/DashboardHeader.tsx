import React from 'react';
import { Bell, Search } from 'lucide-react';
import { UserMenu } from '../ui/UserMenu';

export function DashboardHeader() {
  return (
    <header className="h-16 relative z-40">
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

      <div className="relative z-10 h-full flex items-center justify-between px-6">
        <div className="flex items-center flex-1">
          <div className="max-w-lg w-full lg:max-w-xs relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              className="block w-full pl-10 pr-3 py-2 border border-gray-300/20 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-white/50 focus:border-transparent sm:text-sm transition-all"
              placeholder="Search"
              type="search"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-white/80 hover:text-white transition-colors">
            <Bell className="h-6 w-6" />
          </button>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}