import React, { useState } from 'react';
import { ExpertList } from '../components/experts/ExpertList';
import { ExpertProfile } from '../components/experts/ExpertProfile';
import { ExpertFilters } from '../components/experts/ExpertFilters';
import { Search, Filter, Users, MessageSquare, Star, Globe } from 'lucide-react';
import type { Expert } from '../types/expert';

export function Experts() {
  const [selectedExpert, setSelectedExpert] = useState<Expert | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#29DDDA] text-transparent bg-clip-text">Expert Network</h1>
            <p className="mt-2 text-gray-300">
              Connect with industry experts and get personalized guidance
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="search"
                placeholder="Search experts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300/20 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
            <button 
              className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg transform transition-all duration-500"
              style={{
                backgroundImage: 'linear-gradient(to right, #b0c6ff -40%, #001945 5%, #DA22FF 180%)',
                border: '1px solid white',
                boxShadow: '0 0 20px #eee',
                backgroundSize: '200% auto',
              }}
            >
              <Filter className="h-5 w-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">100+</p>
                <p className="text-sm text-gray-300">Active Experts</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <MessageSquare className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">5K+</p>
                <p className="text-sm text-gray-300">Consultations</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <Star className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">4.8</p>
                <p className="text-sm text-gray-300">Average Rating</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-orange-500/10">
                <Globe className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">20+</p>
                <p className="text-sm text-gray-300">Countries</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
          <ExpertList onExpertClick={setSelectedExpert} searchQuery={searchQuery} />
        </div>

        {selectedExpert && (
          <ExpertProfile expert={selectedExpert} onClose={() => setSelectedExpert(null)} />
        )}
      </div>
    </div>
  );
}