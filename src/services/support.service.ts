import { getFirestore, collection, query, where, getDocs, addDoc, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { authService } from './auth.service';

export interface SupportTicket {
  id: string;
  userId: string;
  type: 'general' | 'booking' | 'baggage' | 'technical' | 'complaint' | 'feedback';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  subject: string;
  description: string;
  attachments: {
    url: string;
    type: string;
    name: string;
  }[];
  messages: {
    id: string;
    senderId: string;
    senderType: 'user' | 'ai' | 'agent';
    content: string;
    timestamp: Date;
    attachments?: {
      url: string;
      type: string;
      name: string;
    }[];
  }[];
  aiAnalysis: {
    sentiment: 'positive' | 'neutral' | 'negative';
    category: string;
    keywords: string[];
    suggestedResponse?: string;
  };
  assignedTo?: string;
  resolution?: {
    solution: string;
    satisfaction: number;
    feedback?: string;
    resolvedAt: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface SupportAgent {
  id: string;
  userId: string;
  name: string;
  email: string;
  department: string;
  specialization: string[];
  availability: {
    status: 'online' | 'offline' | 'busy';
    lastActive: Date;
    workingHours: {
      start: string;
      end: string;
      timezone: string;
    };
  };
  performance: {
    ticketsResolved: number;
    averageResponseTime: number;
    customerSatisfaction: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

class SupportService {
  private static instance: SupportService;
  private db = getFirestore();

  private constructor() {}

  public static getInstance(): SupportService {
    if (!SupportService.instance) {
      SupportService.instance = new SupportService();
    }
    return SupportService.instance;
  }

  public async createSupportTicket(ticketData: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt' | 'messages' | 'aiAnalysis'>): Promise<SupportTicket> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Unauthorized: User must be logged in to create support ticket');
    }

    // Analyze ticket with AI
    const aiAnalysis = await this.analyzeTicketWithAI(ticketData);

    const ticketRef = await addDoc(collection(this.db, 'support_tickets'), {
      ...ticketData,
      messages: [],
      aiAnalysis,
      status: 'open',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    return this.getSupportTicketById(ticketRef.id) as Promise<SupportTicket>;
  }

  public async getSupportTicketById(id: string): Promise<SupportTicket | null> {
    const ticketDoc = await getDocs(doc(this.db, 'support_tickets', id));
    if (!ticketDoc.exists()) return null;

    return this.transformSupportTicketData(ticketDoc);
  }

  public async getSupportTicketsByUser(userId: string): Promise<SupportTicket[]> {
    const ticketsRef = collection(this.db, 'support_tickets');
    const q = query(ticketsRef, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => this.transformSupportTicketData(doc));
  }

  public async addMessageToTicket(
    ticketId: string,
    message: Omit<SupportTicket['messages'][0], 'id' | 'timestamp'>
  ): Promise<void> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Unauthorized: User must be logged in to add message');
    }

    const ticketRef = doc(this.db, 'support_tickets', ticketId);
    const newMessage = {
      ...message,
      id: Date.now().toString(),
      timestamp: Timestamp.now()
    };

    await updateDoc(ticketRef, {
      messages: [...(await this.getSupportTicketById(ticketId))?.messages || [], newMessage],
      updatedAt: Timestamp.now()
    });
  }

  public async updateTicketStatus(id: string, status: SupportTicket['status']): Promise<void> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'airline') {
      throw new Error('Unauthorized: Only airline staff can update ticket status');
    }

    const ticketRef = doc(this.db, 'support_tickets', id);
    await updateDoc(ticketRef, {
      status,
      updatedAt: Timestamp.now()
    });
  }

  public async resolveTicket(
    id: string,
    resolution: Omit<SupportTicket['resolution'], 'resolvedAt'>
  ): Promise<void> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'airline') {
      throw new Error('Unauthorized: Only airline staff can resolve tickets');
    }

    const ticketRef = doc(this.db, 'support_tickets', id);
    await updateDoc(ticketRef, {
      status: 'resolved',
      resolution: {
        ...resolution,
        resolvedAt: Timestamp.now()
      },
      updatedAt: Timestamp.now()
    });
  }

  public async assignTicket(ticketId: string, agentId: string): Promise<void> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'airline') {
      throw new Error('Unauthorized: Only airline staff can assign tickets');
    }

    const ticketRef = doc(this.db, 'support_tickets', ticketId);
    await updateDoc(ticketRef, {
      assignedTo: agentId,
      status: 'in_progress',
      updatedAt: Timestamp.now()
    });
  }

  private async analyzeTicketWithAI(ticketData: Partial<SupportTicket>): Promise<SupportTicket['aiAnalysis']> {
    // This is a placeholder for AI ticket analysis
    // In a real implementation, this would:
    // 1. Analyze ticket content using NLP
    // 2. Determine sentiment
    // 3. Categorize the issue
    // 4. Extract keywords
    // 5. Generate suggested response
    return {
      sentiment: 'neutral',
      category: ticketData.type || 'general',
      keywords: ['placeholder'],
      suggestedResponse: 'Thank you for contacting us. We will assist you shortly.'
    };
  }

  private transformSupportTicketData(doc: any): SupportTicket {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      messages: data.messages.map((msg: any) => ({
        ...msg,
        timestamp: msg.timestamp.toDate()
      })),
      resolution: data.resolution ? {
        ...data.resolution,
        resolvedAt: data.resolution.resolvedAt.toDate()
      } : undefined,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    };
  }
}

export const supportService = SupportService.getInstance(); 