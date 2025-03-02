import React, { useEffect, useRef } from 'react';
import { User } from 'lucide-react';
import type { Message } from '../../types/chat';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '../../contexts/AuthContext';

interface ChatWindowProps {
  messages: Message[];
}

export function ChatWindow({ messages }: ChatWindowProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-transparent">
      {messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="bg-black/30 backdrop-blur-sm rounded-lg p-8 shadow-lg max-w-md border border-white/20">
            <img 
              src="/aico.webp" 
              alt="AiCo Assistant" 
              className="h-16 w-16 rounded-full mx-auto mb-4"
            />
            <h2 className="text-xl font-semibold text-white mb-2">
              How can I help you today?
            </h2>
            <p className="text-gray-300">
              I'm your AI assistant, ready to help with business analysis, strategy planning, and more.
            </p>
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-start space-x-3 ${
              message.role === 'assistant' ? 'bg-black/30 backdrop-blur-sm border border-white/20' : ''
            } p-4 rounded-lg`}
          >
            <div className={`flex-shrink-0 rounded-full ${
              message.role === 'assistant' 
                ? '' 
                : 'bg-black/50 p-2'
            }`}>
              {message.role === 'assistant' ? (
                <img 
                  src="/aico.webp" 
                  alt="AiCo Assistant" 
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <div className="h-10 w-10 flex items-center justify-center">
                  {user?.avatarUrl ? (
                    <img 
                      src={user.avatarUrl} 
                      alt={user.name} 
                      className="h-full w-full rounded-full"
                    />
                  ) : (
                    <User className="h-6 w-6 text-gray-300" />
                  )}
                </div>
              )}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-medium text-white">
                  {message.role === 'assistant' ? 'AI Assistant' : user?.name || 'You'}
                </span>
                <span className="text-xs text-gray-300">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <div className="prose prose-sm prose-invert max-w-none">
                <ReactMarkdown>{message.content}</ReactMarkdown>
              </div>
            </div>
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}