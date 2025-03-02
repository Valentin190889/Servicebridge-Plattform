import React from 'react';
import { AlertCircle, Clock, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import type { Ticket, TicketStatus } from '../../types/support';

interface TicketListProps {
  searchQuery: string;
  statusFilter: TicketStatus | null;
  onTicketClick: (ticket: Ticket) => void;
}

const mockTickets: Ticket[] = [
  {
    id: '1',
    title: 'Integration Issue with API',
    description: 'Having trouble connecting to the API endpoint. The connection keeps timing out after multiple attempts.',
    type: 'technical',
    status: 'open',
    priority: 'high',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    userId: '1',
    comments: [
      {
        id: '1',
        content: 'We are investigating the issue. Could you please provide your API credentials?',
        userId: 'support-1',
        createdAt: new Date().toISOString()
      }
    ]
  },
  {
    id: '2',
    title: 'Billing Inquiry',
    description: 'Need clarification on the latest invoice charges.',
    type: 'billing',
    status: 'in-progress',
    priority: 'medium',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    userId: '1',
    comments: []
  },
  {
    id: '3',
    title: 'Feature Request: Dark Mode',
    description: 'Would like to request dark mode support for the dashboard.',
    type: 'feature',
    status: 'resolved',
    priority: 'low',
    createdAt: new Date(Date.now() - 172800000).toISOString(),
    updatedAt: new Date(Date.now() - 86400000).toISOString(),
    userId: '1',
    comments: []
  }
];

export function TicketList({ searchQuery, statusFilter, onTicketClick }: TicketListProps) {
  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = 
      ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter ? ticket.status === statusFilter : true;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {filteredTickets.map((ticket) => (
        <div
          key={ticket.id}
          className="bg-white dark:bg-dark-800 rounded-lg p-6 border border-gray-200 dark:border-dark-700 hover:border-primary-500 transition-colors cursor-pointer"
          onClick={() => onTicketClick(ticket)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {ticket.title}
                </h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  ticket.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                  ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                  'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                }`}>
                  {ticket.priority}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  ticket.status === 'open' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                  ticket.status === 'in-progress' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                  ticket.status === 'resolved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                  'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
                }`}>
                  {ticket.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-400">{ticket.description}</p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {format(new Date(ticket.createdAt), 'MMM d, yyyy')}
            </span>
            <span className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              {ticket.comments?.length || 0} comments
            </span>
            {ticket.priority === 'urgent' && (
              <span className="flex items-center text-red-500">
                <AlertCircle className="h-4 w-4 mr-1" />
                Urgent
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}