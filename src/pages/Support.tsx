import React, { useState } from 'react';
import { TicketList } from '../components/support/TicketList';
import { NewTicketModal } from '../components/support/NewTicketModal';
import { TicketStats } from '../components/support/TicketStats';
import { TicketView } from '../components/support/TicketView';
import { TicketStatusFilter } from '../components/support/TicketStatusFilter';
import { Search, Plus } from 'lucide-react';
import type { Ticket, TicketStatus } from '../types/support';
import { TicketIcon, CheckCircle, Clock, Star } from 'lucide-react';

export function Support() {
  const [showNewTicketModal, setShowNewTicketModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<TicketStatus | null>(null);

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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#29DDDA] text-transparent bg-clip-text">Support Center</h1>
            <p className="mt-2 text-gray-300">
              Get help and track your support requests
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="search"
                placeholder="Search tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300/20 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowNewTicketModal(true)}
              className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg transform transition-all duration-500"
              style={{
                backgroundImage: 'linear-gradient(to right, #b0c6ff -40%, #001945 5%, #DA22FF 180%)',
                border: '1px solid white',
                boxShadow: '0 0 20px #eee',
                backgroundSize: '200% auto',
              }}
            >
              <Plus className="h-5 w-5" />
              <span>New Ticket</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <TicketIcon className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">150+</p>
                <p className="text-sm text-gray-300">Total Tickets</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">85%</p>
                <p className="text-sm text-gray-300">Resolution Rate</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <Clock className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">2h</p>
                <p className="text-sm text-gray-300">Avg. Response Time</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-orange-500/10">
                <Star className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">4.9</p>
                <p className="text-sm text-gray-300">Support Rating</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-white">Ticket Status</h2>
            <div className="flex space-x-2">
              {['all', 'open', 'in-progress', 'resolved'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status === 'all' ? null : status as TicketStatus)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    (status === 'all' && !statusFilter) || status === statusFilter
                      ? 'bg-white/20 text-white'
                      : 'text-gray-300 hover:bg-white/10'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <TicketList
            searchQuery={searchQuery}
            statusFilter={statusFilter}
            onTicketClick={setSelectedTicket}
          />
        </div>

        {showNewTicketModal && (
          <NewTicketModal onClose={() => setShowNewTicketModal(false)} />
        )}

        {selectedTicket && (
          <TicketView
            ticket={selectedTicket}
            onClose={() => setSelectedTicket(null)}
          />
        )}
      </div>
    </div>
  );
}