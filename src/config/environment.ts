interface Environment {
  firebase: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    vapidKey: string;
  };
  api: {
    baseUrl: string;
    timeout: number;
  };
  features: {
    enableAI: boolean;
    enableVR: boolean;
    enableBlockchain: boolean;
    enableBiometric: boolean;
  };
  i18n: {
    defaultLocale: string;
    supportedLocales: string[];
  };
  theme: {
    defaultTheme: 'light' | 'dark' | 'system';
  };
  pwa: {
    enabled: boolean;
    cacheVersion: string;
  };
}

const environment: Environment = {
  firebase: {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY
  },
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
    timeout: 30000
  },
  features: {
    enableAI: import.meta.env.VITE_ENABLE_AI === 'true',
    enableVR: import.meta.env.VITE_ENABLE_VR === 'true',
    enableBlockchain: import.meta.env.VITE_ENABLE_BLOCKCHAIN === 'true',
    enableBiometric: import.meta.env.VITE_ENABLE_BIOMETRIC === 'true'
  },
  i18n: {
    defaultLocale: import.meta.env.VITE_DEFAULT_LOCALE || 'en',
    supportedLocales: (import.meta.env.VITE_SUPPORTED_LOCALES || 'en,pt').split(',')
  },
  theme: {
    defaultTheme: (import.meta.env.VITE_DEFAULT_THEME || 'system') as 'light' | 'dark' | 'system'
  },
  pwa: {
    enabled: import.meta.env.VITE_ENABLE_PWA === 'true',
    cacheVersion: import.meta.env.VITE_PWA_CACHE_VERSION || '1.0.0'
  }
};

export default environment; 