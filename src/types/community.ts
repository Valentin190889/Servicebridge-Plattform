export interface ForumPost {
  id: string;
  title: string;
  content: string;
  authorPseudonym: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  likesCount: number;
  repliesCount: number;
  replies?: ForumReply[];
}

export interface ForumReply {
  id: string;
  postId: string;
  content: string;
  authorPseudonym: string;
  createdAt: string;
  updatedAt: string;
  likesCount: number;
}

export interface ForumCategory {
  id: string;
  name: string;
  description: string;
  postsCount: number;
  icon: string;
}