import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Trash2, Globe, Bot, Moon, Sun } from 'lucide-react';

interface ChatSettingsProps {
  onClose: () => void;
  onClearHistory: () => void;
}

export function ChatSettings({ onClose, onClearHistory }: ChatSettingsProps) {
  const [language, setLanguage] = useState(() => 
    localStorage.getItem('chatLanguage') || 'en'
  );
  const [consultantType, setConsultantType] = useState(() =>
    localStorage.getItem('consultantType') || 'business'
  );
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('chatTheme') || 'dark'
  );

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'de', name: 'German' },
    { code: 'fr', name: 'French' },
    { code: 'es', name: 'Spanish' }
  ];

  const consultantTypes = [
    { id: 'business', name: 'Business Strategist', description: 'Focuses on business strategy and growth' },
    { id: 'technical', name: 'Technical Advisor', description: 'Specializes in technical implementation and architecture' },
    { id: 'financial', name: 'Financial Analyst', description: 'Expert in financial planning and analysis' },
    { id: 'marketing', name: 'Marketing Consultant', description: 'Focuses on marketing strategy and growth' }
  ];

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('chatLanguage', language);
    localStorage.setItem('consultantType', consultantType);
    localStorage.setItem('chatTheme', theme);
  }, [language, consultantType, theme]);

  const handleSave = () => {
    // Additional save logic if needed
    onClose();
  };

  const modalContent = (
    <div 
      className="fixed inset-0 flex items-center justify-center p-4" 
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        isolation: 'isolate'
      }}
    >
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={onClose}
        style={{ position: 'fixed', zIndex: 99999 }}
      />
      <div 
        className="relative bg-[#1a1a1a] rounded-lg max-w-md w-full border border-white/20"
        style={{ zIndex: 100000 }}
      >
        <div className="flex justify-between items-center p-6 border-b border-white/20">
          <h2 className="text-xl font-semibold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Language Settings */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4" />
                <span>Language</span>
              </div>
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 bg-black/50 border border-white/20 rounded-lg focus:ring-2 focus:ring-white/50 focus:border-transparent text-white"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          {/* Consultant Type */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <div className="flex items-center space-x-2">
                <Bot className="h-4 w-4" />
                <span>Consultant Type</span>
              </div>
            </label>
            <div className="space-y-2">
              {consultantTypes.map((type) => (
                <label
                  key={type.id}
                  className="flex items-start p-3 border border-white/20 rounded-lg cursor-pointer hover:bg-black/50"
                >
                  <input
                    type="radio"
                    name="consultantType"
                    value={type.id}
                    checked={consultantType === type.id}
                    onChange={(e) => setConsultantType(e.target.value)}
                    className="mt-1 text-[#29DDDA] focus:ring-[#29DDDA] bg-black/50"
                  />
                  <div className="ml-3">
                    <div className="text-sm font-medium text-white">
                      {type.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {type.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Theme Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Theme
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTheme('dark')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                  theme === 'dark'
                    ? 'border-[#29DDDA] text-[#29DDDA] bg-[#29DDDA]/10'
                    : 'border-white/20 text-gray-300 hover:bg-black/50'
                }`}
              >
                <Moon className="h-4 w-4" />
                <span>Dark</span>
              </button>
              <button
                onClick={() => setTheme('light')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                  theme === 'light'
                    ? 'border-[#29DDDA] text-[#29DDDA] bg-[#29DDDA]/10'
                    : 'border-white/20 text-gray-300 hover:bg-black/50'
                }`}
              >
                <Sun className="h-4 w-4" />
                <span>Light</span>
              </button>
            </div>
          </div>

          {/* Clear History */}
          <div className="pt-4 border-t border-white/20">
            <button
              onClick={onClearHistory}
              className="flex items-center space-x-2 text-red-400 hover:text-red-300"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear Chat History</span>
            </button>
          </div>
        </div>

        <div className="flex justify-end space-x-4 p-6 border-t border-white/20">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-300 hover:bg-black/50 rounded-md border border-white/20"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white rounded-md"
            style={{
              backgroundImage: 'linear-gradient(to right, #b0c6ff -40%, #001945 5%, #DA22FF 180%)',
              border: '1px solid white',
              backgroundSize: '200% auto',
            }}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}