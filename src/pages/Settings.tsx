import React from 'react';
import { Settings as SettingsIcon, Shield, CreditCard } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { Profile } from './workspace/Profile';

export function Settings() {
  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/Background_Theme_SAI.jpg")',
          filter: 'brightness(0.9)'
        }}
      />
      {/* Overlay for better content visibility */}
      <div className="absolute inset-0 z-0 bg-black bg-opacity-50" />

      <div className="relative z-10 max-w-7xl mx-auto py-8">
        <div className="bg-white/10 rounded-lg p-6 border border-white/20 mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#29DDDA] text-transparent bg-clip-text">Settings</h1>
          <p className="mt-2 text-gray-300">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
          <Tabs defaultValue="profile" className="text-white">
            <TabsList className="flex space-x-2 border-b border-white/20 w-full bg-white/10 p-2 rounded-t-lg mb-6">
              <TabsTrigger value="profile" className="text-white data-[state=active]:bg-white/20">
                <SettingsIcon className="h-4 w-4 mr-2" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="security" className="text-white data-[state=active]:bg-white/20">
                <Shield className="h-4 w-4 mr-2" />
                <span>Security</span>
              </TabsTrigger>
              <TabsTrigger value="billing" className="text-white data-[state=active]:bg-white/20">
                <CreditCard className="h-4 w-4 mr-2" />
                <span>Billing</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile">
              <Profile />
            </TabsContent>
            
            <TabsContent value="security">
              <div className="text-gray-300">
                Security settings coming soon
              </div>
            </TabsContent>
            
            <TabsContent value="billing">
              <div className="text-gray-300">
                Billing information coming soon
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
} 