import { UserProfile, UserAuth } from './user';

export type AuthProvider = 'email' | 'google' | 'facebook' | 'twitter' | 'apple';
export type AuthErrorCode = 
  | 'auth/invalid-email'
  | 'auth/user-disabled'
  | 'auth/user-not-found'
  | 'auth/wrong-password'
  | 'auth/email-already-in-use'
  | 'auth/weak-password'
  | 'auth/operation-not-allowed'
  | 'auth/network-request-failed'
  | 'auth/too-many-requests'
  | 'auth/internal-error';

export interface AuthState {
  user: UserAuth | null;
  profile: UserProfile | null;
  loading: boolean;
  error: AuthError | null;
}

export interface AuthError {
  code: AuthErrorCode;
  message: string;
}

export interface AuthContextType {
  user: UserAuth | null;
  profile: UserProfile | null;
  loading: boolean;
  error: AuthError | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, profile: Partial<UserProfile>) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  deleteAccount: () => Promise<void>;
  signInWithProvider: (provider: AuthProvider) => Promise<void>;
  linkWithProvider: (provider: AuthProvider) => Promise<void>;
  unlinkProvider: (provider: AuthProvider) => Promise<void>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface SignInParams {
  email: string;
  password: string;
}

export interface SignUpParams {
  email: string;
  password: string;
  profile: Partial<UserProfile>;
}

export interface UpdateProfileParams {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  dateOfBirth?: string;
  nationality?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    postalCode?: string;
  };
  preferences?: {
    language?: string;
    currency?: string;
    notifications?: {
      email?: boolean;
      push?: boolean;
      sms?: boolean;
    };
    theme?: 'light' | 'dark' | 'system';
  };
}

export interface AuthConfig {
  providers: {
    email: boolean;
    google: boolean;
    facebook: boolean;
    twitter: boolean;
    apple: boolean;
  };
  passwordMinLength: number;
  requireEmailVerification: boolean;
  allowPasswordReset: boolean;
  allowProfileUpdate: boolean;
  allowPasswordUpdate: boolean;
  allowAccountDeletion: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  lockoutDuration: number;
} 