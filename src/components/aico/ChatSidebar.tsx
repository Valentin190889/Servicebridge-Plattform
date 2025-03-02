import React, { useState, useEffect } from 'react';
import { MessageSquare, Settings, Search, Clock, Trash2, Plus } from 'lucide-react';
import { ChatSettings } from './ChatSettings';

interface Chat {
  id: string;
  title: string;
  timestamp: string;
  preview?: string;
}

interface ChatSidebarProps {
  onSelectChat: (chatId: string) => void;
  onNewChat?: () => void;
}

export function ChatSidebar({ onSelectChat, onNewChat }: ChatSidebarProps) {
  const [showSettings, setShowSettings] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentChats, setRecentChats] = useState<Chat[]>([]);
  const [filteredChats, setFilteredChats] = useState<Chat[]>([]);

  // Load chats from localStorage on component mount
  useEffect(() => {
    const savedChats = localStorage.getItem('recentChats');
    if (savedChats) {
      setRecentChats(JSON.parse(savedChats));
    }
  }, []);

  // Save chats to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('recentChats', JSON.stringify(recentChats));
  }, [recentChats]);

  // Filter chats based on search query
  useEffect(() => {
    const filtered = recentChats.filter(chat =>
      chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.preview?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredChats(filtered);
  }, [searchQuery, recentChats]);

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this chat?')) {
      setRecentChats(prev => prev.filter(chat => chat.id !== chatId));
    }
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all chat history? This action cannot be undone.')) {
      setRecentChats([]);
      localStorage.removeItem('recentChats');
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      <div className="p-4 border-b theme-border">
        <button
          onClick={onNewChat}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 mb-4 text-white rounded-lg transform transition-all duration-500"
          style={{
            backgroundImage: 'linear-gradient(to right, #b0c6ff -40%, #001945 5%, #DA22FF 180%)',
            border: '1px solid white',
            boxShadow: '0 0 20px #eee',
            backgroundSize: '200% auto',
          }}
        >
          <Plus className="h-5 w-5" />
          <span>New Chat</span>
        </button>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="search"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border theme-border rounded-lg bg-black/20 text-white placeholder-gray-300 focus:ring-2 focus:ring-white/50 focus:border-transparent"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2">
          <h2 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            Recent Chats
          </h2>
        </div>
        <div className="space-y-1">
          {filteredChats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className="flex items-center px-4 py-3 hover:bg-black/20 group cursor-pointer"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-start space-x-3">
                  <MessageSquare className="h-5 w-5 text-gray-300" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-white truncate">
                      {chat.title}
                    </p>
                    <div className="flex items-center mt-1">
                      <Clock className="h-4 w-4 text-gray-300 mr-1" />
                      <p className="text-xs text-gray-300">
                        {new Date(chat.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                    {chat.preview && (
                      <p className="text-xs text-gray-400 mt-1 truncate">
                        {chat.preview}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div 
                className="p-1 opacity-0 group-hover:opacity-100 hover:bg-black/20 rounded transition-opacity cursor-pointer"
                onClick={(e) => handleDeleteChat(chat.id, e)}
              >
                <Trash2 className="h-4 w-4 text-gray-300 hover:text-red-500" />
              </div>
            </div>
          ))}
          {filteredChats.length === 0 && searchQuery && (
            <div className="px-4 py-3 text-sm text-gray-400">
              No chats found matching "{searchQuery}"
            </div>
          )}
          {filteredChats.length === 0 && !searchQuery && (
            <div className="px-4 py-3 text-sm text-gray-400">
              No recent chats
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t theme-border">
        <div 
          onClick={() => setShowSettings(true)}
          className="flex items-center space-x-2 text-gray-300 hover:text-white w-full px-3 py-2 rounded-lg hover:bg-black/20 cursor-pointer"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </div>
      </div>

      {showSettings && (
        <ChatSettings
          onClose={() => setShowSettings(false)}
          onClearHistory={handleClearHistory}
        />
      )}
    </div>
  );
}