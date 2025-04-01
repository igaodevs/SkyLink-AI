import React, { useEffect } from 'react';
import { PWAInstallPrompt } from './PWAInstallPrompt';
import { PWAUpdateNotification } from './PWAUpdateNotification';
import { serviceWorkerManager } from '../utils/serviceWorker';

interface PWAProviderProps {
  children: React.ReactNode;
}

export const PWAProvider: React.FC<PWAProviderProps> = ({ children }) => {
  useEffect(() => {
    const initializePWA = async () => {
      try {
        await serviceWorkerManager.register();

        // Set up periodic sync for flight status updates
        await serviceWorkerManager.requestPeriodicSync('update-flight-status', {
          minInterval: 24 * 60 * 60 * 1000 // 24 hours
        });

        // Set up background sync for flight data
        await serviceWorkerManager.requestBackgroundSync('sync-flights');
      } catch (error) {
        console.error('Failed to initialize PWA:', error);
      }
    };

    initializePWA();

    return () => {
      serviceWorkerManager.unregister();
    };
  }, []);

  return (
    <>
      {children}
      <PWAInstallPrompt />
      <PWAUpdateNotification />
    </>
  );
}; 