export type VIPLevel = 'silver' | 'gold' | 'platinum' | 'diamond';
export type VIPStatus = 'active' | 'pending' | 'suspended' | 'expired';
export type BenefitType = 'lounge' | 'upgrade' | 'baggage' | 'priority' | 'service' | 'other';

export interface VIPProfile {
  id: string;
  userId: string;
  level: VIPLevel;
  status: VIPStatus;
  points: number;
  tierExpiry: string;
  joinDate: string;
  benefits: Array<{
    type: BenefitType;
    name: string;
    description: string;
    value: number;
    validUntil?: string;
  }>;
  preferences: {
    loungeAccess: boolean;
    upgradePriority: number;
    specialServices: string[];
    communicationPreferences: {
      email: boolean;
      sms: boolean;
      push: boolean;
    };
  };
  history: {
    totalSpent: number;
    totalFlights: number;
    totalPoints: number;
    tierChanges: Array<{
      from: VIPLevel;
      to: VIPLevel;
      date: string;
      reason: string;
    }>;
  };
  createdAt: string;
  updatedAt: string;
}

export interface VIPBenefit {
  id: string;
  type: BenefitType;
  name: string;
  description: string;
  value: number;
  requirements: {
    minPoints: number;
    minLevel: VIPLevel;
    conditions: string[];
  };
  availability: {
    startDate: string;
    endDate?: string;
    locations?: string[];
    blackoutDates?: string[];
  };
  redemption: {
    process: string[];
    validity: number;
    restrictions: string[];
  };
  createdAt: string;
  updatedAt: string;
}

export interface VIPSearchParams {
  level?: VIPLevel;
  status?: VIPStatus;
  minPoints?: number;
  maxPoints?: number;
  startDate?: string;
  endDate?: string;
  searchTerm?: string;
}

export interface VIPUpdateParams {
  level?: VIPLevel;
  status?: VIPStatus;
  points?: number;
  tierExpiry?: string;
  benefits?: Array<{
    type: BenefitType;
    name: string;
    description: string;
    value: number;
    validUntil?: string;
  }>;
  preferences?: {
    loungeAccess?: boolean;
    upgradePriority?: number;
    specialServices?: string[];
    communicationPreferences?: {
      email?: boolean;
      sms?: boolean;
      push?: boolean;
    };
  };
  history?: {
    totalSpent?: number;
    totalFlights?: number;
    totalPoints?: number;
    tierChanges?: Array<{
      from: VIPLevel;
      to: VIPLevel;
      date: string;
      reason: string;
    }>;
  };
}

export interface VIPSummary {
  totalMembers: number;
  membersByLevel: Record<VIPLevel, number>;
  membersByStatus: Record<VIPStatus, number>;
  recentMembers: VIPProfile[];
  topSpenders: Array<{
    userId: string;
    name: string;
    level: VIPLevel;
    totalSpent: number;
  }>;
  benefits: {
    totalActive: number;
    byType: Record<BenefitType, number>;
    redemptionRate: number;
    satisfactionRate: number;
  };
}

export interface VIPEvent {
  id: string;
  title: string;
  description: string;
  type: 'exclusive' | 'preview' | 'networking' | 'celebration';
  date: string;
  location: {
    type: 'physical' | 'virtual';
    address?: string;
    link?: string;
  };
  eligibility: {
    minLevel: VIPLevel;
    minPoints: number;
    maxCapacity: number;
  };
  benefits: Array<{
    type: BenefitType;
    name: string;
    description: string;
    value: number;
  }>;
  attendees: Array<{
    userId: string;
    name: string;
    level: VIPLevel;
    status: 'registered' | 'attended' | 'cancelled';
    registrationDate: string;
  }>;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  feedback?: Array<{
    userId: string;
    rating: number;
    comments: string;
    date: string;
  }>;
  createdAt: string;
  updatedAt: string;
} 