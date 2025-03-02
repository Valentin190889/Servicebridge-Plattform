import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Plus, Search, Upload, Tag, FolderPlus, ArrowRight, Users } from 'lucide-react';
import { ChatWindow } from '../components/aico/ChatWindow';
import { ChatSidebar } from '../components/aico/ChatSidebar';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import type { Message, MessageType, ChatSession } from '../types/chat';
import type { Project, ProjectCreateInput, Task } from '../types/workspace';
import { ExpertConsultationModal } from '../components/aico/ExpertConsultationModal';
import { OnboardingModal } from '../components/aico/OnboardingModal';

// Mock AI responses for different message types
const MOCK_AI_RESPONSES = {
  text: [
    "I understand your business challenge. Let me analyze that for you...",
    "Based on my analysis, here are some recommendations...",
    "I can help you optimize that process. Here's what we can do...",
    "Let me break down this problem into manageable steps..."
  ],
  file: [
    "I've received your file. Let me analyze its contents...",
    "I've processed your document. Here are my findings...",
    "Based on the uploaded file, I can suggest the following improvements..."
  ],
  project: [
    "I'll create a project based on our discussion. Here's what I've gathered...",
    "Let me organize this into a structured project plan...",
    "I've analyzed our conversation and created a project framework..."
  ]
};

// Mock recent conversations
const MOCK_RECENT_CHATS = [
  {
    id: '1',
    title: 'Process Optimization Strategy',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    preview: 'Here are my recommendations for optimizing your business processes...',
    messages: [
      {
        id: '1-1',
        content: 'How can I optimize my business processes for better efficiency?',
        role: 'user',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        type: 'text'
      },
      {
        id: '1-2',
        content: "I understand your business challenge. Let me analyze that for you. Based on best practices, here are several key areas we can focus on:\n\n1. Workflow Analysis\n- Document current processes\n- Identify bottlenecks\n- Map dependencies\n\n2. Automation Opportunities\n- Repetitive tasks\n- Data entry\n- Document processing\n\n3. Resource Allocation\n- Staff utilization\n- Tool effectiveness\n- Time management\n\nWould you like me to elaborate on any of these areas?",
        role: 'assistant',
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000 + 1000).toISOString(),
        type: 'text'
      }
    ]
  },
  {
    id: '2',
    title: 'Marketing Campaign Analysis',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    preview: 'Based on your campaign data, here are the key performance insights...',
    messages: [
      {
        id: '2-1',
        content: 'Can you analyze our recent marketing campaign performance?',
        role: 'user',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'text'
      },
      {
        id: '2-2',
        content: "I'll help you analyze your marketing campaign performance. Let's look at the key metrics:\n\n1. Engagement Metrics\n- Click-through rate: 3.2%\n- Conversion rate: 2.1%\n- Social shares: 450+\n\n2. ROI Analysis\n- Cost per acquisition: $24.50\n- Total revenue generated: $15,000\n- ROI: 225%\n\n3. Areas for Improvement\n- Email open rates\n- Mobile engagement\n- Landing page optimization\n\nWould you like a detailed breakdown of any specific area?",
        role: 'assistant',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 1000).toISOString(),
        type: 'text'
      }
    ]
  },
  {
    id: '3',
    title: 'Customer Service Improvement',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    preview: 'Here are strategies to enhance your customer service quality...',
    messages: [
      {
        id: '3-1',
        content: 'What are some ways we can improve our customer service?',
        role: 'user',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'text'
      },
      {
        id: '3-2',
        content: "I'll help you enhance your customer service. Here are key areas to focus on:\n\n1. Response Time\n- Implement 24/7 support\n- Set up automated responses\n- Establish SLA guidelines\n\n2. Quality Improvement\n- Staff training programs\n- Quality monitoring\n- Customer feedback loops\n\n3. Channel Optimization\n- Omnichannel support\n- Self-service options\n- Knowledge base development\n\nWould you like me to create a detailed implementation plan for any of these areas?",
        role: 'assistant',
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 1000).toISOString(),
        type: 'text'
      }
    ]
  }
];

const PREDEFINED_QUESTIONS = [
  { id: 'process', label: 'Process Optimization', question: 'How can I optimize my business processes?' },
  { id: 'analysis', label: 'Data Analysis', question: 'Can you analyze this data set for insights?' },
  { id: 'strategy', label: 'Strategy Planning', question: 'Help me create a strategic plan for my business.' },
  { id: 'automation', label: 'Automation', question: 'What tasks can be automated in my workflow?' },
  { id: 'challenges', label: 'Key Challenges', question: 'What are the top challenges I should focus on?' },
];

// Add industry-specific challenges mapping
const INDUSTRY_CHALLENGES = {
  technology: [
    'Rapid technological obsolescence and keeping pace with innovation',
    'Cybersecurity threats and data protection',
    'Talent acquisition and retention in a competitive market',
    'Digital transformation of legacy systems',
    'Balancing innovation with operational stability'
  ],
  finance: [
    'Regulatory compliance and evolving financial regulations',
    'Digital disruption and fintech competition',
    'Cybersecurity and fraud prevention',
    'Customer experience in digital banking',
    'Risk management in volatile markets'
  ],
  healthcare: [
    'Healthcare data security and privacy compliance',
    'Integration of digital health solutions',
    'Cost management and operational efficiency',
    'Patient experience and care quality',
    'Regulatory compliance and accreditation'
  ],
  manufacturing: [
    'Supply chain resilience and optimization',
    'Industry 4.0 implementation and automation',
    'Sustainability and environmental compliance',
    'Workforce skills gap and training',
    'Quality control and product consistency'
  ],
  retail: [
    'Omnichannel customer experience',
    'Supply chain optimization',
    'E-commerce integration and digital transformation',
    'Customer retention and loyalty',
    'Inventory management and forecasting'
  ],
  services: [
    'Service quality consistency',
    'Client acquisition and retention',
    'Digital transformation of services',
    'Talent management and development',
    'Market differentiation'
  ],
  energy: [
    'Sustainable energy transition',
    'Regulatory compliance and environmental standards',
    'Infrastructure modernization',
    'Operational efficiency and cost management',
    'Technology integration and smart grid implementation'
  ],
  education: [
    'Digital learning transformation',
    'Student engagement and retention',
    'Technology integration in education',
    'Resource allocation and budget management',
    'Quality of education and outcomes measurement'
  ],
  other: [
    'Digital transformation and innovation',
    'Operational efficiency and cost management',
    'Market competition and differentiation',
    'Talent management and development',
    'Customer experience and satisfaction'
  ]
};

const POSITION_SPECIFIC_FOCUS = {
  ceo: 'strategic',
  cto: 'technical',
  cfo: 'financial',
  coo: 'operational',
  vp: 'departmental',
  director: 'tactical',
  manager: 'team',
  other: 'general'
};

// Add function to generate challenges based on user profile
const generateChallenges = (profile: { position: string; industry: string; region: string }) => {
  const challenges = INDUSTRY_CHALLENGES[profile.industry as keyof typeof INDUSTRY_CHALLENGES] || INDUSTRY_CHALLENGES.other;
  const focus = POSITION_SPECIFIC_FOCUS[profile.position as keyof typeof POSITION_SPECIFIC_FOCUS] || POSITION_SPECIFIC_FOCUS.other;
  
  const response = `Based on your profile as a ${profile.position.toUpperCase()} in the ${profile.industry} industry, here are the top 5 key challenges you should focus on:

${challenges.map((challenge, index) => `${index + 1}. ${challenge}`).join('\n')}

These challenges are particularly relevant for your ${focus} role and the current market conditions in ${profile.region}. Would you like to discuss any of these challenges in detail?`;

  return response;
};

const createProjectFromSummary = (summary: string): ProjectCreateInput => {
  // Extract key information from the summary
  const lines = summary.split('\n');
  const objective = lines[0] || 'New Project';
  
  // Extract timeline if mentioned (e.g., "2 weeks", "3 months")
  const timelineMatch = summary.match(/(\d+)\s*(day|week|month|year)s?/i);
  const timeValue = timelineMatch?.[1];
  const timeUnit = timelineMatch?.[2] as 'day' | 'week' | 'month' | 'year' | undefined;
  
  const dueDate = (timeValue && timeUnit)
    ? new Date(Date.now() + parseInt(timeValue) * {
        day: 24 * 60 * 60 * 1000,
        week: 7 * 24 * 60 * 60 * 1000,
        month: 30 * 24 * 60 * 60 * 1000,
        year: 365 * 24 * 60 * 60 * 1000
      }[timeUnit]).toISOString()
    : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // Default to 30 days

  // Generate initial tasks based on the summary
  const tasks = generateTasksFromSummary(summary);

  return {
    name: objective,
    description: summary,
    dueDate: dueDate.split('T')[0],
    priority: determinePriority(summary),
    initialTasks: tasks
  };
};

const generateTasksFromSummary = (summary: string): Array<Partial<Task>> => {
  // Extract potential tasks from the summary
  const tasks: Array<Partial<Task>> = [];
  
  // Look for bullet points, numbered lists, or key phrases
  const taskIndicators = [
    ...summary.matchAll(/[•\-\*]\s*([^.\n]+)/g), // Bullet points
    ...summary.matchAll(/\d+\.\s*([^.\n]+)/g), // Numbered lists
    ...summary.matchAll(/need to ([^.\n]+)/gi), // "need to" phrases
    ...summary.matchAll(/should ([^.\n]+)/gi), // "should" phrases
    ...summary.matchAll(/must ([^.\n]+)/gi), // "must" phrases
  ];

  // Convert matches to tasks
  taskIndicators.forEach(match => {
    if (match[1]) {
      tasks.push({
        title: match[1].trim(),
        description: `Auto-generated from summary: "${match[0].trim()}"`,
        status: 'todo',
        priority: 'medium'
      });
    }
  });

  // Add default tasks if none were extracted
  if (tasks.length === 0) {
    tasks.push({
      title: 'Review project objectives',
      description: 'Review and validate the project objectives based on the initial summary.',
      status: 'todo',
      priority: 'high'
    });
  }

  return tasks;
};

const determinePriority = (summary: string): 'low' | 'medium' | 'high' => {
  const urgentTerms = ['urgent', 'asap', 'critical', 'immediate', 'emergency'];
  const lowPriorityTerms = ['when possible', 'if time permits', 'optional', 'nice to have'];
  
  const summaryLower = summary.toLowerCase();
  
  if (urgentTerms.some(term => summaryLower.includes(term))) {
    return 'high';
  }
  
  if (lowPriorityTerms.some(term => summaryLower.includes(term))) {
    return 'low';
  }
  
  return 'medium';
};

export function AiCo() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [showTags, setShowTags] = useState(false);
  const [projectCreated, setProjectCreated] = useState(false);
  const [projectData, setProjectData] = useState<ProjectCreateInput | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [showExpertModal, setShowExpertModal] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState<Message[]>([]);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [userProfile, setUserProfile] = useState<{
    position: string;
    region: string;
    industry: string;
  } | null>(null);

  // Initialize mock data
  useEffect(() => {
    const savedChats = localStorage.getItem('recentChats');
    if (!savedChats) {
      localStorage.setItem('recentChats', JSON.stringify(MOCK_RECENT_CHATS));
    }
  }, []);

  // Save current chat when messages change
  useEffect(() => {
    if (messages.length > 0 && currentChatId) {
      const recentChats = JSON.parse(localStorage.getItem('recentChats') || '[]');
      const chatIndex = recentChats.findIndex((chat: any) => chat.id === currentChatId);
      
      const chatTitle = messages[0].content.slice(0, 50) + (messages[0].content.length > 50 ? '...' : '');
      const updatedChat = {
        id: currentChatId,
        title: chatTitle,
        timestamp: new Date().toISOString(),
        preview: messages[messages.length - 1].content.slice(0, 100),
        messages: messages
      };

      if (chatIndex !== -1) {
        recentChats[chatIndex] = updatedChat;
      } else {
        recentChats.unshift(updatedChat);
      }

      localStorage.setItem('recentChats', JSON.stringify(recentChats));
    }
  }, [messages, currentChatId]);

  const handleNewChat = () => {
    setMessages([]);
    setCurrentChatId(Date.now().toString());
    setInputValue('');
    setShowTags(false);
    setProjectCreated(false);
    setProjectData(null);
  };

  const handleSelectChat = (chatId: string) => {
    const recentChats = JSON.parse(localStorage.getItem('recentChats') || '[]');
    const selectedChat = recentChats.find((chat: any) => chat.id === chatId);
    
    if (selectedChat) {
      setMessages(selectedChat.messages);
      setCurrentChatId(chatId);
      setInputValue('');
      setShowTags(false);
      setProjectCreated(false);
      setProjectData(null);
    }
  };

  // Initialize with a new chat ID when component mounts
  useEffect(() => {
    if (!currentChatId) {
      setCurrentChatId(Date.now().toString());
    }
  }, []);

  const getRandomResponse = (type: MessageType) => {
    const responses = MOCK_AI_RESPONSES[type as keyof typeof MOCK_AI_RESPONSES] || MOCK_AI_RESPONSES.text;
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const simulateAiResponse = (userMessage: Message) => {
    setTimeout(() => {
      // First, send a "thinking" message
      const thinkingMessage: Message = {
        id: Date.now().toString(),
        content: "Let me think about that...",
        role: 'assistant',
        timestamp: new Date().toISOString(),
        type: 'text',
      };
      setMessages(prev => [...prev, thinkingMessage]);

      // Then, after a delay, send the actual response
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: getRandomResponse(userMessage.type),
          role: 'assistant',
          timestamp: new Date().toISOString(),
          type: userMessage.type,
        };
        setMessages(prev => prev.filter(m => m.id !== thinkingMessage.id));
        setMessages(prev => [...prev, aiResponse]);
      }, 2000);
    }, 500);
  };

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date().toISOString(),
      type: 'text',
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
    setShowTags(false);

    // Check if this is a challenges request
    if (content === "What are the top challenges I should focus on?" && userProfile) {
      const challengesResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateChallenges(userProfile),
        role: 'assistant',
        timestamp: new Date().toISOString(),
        type: 'text',
      };
      setTimeout(() => {
        setMessages((prev) => [...prev, challengesResponse]);
      }, 1000);
    } else {
      simulateAiResponse(newMessage);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: `Uploaded file: ${file.name}`,
        role: 'user',
        timestamp: new Date().toISOString(),
        type: 'file',
        fileName: file.name,
      };
      setMessages((prev) => [...prev, newMessage]);
      simulateAiResponse(newMessage);
    }
  };

  const handleSummarizeAndCreateProject = () => {
    setProjectCreated(false);
    setProjectData(null);
    const summaryMessage: Message = {
      id: Date.now().toString(),
      content: "Please create a project based on our conversation.",
      role: 'user',
      timestamp: new Date().toISOString(),
      type: 'project',
    };

    setMessages(prev => [...prev, summaryMessage]);
    
    setTimeout(() => {
      const projectSummary = `Project Summary:
1. Objective: Business Process Optimization
2. Key Areas: Customer Service, Workflow Automation
3. Timeline: 3 months
4. Deliverables:
   - Process analysis report
   - Automation recommendations
   - Implementation roadmap
5. Expected Outcomes:
   - 30% efficiency improvement
   - Reduced response time
   - Enhanced customer satisfaction`;

      const projectMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: projectSummary,
        role: 'assistant',
        timestamp: new Date().toISOString(),
        type: 'project',
      };

      // Create project data
      const newProjectData = createProjectFromSummary(projectSummary);
      setProjectData(newProjectData);
      
      setMessages(prev => [...prev, projectMessage]);
      setProjectCreated(true);
    }, 2500);
  };

  const handleTransferToWorkspace = () => {
    if (!projectData) return;

    const transferMessage: Message = {
      id: Date.now().toString(),
      content: `Project "${projectData.name}" has been created in your workspace. Redirecting you there now...`,
      role: 'assistant',
      timestamp: new Date().toISOString(),
      type: 'text',
    };
    setMessages(prev => [...prev, transferMessage]);
    
    // Store project data in localStorage for workspace to pick up
    localStorage.setItem('newProject', JSON.stringify({
      ...projectData,
      id: Date.now().toString(),
      status: 'active',
      completedTasks: 0,
      totalTasks: projectData.initialTasks?.length || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));
    
    // Clear project data and reset state
    setProjectData(null);
    setProjectCreated(false);
    
    // Navigate to workspace after a short delay
    setTimeout(() => {
      navigate('/workspace');
    }, 2000);
  };

  const toggleRecording = () => {
    if (!isRecording) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          setIsRecording(true);
        })
        .catch((err) => {
          console.error('Error accessing microphone:', err);
        });
    } else {
      setIsRecording(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  const handleConsultExpert = () => {
    setSelectedConversation(messages);
    setShowExpertModal(true);
  };

  const handleExpertConsultation = (expertId: string, message: string) => {
    const consultationMessage: Message = {
      id: Date.now().toString(),
      content: `Consultation request sent to expert. They will review: "${message}"`,
      role: 'system',
      timestamp: new Date().toISOString(),
      type: 'expert',
    };

    setMessages(prev => [...prev, consultationMessage]);
    setShowExpertModal(false);

    // Simulate expert acknowledgment
    setTimeout(() => {
      const expertResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'll review your conversation and get back to you soon. You can continue chatting with AiCo in the meantime.",
        role: 'expert',
        timestamp: new Date().toISOString(),
        type: 'expert',
      };
      setMessages(prev => [...prev, expertResponse]);
    }, 1500);
  };

  useEffect(() => {
    // Check if user has completed onboarding
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      setUserProfile(JSON.parse(profile));
      setShowOnboarding(false);
    }
  }, []);

  const handleOnboardingComplete = (data: {
    position: string;
    region: string;
    industry: string;
  }) => {
    setUserProfile(data);
    localStorage.setItem('userProfile', JSON.stringify(data));
    setShowOnboarding(false);
  
    // Add a welcome message from AiCo
    const welcomeMessage = `Welcome to ServiceBridge AI! I see you're a ${data.position} in the ${data.industry} industry, operating in ${data.region}. I'll tailor my assistance to your specific needs and industry context. How can I help you today?`;
    
    setMessages(prev => [
      ...prev,
      {
        id: Date.now().toString(),
        role: 'assistant',
        content: welcomeMessage,
        timestamp: new Date().toISOString(),
        type: 'text'
      }
    ]);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("/Background_Theme_SAI.jpg")',
          filter: 'brightness(0.9)'
        }}
      />
      {/* Overlay for better content visibility */}
      <div className="fixed inset-0 bg-black/50" />

      <div className="relative z-10 max-w-7xl mx-auto py-8 px-4">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar with background */}
          <aside className="col-span-3 flex-none relative">
            <div className="absolute inset-0 bg-black/70 rounded-lg" />
            <div className="relative z-10 h-full border-r theme-border">
              <ChatSidebar onSelectChat={handleSelectChat} onNewChat={handleNewChat} />
            </div>
          </aside>
          
          {/* Main content area */}
          <div className="col-span-9 relative">
            <div className="bg-black/70 rounded-lg border border-white/20 overflow-hidden h-[calc(100vh-8rem)] flex flex-col">
              <div className="relative z-10 flex-1 overflow-y-auto p-4">
                <ChatWindow messages={messages} />
                <div className="sticky bottom-4 flex justify-center gap-4">
                  {projectCreated && (
                    <button
                      onClick={handleTransferToWorkspace}
                      className="flex items-center gap-2 px-6 py-3 text-white rounded-lg transform transition-all duration-500 animate-fade-in"
                      style={{
                        backgroundImage: 'linear-gradient(to right, #b0c6ff -40%, #001945 5%, #DA22FF 180%)',
                        border: '1px solid white',
                        boxShadow: '0 0 20px #eee',
                        backgroundSize: '200% auto',
                      }}
                    >
                      <span>Transfer to Workspace</span>
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  )}
                  {messages.length > 1 && !projectCreated && (
                    <div className="flex gap-2">
                      <button
                        onClick={handleSummarizeAndCreateProject}
                        className="flex items-center gap-2 px-6 py-3 text-white rounded-lg transform transition-all duration-500"
                        style={{
                          backgroundImage: 'linear-gradient(to right, #b0c6ff -40%, #001945 5%, #DA22FF 180%)',
                          border: '1px solid white',
                          boxShadow: '0 0 20px #eee',
                          backgroundSize: '200% auto',
                        }}
                      >
                        <span>Summarize & Create Project</span>
                        <ArrowRight className="h-5 w-5" />
                      </button>
                      <button
                        onClick={handleConsultExpert}
                        className="flex items-center gap-2 px-6 py-3 text-white rounded-lg transform transition-all duration-500"
                        style={{
                          backgroundImage: 'linear-gradient(to right, #29DDDA -40%, #001945 5%, #16FFBB 180%)',
                          border: '1px solid white',
                          boxShadow: '0 0 20px #eee',
                          backgroundSize: '200% auto',
                        }}
                      >
                        <Users className="h-5 w-5" />
                        <span>Consult Expert</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Predefined tags */}
              {showTags && (
                <div className="relative border-t border-white/20">
                  <div className="absolute inset-0 bg-black/70" />
                  <div className="relative z-10 p-2 flex flex-wrap gap-2">
                    {PREDEFINED_QUESTIONS.map((tag) => (
                      <button
                        key={tag.id}
                        onClick={() => handleSendMessage(tag.question)}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-white rounded-full bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200"
                      >
                        <Tag className="h-3 w-3" />
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input area */}
              <div className="relative border-t border-white/20">
                <div className="absolute inset-0 bg-black/70" />
                <div className="relative z-10 p-4">
                  <div className="max-w-4xl mx-auto flex items-start space-x-4">
                    <div className="flex-1 relative">
                      <textarea
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onFocus={() => setShowTags(true)}
                        placeholder="Type your message..."
                        className="w-full resize-none rounded-lg border border-white/20 focus:border-white/50 focus:ring-1 focus:ring-white/50 bg-white/10 text-white p-3 pr-24 max-h-32 placeholder-gray-400"
                        rows={1}
                      />
                      <div className="absolute right-3 bottom-3 flex items-center space-x-2">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Upload className="h-5 w-5" />
                        </button>
                        <button
                          onClick={toggleRecording}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          {isRecording ? (
                            <MicOff className="h-5 w-5" />
                          ) : (
                            <Mic className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                    <button
                      onClick={() => handleSendMessage(inputValue)}
                      disabled={!inputValue.trim()}
                      className="flex-shrink-0 px-4 py-3 rounded-lg text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showExpertModal && (
        <ExpertConsultationModal
          conversation={selectedConversation}
          onClose={() => setShowExpertModal(false)}
          onSubmit={handleExpertConsultation}
        />
      )}

      {showOnboarding && (
        <OnboardingModal
          onComplete={handleOnboardingComplete}
          onClose={() => setShowOnboarding(false)}
        />
      )}
    </div>
  );
}