import { environment } from '../config/environment';

export class ServiceWorkerManager {
  private static instance: ServiceWorkerManager;
  private registration: ServiceWorkerRegistration | null = null;
  private isSupported: boolean = 'serviceWorker' in navigator && 'PushManager' in window;

  private constructor() {}

  public static getInstance(): ServiceWorkerManager {
    if (!ServiceWorkerManager.instance) {
      ServiceWorkerManager.instance = new ServiceWorkerManager();
    }
    return ServiceWorkerManager.instance;
  }

  public async register(): Promise<void> {
    if (!this.isSupported) {
      console.warn('Service Worker is not supported in this browser');
      return;
    }

    try {
      this.registration = await navigator.serviceWorker.register('/service-worker.js', {
        scope: '/',
        updateViaCache: 'none'
      });

      console.log('Service Worker registered successfully:', this.registration);
      await this.setupPushNotifications();
    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  }

  public async unregister(): Promise<void> {
    if (this.registration) {
      try {
        await this.registration.unregister();
        this.registration = null;
        console.log('Service Worker unregistered successfully');
      } catch (error) {
        console.error('Service Worker unregistration failed:', error);
      }
    }
  }

  private async setupPushNotifications(): Promise<void> {
    if (!this.registration) return;

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const subscription = await this.registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: environment.pushNotificationKey
        });

        // Send subscription to backend
        await this.sendSubscriptionToServer(subscription);
      }
    } catch (error) {
      console.error('Push notification setup failed:', error);
    }
  }

  private async sendSubscriptionToServer(subscription: PushSubscription): Promise<void> {
    try {
      const response = await fetch('/api/notifications/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(subscription)
      });

      if (!response.ok) {
        throw new Error('Failed to send subscription to server');
      }
    } catch (error) {
      console.error('Error sending subscription to server:', error);
    }
  }

  public async requestBackgroundSync(tag: string): Promise<void> {
    if (!this.registration) return;

    try {
      await this.registration.sync.register(tag);
    } catch (error) {
      console.error('Background sync registration failed:', error);
    }
  }

  public async requestPeriodicSync(tag: string, options: { minInterval: number }): Promise<void> {
    if (!this.registration) return;

    try {
      await (this.registration as any).periodicSync.register(tag, options);
    } catch (error) {
      console.error('Periodic sync registration failed:', error);
    }
  }

  public async updateServiceWorker(): Promise<void> {
    if (!this.registration) return;

    try {
      await this.registration.update();
    } catch (error) {
      console.error('Service Worker update failed:', error);
    }
  }
}

// Export a singleton instance
export const serviceWorkerManager = ServiceWorkerManager.getInstance(); 