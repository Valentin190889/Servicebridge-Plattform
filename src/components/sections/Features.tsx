import React from 'react';
import { LineChart, PieChart, BarChart, Settings } from 'lucide-react';

const features = [
  {
    name: 'Real-time Analytics',
    description: 'Get instant insights with our real-time data processing and visualization tools.',
    icon: LineChart,
  },
  {
    name: 'Custom Reports',
    description: 'Create and schedule custom reports tailored to your specific business needs.',
    icon: PieChart,
  },
  {
    name: 'Advanced Metrics',
    description: 'Track and analyze complex metrics with our advanced analytics engine.',
    icon: BarChart,
  },
  {
    name: 'Easy Integration',
    description: 'Seamlessly integrate with your existing tools and workflows.',
    icon: Settings,
  },
];

export function Features() {
  return (
    <div id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to succeed
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our platform provides all the tools you need to analyze, understand, and improve your business performance.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                  <feature.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <div className="ml-16">
                  <h3 className="text-lg font-medium text-gray-900">{feature.name}</h3>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}