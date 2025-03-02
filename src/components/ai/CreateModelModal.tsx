import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateModelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (modelData: any) => void;
}

export function CreateModelModal({ isOpen, onClose, onSubmit }: CreateModelModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'gpt-3.5-turbo',
    framework: 'openai',
    description: '',
    parameters: {
      batchSize: 32,
      learningRate: 0.001,
      epochs: 10,
      maxTokens: 512
    }
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl bg-gray-900 rounded-lg shadow-xl p-6 border border-white/20">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Create New Model</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Model Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-white/50 focus:border-transparent"
              placeholder="Enter model name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Model Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-white/50 focus:border-transparent"
            >
              <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
              <option value="bert">BERT</option>
              <option value="llama-2">Llama 2</option>
              <option value="custom">Custom Model</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Framework
            </label>
            <select
              value={formData.framework}
              onChange={(e) => setFormData({ ...formData, framework: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-white/50 focus:border-transparent"
            >
              <option value="openai">OpenAI</option>
              <option value="huggingface">Hugging Face</option>
              <option value="anthropic">Anthropic</option>
              <option value="meta">Meta AI</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-white/50 focus:border-transparent"
              rows={3}
              placeholder="Enter model description"
            />
          </div>

          <div>
            <h3 className="text-lg font-medium text-white mb-4">Training Parameters</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Batch Size
                </label>
                <input
                  type="number"
                  value={formData.parameters.batchSize}
                  onChange={(e) => setFormData({
                    ...formData,
                    parameters: {
                      ...formData.parameters,
                      batchSize: parseInt(e.target.value)
                    }
                  })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Learning Rate
                </label>
                <input
                  type="number"
                  value={formData.parameters.learningRate}
                  onChange={(e) => setFormData({
                    ...formData,
                    parameters: {
                      ...formData.parameters,
                      learningRate: parseFloat(e.target.value)
                    }
                  })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  step="0.001"
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Epochs
                </label>
                <input
                  type="number"
                  value={formData.parameters.epochs}
                  onChange={(e) => setFormData({
                    ...formData,
                    parameters: {
                      ...formData.parameters,
                      epochs: parseInt(e.target.value)
                    }
                  })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Max Tokens
                </label>
                <input
                  type="number"
                  value={formData.parameters.maxTokens}
                  onChange={(e) => setFormData({
                    ...formData,
                    parameters: {
                      ...formData.parameters,
                      maxTokens: parseInt(e.target.value)
                    }
                  })}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  min="1"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white rounded-lg transform transition-all duration-500"
              style={{
                backgroundImage: 'linear-gradient(to right, #b0c6ff -40%, #001945 5%, #DA22FF 180%)',
                border: '1px solid white',
                boxShadow: '0 0 20px #eee',
                backgroundSize: '200% auto',
              }}
            >
              Create Model
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 