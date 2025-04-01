import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { authService } from './auth.service';

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'flight' | 'baggage' | 'airport' | 'general';
  timestamp: Date;
  read: boolean;
  data?: Record<string, any>;
}

class NotificationService {
  private static instance: NotificationService;
  private messaging = getMessaging();
  private listeners: ((notification: Notification) => void)[] = [];
  private notifications: Notification[] = [];

  private constructor() {
    this.initializeNotifications();
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private async initializeNotifications() {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await this.getFCMToken();
        await this.saveTokenToServer(token);
        this.setupMessageListener();
      }
    } catch (error) {
      console.error('Failed to initialize notifications:', error);
    }
  }

  private async getFCMToken(): Promise<string> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) throw new Error('No user logged in');

    return getToken(this.messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
    });
  }

  private async saveTokenToServer(token: string) {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) return;

    // Save token to user's document in Firestore
    // Implementation depends on your backend structure
  }

  private setupMessageListener() {
    onMessage(this.messaging, (payload) => {
      const notification: Notification = {
        id: payload.messageId || Date.now().toString(),
        title: payload.notification?.title || 'New Notification',
        body: payload.notification?.body || '',
        type: (payload.data?.type as Notification['type']) || 'general',
        timestamp: new Date(),
        read: false,
        data: payload.data
      };

      this.notifications.unshift(notification);
      this.notifyListeners(notification);
      this.showBrowserNotification(notification);
    });
  }

  private showBrowserNotification(notification: Notification) {
    if (Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.body,
        icon: '/logo192.png'
      });
    }
  }

  public subscribe(listener: (notification: Notification) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(notification: Notification) {
    this.listeners.forEach(listener => listener(notification));
  }

  public getNotifications(): Notification[] {
    return this.notifications;
  }

  public markAsRead(notificationId: string) {
    const notification = this.notifications.find(n => n.id === notificationId);
    if (notification) {
      notification.read = true;
      // Update in backend
    }
  }

  public markAllAsRead() {
    this.notifications.forEach(notification => {
      notification.read = true;
    });
    // Update in backend
  }

  public clearNotifications() {
    this.notifications = [];
    // Clear in backend
  }
}

export const notificationService = NotificationService.getInstance(); 