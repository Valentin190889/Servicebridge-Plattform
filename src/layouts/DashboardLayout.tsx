import React from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { DashboardHeader } from '../components/layout/DashboardHeader';
import { useAuth } from '../contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex relative">
      <div className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/Background_Theme_SAI.jpg")',
          filter: 'brightness(0.9)'
        }}
      />
      <div className="absolute inset-0 z-0 bg-black bg-opacity-50" />
      
      <div className="relative z-10 flex w-full">
        <Sidebar />
        <div className="flex-1 ml-64 flex flex-col">
          {isAuthenticated && <DashboardHeader />}
          <main className="flex-1 relative">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}