import React, { useState } from 'react';
import { X, Send, Paperclip, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';
import type { Ticket } from '../../types/support';

interface TicketViewProps {
  ticket: Ticket;
  onClose: () => void;
}

export function TicketView({ ticket, onClose }: TicketViewProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // Add comment logic here
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-dark-700">
          <div>
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {ticket.title}
              </h2>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                ticket.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                ticket.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
              }`}>
                {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                ticket.status === 'open' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                ticket.status === 'in-progress' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' :
                'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300'
              }`}>
                {ticket.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Created {format(new Date(ticket.createdAt), 'MMM d, yyyy')}
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-4">
              <p className="text-gray-700 dark:text-gray-300">{ticket.description}</p>
              {ticket.attachments && ticket.attachments.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Attachments
                  </h4>
                  <div className="space-y-2">
                    {ticket.attachments.map((attachment) => (
                      <a
                        key={attachment.id}
                        href={attachment.url}
                        className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400"
                      >
                        <Paperclip className="h-4 w-4" />
                        <span>{attachment.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {ticket.comments && ticket.comments.length > 0 && (
              <div className="space-y-4">
                {ticket.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="bg-white dark:bg-dark-800 rounded-lg p-4 border border-gray-200 dark:border-dark-700"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        Support Agent
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(comment.createdAt), 'MMM d, yyyy h:mm a')}
                      </span>
                    </div>
                    <p className="mt-2 text-gray-700 dark:text-gray-300">
                      {comment.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-dark-700 p-4">
          <form onSubmit={handleSubmitComment}>
            <div className="flex space-x-4">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-700 dark:border-dark-600 dark:text-white"
              />
              <button
                type="submit"
                disabled={!newComment.trim()}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}