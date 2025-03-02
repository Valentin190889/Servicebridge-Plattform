import React, { useState } from 'react';
import { Filter, Check } from 'lucide-react';
import type { TicketStatus } from '../../types/support';

interface TicketStatusFilterProps {
  onFilterChange: (status: TicketStatus | null) => void;
}

export function TicketStatusFilter({ onFilterChange }: TicketStatusFilterProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus | null>(null);

  const statuses: { value: TicketStatus; label: string }[] = [
    { value: 'open', label: 'Open' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'resolved', label: 'Resolved' },
    { value: 'closed', label: 'Closed' }
  ];

  const handleStatusChange = (status: TicketStatus | null) => {
    setSelectedStatus(status);
    onFilterChange(status);
    setShowFilters(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-dark-600 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-700 text-gray-700 dark:text-gray-300"
      >
        <Filter className="h-5 w-5" />
        <span>{selectedStatus ? `Status: ${selectedStatus}` : 'Filter'}</span>
      </button>

      {showFilters && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-dark-800 rounded-lg shadow-lg border border-gray-200 dark:border-dark-700 z-10">
          <div className="p-2">
            <button
              onClick={() => handleStatusChange(null)}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-dark-700 rounded-md flex items-center justify-between"
            >
              <span className="text-gray-700 dark:text-gray-300">All Tickets</span>
              {selectedStatus === null && (
                <Check className="h-4 w-4 text-primary-600" />
              )}
            </button>
            {statuses.map((status) => (
              <button
                key={status.value}
                onClick={() => handleStatusChange(status.value)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-dark-700 rounded-md flex items-center justify-between"
              >
                <span className="text-gray-700 dark:text-gray-300">{status.label}</span>
                {selectedStatus === status.value && (
                  <Check className="h-4 w-4 text-primary-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}