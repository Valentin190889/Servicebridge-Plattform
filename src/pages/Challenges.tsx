import React, { useState, useEffect } from 'react';
import { Target, ArrowRight, RefreshCw } from 'lucide-react';

interface UserProfile {
  position: string;
  region: string;
  industry: string;
}

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
  // ... other industries as defined in AiCo.tsx
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

export function Challenges() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const profile = localStorage.getItem('userProfile');
    if (profile) {
      setUserProfile(JSON.parse(profile));
    }
  }, []);

  const generateChallenges = (profile: UserProfile) => {
    const challenges = INDUSTRY_CHALLENGES[profile.industry as keyof typeof INDUSTRY_CHALLENGES] || INDUSTRY_CHALLENGES.technology;
    const focus = POSITION_SPECIFIC_FOCUS[profile.position as keyof typeof POSITION_SPECIFIC_FOCUS] || POSITION_SPECIFIC_FOCUS.other;
    return challenges;
  };

  const handleRefreshChallenges = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <div className="text-center text-white">
          <p>Please complete your profile setup first.</p>
          <a href="/aico" className="text-[#29DDDA] hover:underline">
            Go to AiCo to set up your profile
          </a>
        </div>
      </div>
    );
  }

  const challenges = generateChallenges(userProfile);

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
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#29DDDA] text-transparent bg-clip-text">
                Your Key Challenges
              </h1>
              <p className="mt-2 text-gray-300">
                Based on your role as {userProfile.position} in the {userProfile.industry} industry
              </p>
            </div>
            <button
              onClick={handleRefreshChallenges}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-200"
            >
              <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh Challenges</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {challenges.map((challenge, index) => (
            <div
              key={index}
              className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors"
            >
              <div className="flex items-start space-x-4">
                <div className="p-3 rounded-lg bg-[#29DDDA]/10">
                  <Target className="h-6 w-6 text-[#29DDDA]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Challenge {index + 1}
                  </h3>
                  <p className="text-gray-300">{challenge}</p>
                  <button
                    className="mt-4 flex items-center space-x-2 text-[#29DDDA] hover:text-[#16FFBB] transition-colors"
                  >
                    <span>Explore Solutions</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 