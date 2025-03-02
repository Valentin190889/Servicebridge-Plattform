import React from 'react';
import { MessageSquare, ThumbsUp, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useCommunity } from '../../contexts/CommunityContext';
import type { ForumPost } from '../../types/community';

interface ForumTopicsProps {
  onTopicClick: (post: ForumPost) => void;
}

export function ForumTopics({ onTopicClick }: ForumTopicsProps) {
  const { posts, likePost } = useCommunity();

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white dark:bg-dark-900 rounded-lg p-6 border border-gray-200 dark:border-dark-600 hover:border-primary-500 transition-colors cursor-pointer"
          onClick={() => onTopicClick(post)}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400">
                {post.title}
              </h3>
              <div className="mt-2 flex items-center space-x-4 text-sm">
                <span className="text-primary-700 dark:text-primary-300">{post.authorPseudonym}</span>
                <span className="text-gray-600 dark:text-gray-300">
                  <Clock className="inline h-4 w-4 mr-1" />
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-2 text-gray-700 dark:text-gray-200 line-clamp-2">{post.content}</p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-300">
            <button
              onClick={(e) => {
                e.stopPropagation();
                likePost(post.id);
              }}
              className="flex items-center hover:text-primary-600 dark:hover:text-primary-400"
            >
              <ThumbsUp className="h-4 w-4 mr-1" />
              {post.likesCount} likes
            </button>
            <span className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              {post.repliesCount} replies
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}