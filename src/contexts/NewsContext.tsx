import React, { createContext, useContext, useState } from 'react';
import type { NewsArticle, NewsFilter } from '../types/news';

interface NewsContextType {
  articles: NewsArticle[];
  filter: NewsFilter;
  setFilter: (filter: NewsFilter) => void;
  likeArticle: (articleId: string) => void;
  subscribeToNewsletter: (email: string) => Promise<void>;
}

const initialArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'The Future of AI in Enterprise Solutions',
    summary: 'Exploring how artificial intelligence is reshaping business operations and decision-making processes.',
    content: `
      Artificial Intelligence is revolutionizing how enterprises operate in the modern business landscape. 
      This comprehensive analysis explores key trends, implementation strategies, and real-world case studies 
      of successful AI adoption in enterprise environments.

      Key points covered:
      - Current state of AI in enterprise
      - Implementation challenges and solutions
      - ROI analysis and business impact
      - Future predictions and opportunities
      
      The integration of AI into enterprise solutions represents a fundamental shift in how businesses 
      operate and compete in the digital age. Organizations that successfully implement AI technologies 
      are seeing significant improvements in efficiency, decision-making capabilities, and customer satisfaction.
    `,
    category: 'ai',
    author: 'Dr. Sarah Chen',
    publishedAt: new Date().toISOString(),
    readTime: 5,
    imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['AI', 'Enterprise', 'Innovation'],
    likes: 128,
    views: 1420
  },
  {
    id: '2',
    title: 'Emerging Trends in Cloud Computing',
    summary: 'A comprehensive look at the latest developments in cloud technology and their impact on businesses.',
    content: `
      Cloud computing continues to evolve at a rapid pace, bringing new capabilities and challenges to organizations 
      worldwide. This article examines the latest trends and their implications for business strategy.

      Topics covered:
      - Multi-cloud strategies
      - Edge computing integration
      - Security considerations
      - Cost optimization techniques
      
      As organizations continue to migrate their operations to the cloud, understanding these trends 
      becomes crucial for making informed decisions about infrastructure and technology investments.
    `,
    category: 'technology',
    author: 'Michael Rodriguez',
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    readTime: 7,
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    tags: ['Cloud', 'Technology', 'Digital Transformation'],
    likes: 95,
    views: 890
  }
];

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export function NewsProvider({ children }: { children: React.ReactNode }) {
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
  const [filter, setFilter] = useState<NewsFilter>({});

  const likeArticle = (articleId: string) => {
    setArticles(prevArticles =>
      prevArticles.map(article =>
        article.id === articleId
          ? { ...article, likes: article.likes + 1 }
          : article
      )
    );
  };

  const subscribeToNewsletter = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Subscribed to newsletter:', email);
  };

  return (
    <NewsContext.Provider value={{
      articles,
      filter,
      setFilter,
      likeArticle,
      subscribeToNewsletter
    }}>
      {children}
    </NewsContext.Provider>
  );
}

export function useNews() {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
}