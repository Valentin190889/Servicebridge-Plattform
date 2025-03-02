import React from 'react';
import { Check } from 'lucide-react';
import type { SubscriptionPlan } from '../../types/subscription';
import { useAuth } from '../../contexts/AuthContext';

const plans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    tier: 'basic',
    price: 29,
    interval: 'month',
    features: [
      'AI Assistant Access',
      'Basic Knowledge Hub',
      'Community Access',
      'Email Support'
    ]
  },
  {
    id: 'pro',
    name: 'Professional',
    tier: 'pro',
    price: 79,
    interval: 'month',
    features: [
      'Everything in Basic',
      'Advanced AI Features',
      'Priority Support',
      'Expert Network Access',
      'Custom Integrations'
    ],
    isPopular: true
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tier: 'enterprise',
    price: 299,
    interval: 'month',
    features: [
      'Everything in Professional',
      'Dedicated Account Manager',
      'Custom AI Model Training',
      'SLA Guarantee',
      'On-premise Deployment',
      'Advanced Analytics'
    ]
  }
];

export function Pricing() {
  const { isAuthenticated, login } = useAuth();

  const handleSubscribe = async (plan: SubscriptionPlan) => {
    if (!isAuthenticated) {
      await login();
    }
    // Handle subscription logic
  };

  return (
    <div className="min-h-screen flex flex-col justify-center relative overflow-hidden">
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

      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="sm:mx-auto sm:w-full sm:max-w-md mb-12">
            <div className="flex justify-center mb-4">
              <div className="p-2">
                <img 
                src="/service-bridge_small_white.png" 
                alt="ServiceBridge Logo" 
                className="h-20 w-auto" 
                />
              </div>
            </div>
            <h2 className="text-center text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-[#29DDDA] text-transparent bg-clip-text">
              Choose Your Plan
            </h2>
            <p className="mt-2 text-center text-sm bg-gradient-to-r from-white to-[#29DDDA] text-transparent bg-clip-text">
              Start your 14-day free trial. No credit card required.
            </p>
          </div>

          <div className="mt-8 space-y-4 sm:mt-12 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-12">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className="rounded-lg shadow-xl border border-gray-100/20 overflow-hidden flex flex-col h-full"
                style={{
                  background: 'linear-gradient(135deg, rgba(106, 17, 203, 0.9), rgba(37, 117, 252, 0.9))'
                }}
              >
                <div className="p-6 flex-1">
                  <h3 className="text-2xl font-semibold text-white">{plan.name}</h3>
                  {plan.isPopular && (
                    <p className="mt-1 text-sm text-[#29DDDA]">Most popular</p>
                  )}
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-white">${plan.price}</span>
                    <span className="text-base font-medium text-gray-300">/month</span>
                  </p>
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-white">What's included:</h4>
                    <ul className="mt-4 space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex space-x-3">
                          <Check className="h-5 w-5 text-[#29DDDA]" />
                          <span className="text-sm text-gray-100">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <button
                    onClick={() => handleSubscribe(plan)}
                    className="w-full flex justify-center items-center text-sm font-medium transform transition-all duration-500 uppercase"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #b0c6ff -40%, #001945 5%, #DA22FF 180%)',
                      border: '1px solid white',
                      padding: '15px 45px',
                      color: 'white',
                      boxShadow: '0 0 20px #eee',
                      borderRadius: '10px',
                      backgroundSize: '200% auto',
                    }}
                  >
                    Start free trial
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}