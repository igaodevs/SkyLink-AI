export type TicketStatus = 'open' | 'in-progress' | 'resolved' | 'closed';
export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TicketCategory = 'booking' | 'flight' | 'baggage' | 'payment' | 'account' | 'other';
export type AgentRole = 'support' | 'supervisor' | 'manager' | 'admin';

export interface SupportTicket {
  id: string;
  userId: string;
  category: TicketCategory;
  priority: TicketPriority;
  status: TicketStatus;
  subject: string;
  description: string;
  attachments: Array<{
    name: string;
    url: string;
    type: string;
    size: number;
    uploadedAt: string;
  }>;
  assignedTo?: {
    agentId: string;
    name: string;
    role: AgentRole;
    assignedAt: string;
  };
  messages: Array<{
    id: string;
    senderId: string;
    senderName: string;
    senderRole: 'user' | AgentRole;
    content: string;
    attachments?: Array<{
      name: string;
      url: string;
      type: string;
      size: number;
    }>;
    createdAt: string;
    read: boolean;
  }>;
  aiAnalysis?: {
    sentiment: 'positive' | 'neutral' | 'negative';
    category: string;
    keywords: string[];
    suggestedResponse?: string;
    priority: TicketPriority;
  };
  resolution?: {
    resolvedBy: string;
    resolvedAt: string;
    solution: string;
    satisfaction?: {
      rating: number;
      feedback: string;
      date: string;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface SupportAgent {
  id: string;
  name: string;
  email: string;
  role: AgentRole;
  status: 'active' | 'inactive' | 'busy';
  skills: string[];
  languages: string[];
  performance: {
    ticketsHandled: number;
    averageResolutionTime: number;
    satisfactionRating: number;
    currentLoad: number;
  };
  schedule: {
    workingHours: Array<{
      day: string;
      start: string;
      end: string;
    }>;
    timezone: string;
  };
  preferences: {
    maxTickets: number;
    preferredCategories: TicketCategory[];
    notificationSettings: {
      email: boolean;
      push: boolean;
      desktop: boolean;
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface TicketSearchParams {
  userId?: string;
  category?: TicketCategory;
  priority?: TicketPriority;
  status?: TicketStatus;
  assignedTo?: string;
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
}

export interface TicketUpdateParams {
  status?: TicketStatus;
  priority?: TicketPriority;
  category?: TicketCategory;
  assignedTo?: {
    agentId: string;
    name: string;
    role: AgentRole;
    assignedAt: string;
  };
  messages?: Array<{
    id: string;
    senderId: string;
    senderName: string;
    senderRole: 'user' | AgentRole;
    content: string;
    attachments?: Array<{
      name: string;
      url: string;
      type: string;
      size: number;
    }>;
    createdAt: string;
    read: boolean;
  }>;
  resolution?: {
    resolvedBy: string;
    resolvedAt: string;
    solution: string;
    satisfaction?: {
      rating: number;
      feedback: string;
      date: string;
    };
  };
}

export interface SupportSummary {
  totalTickets: number;
  ticketsByStatus: Record<TicketStatus, number>;
  ticketsByCategory: Record<TicketCategory, number>;
  ticketsByPriority: Record<TicketPriority, number>;
  recentTickets: SupportTicket[];
  agentPerformance: Array<{
    agentId: string;
    name: string;
    ticketsHandled: number;
    averageResolutionTime: number;
    satisfactionRating: number;
  }>;
  metrics: {
    averageResolutionTime: number;
    firstResponseTime: number;
    satisfactionRate: number;
    escalationRate: number;
  };
} 