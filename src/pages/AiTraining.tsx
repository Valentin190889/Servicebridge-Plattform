import React, { useState } from 'react';
import { Search, Filter, Plus, Brain, Database, Activity, Settings, Gauge, FileText } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { CreateModelModal } from '../components/ai/CreateModelModal';
import { DatasetUpload } from '../components/ai/DatasetUpload';

type Tab = 'models' | 'datasets' | 'training' | 'monitoring' | 'settings';

export function AiTraining() {
  const [activeTab, setActiveTab] = useState<Tab>('models');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModelOpen, setIsCreateModelOpen] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const handleCreateModel = (modelData: any) => {
    // TODO: Implement model creation logic
    console.log('Creating model:', modelData);
  };

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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#29DDDA] text-transparent bg-clip-text">AI Training</h1>
            <p className="mt-2 text-gray-300">
              Train and manage your custom AI models
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="search"
                placeholder="Search models and datasets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300/20 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
            <button 
              onClick={() => setIsCreateModelOpen(true)}
              className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg transform transition-all duration-500"
              style={{
                backgroundImage: 'linear-gradient(to right, #b0c6ff -40%, #001945 5%, #DA22FF 180%)',
                border: '1px solid white',
                boxShadow: '0 0 20px #eee',
                backgroundSize: '200% auto',
              }}
            >
              <Plus className="h-5 w-5" />
              <span>New Model</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Brain className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">12</p>
                <p className="text-sm text-gray-300">Active Models</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <Database className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">25</p>
                <p className="text-sm text-gray-300">Datasets</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <Activity className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">98.5%</p>
                <p className="text-sm text-gray-300">Avg. Accuracy</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-orange-500/10">
                <Gauge className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">3</p>
                <p className="text-sm text-gray-300">Training Jobs</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as Tab)} className="text-white">
            <TabsList className="flex space-x-2 border-b border-white/20 w-full bg-white/10 p-2 rounded-t-lg mb-6">
              <TabsTrigger value="models" className="text-white data-[state=active]:bg-white/20">
                <Brain className="h-4 w-4 mr-2" />
                <span>Models</span>
              </TabsTrigger>
              <TabsTrigger value="datasets" className="text-white data-[state=active]:bg-white/20">
                <Database className="h-4 w-4 mr-2" />
                <span>Datasets</span>
              </TabsTrigger>
              <TabsTrigger value="training" className="text-white data-[state=active]:bg-white/20">
                <Activity className="h-4 w-4 mr-2" />
                <span>Training</span>
              </TabsTrigger>
              <TabsTrigger value="monitoring" className="text-white data-[state=active]:bg-white/20">
                <Gauge className="h-4 w-4 mr-2" />
                <span>Monitoring</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-white data-[state=active]:bg-white/20">
                <Settings className="h-4 w-4 mr-2" />
                <span>Settings</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="models">
              <ModelsTab searchQuery={searchQuery} />
            </TabsContent>
            
            <TabsContent value="datasets">
              <DatasetsTab searchQuery={searchQuery} />
            </TabsContent>
            
            <TabsContent value="training">
              <TrainingTab />
            </TabsContent>

            <TabsContent value="monitoring">
              <MonitoringTab />
            </TabsContent>

            <TabsContent value="settings">
              <SettingsTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <CreateModelModal
        isOpen={isCreateModelOpen}
        onClose={() => setIsCreateModelOpen(false)}
        onSubmit={handleCreateModel}
      />

      {/* Upload Dataset Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowUploadModal(false)} />
          <div className="relative bg-[#1a1a1a] rounded-lg p-6 w-full max-w-2xl mx-4">
            <h2 className="text-2xl font-bold text-white mb-4">Upload Dataset</h2>
            <DatasetUpload 
              onUpload={async (files) => {
                // Handle file upload here
                console.log('Uploading files:', files);
                // Close modal after successful upload
                setShowUploadModal(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function ModelsTab({ searchQuery }: { searchQuery: string }) {
  const models = [
    {
      id: 1,
      name: 'Customer Service Bot',
      type: 'GPT-3.5 Fine-tuned',
      framework: 'OpenAI',
      status: 'Active',
      lastTrained: '2024-03-15',
      performance: '98.2%'
    },
    {
      id: 2,
      name: 'Document Classifier',
      type: 'Custom BERT',
      framework: 'Hugging Face',
      status: 'Training',
      lastTrained: '2024-03-14',
      performance: '95.7%'
    },
    {
      id: 3,
      name: 'Sentiment Analyzer',
      type: 'Llama 2',
      framework: 'Meta AI',
      status: 'Inactive',
      lastTrained: '2024-03-10',
      performance: '94.3%'
    }
  ];

  const filteredModels = models.filter(model =>
    model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    model.framework.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-white/20">
            <th className="text-left py-3 px-4 text-gray-300">Name</th>
            <th className="text-left py-3 px-4 text-gray-300">Type</th>
            <th className="text-left py-3 px-4 text-gray-300">Framework</th>
            <th className="text-left py-3 px-4 text-gray-300">Status</th>
            <th className="text-left py-3 px-4 text-gray-300">Last Trained</th>
            <th className="text-left py-3 px-4 text-gray-300">Performance</th>
            <th className="text-left py-3 px-4 text-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredModels.map(model => (
            <tr key={model.id} className="border-b border-white/10 hover:bg-white/5">
              <td className="py-3 px-4 text-white">{model.name}</td>
              <td className="py-3 px-4 text-gray-300">{model.type}</td>
              <td className="py-3 px-4 text-gray-300">{model.framework}</td>
              <td className="py-3 px-4">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  model.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                  model.status === 'Training' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-gray-500/20 text-gray-400'
                }`}>
                  {model.status}
                </span>
              </td>
              <td className="py-3 px-4 text-gray-300">{model.lastTrained}</td>
              <td className="py-3 px-4 text-gray-300">{model.performance}</td>
              <td className="py-3 px-4">
                <div className="flex space-x-2">
                  <button className="text-blue-400 hover:text-blue-300">Edit</button>
                  <button className="text-red-400 hover:text-red-300">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DatasetsTab({ searchQuery }: { searchQuery: string }) {
  const mockDatasets = [
    {
      id: '1',
      name: 'Customer Support Conversations',
      type: 'CSV',
      size: '2.5GB',
      records: '1.2M',
      lastUpdated: '2024-03-15',
      status: 'processed'
    },
    {
      id: '2',
      name: 'Product Reviews Dataset',
      type: 'JSON',
      size: '1.8GB',
      records: '850K',
      lastUpdated: '2024-03-14',
      status: 'processing'
    },
    {
      id: '3',
      name: 'Technical Documentation',
      type: 'TXT',
      size: '500MB',
      records: '25K',
      lastUpdated: '2024-03-13',
      status: 'processed'
    }
  ].filter(dataset => 
    dataset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    dataset.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Type</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Size</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Records</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Last Updated</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Status</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockDatasets.map(dataset => (
              <tr key={dataset.id} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <span className="text-white">{dataset.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-300">{dataset.type}</td>
                <td className="py-3 px-4 text-gray-300">{dataset.size}</td>
                <td className="py-3 px-4 text-gray-300">{dataset.records}</td>
                <td className="py-3 px-4 text-gray-300">{dataset.lastUpdated}</td>
                <td className="py-3 px-4">
                  <span className={`
                    px-2 py-1 rounded-full text-xs
                    ${dataset.status === 'processed' 
                      ? 'bg-green-500/10 text-green-500' 
                      : 'bg-yellow-500/10 text-yellow-500'
                    }
                  `}>
                    {dataset.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button className="text-[#29DDDA] hover:text-[#29DDDA]/80 text-sm">
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TrainingTab() {
  const trainingJobs = [
    {
      id: 1,
      modelName: 'Customer Service Bot',
      dataset: 'Support Tickets',
      progress: 75,
      status: 'Training',
      startTime: '2024-03-15 10:30 AM',
      eta: '2 hours'
    },
    {
      id: 2,
      modelName: 'Document Classifier',
      dataset: 'Product Reviews',
      progress: 100,
      status: 'Completed',
      startTime: '2024-03-14 02:15 PM',
      eta: '-'
    },
    {
      id: 3,
      modelName: 'Sentiment Analyzer',
      dataset: 'Chat Transcripts',
      progress: 0,
      status: 'Queued',
      startTime: '-',
      eta: '4 hours'
    }
  ];

  return (
    <div>
      <h3 className="text-xl font-semibold text-white mb-6">Active Training Jobs</h3>
      <div className="space-y-4">
        {trainingJobs.map(job => (
          <div key={job.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="text-white font-medium">{job.modelName}</h4>
                <p className="text-sm text-gray-400">Dataset: {job.dataset}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                job.status === 'Training' ? 'bg-blue-500/20 text-blue-400' :
                job.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {job.status}
              </span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2 mb-4">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${job.progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-gray-400">
              <span>Started: {job.startTime}</span>
              <span>ETA: {job.eta}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MonitoringTab() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-white mb-6">Performance Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h4 className="text-gray-300 mb-2">Average Response Time</h4>
            <p className="text-3xl font-bold text-white">245ms</p>
            <p className="text-sm text-green-400 mt-2">↓ 12% from last week</p>
          </div>
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h4 className="text-gray-300 mb-2">Success Rate</h4>
            <p className="text-3xl font-bold text-white">98.5%</p>
            <p className="text-sm text-green-400 mt-2">↑ 2.3% from last week</p>
          </div>
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <h4 className="text-gray-300 mb-2">Active Users</h4>
            <p className="text-3xl font-bold text-white">1,245</p>
            <p className="text-sm text-green-400 mt-2">↑ 15% from last week</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-6">Recent Errors</h3>
        <div className="bg-white/5 rounded-lg border border-white/10">
          <div className="p-4 border-b border-white/10">
            <p className="text-red-400">Rate Limit Exceeded</p>
            <p className="text-sm text-gray-400 mt-1">2024-03-15 11:23 AM</p>
          </div>
          <div className="p-4 border-b border-white/10">
            <p className="text-red-400">Invalid Input Format</p>
            <p className="text-sm text-gray-400 mt-1">2024-03-15 10:45 AM</p>
          </div>
          <div className="p-4">
            <p className="text-red-400">Model Timeout</p>
            <p className="text-sm text-gray-400 mt-1">2024-03-15 09:12 AM</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SettingsTab() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-xl font-semibold text-white mb-6">Model Settings</h3>
        <div className="space-y-4">
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <label className="block text-gray-300 mb-2">Default Framework</label>
            <select className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white">
              <option value="openai">OpenAI</option>
              <option value="huggingface">Hugging Face</option>
              <option value="anthropic">Anthropic</option>
              <option value="meta">Meta AI</option>
            </select>
          </div>
          
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <label className="block text-gray-300 mb-2">API Configuration</label>
            <input
              type="text"
              placeholder="API Key"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white mb-4"
            />
            <input
              type="text"
              placeholder="API Endpoint"
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-white mb-6">Training Parameters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <label className="block text-gray-300 mb-2">Batch Size</label>
            <input
              type="number"
              defaultValue={32}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <label className="block text-gray-300 mb-2">Learning Rate</label>
            <input
              type="number"
              defaultValue={0.001}
              step={0.001}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <label className="block text-gray-300 mb-2">Epochs</label>
            <input
              type="number"
              defaultValue={10}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
            />
          </div>
          <div className="bg-white/5 rounded-lg p-6 border border-white/10">
            <label className="block text-gray-300 mb-2">Max Tokens</label>
            <input
              type="number"
              defaultValue={512}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 