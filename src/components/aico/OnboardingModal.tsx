import React, { useState } from 'react';
import { 
  Briefcase, Globe2, Building2, ChevronRight, 
  ChevronLeft, Check, X 
} from 'lucide-react';

interface OnboardingStep {
  id: 'position' | 'region' | 'industry';
  title: string;
  description: string;
  icon: React.ReactNode;
  options: { value: string; label: string }[];
}

const STEPS: OnboardingStep[] = [
  {
    id: 'position',
    title: 'What is your current position?',
    description: 'This helps us tailor our AI assistance to your role and responsibilities.',
    icon: <Briefcase className="h-6 w-6 text-[#29DDDA]" />,
    options: [
      { value: 'ceo', label: 'CEO / Executive Director' },
      { value: 'cto', label: 'CTO / Technical Director' },
      { value: 'cfo', label: 'CFO / Financial Director' },
      { value: 'coo', label: 'COO / Operations Director' },
      { value: 'vp', label: 'Vice President' },
      { value: 'director', label: 'Director / Department Head' },
      { value: 'manager', label: 'Manager / Team Lead' },
      { value: 'other', label: 'Other' }
    ]
  },
  {
    id: 'region',
    title: 'Where do you operate?',
    description: 'This helps us provide region-specific insights and compliance guidance.',
    icon: <Globe2 className="h-6 w-6 text-[#29DDDA]" />,
    options: [
      { value: 'north_america', label: 'North America' },
      { value: 'europe', label: 'Europe' },
      { value: 'asia_pacific', label: 'Asia Pacific' },
      { value: 'latin_america', label: 'Latin America' },
      { value: 'middle_east', label: 'Middle East' },
      { value: 'africa', label: 'Africa' },
      { value: 'global', label: 'Global Operations' }
    ]
  },
  {
    id: 'industry',
    title: 'What industry are you in?',
    description: 'This helps us provide industry-specific insights and recommendations.',
    icon: <Building2 className="h-6 w-6 text-[#29DDDA]" />,
    options: [
      { value: 'technology', label: 'Technology & Software' },
      { value: 'finance', label: 'Finance & Banking' },
      { value: 'healthcare', label: 'Healthcare & Life Sciences' },
      { value: 'manufacturing', label: 'Manufacturing & Industry' },
      { value: 'retail', label: 'Retail & E-commerce' },
      { value: 'services', label: 'Professional Services' },
      { value: 'energy', label: 'Energy & Utilities' },
      { value: 'education', label: 'Education & Research' },
      { value: 'other', label: 'Other' }
    ]
  }
];

interface OnboardingModalProps {
  onComplete: (data: {
    position: string;
    region: string;
    industry: string;
  }) => void;
  onClose: () => void;
}

export function OnboardingModal({ onComplete, onClose }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedOption) {
      setAnswers(prev => ({
        ...prev,
        [STEPS[currentStep].id]: selectedOption
      }));

      if (currentStep === STEPS.length - 1) {
        onComplete({
          position: answers.position || selectedOption,
          region: answers.region || '',
          industry: answers.industry || ''
        });
      } else {
        setCurrentStep(prev => prev + 1);
        setSelectedOption(null);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setSelectedOption(answers[STEPS[currentStep - 1].id] || null);
    }
  };

  const step = STEPS[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50">
      <div className="bg-[#001945] rounded-lg max-w-2xl w-full border border-white/20 shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center space-x-3">
              {step.icon}
              <h2 className="text-xl font-semibold text-white">Welcome to ServiceBridge AI</h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-medium text-white">{step.title}</h3>
              <span className="text-sm text-gray-400">
                Step {currentStep + 1} of {STEPS.length}
              </span>
            </div>
            <p className="text-gray-300">{step.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {step.options.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedOption(option.value)}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 ${
                  selectedOption === option.value
                    ? 'border-[#29DDDA] bg-[#001945]/80 text-white'
                    : 'border-white/10 hover:border-white/20 bg-[#001945]/40 text-gray-300'
                }`}
              >
                <span>{option.label}</span>
                {selectedOption === option.value && (
                  <Check className="h-5 w-5 text-[#29DDDA]" />
                )}
              </button>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <button
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentStep === 0
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back</span>
            </button>

            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                Skip for now
              </button>
              <button
                onClick={handleNext}
                disabled={!selectedOption}
                className="flex items-center space-x-2 px-6 py-2 text-white rounded-lg transform transition-all duration-500 disabled:opacity-50"
                style={{
                  backgroundImage: 'linear-gradient(to right, #29DDDA -40%, #001945 5%, #16FFBB 180%)',
                  border: '1px solid white',
                  boxShadow: '0 0 20px #eee',
                  backgroundSize: '200% auto',
                }}
              >
                <span>{currentStep === STEPS.length - 1 ? 'Complete' : 'Next'}</span>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-8 h-1 bg-white/10 rounded-full">
            <div
              className="h-full bg-[#29DDDA] rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 