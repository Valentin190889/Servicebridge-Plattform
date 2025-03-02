export interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  downloads?: Download[];
}

export interface Download {
  id: string;
  name: string;
  url: string;
  size: string;
  type: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  articleCount: number;
}