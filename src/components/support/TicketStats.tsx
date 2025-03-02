import React from 'react';
import { AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';

export function TicketStats() {
  const stats = [
    { label: 'Open', value: 12, icon: AlertCircle, color: 'text-blue-400' },
    { label: 'In Progress', value: 5, icon: Clock, color: 'text-purple-400' },
    { label: 'Resolved', value: 8, icon: CheckCircle, color: 'text-green-400' },
    { label: 'Closed', value: 3, icon: XCircle, color: 'text-gray-400' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-dark-800 rounded-lg p-6 border border-dark-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="mt-1 text-2xl font-semibold text-white">{stat.value}</p>
            </div>
            <stat.icon className={`h-8 w-8 ${stat.color}`} />
          </div>
        </div>
      ))}
    </div>
  );
}