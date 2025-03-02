export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketType = 'technical' | 'consultancy' | 'billing' | 'other';

export interface Ticket {
  id: string;
  title: string;
  description: string;
  type: TicketType;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  userId: string;
  assignedTo?: string;
  attachments?: Array<{
    id: string;
    name: string;
    url: string;
  }>;
  comments?: Array<{
    id: string;
    content: string;
    userId: string;
    createdAt: string;
  }>;
}