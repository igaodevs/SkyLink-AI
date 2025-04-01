export type BaggageStatus = 'checked-in' | 'loaded' | 'in-transit' | 'delivered' | 'delayed' | 'lost' | 'damaged';
export type BaggageType = 'carry-on' | 'checked' | 'oversized' | 'special';

export interface BaggageItem {
  id: string;
  bookingId: string;
  passengerId: string;
  type: BaggageType;
  status: BaggageStatus;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  description: string;
  tags: string[];
  trackingNumber: string;
  location?: {
    airport: string;
    terminal: string;
    timestamp: string;
  };
  scanHistory: Array<{
    location: string;
    status: BaggageStatus;
    timestamp: string;
    operator: string;
  }>;
  specialHandling?: {
    fragile: boolean;
    temperature: boolean;
    security: boolean;
    customs: boolean;
  };
  insurance?: {
    provider: string;
    policyNumber: string;
    coverage: number;
    status: 'active' | 'pending' | 'claimed' | 'settled';
  };
  createdAt: string;
  updatedAt: string;
}

export interface BaggageAllowance {
  type: BaggageType;
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  quantity: number;
  price: number;
}

export interface BaggageSearchParams {
  bookingId?: string;
  passengerId?: string;
  trackingNumber?: string;
  status?: BaggageStatus;
  type?: BaggageType;
  startDate?: string;
  endDate?: string;
}

export interface BaggageUpdateParams {
  status?: BaggageStatus;
  location?: {
    airport: string;
    terminal: string;
    timestamp: string;
  };
  scanHistory?: Array<{
    location: string;
    status: BaggageStatus;
    timestamp: string;
    operator: string;
  }>;
  specialHandling?: {
    fragile?: boolean;
    temperature?: boolean;
    security?: boolean;
    customs?: boolean;
  };
  insurance?: {
    provider?: string;
    policyNumber?: string;
    coverage?: number;
    status?: 'active' | 'pending' | 'claimed' | 'settled';
  };
}

export interface BaggageSummary {
  totalItems: number;
  byStatus: Record<BaggageStatus, number>;
  byType: Record<BaggageType, number>;
  recentItems: BaggageItem[];
  topLocations: Array<{
    airport: string;
    count: number;
  }>;
  issues: {
    delayed: number;
    lost: number;
    damaged: number;
  };
}

export interface BaggageClaim {
  id: string;
  baggageId: string;
  passengerId: string;
  type: 'delay' | 'loss' | 'damage';
  description: string;
  status: 'pending' | 'investigating' | 'resolved' | 'rejected';
  compensation?: {
    amount: number;
    currency: string;
    status: 'pending' | 'approved' | 'paid' | 'rejected';
  };
  documents: Array<{
    type: string;
    url: string;
    uploadedAt: string;
  }>;
  timeline: Array<{
    status: string;
    description: string;
    timestamp: string;
  }>;
  createdAt: string;
  updatedAt: string;
} 