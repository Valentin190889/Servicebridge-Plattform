import React from 'react';
import { Search, Filter, Play, Book, Video, Calendar, Users } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/Tabs';
import { ArticleList } from '../../components/knowledge/ArticleList';
import { CategoryList } from '../../components/knowledge/CategoryList';
import { WebinarList } from '../../components/knowledge/WebinarList';
import { VideoList } from '../../components/knowledge/VideoList';
import { KnowledgeStats } from '../../components/knowledge/KnowledgeStats';
import { FeaturedContent } from '../../components/knowledge/FeaturedContent';

export function KnowledgeHub() {
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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#29DDDA] text-transparent bg-clip-text">Knowledge Hub</h1>
            <p className="mt-2 text-gray-300">
              Explore our comprehensive library of resources, webinars, and expert content
            </p>
          </div>
          <div className="mt-4 flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="search"
                placeholder="Search resources..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300/20 rounded-lg bg-white/10 text-white placeholder-gray-300 focus:ring-2 focus:ring-white/50 focus:border-transparent"
              />
            </div>
            <button 
              className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg transform transition-all duration-500"
              style={{
                backgroundImage: 'linear-gradient(to right, #b0c6ff -40%, #001945 5%, #DA22FF 180%)',
                border: '1px solid white',
                boxShadow: '0 0 20px #eee',
                backgroundSize: '200% auto',
              }}
            >
              <Filter className="h-5 w-5" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-blue-500/10">
                <Book className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">250+</p>
                <p className="text-sm text-gray-300">Articles</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-purple-500/10">
                <Video className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">120+</p>
                <p className="text-sm text-gray-300">Video Tutorials</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-green-500/10">
                <Users className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">50+</p>
                <p className="text-sm text-gray-300">Expert Contributors</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-3 rounded-lg bg-orange-500/10">
                <Calendar className="h-6 w-6 text-orange-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">25+</p>
                <p className="text-sm text-gray-300">Live Webinars</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12 bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
          <FeaturedContent />
        </div>

        <div className="bg-white/10 rounded-lg p-6 border border-white/20 hover:border-[#29DDDA] transition-colors">
          <Tabs defaultValue="articles" className="text-white">
            <TabsList className="flex space-x-2 border-b border-white/20 w-full bg-white/10 p-2 rounded-t-lg mb-6">
              <TabsTrigger value="articles" className="text-white data-[state=active]:bg-white/20">
                <Book className="h-4 w-4 mr-2" />
                <span>Articles</span>
              </TabsTrigger>
              <TabsTrigger value="webinars" className="text-white data-[state=active]:bg-white/20">
                <Calendar className="h-4 w-4 mr-2" />
                <span>Webinars</span>
              </TabsTrigger>
              <TabsTrigger value="videos" className="text-white data-[state=active]:bg-white/20">
                <Video className="h-4 w-4 mr-2" />
                <span>Videos</span>
              </TabsTrigger>
              <TabsTrigger value="categories" className="text-white data-[state=active]:bg-white/20">
                <Play className="h-4 w-4 mr-2" />
                <span>Categories</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="articles">
              <ArticleList />
            </TabsContent>
            
            <TabsContent value="webinars">
              <WebinarList />
            </TabsContent>
            
            <TabsContent value="videos">
              <VideoList />
            </TabsContent>
            
            <TabsContent value="categories">
              <CategoryList />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}