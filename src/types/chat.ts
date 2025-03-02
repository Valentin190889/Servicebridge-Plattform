export type MessageRole = 'user' | 'assistant' | 'system' | 'expert';

export type MessageType = 'text' | 'file' | 'project' | 'expert';

export interface Message {
  id: string;
  content: string;
  role: MessageRole;
  timestamp: string;
  type: MessageType;
  fileName?: string;
}

export interface ChatSession {
  id: string;
  title: string;
  timestamp: string;
  preview: string;
  messages: Message[];
}