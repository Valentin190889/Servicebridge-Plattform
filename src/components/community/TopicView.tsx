import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Clock } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { useCommunity } from '../../contexts/CommunityContext';
import type { ForumPost } from '../../types/community';

interface TopicViewProps {
  post: ForumPost;
  onClose: () => void;
}

export function TopicView({ post, onClose }: TopicViewProps) {
  const { addReply, likePost, likeReply } = useCommunity();
  const [replyContent, setReplyContent] = useState('');

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyContent.trim()) return;

    addReply(post.id, {
      content: replyContent,
      authorPseudonym: 'User123', // This would come from the user's profile
      postId: post.id
    });

    setReplyContent('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-dark-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                {post.title}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                <span>{post.authorPseudonym}</span>
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
            >
              Close
            </button>
          </div>

          <div className="prose dark:prose-invert max-w-none mb-6">
            <p className="text-gray-700 dark:text-gray-200">{post.content}</p>
          </div>

          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => likePost(post.id)}
                className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
              >
                <ThumbsUp className="h-5 w-5" />
                <span>{post.likesCount}</span>
              </button>
              <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-300">
                <MessageSquare className="h-5 w-5" />
                <span>{post.repliesCount}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-sm rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Replies
            </h3>

            {post.replies?.map((reply) => (
              <div
                key={reply.id}
                className="bg-gray-50 dark:bg-dark-800 rounded-lg p-4"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {reply.authorPseudonym}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <button
                    onClick={() => likeReply(post.id, reply.id)}
                    className="flex items-center space-x-1 text-gray-600 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400"
                  >
                    <ThumbsUp className="h-4 w-4" />
                    <span>{reply.likesCount}</span>
                  </button>
                </div>
                <p className="text-gray-700 dark:text-gray-200">{reply.content}</p>
              </div>
            ))}

            <form onSubmit={handleSubmitReply} className="space-y-4">
              <textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="Write your reply..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-dark-700 dark:border-dark-600 dark:text-white"
                required
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
                >
                  Post Reply
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}