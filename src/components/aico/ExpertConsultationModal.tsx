import React, { useState, useEffect } from 'react';
import { 
  X, Users, RefreshCw, TrendingUp, Shield, Clock, Zap,
  BarChart2, Users2, Target, PieChart, LineChart,
  Building2, Network, Briefcase, DollarSign
} from 'lucide-react';
import type { Message } from '../../types/chat';

interface Expert {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  responseTime: string;
  executiveBackground?: string;
  industries?: string[];
  strategicFocus?: string[];
  peerNetwork?: {
    connections: number;
    roundtables: string[];
  };
  expertise?: {
    category: string;
    level: number;
  }[];
}

const MOCK_EXPERTS: Expert[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    specialty: 'AI & Machine Learning Strategy',
    rating: 4.9,
    responseTime: '< 2 hours',
    executiveBackground: 'Former CTO at Fortune 500 Tech Company',
    industries: ['Technology', 'Finance', 'Healthcare'],
    strategicFocus: ['Digital Transformation', 'AI Implementation', 'Innovation Strategy'],
    peerNetwork: {
      connections: 500,
      roundtables: ['AI Ethics Board', 'Digital Transformation Council']
    },
    expertise: [
      { category: 'ROI Analysis', level: 95 },
      { category: 'Competitive Strategy', level: 90 },
      { category: 'Stakeholder Management', level: 88 }
    ]
  },
  {
    id: '2',
    name: 'Mark Thompson',
    specialty: 'Business Process Optimization',
    rating: 4.8,
    responseTime: '< 4 hours',
    executiveBackground: 'Ex-COO at Global Consulting Firm',
    industries: ['Manufacturing', 'Retail', 'Supply Chain'],
    strategicFocus: ['Operational Excellence', 'Change Management', 'Cost Optimization'],
    peerNetwork: {
      connections: 450,
      roundtables: ['Operations Excellence Forum', 'Supply Chain Innovation']
    },
    expertise: [
      { category: 'Process Optimization', level: 95 },
      { category: 'Change Management', level: 92 },
      { category: 'Cost Analysis', level: 90 }
    ]
  },
  {
    id: '3',
    name: 'Dr. James Wilson',
    specialty: 'Data Analytics & Strategy',
    rating: 4.7,
    responseTime: '< 3 hours',
    executiveBackground: 'Former Chief Strategy Officer',
    industries: ['Banking', 'Insurance', 'Telecommunications'],
    strategicFocus: ['Strategic Planning', 'Market Analysis', 'Risk Management'],
    peerNetwork: {
      connections: 400,
      roundtables: ['Financial Strategy Council', 'Risk Management Forum']
    },
    expertise: [
      { category: 'Market Analysis', level: 94 },
      { category: 'Risk Assessment', level: 92 },
      { category: 'Strategic Planning', level: 90 }
    ]
  }
];

interface ExpertConsultationModalProps {
  conversation: Message[];
  onClose: () => void;
  onSubmit: (expertId: string, message: string) => void;
}

export function ExpertConsultationModal({ conversation, onClose, onSubmit }: ExpertConsultationModalProps) {
  const [selectedExpert, setSelectedExpert] = useState<string>('');
  const [consultationMessage, setConsultationMessage] = useState('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [consultationType, setConsultationType] = useState<'standard' | 'priority' | 'emergency'>('standard');
  const [activeTab, setActiveTab] = useState<'brief' | 'roi' | 'stakeholders' | 'competition'>('brief');

  useEffect(() => {
    generateSummary();
  }, []);

  const generateSummary = () => {
    setIsGeneratingSummary(true);
    
    const relevantMessages = conversation.slice(-5);
    
    const summary = `
Strategic Context:
${relevantMessages.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

Current Situation Analysis:
1. Business Challenges:
   - Immediate Concerns:
   - Operational Bottlenecks:
   - Market Pressures:

2. Stakeholder Analysis:
   - Key Decision Makers:
   - Affected Departments:
   - External Stakeholders:
   - Impact Assessment:

3. Industry & Competition:
   - Market Position:
   - Competitor Movements:
   - Industry Trends:
   - Opportunities & Threats:

4. ROI Expectations:
   - Expected Outcomes:
   - Success Metrics:
   - Timeline Milestones:
   - Resource Requirements:

Additional Context:
- Implementation Timeline:
- Budget Parameters:
- Risk Considerations:
- Compliance Requirements:

Specific Strategic Questions:
[Please list your key questions for expert consultation]
`.trim();

    setConsultationMessage(summary);
    setIsGeneratingSummary(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedExpert || !consultationMessage.trim()) return;
    onSubmit(selectedExpert, consultationMessage);
  };

  const renderExpertDetails = (expert: Expert) => (
    <div className="mt-4 p-4 bg-[#001945]/60 rounded-lg border border-white/10">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-white font-medium mb-2">Expertise Areas</h4>
          {expert.expertise?.map(({ category, level }) => (
            <div key={category} className="mb-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">{category}</span>
                <span className="text-[#29DDDA]">{level}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full mt-1">
                <div
                  className="h-full bg-[#29DDDA] rounded-full"
                  style={{ width: `${level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div>
          <h4 className="text-white font-medium mb-2">Executive Network</h4>
          <div className="space-y-2">
            <div className="flex items-center text-gray-300">
              <Network className="h-4 w-4 mr-2 text-[#29DDDA]" />
              <span>{expert.peerNetwork?.connections} peer connections</span>
            </div>
            <div className="space-y-1">
              {expert.peerNetwork?.roundtables.map((roundtable) => (
                <div key={roundtable} className="flex items-center text-sm text-gray-300">
                  <Users2 className="h-3 w-3 mr-2 text-[#29DDDA]" />
                  <span>{roundtable}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-[#001945] rounded-lg max-w-4xl w-full border border-white/20 shadow-xl my-8">
        <div className="p-6 max-h-[85vh] overflow-y-auto custom-scrollbar">
          <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#001945] z-10 py-2">
            <h2 className="text-xl font-semibold text-white">Executive Consultation Portal</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <style>
            {`
              .custom-scrollbar::-webkit-scrollbar {
                width: 8px;
              }
              .custom-scrollbar::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb {
                background: rgba(41, 221, 218, 0.5);
                border-radius: 4px;
              }
              .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                background: rgba(41, 221, 218, 0.7);
              }
            `}
          </style>

          <form onSubmit={handleSubmit}>
            {/* Consultation Type Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-white mb-4">Consultation Priority</h3>
              <div className="grid grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => setConsultationType('standard')}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    consultationType === 'standard' ? 'border-[#29DDDA] bg-[#001945]/80' : 'border-white/10'
                  }`}
                >
                  <Clock className="h-6 w-6 mb-2 text-[#29DDDA]" />
                  <h4 className="text-white font-medium">Standard</h4>
                  <p className="text-sm text-gray-300">24-48 hour response</p>
                </button>
                <button
                  type="button"
                  onClick={() => setConsultationType('priority')}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    consultationType === 'priority' ? 'border-yellow-400 bg-[#001945]/80' : 'border-white/10'
                  }`}
                >
                  <TrendingUp className="h-6 w-6 mb-2 text-yellow-400" />
                  <h4 className="text-white font-medium">Priority</h4>
                  <p className="text-sm text-gray-300">4-8 hour response</p>
                </button>
                <button
                  type="button"
                  onClick={() => setConsultationType('emergency')}
                  className={`p-4 rounded-lg border transition-all duration-200 ${
                    consultationType === 'emergency' ? 'border-red-400 bg-[#001945]/80' : 'border-white/10'
                  }`}
                >
                  <Zap className="h-6 w-6 mb-2 text-red-400" />
                  <h4 className="text-white font-medium">Emergency</h4>
                  <p className="text-sm text-gray-300">1-2 hour response</p>
                </button>
              </div>
            </div>

            {/* Expert Selection */}
            <div>
              <h3 className="text-lg font-medium text-white mb-4">Strategic Advisors</h3>
              <div className="grid gap-4">
                {MOCK_EXPERTS.map((expert) => (
                  <div key={expert.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedExpert(expert.id)}
                      className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                        selectedExpert === expert.id
                          ? 'border-[#29DDDA] bg-[#001945]/80'
                          : 'border-white/10 hover:border-white/20 bg-[#001945]/40'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 rounded-full bg-[#29DDDA]/10">
                          <Users className="h-6 w-6 text-[#29DDDA]" />
                        </div>
                        <div className="text-left">
                          <h4 className="text-white font-medium">{expert.name}</h4>
                          <p className="text-gray-300">{expert.specialty}</p>
                          <p className="text-sm text-[#29DDDA]">{expert.executiveBackground}</p>
                          <div className="mt-2 flex flex-wrap gap-2">
                            {expert.industries?.map((industry) => (
                              <span key={industry} className="text-xs px-2 py-1 rounded-full bg-white/10 text-gray-300">
                                {industry}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-[#29DDDA] font-medium">{expert.rating}</div>
                        <div className="text-gray-300">{expert.responseTime}</div>
                        <Shield className="h-5 w-5 text-[#29DDDA] ml-auto mt-2" />
                      </div>
                    </button>
                    {selectedExpert === expert.id && renderExpertDetails(expert)}
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Brief Tabs */}
            <div className="mt-6">
              <div className="flex space-x-4 mb-4">
                <button
                  type="button"
                  onClick={() => setActiveTab('brief')}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                    activeTab === 'brief' ? 'bg-[#29DDDA]/20 text-[#29DDDA]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Briefcase className="h-4 w-4 mr-2" />
                  Strategic Brief
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('roi')}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                    activeTab === 'roi' ? 'bg-[#29DDDA]/20 text-[#29DDDA]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  ROI Analysis
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('stakeholders')}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                    activeTab === 'stakeholders' ? 'bg-[#29DDDA]/20 text-[#29DDDA]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Users2 className="h-4 w-4 mr-2" />
                  Stakeholders
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('competition')}
                  className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                    activeTab === 'competition' ? 'bg-[#29DDDA]/20 text-[#29DDDA]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Target className="h-4 w-4 mr-2" />
                  Competition
                </button>
              </div>

              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-white">
                  {activeTab === 'brief' && 'Strategic Brief'}
                  {activeTab === 'roi' && 'ROI Analysis'}
                  {activeTab === 'stakeholders' && 'Stakeholder Impact'}
                  {activeTab === 'competition' && 'Competitive Analysis'}
                </label>
                <button
                  type="button"
                  onClick={generateSummary}
                  className="flex items-center text-sm text-[#29DDDA] hover:text-[#16FFBB] transition-colors"
                >
                  <RefreshCw className={`h-4 w-4 mr-1 ${isGeneratingSummary ? 'animate-spin' : ''}`} />
                  Regenerate Analysis
                </button>
              </div>
              <textarea
                value={consultationMessage}
                onChange={(e) => setConsultationMessage(e.target.value)}
                placeholder="Outline your strategic objectives and requirements..."
                rows={12}
                className="w-full px-3 py-2 bg-[#001945]/40 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-[#29DDDA] focus:border-transparent"
                required
              />
              <p className="mt-2 text-sm text-gray-400">
                Your analysis has been pre-structured with key strategic elements. Please review and customize as needed.
              </p>
            </div>

            <div className="mt-6 flex justify-between items-center sticky bottom-0 bg-[#001945] py-4 border-t border-white/10">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-[#29DDDA]" />
                <span className="text-sm text-gray-300">Enterprise-grade security & confidentiality</span>
              </div>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedExpert || !consultationMessage.trim()}
                  className="flex items-center gap-2 px-6 py-2 text-white rounded-lg transform transition-all duration-500 disabled:opacity-50"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #29DDDA -40%, #001945 5%, #16FFBB 180%)',
                    border: '1px solid white',
                    boxShadow: '0 0 20px #eee',
                    backgroundSize: '200% auto',
                  }}
                >
                  <span>Request Strategic Consultation</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 