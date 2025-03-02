import React, { useState } from 'react';
import { NewsHeader } from '../components/news/NewsHeader';
import { NewsList } from '../components/news/NewsList';
import { TrendingTopics } from '../components/news/TrendingTopics';
import { NewsCategories } from '../components/news/NewsCategories';
import { ArticleModal } from '../components/news/ArticleModal';
import { SubscribeModal } from '../components/news/SubscribeModal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import { NewsProvider } from '../contexts/NewsContext';
import type { NewsArticle } from '../types/news';

export function News() {
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [showSubscribeModal, setShowSubscribeModal] = useState(false);

  return (
    <NewsProvider>
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
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#29DDDA] text-transparent bg-clip-text">News & Updates</h1>
              <p className="mt-2 text-gray-300">
                Stay informed with the latest industry insights and platform updates
              </p>
            </div>
            <div className="mt-4">
              <NewsHeader onSubscribe={() => setShowSubscribeModal(true)} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
            <div className="lg:col-span-3">
              <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
                <Tabs defaultValue="latest" className="text-white">
                  <TabsList className="flex space-x-2 border-b border-white/20 w-full bg-white/10 p-2 rounded-t-lg mb-6">
                    <TabsTrigger value="latest" className="text-white data-[state=active]:bg-white/20">Latest</TabsTrigger>
                    <TabsTrigger value="trending" className="text-white data-[state=active]:bg-white/20">Trending</TabsTrigger>
                    <TabsTrigger value="following" className="text-white data-[state=active]:bg-white/20">Following</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="latest">
                    <NewsList onArticleClick={setSelectedArticle} />
                  </TabsContent>
                  
                  <TabsContent value="trending">
                    <NewsList filter={{ timeframe: 'week' }} onArticleClick={setSelectedArticle} />
                  </TabsContent>
                  
                  <TabsContent value="following">
                    <NewsList filter={{ tag: 'following' }} onArticleClick={setSelectedArticle} />
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
                <h3 className="text-lg font-semibold text-white mb-4">Trending Topics</h3>
                <TrendingTopics />
              </div>
              <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
                <h3 className="text-lg font-semibold text-white mb-4">Categories</h3>
                <NewsCategories />
              </div>
            </div>
          </div>

          {selectedArticle && (
            <ArticleModal
              article={selectedArticle}
              onClose={() => setSelectedArticle(null)}
            />
          )}

          {showSubscribeModal && (
            <SubscribeModal onClose={() => setShowSubscribeModal(false)} />
          )}
        </div>
      </div>
    </NewsProvider>
  );
}