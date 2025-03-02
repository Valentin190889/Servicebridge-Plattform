import React, { useState } from 'react';
import { ForumHeader } from '../components/community/ForumHeader';
import { ForumCategories } from '../components/community/ForumCategories';
import { ForumTopics } from '../components/community/ForumTopics';
import { NewTopicModal } from '../components/community/NewTopicModal';
import { TopicView } from '../components/community/TopicView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { CommunityProvider } from '../contexts/CommunityContext';
import type { ForumPost } from '../types/community';

export function Community() {
  const [showNewTopicModal, setShowNewTopicModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<ForumPost | null>(null);

  return (
    <CommunityProvider>
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#29DDDA] text-transparent bg-clip-text">Community Forum</h1>
              <p className="mt-2 text-gray-300">
                Connect with other users and share your experiences
              </p>
            </div>
            <div className="mt-4">
              <ForumHeader onNewTopic={() => setShowNewTopicModal(true)} />
            </div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
            <Tabs defaultValue="topics" className="text-white">
              <TabsList className="flex space-x-2 border-b border-white/20 w-full bg-white/10 p-2 rounded-t-lg mb-6">
                <TabsTrigger value="topics" className="text-white data-[state=active]:bg-white/20">Latest Topics</TabsTrigger>
                <TabsTrigger value="categories" className="text-white data-[state=active]:bg-white/20">Categories</TabsTrigger>
              </TabsList>
              
              <TabsContent value="topics">
                <ForumTopics onTopicClick={setSelectedTopic} />
              </TabsContent>
              
              <TabsContent value="categories">
                <ForumCategories />
              </TabsContent>
            </Tabs>
          </div>

          {showNewTopicModal && (
            <NewTopicModal onClose={() => setShowNewTopicModal(false)} />
          )}

          {selectedTopic && (
            <TopicView
              post={selectedTopic}
              onClose={() => setSelectedTopic(null)}
            />
          )}
        </div>
      </div>
    </CommunityProvider>
  );
}