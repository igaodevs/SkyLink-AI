import { getFirestore, collection, query, where, getDocs, addDoc, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { authService } from './auth.service';

export interface VIPService {
  id: string;
  passengerId: string;
  bookingId: string;
  type: 'lounge' | 'concierge' | 'transportation' | 'dining' | 'spa' | 'shopping';
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  details: {
    location: string;
    date: Date;
    time: string;
    duration?: number;
    preferences?: Record<string, any>;
  };
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface VIPProfile {
  id: string;
  passengerId: string;
  tier: 'silver' | 'gold' | 'platinum' | 'diamond';
  points: number;
  preferences: {
    dietaryRestrictions: string[];
    preferredSeat: string;
    cabinTemperature: number;
    musicPreference: string;
    pillowType: string;
    blanketType: string;
    newspaper: string[];
  };
  benefits: {
    loungeAccess: boolean;
    priorityBoarding: boolean;
    extraBaggage: boolean;
    conciergeService: boolean;
    spaAccess: boolean;
    shoppingDiscounts: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

class VIPService {
  private static instance: VIPService;
  private db = getFirestore();

  private constructor() {}

  public static getInstance(): VIPService {
    if (!VIPService.instance) {
      VIPService.instance = new VIPService();
    }
    return VIPService.instance;
  }

  public async createVIPProfile(profileData: Omit<VIPProfile, 'id' | 'createdAt' | 'updatedAt'>): Promise<VIPProfile> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Unauthorized: User must be logged in to create VIP profile');
    }

    const profileRef = await addDoc(collection(this.db, 'vip_profiles'), {
      ...profileData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    return this.getVIPProfileById(profileRef.id) as Promise<VIPProfile>;
  }

  public async getVIPProfileById(id: string): Promise<VIPProfile | null> {
    const profileDoc = await getDocs(doc(this.db, 'vip_profiles', id));
    if (!profileDoc.exists()) return null;

    return this.transformVIPProfileData(profileDoc);
  }

  public async getVIPProfileByPassengerId(passengerId: string): Promise<VIPProfile | null> {
    const profilesRef = collection(this.db, 'vip_profiles');
    const q = query(profilesRef, where('passengerId', '==', passengerId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;
    return this.transformVIPProfileData(querySnapshot.docs[0]);
  }

  public async updateVIPProfile(id: string, updates: Partial<VIPProfile>): Promise<void> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Unauthorized: User must be logged in to update VIP profile');
    }

    const profileRef = doc(this.db, 'vip_profiles', id);
    await updateDoc(profileRef, {
      ...updates,
      updatedAt: Timestamp.now()
    });
  }

  public async requestVIPService(serviceData: Omit<VIPService, 'id' | 'createdAt' | 'updatedAt'>): Promise<VIPService> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser) {
      throw new Error('Unauthorized: User must be logged in to request VIP service');
    }

    // Verify VIP status
    const profile = await this.getVIPProfileByPassengerId(serviceData.passengerId);
    if (!profile) {
      throw new Error('VIP profile not found');
    }

    // Check if service is available for the tier
    if (!this.isServiceAvailableForTier(serviceData.type, profile.tier)) {
      throw new Error('Service not available for current VIP tier');
    }

    const serviceRef = await addDoc(collection(this.db, 'vip_services'), {
      ...serviceData,
      status: 'pending',
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    return this.getVIPServiceById(serviceRef.id) as Promise<VIPService>;
  }

  public async getVIPServiceById(id: string): Promise<VIPService | null> {
    const serviceDoc = await getDocs(doc(this.db, 'vip_services', id));
    if (!serviceDoc.exists()) return null;

    return this.transformVIPServiceData(serviceDoc);
  }

  public async getVIPServicesByPassenger(passengerId: string): Promise<VIPService[]> {
    const servicesRef = collection(this.db, 'vip_services');
    const q = query(servicesRef, where('passengerId', '==', passengerId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => this.transformVIPServiceData(doc));
  }

  public async updateVIPServiceStatus(id: string, status: VIPService['status']): Promise<void> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'airline') {
      throw new Error('Unauthorized: Only airline staff can update VIP service status');
    }

    const serviceRef = doc(this.db, 'vip_services', id);
    await updateDoc(serviceRef, {
      status,
      updatedAt: Timestamp.now()
    });
  }

  private isServiceAvailableForTier(serviceType: VIPService['type'], tier: VIPProfile['tier']): boolean {
    const serviceAvailability: Record<VIPProfile['tier'], VIPService['type'][]> = {
      silver: ['lounge'],
      gold: ['lounge', 'concierge', 'transportation'],
      platinum: ['lounge', 'concierge', 'transportation', 'dining'],
      diamond: ['lounge', 'concierge', 'transportation', 'dining', 'spa', 'shopping']
    };

    return serviceAvailability[tier].includes(serviceType);
  }

  private transformVIPProfileData(doc: any): VIPProfile {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    };
  }

  private transformVIPServiceData(doc: any): VIPService {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      details: {
        ...data.details,
        date: data.details.date.toDate()
      },
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    };
  }
}

export const vipService = VIPService.getInstance(); 