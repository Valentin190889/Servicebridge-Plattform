import React, { useState } from 'react';
import { Save, X, Upload } from 'lucide-react';
import type { UserProfile, Industry, Language, Region } from '../../types/user';

const industries: Industry[] = ['technology', 'healthcare', 'finance', 'manufacturing', 'retail', 'education', 'other'];
const languages: Language[] = ['en', 'de', 'fr', 'es'];
const regions: Region[] = ['eu', 'na', 'asia', 'other'];

export function Profile() {
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    position: 'Software Engineer',
    industry: 'technology',
    subscription: {
      package: 'Professional',
      status: 'active',
      expiresAt: '2024-12-31',
    },
    settings: {
      language: 'en',
      region: 'eu',
      pseudonym: 'TechExplorer',
      darkMode: false,
    },
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  });

  const handleSave = () => {
    // Save profile changes
    console.log('Saving profile:', profile);
  };

  const handleCancel = () => {
    // Reset changes
    console.log('Canceling changes');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          avatarUrl: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancelSubscription = () => {
    if (window.confirm('Are you sure you want to cancel your subscription?')) {
      setProfile(prev => ({
        ...prev,
        subscription: {
          ...prev.subscription,
          status: 'canceled'
        }
      }));
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="bg-white dark:bg-dark-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-dark-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile Settings</h2>
        </div>

        <div className="p-6 space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={profile.avatarUrl || 'https://via.placeholder.com/128'}
                alt={profile.name}
                className="h-32 w-32 rounded-full object-cover"
              />
              <label className="absolute bottom-0 right-0 bg-primary-600 p-2 rounded-full cursor-pointer hover:bg-primary-700">
                <Upload className="h-4 w-4 text-white" />
                <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
              </label>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">{profile.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={e => setProfile(prev => ({ ...prev, name: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Position</label>
              <input
                type="text"
                value={profile.position}
                onChange={e => setProfile(prev => ({ ...prev, position: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Industry</label>
              <select
                value={profile.industry}
                onChange={e => setProfile(prev => ({ ...prev, industry: e.target.value as Industry }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                {industries.map(industry => (
                  <option key={industry} value={industry}>
                    {industry.charAt(0).toUpperCase() + industry.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Community Pseudonym</label>
              <input
                type="text"
                value={profile.settings.pseudonym}
                onChange={e => setProfile(prev => ({
                  ...prev,
                  settings: { ...prev.settings, pseudonym: e.target.value }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Preferences */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Language</label>
              <select
                value={profile.settings.language}
                onChange={e => setProfile(prev => ({
                  ...prev,
                  settings: { ...prev.settings, language: e.target.value as Language }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Region</label>
              <select
                value={profile.settings.region}
                onChange={e => setProfile(prev => ({
                  ...prev,
                  settings: { ...prev.settings, region: e.target.value as Region }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              >
                {regions.map(region => (
                  <option key={region} value={region}>
                    {region.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Subscription Information */}
          <div className="bg-gray-50 dark:bg-dark-700 p-4 rounded-lg">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Subscription</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="block text-sm text-gray-500 dark:text-gray-400">Package</span>
                <span className="text-gray-900 dark:text-white">{profile.subscription.package}</span>
              </div>
              <div>
                <span className="block text-sm text-gray-500 dark:text-gray-400">Status</span>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  profile.subscription.status === 'active' ? 'bg-green-100 text-green-800' :
                  profile.subscription.status === 'trial' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {profile.subscription.status.charAt(0).toUpperCase() + profile.subscription.status.slice(1)}
                </span>
              </div>
              <div>
                <span className="block text-sm text-gray-500 dark:text-gray-400">Expires</span>
                <span className="text-gray-900 dark:text-white">
                  {new Date(profile.subscription.expiresAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            {profile.subscription.status === 'active' && (
              <button
                onClick={handleCancelSubscription}
                className="mt-4 text-sm text-red-600 hover:text-red-500"
              >
                Cancel Subscription
              </button>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-dark-700 flex justify-end space-x-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-700 rounded-md"
          >
            <X className="h-4 w-4 inline-block mr-2" />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md inline-flex items-center"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}