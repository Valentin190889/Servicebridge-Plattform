import React from 'react';
import { Plus } from 'lucide-react';

export function NewTicketButton() {
  return (
    <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
      <Plus className="h-4 w-4" />
      <span>New Ticket</span>
    </button>
  );
}