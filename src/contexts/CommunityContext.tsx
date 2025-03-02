import React, { createContext, useContext, useState } from 'react';
import type { ForumPost, ForumReply, ForumCategory } from '../types/community';

interface CommunityContextType {
  posts: ForumPost[];
  categories: ForumCategory[];
  addPost: (post: Omit<ForumPost, 'id' | 'createdAt' | 'updatedAt' | 'likesCount' | 'repliesCount'>) => void;
  addReply: (postId: string, reply: Omit<ForumReply, 'id' | 'createdAt' | 'updatedAt' | 'likesCount'>) => void;
  likePost: (postId: string) => void;
  likeReply: (postId: string, replyId: string) => void;
}

const initialCategories: ForumCategory[] = [
  {
    id: '1',
    name: 'AI Implementation',
    description: 'Discuss strategies and best practices for implementing AI solutions',
    postsCount: 156,
    icon: 'Cpu'
  },
  {
    id: '2',
    name: 'Machine Learning',
    description: 'Share knowledge about ML algorithms, models, and applications',
    postsCount: 243,
    icon: 'Brain'
  },
  {
    id: '3',
    name: 'Business Strategy',
    description: 'Explore AI-driven business transformation strategies',
    postsCount: 89,
    icon: 'Lightbulb'
  }
];

const initialPosts: ForumPost[] = [
  {
    id: '1',
    title: 'Best practices for implementing AI in small businesses',
    content: 'Looking for advice on how to effectively implement AI solutions...',
    authorPseudonym: 'TechExplorer',
    category: 'AI Implementation',
    tags: ['AI', 'Small Business', 'Best Practices'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    likesCount: 15,
    repliesCount: 8,
    replies: [
      {
        id: '1',
        postId: '1',
        content: 'Start with a clear problem statement and ROI analysis...',
        authorPseudonym: 'AIExpert',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        likesCount: 5
      }
    ]
  }
];

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export function CommunityProvider({ children }: { children: React.ReactNode }) {
  const [posts, setPosts] = useState<ForumPost[]>(initialPosts);
  const [categories] = useState<ForumCategory[]>(initialCategories);

  const addPost = (newPost: Omit<ForumPost, 'id' | 'createdAt' | 'updatedAt' | 'likesCount' | 'repliesCount'>) => {
    const post: ForumPost = {
      ...newPost,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likesCount: 0,
      repliesCount: 0,
      replies: []
    };

    setPosts(prevPosts => [post, ...prevPosts]);
  };

  const addReply = (postId: string, newReply: Omit<ForumReply, 'id' | 'createdAt' | 'updatedAt' | 'likesCount'>) => {
    const reply: ForumReply = {
      ...newReply,
      id: Date.now().toString(),
      postId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likesCount: 0
    };

    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              replies: [...(post.replies || []), reply],
              repliesCount: post.repliesCount + 1,
              updatedAt: new Date().toISOString()
            }
          : post
      )
    );
  };

  const likePost = (postId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? { ...post, likesCount: post.likesCount + 1 }
          : post
      )
    );
  };

  const likeReply = (postId: string, replyId: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === postId
          ? {
              ...post,
              replies: post.replies?.map(reply =>
                reply.id === replyId
                  ? { ...reply, likesCount: reply.likesCount + 1 }
                  : reply
              )
            }
          : post
      )
    );
  };

  return (
    <CommunityContext.Provider value={{
      posts,
      categories,
      addPost,
      addReply,
      likePost,
      likeReply
    }}>
      {children}
    </CommunityContext.Provider>
  );
}

export function useCommunity() {
  const context = useContext(CommunityContext);
  if (context === undefined) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
}