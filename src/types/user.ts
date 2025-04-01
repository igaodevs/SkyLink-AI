export type UserRole = 'admin' | 'agent' | 'user' | 'vip';
export type UserStatus = 'active' | 'inactive' | 'suspended' | 'pending';

export interface UserProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  status: UserStatus;
  phoneNumber?: string;
  dateOfBirth?: string;
  nationality?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };
  preferences: {
    language: string;
    currency: string;
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    theme: 'light' | 'dark' | 'system';
  };
  documents?: {
    passport?: {
      number: string;
      expiry: string;
      country: string;
    };
    idCard?: {
      number: string;
      expiry: string;
      country: string;
    };
  };
  vipDetails?: {
    level: 'silver' | 'gold' | 'platinum' | 'diamond';
    points: number;
    tierExpiry: string;
    benefits: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface UserAuth {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName?: string;
  photoURL?: string;
  disabled: boolean;
  metadata: {
    creationTime: string;
    lastSignInTime: string;
  };
  providerData: Array<{
    providerId: string;
    displayName?: string;
    email?: string;
    phoneNumber?: string;
    photoURL?: string;
  }>;
}

export interface UserPreferences {
  language: string;
  currency: string;
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  accessibility: {
    fontSize: 'small' | 'medium' | 'large';
    highContrast: boolean;
    screenReader: boolean;
  };
  privacy: {
    showProfile: boolean;
    showBookings: boolean;
    marketingEmails: boolean;
  };
}

export interface UserUpdateParams {
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
  preferences?: Partial<UserPreferences>;
  documents?: {
    passport?: {
      number?: string;
      expiry?: string;
      country?: string;
    };
    idCard?: {
      number?: string;
      expiry?: string;
      country?: string;
    };
  };
  vipDetails?: {
    level?: 'silver' | 'gold' | 'platinum' | 'diamond';
    points?: number;
    tierExpiry?: string;
    benefits?: string[];
  };
}

export interface UserSearchParams {
  role?: UserRole;
  status?: UserStatus;
  searchTerm?: string;
  startDate?: string;
  endDate?: string;
  vipLevel?: 'silver' | 'gold' | 'platinum' | 'diamond';
}

export interface UserSummary {
  totalUsers: number;
  usersByRole: Record<UserRole, number>;
  usersByStatus: Record<UserStatus, number>;
  vipUsers: {
    total: number;
    byLevel: Record<'silver' | 'gold' | 'platinum' | 'diamond', number>;
  };
  recentUsers: UserProfile[];
  topCountries: Array<{
    country: string;
    count: number;
  }>;
} 