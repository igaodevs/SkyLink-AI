export type NotificationType = 'info' | 'success' | 'warning' | 'error';
export type NotificationPriority = 'low' | 'medium' | 'high';
export type NotificationChannel = 'email' | 'push' | 'sms' | 'in-app';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  channels: NotificationChannel[];
  data?: Record<string, any>;
  read: boolean;
  createdAt: string;
  expiresAt?: string;
  action?: {
    label: string;
    url: string;
  };
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: NotificationType;
  priority: NotificationPriority;
  title: string;
  message: string;
  channels: NotificationChannel[];
  variables: string[];
  createdAt: string;
  updatedAt: string;
}

export interface NotificationPreferences {
  userId: string;
  channels: {
    email: boolean;
    push: boolean;
    sms: boolean;
    inApp: boolean;
  };
  types: {
    info: boolean;
    success: boolean;
    warning: boolean;
    error: boolean;
  };
  priorities: {
    low: boolean;
    medium: boolean;
    high: boolean;
  };
  quietHours?: {
    enabled: boolean;
    start: string;
    end: string;
    timezone: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface NotificationSearchParams {
  userId?: string;
  type?: NotificationType;
  priority?: NotificationPriority;
  channel?: NotificationChannel;
  read?: boolean;
  startDate?: string;
  endDate?: string;
}

export interface NotificationUpdateParams {
  read?: boolean;
  channels?: NotificationChannel[];
  data?: Record<string, any>;
  action?: {
    label: string;
    url: string;
  };
}

export interface NotificationSummary {
  totalNotifications: number;
  unreadCount: number;
  byType: Record<NotificationType, number>;
  byPriority: Record<NotificationPriority, number>;
  byChannel: Record<NotificationChannel, number>;
  recentNotifications: Notification[];
  topTemplates: Array<{
    templateId: string;
    name: string;
    count: number;
  }>;
} 