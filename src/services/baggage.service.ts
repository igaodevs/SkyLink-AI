import { getFirestore, collection, query, where, getDocs, addDoc, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { authService } from './auth.service';

export interface Baggage {
  id: string;
  tagNumber: string;
  passengerId: string;
  flightId: string;
  status: 'checked-in' | 'loaded' | 'in-transit' | 'arrived' | 'delivered' | 'lost';
  weight: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  type: 'carry-on' | 'checked';
  contents: string[];
  checkpoints: {
    location: string;
    timestamp: Date;
    status: string;
    handler: string;
    blockchainHash: string;
  }[];
  lastKnownLocation: {
    airport: string;
    terminal: string;
    timestamp: Date;
  };
  createdAt: Date;
  updatedAt: Date;
}

class BaggageService {
  private static instance: BaggageService;
  private db = getFirestore();

  private constructor() {}

  public static getInstance(): BaggageService {
    if (!BaggageService.instance) {
      BaggageService.instance = new BaggageService();
    }
    return BaggageService.instance;
  }

  public async getBaggageByTag(tagNumber: string): Promise<Baggage | null> {
    const baggageRef = collection(this.db, 'baggage');
    const q = query(baggageRef, where('tagNumber', '==', tagNumber));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    const doc = querySnapshot.docs[0];
    return this.transformBaggageData(doc);
  }

  public async getBaggageByPassenger(passengerId: string): Promise<Baggage[]> {
    const baggageRef = collection(this.db, 'baggage');
    const q = query(baggageRef, where('passengerId', '==', passengerId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => this.transformBaggageData(doc));
  }

  public async getBaggageByFlight(flightId: string): Promise<Baggage[]> {
    const baggageRef = collection(this.db, 'baggage');
    const q = query(baggageRef, where('flightId', '==', flightId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => this.transformBaggageData(doc));
  }

  public async createBaggage(baggageData: Omit<Baggage, 'id' | 'createdAt' | 'updatedAt' | 'checkpoints'>): Promise<Baggage> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'airline') {
      throw new Error('Unauthorized: Only airlines can create baggage records');
    }

    const baggageRef = await addDoc(collection(this.db, 'baggage'), {
      ...baggageData,
      checkpoints: [],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    });

    return this.getBaggageByTag(baggageData.tagNumber) as Promise<Baggage>;
  }

  public async updateBaggageStatus(
    tagNumber: string,
    status: Baggage['status'],
    location: string,
    handler: string
  ): Promise<void> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'airline') {
      throw new Error('Unauthorized: Only airlines can update baggage status');
    }

    const baggage = await this.getBaggageByTag(tagNumber);
    if (!baggage) throw new Error('Baggage not found');

    const checkpoint = {
      location,
      timestamp: new Date(),
      status,
      handler,
      blockchainHash: await this.generateBlockchainHash(baggage, status, location, handler)
    };

    const baggageRef = doc(this.db, 'baggage', baggage.id);
    await updateDoc(baggageRef, {
      status,
      checkpoints: [...baggage.checkpoints, checkpoint],
      lastKnownLocation: {
        airport: location,
        terminal: 'TBD', // This would be determined based on the location
        timestamp: new Date()
      },
      updatedAt: Timestamp.now()
    });
  }

  private async generateBlockchainHash(
    baggage: Baggage,
    status: string,
    location: string,
    handler: string
  ): Promise<string> {
    // This is a placeholder for blockchain integration
    // In a real implementation, this would:
    // 1. Create a transaction with the baggage data
    // 2. Submit it to the blockchain network
    // 3. Return the transaction hash
    const data = `${baggage.tagNumber}-${status}-${location}-${handler}-${Date.now()}`;
    return `0x${Buffer.from(data).toString('hex').slice(0, 64)}`;
  }

  public async reportLostBaggage(tagNumber: string): Promise<void> {
    const currentUser = authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'airline') {
      throw new Error('Unauthorized: Only airlines can report lost baggage');
    }

    const baggage = await this.getBaggageByTag(tagNumber);
    if (!baggage) throw new Error('Baggage not found');

    const baggageRef = doc(this.db, 'baggage', baggage.id);
    await updateDoc(baggageRef, {
      status: 'lost',
      updatedAt: Timestamp.now()
    });

    // Trigger automated recovery process
    await this.initiateRecoveryProcess(baggage);
  }

  private async initiateRecoveryProcess(baggage: Baggage): Promise<void> {
    // This is a placeholder for the automated recovery process
    // In a real implementation, this would:
    // 1. Create a recovery ticket
    // 2. Notify relevant departments
    // 3. Start tracking procedures
    // 4. Update passenger
    console.log('Initiating recovery process for baggage:', baggage.tagNumber);
  }

  private transformBaggageData(doc: any): Baggage {
    const data = doc.data();
    return {
      id: doc.id,
      ...data,
      checkpoints: data.checkpoints.map((checkpoint: any) => ({
        ...checkpoint,
        timestamp: checkpoint.timestamp.toDate()
      })),
      lastKnownLocation: {
        ...data.lastKnownLocation,
        timestamp: data.lastKnownLocation.timestamp.toDate()
      },
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    };
  }
}

export const baggageService = BaggageService.getInstance(); 